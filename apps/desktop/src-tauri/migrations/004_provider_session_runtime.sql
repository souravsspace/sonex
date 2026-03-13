-- Migration 004: Provider Session Runtime
-- AI provider session state management

CREATE TABLE IF NOT EXISTS provider_session_runtime (
    session_id TEXT PRIMARY KEY,
    provider_type TEXT NOT NULL,
    runtime_mode TEXT NOT NULL CHECK (runtime_mode IN ('auto', 'agent', 'chat')),
    state_data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for provider type lookups
CREATE INDEX IF NOT EXISTS idx_provider_session_runtime_provider_type 
    ON provider_session_runtime (provider_type);

-- Index for runtime mode filtering
CREATE INDEX IF NOT EXISTS idx_provider_session_runtime_runtime_mode 
    ON provider_session_runtime (runtime_mode);

-- Composite index for provider + mode queries
CREATE INDEX IF NOT EXISTS idx_provider_session_runtime_provider_mode 
    ON provider_session_runtime (provider_type, runtime_mode);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_provider_session_runtime_created_at 
    ON provider_session_runtime (created_at DESC);

-- GIN index for JSONB queries on state_data
CREATE INDEX IF NOT EXISTS idx_provider_session_runtime_state_data 
    ON provider_session_runtime USING GIN (state_data);
