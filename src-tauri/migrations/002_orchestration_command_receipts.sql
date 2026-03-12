-- Migration 002: Orchestration Command Receipts
-- Track command execution status and results

CREATE TABLE IF NOT EXISTS orchestration_command_receipts (
    command_id TEXT PRIMARY KEY,
    aggregate_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    result JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for aggregate lookups
CREATE INDEX IF NOT EXISTS idx_orchestration_command_receipts_aggregate_id 
    ON orchestration_command_receipts (aggregate_id);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_orchestration_command_receipts_status 
    ON orchestration_command_receipts (status);

-- Composite index for aggregate status queries
CREATE INDEX IF NOT EXISTS idx_orchestration_command_receipts_aggregate_status 
    ON orchestration_command_receipts (aggregate_id, status);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_orchestration_command_receipts_created_at 
    ON orchestration_command_receipts (created_at DESC);

-- GIN index for JSONB queries on result
CREATE INDEX IF NOT EXISTS idx_orchestration_command_receipts_result 
    ON orchestration_command_receipts USING GIN (result);
