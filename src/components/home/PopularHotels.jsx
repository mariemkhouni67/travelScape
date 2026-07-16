import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HotelCard from '../cards/HotelCard'
import useFetch from '../../hooks/useFetch'

export default function PopularHotels() {
  const { data: hotels = [], loading } = useFetch('/hotels')
  const popular = hotels.sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <section className="py-20 bg-surface-50 dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-500/10 border border-primary-100/50 dark:border-primary-500/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse-soft" />
            Where to Stay
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-900 dark:text-white mb-4 font-heading tracking-tight">
            Popular Hotels
          </h2>
          <p className="text-surface-500 dark:text-[#94A3B8] max-w-2xl mx-auto text-base sm:text-lg">
            Luxury accommodations handpicked for comfort, location, and unforgettable experiences
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-10">Loading hotels...</div>
          ) : (
            popular.map((hotel, index) => (
              <HotelCard key={hotel._id} hotel={hotel} index={index} />
            ))
          )}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-600 dark:text-primary-400 border-2 border-primary-500/30 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-all duration-200"
          >
            View All Hotels →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
