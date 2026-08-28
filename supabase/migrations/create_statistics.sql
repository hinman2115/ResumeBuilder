-- ==============================================================================
-- ResumeForge - Supabase Database Schema & Atomic RPC Functions
-- ==============================================================================

-- 1. Create Global Site Statistics Table
CREATE TABLE IF NOT EXISTS site_statistics (
    id BIGINT PRIMARY KEY,
    visitors BIGINT NOT NULL DEFAULT 0,
    resumes_created BIGINT NOT NULL DEFAULT 0,
    resumes_downloaded BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure Initial Row (id = 1) exists
INSERT INTO site_statistics (id, visitors, resumes_created, resumes_downloaded, updated_at)
VALUES (1, 0, 0, 0, NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Create Unique Visitors Table
CREATE TABLE IF NOT EXISTS unique_visitors (
    id BIGSERIAL PRIMARY KEY,
    visitor_id_hash TEXT UNIQUE NOT NULL,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_unique_visitors_hash ON unique_visitors (visitor_id_hash);

-- 3. Create Statistic Events Table (UUID event_id for Idempotency)
CREATE TABLE IF NOT EXISTS statistic_events (
    id BIGSERIAL PRIMARY KEY,
    event_id UUID UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    visitor_id_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_statistic_events_event_id ON statistic_events (event_id);
CREATE INDEX IF NOT EXISTS idx_statistic_events_type ON statistic_events (event_type);

-- 4. RPC Function: record_unique_visitor
-- Atomically records an anonymous visitor and increments visitors counter only if new
CREATE OR REPLACE FUNCTION record_unique_visitor(p_visitor_id_hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_is_new BOOLEAN := FALSE;
BEGIN
    IF p_visitor_id_hash IS NULL OR length(trim(p_visitor_id_hash)) = 0 THEN
        RAISE EXCEPTION 'p_visitor_id_hash cannot be null or empty';
    END IF;

    -- Ensure initial row exists in site_statistics
    INSERT INTO site_statistics (id, visitors, resumes_created, resumes_downloaded, updated_at)
    VALUES (1, 0, 0, 0, NOW())
    ON CONFLICT (id) DO NOTHING;

    -- Check if visitor exists
    IF NOT EXISTS (SELECT 1 FROM unique_visitors WHERE visitor_id_hash = p_visitor_id_hash) THEN
        -- Insert new unique visitor
        INSERT INTO unique_visitors (visitor_id_hash, first_seen_at, last_seen_at)
        VALUES (p_visitor_id_hash, NOW(), NOW())
        ON CONFLICT (visitor_id_hash) DO NOTHING;

        -- Atomically increment site_statistics.visitors
        UPDATE site_statistics
        SET visitors = visitors + 1,
            updated_at = NOW()
        WHERE id = 1;

        v_is_new := TRUE;
    ELSE
        -- Update last seen timestamp for returning visitor
        UPDATE unique_visitors
        SET last_seen_at = NOW()
        WHERE visitor_id_hash = p_visitor_id_hash;
    END IF;

    RETURN v_is_new;
END;
$$;

-- 5. RPC Function: record_statistic_event
-- Atomically records a resume_created or resume_downloaded event and increments counters
CREATE OR REPLACE FUNCTION record_statistic_event(
    p_event_id UUID,
    p_event_type TEXT,
    p_visitor_id_hash TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_is_new BOOLEAN := FALSE;
BEGIN
    IF p_event_type NOT IN ('resume_created', 'resume_downloaded') THEN
        RAISE EXCEPTION 'Invalid event_type: %. Must be resume_created or resume_downloaded', p_event_type;
    END IF;

    IF p_event_id IS NULL THEN
        RAISE EXCEPTION 'p_event_id cannot be null';
    END IF;

    -- Ensure initial row exists in site_statistics
    INSERT INTO site_statistics (id, visitors, resumes_created, resumes_downloaded, updated_at)
    VALUES (1, 0, 0, 0, NOW())
    ON CONFLICT (id) DO NOTHING;

    -- Check if event already exists
    IF NOT EXISTS (SELECT 1 FROM statistic_events WHERE event_id = p_event_id) THEN
        INSERT INTO statistic_events (event_id, event_type, visitor_id_hash, created_at)
        VALUES (p_event_id, p_event_type, p_visitor_id_hash, NOW())
        ON CONFLICT (event_id) DO NOTHING;

        IF p_event_type = 'resume_created' THEN
            UPDATE site_statistics
            SET resumes_created = resumes_created + 1,
                updated_at = NOW()
            WHERE id = 1;
            v_is_new := TRUE;
        ELSIF p_event_type = 'resume_downloaded' THEN
            UPDATE site_statistics
            SET resumes_downloaded = resumes_downloaded + 1,
                updated_at = NOW()
            WHERE id = 1;
            v_is_new := TRUE;
        END IF;
    END IF;

    RETURN v_is_new;
END;
$$;

-- 6. Row Level Security (RLS)
ALTER TABLE site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE unique_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistic_events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to the aggregate statistics
CREATE POLICY "Allow public read access to site_statistics"
ON site_statistics
FOR SELECT
TO anon, authenticated, service_role
USING (true);

-- Allow service_role full access to all tables
CREATE POLICY "Allow service_role full access to site_statistics"
ON site_statistics
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow service_role full access to unique_visitors"
ON unique_visitors
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow service_role full access to statistic_events"
ON statistic_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
