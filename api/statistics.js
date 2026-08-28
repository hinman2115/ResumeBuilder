import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Standard UUID format validator (v1, v4, etc.)
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Helper to normalize and resolve Supabase credentials from any common naming convention
function getCredentials() {
  let url = (
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_PROJECT_URL ||
    ''
  ).trim();

  // Strip wrapping quotes if entered in Vercel UI
  if ((url.startsWith('"') && url.endsWith('"')) || (url.startsWith("'") && url.endsWith("'"))) {
    url = url.slice(1, -1).trim();
  }

  // Auto-prepend https:// if user pasted just "xxxx.supabase.co"
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  let key = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_KEY ||
    ''
  ).trim();

  // Strip wrapping quotes if entered in Vercel UI
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }

  let hostname = null;
  if (url) {
    try {
      hostname = new URL(url).hostname;
    } catch {
      hostname = 'invalid-url-format';
    }
  }

  return { url, key, hostname };
}

// Initialize Supabase admin client (server-side only with service_role)
function getSupabaseClient() {
  const { url, key } = getCredentials();

  if (!url || !key || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return null;
  }

  try {
    return createClient(url, key, {
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

  const { url, key, hostname } = getCredentials();
  const supabase = getSupabaseClient();

  // Parse query params safely
  let isDiag = false;
  try {
    const parsedUrl = new URL(req.url, 'http://localhost');
    isDiag = req.query?.diag === '1' || parsedUrl.searchParams.get('diag') === '1';
  } catch {
    isDiag = req.query?.diag === '1';
  }

  // Diagnostic mode handler
  if (isDiag) {
    const allEnvKeys = Object.keys(process.env).filter(
      k => !k.includes('KEY') && !k.includes('SECRET') && !k.includes('TOKEN') && !k.includes('PASSWORD') && !k.includes('AUTH')
    );
    return res.status(200).json({
      supabaseUrlExists: Boolean(url),
      serviceRoleKeyExists: Boolean(key),
      supabaseHostname: hostname,
      vercelEnv: process.env.VERCEL_ENV || 'unknown',
      nodeEnv: process.env.NODE_ENV || 'unknown',
      hasClient: Boolean(supabase),
      envKeysCount: Object.keys(process.env).length,
      sampleEnvKeys: allEnvKeys.slice(0, 15)
    });
  }

  if (!supabase) {
    return res.status(503).json({
      error: 'Supabase environment variables (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not configured.',
      diagnostic: {
        supabaseUrlExists: Boolean(url),
        serviceRoleKeyExists: Boolean(key),
        supabaseHostname: hostname
      }
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
