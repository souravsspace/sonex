-- Migration 008: Thread Activity Sequence
-- Ensure activity sequence tracking (already implemented in 005)

-- This migration is a no-op since sequence column was already added in migration 005
-- Included for migration number consistency with original TypeScript migrations

-- Note: In the original SQLite migrations, this may have been an ALTER TABLE
-- but in our PostgreSQL version, we included this column from the start in 005_projections.sql
