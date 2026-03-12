-- Migration 007: Thread Message Attachments
-- Add attachments support for thread messages

CREATE TABLE IF NOT EXISTS projection_thread_message_attachments (
    attachment_id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL REFERENCES projection_thread_messages(message_id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for message lookups
CREATE INDEX IF NOT EXISTS idx_projection_thread_message_attachments_message_id 
    ON projection_thread_message_attachments (message_id);

-- Index for mime type filtering
CREATE INDEX IF NOT EXISTS idx_projection_thread_message_attachments_mime_type 
    ON projection_thread_message_attachments (mime_type);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_projection_thread_message_attachments_created_at 
    ON projection_thread_message_attachments (created_at DESC);
