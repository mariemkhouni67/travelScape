import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DestinationCard from '../cards/DestinationCard'
import useFetch from '../../hooks/useFetch'
import { staggerContainer, staggerChild } from '../../utils/transitions'

export default function FeaturedDestinations() {
  const { data, loading } = useFetch('/destinations')
  const destinations = Array.isArray(data) ? data : []
  const featured = destinations.filter(d => d.featured).slice(0, 4)

  return (
    <section className="py-20 bg-white dark:bg-[#070B1A] transition-colors duration-300">
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
            Top Picks
          </motion.span>
          <motion.h2 variants={staggerChild} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-900 dark:text-white mb-4 font-heading tracking-tight">
            Featured Destinations
          </motion.h2>
          <motion.p variants={staggerChild} className="text-surface-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Handpicked destinations that offer unforgettable experiences and breathtaking views
          </motion.p>
        </motion.div>

        {/* Cards Grid / Skeleton loaders */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/60 p-5 space-y-4">
                <div className="aspect-[4/3] skeleton w-full" />
                <div className="h-6 skeleton w-3/4" />
                <div className="h-4 skeleton w-full" />
                <div className="h-4 skeleton w-5/6" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 skeleton w-1/3" />
                  <div className="h-8 skeleton w-1/4 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-10 text-surface-500 dark:text-slate-400">
            No featured destinations available.
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featured.map((dest, index) => (
              <DestinationCard key={dest._id} destination={dest} index={index} />
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
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-650 dark:text-primary-400 border-2 border-primary-500/20 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-all duration-200"
          >
            View All Destinations →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
