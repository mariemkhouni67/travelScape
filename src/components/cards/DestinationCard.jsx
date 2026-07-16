import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiMapPin, FiStar } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { memo } from 'react'

const DestinationCard = memo(function DestinationCard({ destination, index = 0 }) {
  const { isAuthenticated, toggleFavorite, isFavorite } = useAuth()
  const fav = isFavorite(destination._id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group bg-white dark:bg-surface-800/40 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-surface-100 dark:border-surface-700/80 transition-all duration-300 backdrop-blur-xl"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.images[0]}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Price badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 dark:bg-surface-900/90 backdrop-blur-md rounded-xl text-sm font-bold text-primary-600 dark:text-primary-400 border border-white/20 dark:border-white/10 shadow-sm">
          From ${destination.price}
        </div>

        {/* Favorite button */}
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(destination._id)
            }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-4 right-4 p-2 bg-white/95 dark:bg-surface-900/90 backdrop-blur-md rounded-full hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-white/20 dark:border-white/10"
          >
            <FiHeart
              className={`w-4 h-4 transition-colors ${
                fav ? 'fill-red-500 text-red-500' : 'text-surface-600 dark:text-slate-400'
              }`}
            />
          </button>
        )}

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm font-medium">
          <FiMapPin className="w-3.5 h-3.5 text-primary-400" />
          <span>{destination.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {destination.name}
        </h3>
        <p className="text-sm text-surface-500 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed font-light">
          {destination.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-surface-800 dark:text-slate-200">{destination.avgRating}</span>
          </div>
          <Link
            to={`/destinations/${destination._id}`}
            className="px-4 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            Explore →
          </Link>
        </div>
      </div>
    </motion.div>
  )
})

export default DestinationCard
