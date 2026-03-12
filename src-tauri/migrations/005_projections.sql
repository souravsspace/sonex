-- Migration 005: Projections
-- Main projection tables for threads, messages, projects, checkpoints, and related entities

-- Projects table
CREATE TABLE IF NOT EXISTS projection_projects (
    project_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    path TEXT NOT NULL UNIQUE,
    git_repo BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projection_projects_path 
    ON projection_projects (path);

CREATE INDEX IF NOT EXISTS idx_projection_projects_created_at 
    ON projection_projects (created_at DESC);

-- Threads table
CREATE TABLE IF NOT EXISTS projection_threads (
    thread_id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projection_projects(project_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'archived', 'deleted')),
    runtime_mode TEXT NOT NULL DEFAULT 'auto' CHECK (runtime_mode IN ('auto', 'agent', 'chat')),
    interaction_mode TEXT NOT NULL DEFAULT 'normal' CHECK (interaction_mode IN ('normal', 'review', 'approve')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projection_threads_project_id 
    ON projection_threads (project_id);

CREATE INDEX IF NOT EXISTS idx_projection_threads_status 
    ON projection_threads (status);

CREATE INDEX IF NOT EXISTS idx_projection_threads_created_at 
    ON projection_threads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_projection_threads_project_status 
    ON projection_threads (project_id, status);

-- Thread messages table
CREATE TABLE IF NOT EXISTS projection_thread_messages (
    message_id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES projection_threads(thread_id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    sequence BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure unique sequence per thread
    CONSTRAINT uq_projection_thread_messages_thread_sequence UNIQUE (thread_id, sequence)
);

CREATE INDEX IF NOT EXISTS idx_projection_thread_messages_thread_id 
    ON projection_thread_messages (thread_id);

CREATE INDEX IF NOT EXISTS idx_projection_thread_messages_sequence 
    ON projection_thread_messages (thread_id, sequence);

CREATE INDEX IF NOT EXISTS idx_projection_thread_messages_role 
    ON projection_thread_messages (role);

-- Thread activities table
CREATE TABLE IF NOT EXISTS projection_thread_activities (
    activity_id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES projection_threads(thread_id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    activity_data JSONB NOT NULL,
    sequence BIGINT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure unique sequence per thread
    CONSTRAINT uq_projection_thread_activities_thread_sequence UNIQUE (thread_id, sequence)
);

CREATE INDEX IF NOT EXISTS idx_projection_thread_activities_thread_id 
    ON projection_thread_activities (thread_id);

CREATE INDEX IF NOT EXISTS idx_projection_thread_activities_sequence 
    ON projection_thread_activities (thread_id, sequence);

CREATE INDEX IF NOT EXISTS idx_projection_thread_activities_type 
    ON projection_thread_activities (activity_type);

CREATE INDEX IF NOT EXISTS idx_projection_thread_activities_data 
    ON projection_thread_activities USING GIN (activity_data);

-- Thread sessions table
CREATE TABLE IF NOT EXISTS projection_thread_sessions (
    session_id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES projection_threads(thread_id) ON DELETE CASCADE,
    runtime_mode TEXT NOT NULL CHECK (runtime_mode IN ('auto', 'agent', 'chat')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_projection_thread_sessions_thread_id 
    ON projection_thread_sessions (thread_id);

CREATE INDEX IF NOT EXISTS idx_projection_thread_sessions_started_at 
    ON projection_thread_sessions (started_at DESC);

-- Checkpoints table
CREATE TABLE IF NOT EXISTS projection_checkpoints (
    checkpoint_id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES projection_threads(thread_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projection_checkpoints_thread_id 
    ON projection_checkpoints (thread_id);

CREATE INDEX IF NOT EXISTS idx_projection_checkpoints_created_at 
    ON projection_checkpoints (created_at DESC);

-- Pending approvals table
CREATE TABLE IF NOT EXISTS projection_pending_approvals (
    approval_id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES projection_threads(thread_id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    action_data JSONB NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projection_pending_approvals_thread_id 
    ON projection_pending_approvals (thread_id);

CREATE INDEX IF NOT EXISTS idx_projection_pending_approvals_status 
    ON projection_pending_approvals (status);

CREATE INDEX IF NOT EXISTS idx_projection_pending_approvals_thread_status 
    ON projection_pending_approvals (thread_id, status);

CREATE INDEX IF NOT EXISTS idx_projection_pending_approvals_action_data 
    ON projection_pending_approvals USING GIN (action_data);

-- Turns table (conversation turns)
CREATE TABLE IF NOT EXISTS projection_turns (
    turn_id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES projection_threads(thread_id) ON DELETE CASCADE,
    user_message_id TEXT REFERENCES projection_thread_messages(message_id) ON DELETE SET NULL,
    assistant_message_id TEXT REFERENCES projection_thread_messages(message_id) ON DELETE SET NULL,
    sequence BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure unique sequence per thread
    CONSTRAINT uq_projection_turns_thread_sequence UNIQUE (thread_id, sequence)
);

CREATE INDEX IF NOT EXISTS idx_projection_turns_thread_id 
    ON projection_turns (thread_id);

CREATE INDEX IF NOT EXISTS idx_projection_turns_sequence 
    ON projection_turns (thread_id, sequence);
