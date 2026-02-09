import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type OverlayMode = "normal" | "locked";

function App() {
  const [overlayMode, setOverlayMode] = useState<OverlayMode>("normal");

  async function toggleLock() {
    const nextMode: OverlayMode =
      overlayMode === "normal" ? "locked" : "normal";

    try {
      await invoke("set_window_locked", {
        locked: nextMode === "locked",
      });

      setOverlayMode(nextMode);
    } catch (error) {
      console.error("Failed to change window mode:", error);
    }
  }

  return (
    <div
      style={{
        padding: "12px",
        fontFamily: "sans-serif",
      }}
    >
      <h3>Spotify Lyrics Overlay</h3>

      <p>Mode: {overlayMode}</p>

      <button onClick={toggleLock}>
        {overlayMode === "normal" ? "Lock Window" : "Unlock Window"}
      </button>
    </div>
  );
}

export default App;
