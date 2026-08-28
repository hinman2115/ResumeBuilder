import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

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
  if (!rawId) return null;
  return crypto.createHash('sha256').update(rawId.trim()).digest('hex');
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    // GET /api/statistics - Retrieve global statistics
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

      // Short cache to balance real-time accuracy and database efficiency
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

      // 1. Strict event whitelist
      const ALLOWED_EVENTS = ['visitor', 'resume_created', 'resume_downloaded'];
      if (!event || !ALLOWED_EVENTS.includes(event)) {
        return res.status(400).json({
          error: `Invalid event type "${event}". Allowed events: ${ALLOWED_EVENTS.join(', ')}`
        });
      }

      // 2. Determine unique event identifier for idempotency
      let finalEventId = eventId;
      const visitorHash = hashVisitorId(visitorId);

      if (event === 'visitor') {
        if (!visitorId) {
          return res.status(400).json({ error: 'visitorId is required for visitor events' });
        }
        // Unique key for visitor is based on their hashed anonymous ID
        finalEventId = `vis_${visitorHash}`;
      } else if (!finalEventId) {
        // For creations and downloads, eventId must be provided by the client
        return res.status(400).json({ error: `eventId is required for ${event} events` });
      }

      // 3. Insert event into statistic_events table for idempotency
      const { error: insertError } = await supabase
        .from('statistic_events')
        .insert({
          event_id: finalEventId,
          event_type: event,
          visitor_id_hash: visitorHash
        });

      // If already recorded (duplicate key violation), return duplicate response without incrementing
      if (insertError) {
        if (insertError.code === '23505' || insertError.message?.includes('duplicate key')) {
          return res.status(200).json({
            success: true,
            duplicate: true,
            message: 'Event was already recorded.'
          });
        }

        console.error('Error recording statistic event:', insertError);
        return res.status(500).json({ error: 'Failed to record event' });
      }

      // 4. Perform atomic counter increment using Supabase RPC function
      const { data: updatedStats, error: rpcError } = await supabase.rpc('increment_site_stat', {
        stat_name: event
      });

      if (rpcError) {
        console.error('Error incrementing site statistics via RPC:', rpcError);
        return res.status(500).json({ error: 'Failed to increment statistic counter' });
      }

      const updatedRow = Array.isArray(updatedStats) ? updatedStats[0] : updatedStats;

      return res.status(200).json({
        success: true,
        event,
        eventId: finalEventId,
        stats: {
          visitors: updatedRow ? Number(updatedRow.visitors) : undefined,
          resumesCreated: updatedRow ? Number(updatedRow.resumes_created) : undefined,
          resumesDownloaded: updatedRow ? Number(updatedRow.resumes_downloaded) : undefined
        }
      });
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    console.error('Unhandled statistics API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
