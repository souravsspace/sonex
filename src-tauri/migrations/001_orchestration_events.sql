-- Migration 001: Orchestration Events
-- Core event sourcing table for orchestration engine

CREATE TABLE IF NOT EXISTS orchestration_events (
    id BIGSERIAL PRIMARY KEY,
    aggregate_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_data JSONB NOT NULL,
    sequence BIGINT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure unique sequence per aggregate
    CONSTRAINT uq_orchestration_events_aggregate_sequence UNIQUE (aggregate_id, sequence)
);

-- Index for aggregate lookups
CREATE INDEX IF NOT EXISTS idx_orchestration_events_aggregate_id 
    ON orchestration_events (aggregate_id);

-- Index for event type filtering
CREATE INDEX IF NOT EXISTS idx_orchestration_events_event_type 
    ON orchestration_events (event_type);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_orchestration_events_timestamp 
    ON orchestration_events (timestamp DESC);

-- Composite index for aggregate event replay
CREATE INDEX IF NOT EXISTS idx_orchestration_events_aggregate_sequence 
    ON orchestration_events (aggregate_id, sequence);

-- GIN index for JSONB queries on event_data
CREATE INDEX IF NOT EXISTS idx_orchestration_events_event_data 
    ON orchestration_events USING GIN (event_data);
