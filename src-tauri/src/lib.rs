// Sonex - Tauri application with IPC bridge
mod ipc;

use ipc::commands::AppState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // Initialize app state
            let state = AppState::new();
            app.manage(state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Project commands
            ipc::project_list,
            ipc::project_get,
            ipc::project_create,
            
            // Thread commands
            ipc::thread_list,
            ipc::thread_get,
            ipc::thread_create,
            ipc::thread_delete,
            
            // Message commands
            ipc::message_send,
            ipc::message_list,
            
            // Workspace commands
            ipc::workspace_get_entries,
            ipc::workspace_read_file,
            ipc::workspace_write_file,
            
            // Git commands
            ipc::git_status,
            ipc::git_branch,
            ipc::git_commit,
            
            // Terminal commands
            ipc::terminal_create,
            ipc::terminal_input,
            ipc::terminal_resize,
            ipc::terminal_close,
            
            // Settings commands
            ipc::settings_get,
            ipc::settings_update,
            ipc::keybindings_get,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
