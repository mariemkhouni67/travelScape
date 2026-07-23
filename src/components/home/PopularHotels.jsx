import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HotelCard from '../cards/HotelCard'
import useFetch from '../../hooks/useFetch'
import { staggerContainer, staggerChild } from '../../utils/transitions'

export default function PopularHotels() {
  const { data: hotels = [], loading } = useFetch('/hotels')
  const popular = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <section className="py-20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={staggerChild} className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-500/10 border border-primary-100/50 dark:border-primary-500/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse-soft" />
            Where to Stay
          </motion.span>
          <motion.h2 variants={staggerChild} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-900 dark:text-white mb-4 font-heading tracking-tight">
            Popular Hotels
          </motion.h2>
          <motion.p variants={staggerChild} className="text-surface-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Luxury accommodations handpicked for comfort, location, and unforgettable experiences
          </motion.p>
        </motion.div>

        {/* Cards Grid / Skeleton loaders */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/60 p-5 space-y-4">
                <div className="aspect-[4/3] skeleton w-full" />
                <div className="h-6 skeleton w-3/4" />
                <div className="h-4 skeleton w-full" />
                <div className="flex gap-2">
                  <div className="h-5 skeleton w-1/4 rounded-lg" />
                  <div className="h-5 skeleton w-1/4 rounded-lg" />
                  <div className="h-5 skeleton w-1/4 rounded-lg" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-surface-100 dark:border-surface-700/80">
                  <div className="h-6 skeleton w-1/3" />
                  <div className="h-10 skeleton w-1/3 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : popular.length === 0 ? (
          <div className="text-center py-10 text-surface-500 dark:text-slate-400">
            No popular hotels available.
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {popular.map((hotel, index) => (
              <HotelCard key={hotel._id} hotel={hotel} index={index} />
            ))}
          </motion.div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-650 dark:text-primary-400 border-2 border-primary-500/20 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-all duration-200"
          >
            View All Hotels →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
