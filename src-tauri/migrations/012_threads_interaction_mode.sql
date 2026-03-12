-- Migration 012: Threads Interaction Mode
-- Ensure threads interaction mode tracking (already implemented in 005)

-- This migration is a no-op since interaction_mode column was already added in migration 005
-- Included for migration number consistency with original TypeScript migrations

-- Note: In the original SQLite migrations, this may have been an ALTER TABLE
-- but in our PostgreSQL version, we included this column from the start in 005_projections.sql
