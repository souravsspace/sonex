// Event Emitter System - Backend→Frontend event notifications
use crate::ipc::types::*;
use tauri::{Emitter, Manager, Window};

// ============================================================================
// Event Emitter Functions
// ============================================================================

/// Emit an orchestration domain event
pub fn emit_orchestration_event(window: &Window, event: OrchestrationEvent) {
    if let Err(e) = window.emit("orchestration:domain-event", event) {
        eprintln!("Failed to emit orchestration event: {}", e);
    }
}

/// Emit a provider runtime event
pub fn emit_provider_runtime_event(window: &Window, event: ProviderRuntimeEvent) {
    if let Err(e) = window.emit("provider:runtime-event", event) {
        eprintln!("Failed to emit provider runtime event: {}", e);
    }
}

/// Emit terminal output
pub fn emit_terminal_output(window: &Window, terminal_id: String, data: String) {
    let event = TerminalOutputEvent { terminal_id, data };
    if let Err(e) = window.emit("terminal:output", event) {
        eprintln!("Failed to emit terminal output: {}", e);
    }
}

/// Emit git status changed event
pub fn emit_git_status_changed(window: &Window, project_id: String, status: GitStatus) {
    let event = GitStatusChangedEvent { project_id, status };
    if let Err(e) = window.emit("git:status-changed", event) {
        eprintln!("Failed to emit git status changed: {}", e);
    }
}

// ============================================================================
// Event Broadcasting Helpers
// ============================================================================

/// Broadcast an event to all windows
pub fn broadcast_to_all_windows(
    app: &tauri::AppHandle,
    event_name: &str,
    payload: impl serde::Serialize + Clone,
) {
    for (_label, window) in app.webview_windows() {
        if let Err(e) = window.emit(event_name, payload.clone()) {
            eprintln!("Failed to broadcast event {} to window: {}", event_name, e);
        }
    }
}
