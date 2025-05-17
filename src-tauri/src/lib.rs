mod components {
    pub mod calculate;
    pub mod converter;
    pub mod sequences;
    pub mod utils;
}
use components::calculate::calculate;
use components::converter::converter;
use components::sequences::copy_to_clipboard;
use components::sequences::select_sequence;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            calculate,
            converter,
            select_sequence,
            copy_to_clipboard
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
