# 🤖 Antigravity AI Coding Companion

An interactive, animated AI Companion designed to sit alongside or float over your IDE while you code. Features dynamic animated avatars, reactive moods, sound effects, Pomodoro focus sprint tools, and multiple desktop modes.

![Preview](https://raw.githubusercontent.com/angkon101/ai-companion/main/preview.png) *(or screenshot)*

---

## ✨ Features

- **3 Animated Avatars**:
  - **Byte the Cyber-Bot**: Futuristic robot with animated LED visor matrix displaying code symbols (`</>`), radar scanner, and thruster glows.
  - **Chibi Kitsune**: Kawaii anime spirit fox with reactive twitching ears, wagging tail, and blush cheeks.
  - **Bouncy Slime**: Translucent jelly creature with bouncy spring physics and inner sparkles.
- **Reactive Moods & Expressions**:
  - `Vibing / Idle`: Natural eye tracking that follows your cursor across the screen.
  - `Deep Focus Sprint`: Concentrated expression synced with coding sprints.
  - `Hunting Bugs (Debug Mode)`: Visor scanner mode with diagnostic pings.
  - `Eureka! / Celebration`: Confetti bursts and celebratory fanfare.
  - `Rest / Coffee Break`: Sleepy breathing, snoring Zzz, and hydration reminders.
- **Desktop & Floating Modes**:
  - **Always-on-Top Floating Mode**: Pop out into an always-on-top window using Document Picture-in-Picture.
  - **One-Click Desktop App**: Double-click `launch-desktop.bat` for an isolated native desktop window.
  - **Electron App**: Native Electron shell with frameless title bar, Always-on-Top pin (`📌`), minimize, and close controls.
- **Procedural Web Audio & Voice**:
  - Synthesizes cute bleeps, purrs, coffee sips, and focus bells via the Web Audio API without external audio files.
  - Optional Text-to-Speech (TTS) using Web Speech API.
- **Pomodoro Focus Timer**:
  - 25m, 15m, and 5m sprint presets that coordinate companion reactions and break times.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Web / Dev Server
```bash
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) in your browser.

### 3. Run Native Desktop App
```bash
# Windows One-Click Launcher
launch-desktop.bat

# Or with Electron
npm run electron:dev
```

---

## 🛠️ Tech Stack
- **Frontend**: Vanilla JS (ES Modules), HTML5, Canvas/SVG
- **Styling**: Vanilla CSS (Cyber Dark Glassmorphism, CSS Keyframe Animations)
- **Audio**: Web Audio API (Procedural Synthesizer) & Web Speech API
- **Desktop**: Electron & MS Edge App Mode
- **Bundler / Server**: Vite

---

## 📜 License
MIT License
