# Travel Booking Website — Project Plan

## 1. Project Overview

**Type:** Full-stack MERN travel booking platform

**Core idea:** Users browse destinations, search/filter hotels & flights, book them, save favorites, manage a profile — with an admin dashboard to manage listings and bookings.

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React (Vite) | UI |
| Styling | Tailwind CSS | Design system, dark/light mode |
| Animation | Framer Motion | Page transitions, hover, scroll, parallax |
| Backend | Node.js + Express | REST API |
| Database | MongoDB (Mongoose) | Data storage |
| Auth | JWT + bcrypt | Login/Register, protected routes |
| Media | Cloudinary | Image uploads (destinations, hotels, avatars) |
| State | Context API or Zustand | Auth state, theme, favorites |
| Deployment | Vercel (frontend) + Render/Railway (backend) + MongoDB Atlas | Hosting |

---

## 3. Pages & Routes

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| Destinations | `/destinations` | Public |
| Destination Detail | `/destinations/:id` | Public |
| Hotels | `/hotels` | Public |
| Hotel Detail | `/hotels/:id` | Public |
| Flights | `/flights` | Public |
| Booking (checkout) | `/booking/:type/:id` | Protected |
| Favorites | `/favorites` | Protected |
| Profile | `/profile` | Protected |
| Login / Register | `/login`, `/register` | Public |
| Contact | `/contact` | Public |
| Admin Dashboard | `/admin` | Admin only |
| 404 | `*` | Public |

---

## 4. Feature Breakdown

### Auth & User
- Register/Login with JWT, bcrypt password hashing
- Protected routes via auth middleware (backend) + `PrivateRoute` wrapper (frontend)
- Roles: `user` / `admin`

### Search & Discovery
- Search bar (destination/hotel/flight)
- Filters: price range, rating, dates, location, amenities
- Sort: price, rating, popularity

### Booking
- Multi-step booking flow (select dates/guests → review → confirm)
- Booking history in Profile page
- Status tracking: pending / confirmed / cancelled

### Favorites / Wishlist
- Heart icon toggle on cards, synced to user account (persisted in DB, not just local state)

### Reviews
- Star rating + comment per hotel/destination, tied to user

### Admin Dashboard
- CRUD for destinations, hotels, flights
- View/manage all bookings and users
- Image upload via Cloudinary

### Dark / Light Mode
- Tailwind `dark:` classes
- Toggle stored in `localStorage` + Context

### Animations (Framer Motion)
- **Hero section** — fade/slide-in on load
- **Cards** — hover lift + shadow
- **Page transitions** — fade/slide between routes
- **Scroll animations** — reveal-on-scroll for sections
- **Loading states** — skeleton loaders / spinners
- **Image sliders** — hero and hotel gallery carousels
- **Animated counters** — e.g. "500+ Destinations" stats
- **Parallax** — background images on Home / Destination detail

---

## 5. Folder Structure

```
travel-booking-app/
├── client/                        # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/            # Navbar, Footer, Button, Loader
│   │   │   ├── home/               # Hero, StatsCounter, FeaturedDestinations
│   │   │   ├── cards/              # DestinationCard, HotelCard, FlightCard
│   │   │   ├── booking/            # BookingForm, BookingSteps
│   │   │   └── admin/              # AdminTable, AdminSidebar
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Destinations.jsx
│   │   │   ├── DestinationDetail.jsx
│   │   │   ├── Hotels.jsx
│   │   │   ├── HotelDetail.jsx
│   │   │   ├── Flights.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/Dashboard.jsx
│   │   ├── context/                # AuthContext, ThemeContext
│   │   ├── hooks/                  # useAuth, useFetch, useDebounce
│   │   ├── services/               # api.js (axios instance), authService, bookingService
│   │   ├── routes/                 # PrivateRoute.jsx, AdminRoute.jsx
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                        # Node/Express backend
│   ├── src/
│   │   ├── config/                 # db.js, cloudinary.js
│   │   ├── models/                 # User, Destination, Hotel, Flight, Booking, Review
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/              # auth.js, adminOnly.js, errorHandler.js
│   │   ├── utils/                   # generateToken.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 6. Database Schema (MongoDB)

| Model | Fields |
|---|---|
| **User** | name, email, password (hashed), role, avatar, favorites[], createdAt |
| **Destination** | name, description, images[], location, avgRating, price |
| **Hotel** | name, destinationId, description, images[], amenities[], pricePerNight, rating, rooms[] |
| **Flight** | airline, from, to, departDate, returnDate, price, seatsAvailable |
| **Booking** | userId, type (hotel/flight), refId, dates, guests, status, totalPrice, createdAt |
| **Review** | userId, targetId, targetType, rating, comment, createdAt |

---

## 7. Key API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/destinations
GET    /api/destinations/:id

GET    /api/hotels?search=&minPrice=&maxPrice=&rating=
GET    /api/flights?from=&to=&date=

POST   /api/bookings              (protected)
GET    /api/bookings/me           (protected)

PUT    /api/users/favorites/:id   (protected)
POST   /api/reviews               (protected)

GET/POST/PUT/DELETE /api/admin/*  (admin only)
```

---

## 8. Development Phases

1. **Setup** — Init client/server, Tailwind config, MongoDB Atlas connection, folder scaffolding
2. **Auth** — Register/login, JWT middleware, protected routes, dark mode toggle
3. **Core pages (static/UI)** — Home, Destinations, Hotels, Flights with mock data + animations
4. **Backend models/API** — Build all models & endpoints, connect frontend to real data
5. **Booking flow** — Multi-step booking, save to DB, show in Profile
6. **Favorites & Reviews** — Wire up wishlist and rating system
7. **Admin dashboard** — CRUD UI + Cloudinary image uploads
8. **Polish** — Loading states, error handling, responsive QA, Framer Motion pass, deploy
