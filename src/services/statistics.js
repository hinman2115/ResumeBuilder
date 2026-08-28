/**
 * Real Supabase & Vercel-backed Statistics Service
 * 
 * Interacts exclusively with the serverless endpoint `/api/statistics`.
 * Global statistics are stored in Supabase PostgreSQL (zero fake/mock numbers).
 * LocalStorage is used ONLY to store an anonymous visitor identifier.
 */

const STORAGE_KEYS = {
  ANONYMOUS_VISITOR_ID: 'resume_forge_visitor_id',
  VISITOR_EVENT_SENT: 'resumeforge_visitor_event_sent_session'
};

// Generate a random cryptographically secure or pseudo-random UUID
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
}

/**
 * Retrieves or creates an anonymous visitor identifier stored in LocalStorage.
 */
export function getOrCreateAnonymousVisitorId() {
  try {
    let visitorId = localStorage.getItem(STORAGE_KEYS.ANONYMOUS_VISITOR_ID);
    if (!visitorId) {
      visitorId = generateUUID();
      localStorage.setItem(STORAGE_KEYS.ANONYMOUS_VISITOR_ID, visitorId);
    }
    return visitorId;
  } catch {
    return generateUUID();
  }
}

/**
 * Fetches real global statistics from Supabase via /api/statistics.
 * Returns { visitors: number, resumesCreated: number, resumesDownloaded: number }
 */
export async function getStatistics() {
  try {
    const res = await fetch('/api/statistics', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.error || `HTTP ${res.status}: Failed to fetch statistics`);
    }

    const data = await res.json();
    return {
      visitors: typeof data.visitors === 'number' ? data.visitors : 0,
      resumesCreated: typeof data.resumesCreated === 'number' ? data.resumesCreated : 0,
      resumesDownloaded: typeof data.resumesDownloaded === 'number' ? data.resumesDownloaded : 0
    };
  } catch (error) {
    console.warn('Statistics fetch error:', error.message);
    throw error;
  }
}

/**
 * Tracks a unique anonymous visitor to the platform.
 * Sends the anonymous identifier to /api/statistics to be hashed and recorded.
 */
export async function trackVisitor() {
  try {
    // Prevent sending duplicate network requests within the same browser tab session
    if (sessionStorage.getItem(STORAGE_KEYS.VISITOR_EVENT_SENT)) {
      return null;
    }

    const visitorId = getOrCreateAnonymousVisitorId();
    sessionStorage.setItem(STORAGE_KEYS.VISITOR_EVENT_SENT, 'true');

    const res = await fetch('/api/statistics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'visitor',
        visitorId
      })
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.warn('Visitor tracking error:', error.message);
    return null;
  }
}

/**
 * Tracks a meaningful resume creation event.
 * @param {string} eventId - Unique ID for this resume creation to ensure idempotency
 */
export async function trackResumeCreated(eventId) {
  try {
    const finalEventId = eventId || ('create_' + generateUUID());
    const visitorId = getOrCreateAnonymousVisitorId();

    const res = await fetch('/api/statistics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'resume_created',
        eventId: finalEventId,
        visitorId
      })
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.warn('Resume creation tracking error:', error.message);
    return null;
  }
}

/**
 * Tracks a successful PDF resume download.
 * @param {string} eventId - Unique ID for this download attempt
 */
export async function trackResumeDownloaded(eventId) {
  try {
    const finalEventId = eventId || ('dl_' + generateUUID());
    const visitorId = getOrCreateAnonymousVisitorId();

    const res = await fetch('/api/statistics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'resume_downloaded',
        eventId: finalEventId,
        visitorId
      })
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.warn('Resume download tracking error:', error.message);
    return null;
  }
}
