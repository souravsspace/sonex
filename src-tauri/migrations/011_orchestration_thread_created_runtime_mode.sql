-- Migration 011: Orchestration Thread Created Runtime Mode
-- Add runtime mode tracking for orchestration thread creation events

-- This migration is a no-op since runtime_mode was already added in migration 005
-- Included for migration number consistency with original TypeScript migrations

-- Note: This likely added runtime_mode to event_data in orchestration_events
-- No schema change needed as event_data is already JSONB and can contain any fields
