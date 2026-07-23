# ✈️ TravelScape — Next-Generation Luxury Travel Platform

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-purple?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**TravelScape** is a 2026 ultra-luxury, all-in-one travel discovery & booking application built with React 19, Vite, TailwindCSS, and Framer Motion. Inspired by industry leaders like Booking.com, Airbnb, and Google Travel, TravelScape delivers micro-animations, glassmorphic UI elements, interactive Leaflet maps, and a 3D animated airliner experience.

---

## ✨ Features & Highlights

### 🚁 1. Photorealistic 3D Airplane Hero & Slideshow
- **3D Flight Path Dynamics**: Real-time calculated pitch, roll, and yaw banking curves for a commercial Boeing 787 / Airbus A350 airliner model.
- **Visual FX**: Twin-engine contrail particle emitter, engine heat shimmer, height-aware soft shadow, and velocity motion blur.
- **Cinematic Slideshow Background**: Auto-advancing destination slideshow (Prague, Berlin, Paris, Madrid, Milan) with Ken Burns zoom, smooth crossfades, and preloaded images.

### 🧭 2. Mega Menu Navigation System
- **8 Core Categories**: Flights, Hotels, Car Rental, Train Tickets, Attractions & Activities, Airport Taxi, Destinations, and Contact.
- **Floating Glass Dropdowns**: Semi-transparent backdrop blur panels featuring categorized sub-options, custom icons, micro-hover interactions, and featured promo banners.
- **Mobile Responsive Drawer**: Collapsible accordion navigation for all travel categories on mobile screens.

### 🧳 3. All-in-One Search & Booking Modules
- **Flights**: Round trip / One way / Multi-city autocomplete with direct flight toggles.
- **Hotels**: Stay options, breakfast/cancellation/pets filters, and guest/room counters.
- **Car Rental**: Economy, SUV, Luxury, Electric Vehicles (EV) with keyless airport pickup.
- **Train Tickets**: High-speed trains, international cross-border routes, and Eurail passes.
- **Attractions & Activities**: Museum tickets, tours, cruises, and skip-the-line instant passes.
- **Airport Taxis**: Fixed fare transfers with automatic flight delay tracking.
- **Interactive Calendar & Traveler Selector**: Dual-month popover grid and adult/child/cabin class selectors.

### 🌍 4. Global Animated Travel Path Background
- **Horizontal Destination Strips**: Prague, Berlin, Paris, Madrid, Milan.
- **Curved SVG Travel Route**: Dynamic line-drawing animation with a glowing travel dot waypoint.
- **Script Typography**: Elegant handwritten city labels powered by Google Fonts (`Satisfy` & `Caveat`).

### 💎 5. Glassmorphism Design System
- Semi-transparent cards (`backdrop-blur-2xl`), floating glow effects, and modern color palettes.
- Integrated Dark & Light mode theme toggle.
- Interactive Leaflet destination map with custom markers.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [React Icons (Feather & Material)](https://react-icons.github.io/react-icons/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) installed on your machine.

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Travel-Booking.git
   cd Travel-Booking
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
Travel-Booking/
├── public/                  # Static assets (images, 3D jet PNG, icons)
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components (Navbar, Footer, TravelStripBackground, ThemeToggle)
│   │   ├── home/            # Home components (Hero, BookingSearchSystem, AirplaneAnimation, ExploreMap, etc.)
│   ├── context/             # Auth Context & Theme Context
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Application page routes (Home, Destinations, Hotels, Flights, etc.)
│   ├── utils/               # Helper utilities & transition presets
│   ├── App.jsx              # Main App entry with route definitions
│   ├── main.jsx             # React DOM root entry
│   └── index.css            # TailwindCSS imports & global styling
├── package.json
└── README.md
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
