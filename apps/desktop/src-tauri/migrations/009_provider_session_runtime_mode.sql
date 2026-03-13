-- Migration 009: Provider Session Runtime Mode
-- Ensure provider session runtime mode tracking (already implemented in 004)

-- This migration is a no-op since runtime_mode column was already added in migration 004
-- Included for migration number consistency with original TypeScript migrations

-- Note: In the original SQLite migrations, this may have been an ALTER TABLE
-- but in our PostgreSQL version, we included this column from the start in 004_provider_session_runtime.sql
