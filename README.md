<div align="center">

# 🎮 Tilt Maze

**A tilt-controlled maze game built with Ionic React + Capacitor**
Scores are stored and retrieved live via Firebase Realtime Database.

![Platform](https://img.shields.io/badge/platform-iOS-black?logo=apple)
![Framework](https://img.shields.io/badge/framework-Ionic%20React-3880FF?logo=ionic)
![Backend](https://img.shields.io/badge/backend-Firebase-FFCA28?logo=firebase)

</div>

---

## 📖 About

Tilt your phone to steer a ball around a field of obstacles and a perimeter wall — survive as long as you can. When you crash, your score is submitted to a live leaderboard backed by Firebase.

- 🕹️ **Start screen** — requests motion permission, launches the game or leaderboard
- 🎯 **Game screen** — canvas-based physics loop, tilt or arrow-key controls
- 🏆 **Leaderboard** — top scores pulled live via Firebase's REST API

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aidanpietruszka/CS4261ProgrammingAssignment.git
```

### 2. Move into the project root
```bash
cd [REPO FOLDER NAME]
```

### 3. Install dependencies
```bash
npm install
```

### 4. Set up your environment variables

Create a `.env` file in the project root (same level as `package.json`):

> 💡 See `.env.example` for the required fields. The real .env file is in the assignment PDF!

### 5. Build the app
```bash
ionic build
```

### 6. Run it locally
```bash
ionic serve
```

Opens at **`http://localhost:8100`**. Browsers don't have an accelerometer, so use the **arrow keys** to steer instead of tilting. 🖥️

---

## 📱 Running on an iOS Device

To test real tilt controls, the app needs to run on a **physical iPhone** (not the browser or a simulator):

```bash
npx cap add ios
npx cap sync ios
npx cap open ios
```

Then in Xcode:
1. Select your connected iPhone as the run target
2. Sign the app with your Apple ID under **Signing & Capabilities**
3. Press **▶** to build and install

> ⚠️ On first launch, you'll need to trust the developer certificate on your iPhone under **Settings → General → VPN & Device Management**.

---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Framework | Ionic React |
| Native bridge | Capacitor |
| Backend | Firebase Realtime Database |
| Build tool | Vite |
