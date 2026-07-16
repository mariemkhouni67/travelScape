import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiMapPin, FiStar, FiWifi } from 'react-icons/fi'
import { MdPool, MdSpa, MdRestaurant, MdFitnessCenter, MdLocalBar } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import { springSoft } from '../../utils/transitions'
import { memo } from 'react'

const amenityIcons = {
  'Pool': MdPool,
  'Spa': MdSpa,
  'Restaurant': MdRestaurant,
  'WiFi': FiWifi,
  'Gym': MdFitnessCenter,
  'Bar': MdLocalBar,
}

const HotelCard = memo(function HotelCard({ hotel, index = 0 }) {
  const { isAuthenticated, toggleFavorite, isFavorite } = useAuth()
  const fav = isFavorite(hotel._id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.03 }}
      style={{ willChange: 'transform' }}
      className="group bg-white dark:bg-surface-800/70 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-surface-100 dark:border-surface-700/60 transition-shadow duration-300"
      {...{ transition: { ...springSoft, duration: undefined } }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 dark:bg-surface-900/90 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 shadow-sm">
          <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-surface-800 dark:text-slate-200">{hotel.rating}</span>
        </div>

        {/* Favorite button */}
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(hotel._id)
            }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-3 right-3 p-2 bg-white/95 dark:bg-surface-900/90 backdrop-blur-sm rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-white/20 dark:border-white/10"
          >
            <FiHeart
              className={`w-4 h-4 transition-colors ${
                fav ? 'fill-red-500 text-red-500' : 'text-surface-600 dark:text-slate-400'
              }`}
            />
          </button>
        )}

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-medium">
          <FiMapPin className="w-3.5 h-3.5 text-primary-400" />
          <span>{hotel.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {hotel.name}
        </h3>
        <p className="text-sm text-surface-500 dark:text-slate-300 line-clamp-2 mb-3 leading-relaxed font-light">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4 h-8 overflow-hidden">
          {hotel.amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity]
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1.2 px-2.5 py-1 bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-surface-800/60 rounded-lg text-[11px] font-medium text-surface-600 dark:text-slate-300 transition-colors"
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-primary-500" />}
                {amenity}
              </span>
            )
          })}
          {hotel.amenities.length > 3 && (
            <span className="px-2 py-1 text-[11px] font-semibold text-primary-500 dark:text-primary-400 self-center">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700/60">
          <div>
            <span className="text-xl font-bold text-surface-900 dark:text-white">${hotel.pricePerNight}</span>
            <span className="text-xs text-surface-500 dark:text-slate-400"> / night</span>
          </div>
          <Link
            to={`/hotels/${hotel._id}`}
            className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 rounded-xl shadow-md shadow-primary-500/10 hover:shadow-primary-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
})

export default HotelCard
