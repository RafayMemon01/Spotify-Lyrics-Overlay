// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn set_window_locked(window: tauri::Window, locked: bool) {
    let _ = window.set_resizable(!locked);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(
            tauri::generate_handler![
                greet,
                set_window_locked
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
