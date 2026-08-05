<p align="center">
  <img src="public/favicon.svg" alt="TravelScape Logo" width="80" />
</p>

<h1 align="center">✈️ TravelScape</h1>

<p align="center">
  <strong>Next-Generation Luxury Travel Discovery & Booking Platform</strong>
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-4.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" /></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-12.4-FF0050?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-8.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## 🌟 Overview

**TravelScape** is a full-stack MERN luxury travel platform built for 2026. It combines a photorealistic 3D animated hero, glassmorphic UI, interactive Leaflet maps, a multi-language chatbot, and a complete booking engine — inspired by Booking.com, Airbnb, and Google Travel.

Users can browse destinations, search & filter hotels and flights, book trips, manage favorites, and write reviews. An admin dashboard provides full CRUD management over all listings and bookings.

---

## ✨ Features

### 🚁 3D Airplane Hero & Cinematic Slideshow
- Real-time pitch, roll, and yaw banking for a Boeing 787 / Airbus A350 airliner model
- Twin-engine contrail particle emitter, engine heat shimmer, velocity motion blur
- Auto-advancing destination slideshow (Prague, Berlin, Paris, Madrid, Milan) with Ken Burns zoom and crossfades

### 🧭 Mega Menu Navigation
- **8 travel categories**: Flights, Hotels, Car Rental, Train Tickets, Attractions, Airport Taxi, Destinations, Contact
- Floating glassmorphic dropdown panels with categorized sub-options and promo banners
- Fully responsive mobile drawer with collapsible accordion navigation

### 🧳 All-in-One Search & Booking
| Module | Highlights |
|---|---|
| **Flights** | Round trip / One way / Multi-city with direct flight toggle |
| **Hotels** | Breakfast, cancellation, pet filters & guest/room counters |
| **Car Rental** | Economy, SUV, Luxury, EV with keyless airport pickup |
| **Train Tickets** | High-speed, cross-border, and Eurail passes |
| **Attractions** | Museum tickets, tours, cruises, skip-the-line passes |
| **Airport Taxi** | Fixed fare transfers with flight delay tracking |

### 🌍 Interactive Destination Map
- Leaflet-powered map with custom animated markers
- Curved SVG travel route with glowing waypoint dot animation
- Horizontal destination strips with handwritten script typography (Google Fonts: `Satisfy` & `Caveat`)

### 💎 Glassmorphism Design System
- Semi-transparent cards with `backdrop-blur-2xl` and floating glow effects
- Dark & Light mode toggle persisted in `localStorage`
- Smooth Framer Motion page transitions, hover lifts, scroll reveals, parallax effects

### 🤖 AI Chatbot Assistant
- Built-in travel assistant chatbot with smart conversation UI
- Helps users find destinations, compare prices, and answer travel questions

### 🌐 Internationalization (i18n)
- Full multi-language support: **English, French, Spanish, German, Italian, Arabic**
- Language switcher with automatic browser detection via `i18next`

### 🔐 Authentication & Authorization
- JWT-based register/login with bcrypt password hashing
- Protected routes for bookings, favorites, and profile
- Role-based access: `user` / `admin`

### 📊 Admin Dashboard
- CRUD management for destinations, hotels, and flights
- Booking and user management interface
- Cloudinary-powered image uploads

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [TailwindCSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion 12](https://www.framer.com/motion/) | Animations & page transitions |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Zustand](https://github.com/pmndrs/zustand) | Lightweight state management |
| [Axios](https://axios-http.com/) | HTTP client |
| [React Icons](https://react-icons.github.io/react-icons/) | Feather & Material icon sets |
| [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) | Interactive maps |
| [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) | Internationalization |

### Backend

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) + [Express 4](https://expressjs.com/) | REST API server |
| [MongoDB](https://www.mongodb.com/) + [Mongoose 8](https://mongoosejs.com/) | Database & ODM |
| [JWT](https://jwt.io/) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Authentication |
| [Cloudinary](https://cloudinary.com/) + [Multer](https://github.com/expressjs/multer) | Image uploads |
| [Helmet](https://helmetjs.github.io/) | Security headers |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | Rate limiting |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18.0.0** or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (local) or [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/mariemkhouni67/travelScape.git
cd travelScape
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Run the Application

**Start the backend** (from `server/`):
```bash
npm run dev
```

**Start the frontend** (from project root):
```bash
npm run dev
```

Open your browser at **`http://localhost:5173`**

### 6. Build for Production

```bash
npm run build
```

The production bundle is generated in the `dist/` directory.

---

## 📁 Project Structure

```
travelScape/
├── public/                         # Static assets
│   ├── images/                     # Hero & destination images
│   ├── locales/                    # i18n translations (ar, de, en, es, fr, it)
│   ├── videos/                     # Background videos
│   ├── dreamliner_jet.png          # 3D airplane model asset
│   └── favicon.svg                 # App favicon
│
├── src/                            # React frontend source
│   ├── components/
│   │   ├── admin/                  # AdminTable, AdminSidebar, AdminForm
│   │   ├── booking/                # BookingForm, BookingSteps
│   │   ├── cards/                  # DestinationCard, HotelCard, FlightCard
│   │   ├── common/                 # Navbar, Footer, ChatBot, Loader, ThemeToggle,
│   │   │                           # LanguageSwitcher, SearchBar, TravelStripBackground
│   │   ├── home/                   # Hero, AirplaneAnimation, BookingSearchSystem,
│   │   │                           # ExploreMap, FeaturedDestinations, PopularHotels,
│   │   │                           # StatsCounter, Newsletter
│   │   └── reviews/                # ReviewForm, ReviewList
│   │
│   ├── context/                    # AuthContext, ThemeContext
│   ├── data/                       # Mock data (destinations, hotels)
│   ├── hooks/                      # useDebounce, useFetch
│   ├── pages/                      # All page routes
│   │   ├── admin/                  # Dashboard.jsx
│   │   ├── Home.jsx, Hotels.jsx, Flights.jsx, Destinations.jsx,
│   │   │   CarRental.jsx, TrainTickets.jsx, Attractions.jsx,
│   │   │   AirportTaxi.jsx, Contact.jsx, Booking.jsx,
│   │   │   Favorites.jsx, Profile.jsx, Login.jsx, Register.jsx,
│   │   │   HotelDetail.jsx, DestinationDetail.jsx,
│   │   │   ComingSoon.jsx, NotFound.jsx
│   │   └──
│   ├── routes/                     # PrivateRoute, AdminRoute
│   ├── services/                   # api.js, authService, bookingService
│   ├── utils/                      # Transition presets & helpers
│   ├── App.jsx                     # Root component with route definitions
│   ├── main.jsx                    # React DOM entry point
│   ├── i18n.js                     # i18next configuration
│   └── index.css                   # TailwindCSS imports & global styles
│
├── server/                         # Express backend
│   └── src/
│       ├── config/                 # Database & Cloudinary config
│       ├── controllers/            # Auth, booking, hotel, flight, destination,
│       │                           # review, user, admin controllers
│       ├── middleware/              # auth.js, adminOnly.js, errorHandler.js
│       ├── models/                 # User, Destination, Hotel, Flight, Booking, Review
│       ├── routes/                 # All API route definitions
│       ├── utils/                  # Token generation & helpers
│       └── server.js               # Express app entry point
│
├── package.json                    # Frontend dependencies & scripts
├── vite.config.js                  # Vite configuration
└── README.md
```

---

## 🔌 API Reference

### Authentication
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login & receive JWT token | Public |

### Destinations
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/destinations` | List all destinations | Public |
| `GET` | `/api/destinations/:id` | Get destination details | Public |

### Hotels
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/hotels` | Search/filter hotels (`?search=&minPrice=&maxPrice=&rating=`) | Public |
| `GET` | `/api/hotels/:id` | Get hotel details | Public |

### Flights
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/flights` | Search flights (`?from=&to=&date=`) | Public |

### Bookings
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/bookings` | Create a new booking | Protected |
| `GET` | `/api/bookings/me` | Get user's bookings | Protected |

### Users
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `PUT` | `/api/users/favorites/:id` | Toggle favorite | Protected |

### Reviews
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/reviews` | Submit a review | Protected |

### Admin
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET/POST/PUT/DELETE` | `/api/admin/*` | Full CRUD for all entities | Admin only |

---

## 🗄️ Database Schema

| Model | Key Fields |
|---|---|
| **User** | `name`, `email`, `password` (hashed), `role`, `avatar`, `favorites[]`, `createdAt` |
| **Destination** | `name`, `description`, `images[]`, `location`, `avgRating`, `price` |
| **Hotel** | `name`, `destinationId`, `description`, `images[]`, `amenities[]`, `pricePerNight`, `rating`, `rooms[]` |
| **Flight** | `airline`, `from`, `to`, `departDate`, `returnDate`, `price`, `seatsAvailable` |
| **Booking** | `userId`, `type` (hotel/flight), `refId`, `dates`, `guests`, `status`, `totalPrice`, `createdAt` |
| **Review** | `userId`, `targetId`, `targetType`, `rating`, `comment`, `createdAt` |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting, no code change |
| `refactor:` | Code refactoring |
| `perf:` | Performance improvement |
| `test:` | Adding tests |
| `chore:` | Maintenance tasks |

---

## 🗺️ Roadmap

- [ ] Payment integration (Stripe)
- [ ] Email notifications & booking confirmations
- [ ] Real-time flight tracking API
- [ ] PWA support & offline mode
- [ ] User avatar upload on profile
- [ ] Advanced search with AI recommendations
- [ ] Unit & integration test suite

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Mariem Khouni** — [@mariemkhouni67](https://github.com/mariemkhouni67)

---

<p align="center">
  Made with ❤️ and ☕ — <strong>TravelScape 2026</strong>
</p>
