import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { FiStar, FiMapPin, FiHeart, FiChevronLeft, FiChevronRight, FiWifi, FiCheck } from 'react-icons/fi'
import { MdPool, MdSpa, MdRestaurant, MdFitnessCenter, MdLocalBar } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import ReviewList from '../components/reviews/ReviewList'
import ReviewForm from '../components/reviews/ReviewForm'
import { fadeIn, springSoft, springSnappy } from '../utils/transitions'

const amenityIcons = {
  'Pool': MdPool, 'Spa': MdSpa, 'Restaurant': MdRestaurant, 'WiFi': FiWifi,
  'Gym': MdFitnessCenter, 'Bar': MdLocalBar, 'Heated Pool': MdPool,
}

export default function HotelDetail() {
  const { id } = useParams()
  const { isAuthenticated, toggleFavorite, isFavorite } = useAuth()
  
  const { data: hotel, loading } = useFetch(`/hotels/${id}`)
  
  const [currentImg, setCurrentImg] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState(null)

  if (loading) return <div className="min-h-screen pt-24 text-center text-surface-500 dark:text-slate-400">Loading hotel details...</div>

  if (!hotel) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-white dark:bg-[#070B1A] transition-colors duration-300">
        <div className="text-center">
          <p className="text-6xl mb-4">🏨</p>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Hotel not found</h2>
          <Link to="/hotels" className="text-primary-500 hover:underline">← Back to hotels</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white dark:bg-[#070B1A] text-surface-900 dark:text-white transition-colors duration-300">
      {/* Image Gallery */}
      <div className="relative h-[45vh] sm:h-[55vh] overflow-hidden">
        <motion.img
          key={currentImg}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          src={hotel.images[currentImg]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] via-transparent to-black/35" />

        {hotel.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImg(p => p === 0 ? hotel.images.length - 1 : p - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors cursor-pointer"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentImg(p => p === hotel.images.length - 1 ? 0 : p + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors cursor-pointer"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiMapPin className="w-4 h-4 text-white/80" />
                <span className="text-white/85 text-sm font-medium">{hotel.location}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 font-heading tracking-tight">{hotel.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white/95 dark:bg-surface-900/90 px-2.5 py-1 rounded-xl shadow-sm border border-white/10">
                  <FiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-surface-900 dark:text-white text-sm font-bold">{hotel.rating}</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-white/90 text-sm">From <span className="text-2xl font-bold text-white">${hotel.pricePerNight}</span> / night</span>
              </div>
            </div>
            {isAuthenticated && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={springSnappy}
                onClick={() => toggleFavorite(hotel._id)}
                className="p-3.5 bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-full transition-colors cursor-pointer self-start sm:self-auto border border-white/10"
              >
                <FiHeart className={`w-6 h-6 ${isFavorite(hotel._id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 font-heading">About</h2>
              <p className="text-surface-600 dark:text-slate-300 leading-relaxed font-light">{hotel.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 font-heading">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map(am => {
                  const Icon = amenityIcons[am] || FiCheck
                  return (
                    <div key={am} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-850/60 border border-surface-200/40 dark:border-surface-700/60 rounded-xl">
                      <Icon className="w-5 h-5 text-primary-500" />
                      <span className="text-sm font-medium text-surface-700 dark:text-slate-200">{am}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Room Types */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 font-heading">Room Types</h2>
              <div className="space-y-3">
                {hotel.rooms.map((room, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedRoom(i)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRoom === i
                        ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-500/10'
                        : 'border-surface-200 dark:border-surface-700/60 hover:border-surface-300 dark:hover:border-surface-600 bg-white dark:bg-surface-850/40'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-surface-900 dark:text-white">{room.type}</p>
                      <p className="text-sm text-surface-500 dark:text-slate-400 font-light mt-0.5">Up to {room.capacity} guests</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-surface-900 dark:text-white">${room.price}</p>
                      <p className="text-xs text-surface-500 dark:text-slate-455 font-light">per night</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 font-heading">
                Guest Reviews
              </h2>
              <div className="space-y-8">
                {isAuthenticated && <ReviewForm targetId={hotel._id} targetType="hotel" />}
                <ReviewList targetId={hotel._id} />
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 bg-white dark:bg-surface-850/80 dark:backdrop-blur-xl rounded-2xl p-6 border border-surface-200 dark:border-surface-700/60 shadow-premium"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-extrabold text-surface-900 dark:text-white">
                    ${selectedRoom !== null ? hotel.rooms[selectedRoom].price : hotel.pricePerNight}
                  </span>
                  <span className="text-surface-500 dark:text-slate-400 text-sm"> / night</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <FiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-amber-550 dark:text-amber-400">{hotel.rating}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Check-in</label>
                  <input type="date" className="input-field dark:[color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Check-out</label>
                  <input type="date" className="input-field dark:[color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Guests</label>
                  <select className="input-field">
                    {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-white dark:bg-surface-800 text-surface-900 dark:text-white"> {n} Guest{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
              </div>

              <Link to={`/booking/hotel/${hotel._id}`}>
                <Button className="w-full font-bold" size="lg">
                  Book Now
                </Button>
              </Link>

              <p className="text-xs text-surface-500 dark:text-slate-400 text-center mt-3 font-light">You won't be charged yet</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
