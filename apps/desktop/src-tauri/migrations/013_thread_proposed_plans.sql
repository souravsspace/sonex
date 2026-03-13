-- Migration 013: Thread Proposed Plans
-- Add proposed plans support for threads

CREATE TABLE IF NOT EXISTS projection_thread_proposed_plans (
    plan_id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES projection_threads(thread_id) ON DELETE CASCADE,
    plan_data JSONB NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('proposed', 'accepted', 'rejected', 'executing', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for thread lookups
CREATE INDEX IF NOT EXISTS idx_projection_thread_proposed_plans_thread_id 
    ON projection_thread_proposed_plans (thread_id);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_projection_thread_proposed_plans_status 
    ON projection_thread_proposed_plans (status);

-- Composite index for thread + status queries
CREATE INDEX IF NOT EXISTS idx_projection_thread_proposed_plans_thread_status 
    ON projection_thread_proposed_plans (thread_id, status);

-- GIN index for JSONB queries on plan_data
CREATE INDEX IF NOT EXISTS idx_projection_thread_proposed_plans_plan_data 
    ON projection_thread_proposed_plans USING GIN (plan_data);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_projection_thread_proposed_plans_created_at 
    ON projection_thread_proposed_plans (created_at DESC);
