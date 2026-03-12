-- Migration 003: Checkpoint Diff Blobs
-- Store file diffs and snapshots for version control

CREATE TABLE IF NOT EXISTS checkpoint_diff_blobs (
    id BIGSERIAL PRIMARY KEY,
    checkpoint_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    diff_content BYTEA,
    content_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure unique file per checkpoint
    CONSTRAINT uq_checkpoint_diff_blobs_checkpoint_file UNIQUE (checkpoint_id, file_path)
);

-- Index for checkpoint lookups
CREATE INDEX IF NOT EXISTS idx_checkpoint_diff_blobs_checkpoint_id 
    ON checkpoint_diff_blobs (checkpoint_id);

-- Index for file path lookups
CREATE INDEX IF NOT EXISTS idx_checkpoint_diff_blobs_file_path 
    ON checkpoint_diff_blobs (file_path);

-- Index for content hash (deduplication)
CREATE INDEX IF NOT EXISTS idx_checkpoint_diff_blobs_content_hash 
    ON checkpoint_diff_blobs (content_hash);

-- Composite index for checkpoint + file queries
CREATE INDEX IF NOT EXISTS idx_checkpoint_diff_blobs_checkpoint_file 
    ON checkpoint_diff_blobs (checkpoint_id, file_path);
