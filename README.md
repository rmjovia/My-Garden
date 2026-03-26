# My Garden - Uganda Extension Service 🌾

**My Garden** is a mobile-first, WhatsApp-styled web application designed to serve as a digital agricultural extension service. It empowers farmers with AI-driven advice, yield optimization strategies, and crop monitoring tools to improve their agricultural productivity.

## 🎯 Who is this for?
- **Smallholder Farmers:** Specifically tailored for farmers in Uganda (and similar agricultural regions) looking for accessible, easy-to-understand farming advice.
- **Agricultural Extension Workers:** A tool to help extension officers track and provide better advice to the farmers they support.
- **Agronomists & Hobbyist Gardeners:** Anyone looking to optimize their crop yield and track their planting seasons.

## ✨ Key Features

The application is designed with a familiar, WhatsApp-like interface to ensure low friction and high accessibility for users who are already accustomed to popular messaging apps.

- **🌱 Farm Profile Management:** Users can set up their farm profile, including region, land size, crop type, irrigation methods, and planting dates.
- **💬 Get Advice:** An interactive chat interface where farmers can ask questions and get tailored agricultural advice.
- **📈 Yield Optimizer:** Tools and recommendations to help maximize crop output based on the specific farm profile.
- **📊 Growth Monitor:** Track the growth stages of crops from planting to harvest.
- **📅 Season Calendar:** A visual calendar to help plan planting, fertilizing, and harvesting activities.
- **🕰️ History:** Easily access past advice and chat logs for future reference.
- **🌓 Dark/Light Mode:** Full support for system, light, and dark themes to save battery and improve visibility in the field.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (configured with custom WhatsApp-style color themes)
- **Icons:** Lucide React
- **State Management:** React Hooks (`useState`, `useEffect`) with LocalStorage persistence.

## 🚀 Getting Started

To run this project locally on your machine:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/my-garden-app.git
   cd my-garden-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Navigate to `http://localhost:3000` (or the port provided in your terminal).

## 📁 Project Structure

```text
src/
├── components/          # Individual UI tabs and components
│   ├── GetAdviceTab.tsx
│   ├── GrowthMonitorTab.tsx
│   ├── HistoryTab.tsx
│   ├── HomeTab.tsx
│   ├── SeasonCalendarTab.tsx
│   ├── SettingsTab.tsx
│   └── YieldOptimizerTab.tsx
├── App.tsx              # Main application layout and routing
├── index.css            # Global Tailwind styles
├── main.tsx             # React entry point
└── types.ts             # TypeScript interfaces (FarmProfile, Message, etc.)
```

## 💡 Future Enhancements (Roadmap)
- **Offline Mode (PWA):** Implement Service Workers so farmers can access their calendar and past advice without an internet connection.
- **Local Language Support:** Add internationalization (i18n) to support local languages like Luganda, Swahili, etc.
- **Weather API Integration:** Fetch real-time weather data based on the user's region to provide proactive alerts.
- **Market Prices:** Integrate a feed of current market prices for various crops.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
