import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Standard UUID format validator (v1, v4, etc.)
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Initialize Supabase admin client (server-side only with service_role)
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey || (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://'))) {
    return null;
  }

  try {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err.message);
    return null;
  }
}

// Helper to hash anonymous visitor identifiers
function hashVisitorId(rawId) {
  if (!rawId || typeof rawId !== 'string') return null;
  const trimmed = rawId.trim();
  if (!trimmed) return null;
  return crypto.createHash('sha256').update(trimmed).digest('hex');
}

export default async function handler(req, res) {
  // CORS Configuration: allow same origin or standard requests
  const origin = req.headers.origin || '';
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return res.status(503).json({
      error: 'Supabase environment variables (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not configured.'
    });
  }

  try {
    // --------------------------------------------------------------------------
    // GET /api/statistics - Retrieve real global statistics
    // --------------------------------------------------------------------------
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('site_statistics')
        .select('visitors, resumes_created, resumes_downloaded')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Supabase query error:', error);
        return res.status(500).json({ error: 'Failed to retrieve site statistics' });
      }

      const visitors = data ? Number(data.visitors) || 0 : 0;
      const resumesCreated = data ? Number(data.resumes_created) || 0 : 0;
      const resumesDownloaded = data ? Number(data.resumes_downloaded) || 0 : 0;

      // Cache headers for performance and database efficiency
      res.setHeader('Cache-Control', 'public, s-maxage=5, stale-while-revalidate=15');

      return res.status(200).json({
        visitors,
        resumesCreated,
        resumesDownloaded
      });
    }

    // --------------------------------------------------------------------------
    // POST /api/statistics - Record a controlled statistic event
    // --------------------------------------------------------------------------
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          return res.status(400).json({ error: 'Invalid JSON request body' });
        }
      }

      const { event, eventId, visitorId } = body || {};

      // 1. Validate event type
      const ALLOWED_EVENTS = ['visitor', 'resume_created', 'resume_downloaded'];
      if (!event || !ALLOWED_EVENTS.includes(event)) {
        return res.status(400).json({
          error: `Invalid event type "${event}". Allowed events: ${ALLOWED_EVENTS.join(', ')}`
        });
      }

      const visitorHash = hashVisitorId(visitorId);

      // 2. Handle Visitor Event
      if (event === 'visitor') {
        if (!visitorId) {
          return res.status(400).json({ error: 'visitorId is required for visitor events' });
        }

        // Call RPC: record_unique_visitor(p_visitor_id_hash)
        const { data, error: rpcError } = await supabase.rpc('record_unique_visitor', {
          p_visitor_id_hash: visitorHash
        });

        if (rpcError) {
          console.error('Error in record_unique_visitor RPC:', rpcError);
          return res.status(500).json({ error: 'Failed to record visitor' });
        }

        return res.status(200).json({
          success: true,
          newVisitor: Boolean(data)
        });
      }

      // 3. Handle Resume Created and Resume Downloaded Events
      if (event === 'resume_created' || event === 'resume_downloaded') {
        // Validate eventId is a valid UUID
        if (!eventId || !UUID_REGEX.test(eventId)) {
          return res.status(400).json({
            error: 'Invalid or missing UUID eventId. A valid RFC 4122 UUID is required.'
          });
        }

        // Call RPC: record_statistic_event(p_event_id, p_event_type, p_visitor_id_hash)
        const { data, error: rpcError } = await supabase.rpc('record_statistic_event', {
          p_event_id: eventId,
          p_event_type: event,
          p_visitor_id_hash: visitorHash || null
        });

        if (rpcError) {
          console.error(`Error in record_statistic_event RPC for ${event}:`, rpcError);
          return res.status(500).json({ error: `Failed to record ${event} event` });
        }

        return res.status(200).json({
          success: true,
          newEvent: Boolean(data)
        });
      }
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    console.error('Unhandled statistics API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
