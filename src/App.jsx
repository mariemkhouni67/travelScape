import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ChatBot from './components/common/ChatBot'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'

// Pages
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Hotels from './pages/Hotels'
import HotelDetail from './pages/HotelDetail'
import Flights from './pages/Flights'
import CarRental from './pages/CarRental'
import TrainTickets from './pages/TrainTickets'
import Attractions from './pages/Attractions'
import AirportTaxi from './pages/AirportTaxi'
import ComingSoon from './pages/ComingSoon'
import Booking from './pages/Booking'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Dashboard from './pages/admin/Dashboard'

import TravelStripBackground from './components/common/TravelStripBackground'

function App() {
  const location = useLocation()
  const showBg = !location.pathname.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#050816] text-surface-900 dark:text-white transition-colors duration-300 relative overflow-hidden travel-strip-bg-active">
      {showBg && <TravelStripBackground />}
      <Navbar />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* Core Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/cars" element={<CarRental />} />
            <Route path="/trains" element={<TrainTickets />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/taxis" element={<AirportTaxi />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Footer / Informational Routes */}
            <Route path="/about" element={<ComingSoon />} />
            <Route path="/careers" element={<ComingSoon />} />
            <Route path="/press" element={<ComingSoon />} />
            <Route path="/help" element={<ComingSoon />} />
            <Route path="/cancellation" element={<ComingSoon />} />
            <Route path="/safety" element={<ComingSoon />} />
            <Route path="/terms" element={<ComingSoon />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/booking/:type/:id" element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            } />
            <Route path="/favorites" element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  )
}

export default App
