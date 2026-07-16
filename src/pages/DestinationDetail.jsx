import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import HotelCard from '../components/cards/HotelCard'
import { FiStar, FiMapPin, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import ReviewList from '../components/reviews/ReviewList'
import ReviewForm from '../components/reviews/ReviewForm'

export default function DestinationDetail() {
  const { id } = useParams()
  const [currentImg, setCurrentImg] = useState(0)
  const { isAuthenticated, toggleFavorite, isFavorite } = useAuth()
  
  const { data: destination, loading } = useFetch(`/destinations/${id}`)
  const { data: destHotels = [] } = useFetch(`/hotels?destinationId=${id}`)

  if (loading) return <div className="min-h-screen pt-24 text-center">Loading destination...</div>

  if (!destination) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🌍</p>
          <h2 className="text-2xl font-bold text-surface-900 mb-2">Destination not found</h2>
          <Link to="/destinations" className="text-primary-500 hover:underline">← Back to destinations</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Image Gallery */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <motion.img
          key={currentImg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={destination.images[currentImg]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Gallery navigation */}
        {destination.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImg(prev => prev === 0 ? destination.images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentImg(prev => prev === destination.images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiMapPin className="w-4 h-4 text-white/80" />
                  <span className="text-white/80 text-sm">{destination.location}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 font-heading">{destination.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FiStar className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-white font-semibold">{destination.avgRating}</span>
                  </div>
                  <span className="text-white/60">•</span>
                  <span className="text-white/80">From <span className="text-2xl font-bold text-white">${destination.price}</span></span>
                </div>
              </div>
              {isAuthenticated && (
                <button
                  onClick={() => toggleFavorite(destination._id)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <FiHeart className={`w-6 h-6 ${isFavorite(destination._id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-surface-900 mb-4">About this destination</h2>
          <p className="text-surface-600 leading-relaxed text-lg">{destination.description}</p>
        </motion.div>

        {/* Hotels in area */}
        {destHotels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-surface-900 mb-6">Hotels in {destination.name.split(',')[0]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destHotels.map((hotel, i) => (
                <HotelCard key={hotel._id} hotel={hotel} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-surface-900 mb-6">Traveler Reviews</h2>
          <div className="space-y-8">
            {isAuthenticated && <ReviewForm targetId={destination._id} targetType="destination" />}
            <ReviewList targetId={destination._id} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
