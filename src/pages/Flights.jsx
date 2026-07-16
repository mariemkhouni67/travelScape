import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import FlightCard from '../components/cards/FlightCard'
import { MdFlightTakeoff } from 'react-icons/md'
import { staggerContainer } from '../utils/transitions'

export default function Flights() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [sortBy, setSortBy] = useState('price-low')
  const [maxPrice, setMaxPrice] = useState(2000)

  const { data: flights = [], loading } = useFetch('/flights')

  const filtered = useMemo(() => {
    let results = [...flights]

    if (from) {
      results = results.filter(f => f.from.toLowerCase().includes(from.toLowerCase()))
    }
    if (to) {
      results = results.filter(f => f.to.toLowerCase().includes(to.toLowerCase()))
    }
    if (date) {
      results = results.filter(f => f.departDate === date)
    }
    results = results.filter(f => f.price <= maxPrice)

    switch (sortBy) {
      case 'price-low': results.sort((a, b) => a.price - b.price); break
      case 'price-high': results.sort((a, b) => b.price - a.price); break
      case 'duration': results.sort((a, b) => a.duration.localeCompare(b.duration)); break
      default: break
    }

    return results
  }, [flights, from, to, date, sortBy, maxPrice])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#070B1A] text-surface-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4 font-heading tracking-tight">
            Search Flights
          </h1>
          <p className="text-surface-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light">
            Find the best deals on flights to destinations around the world
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 dark:bg-surface-850/80 dark:backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-surface-200 dark:border-surface-700/60 shadow-premium mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-2">From</label>
              <div className="relative">
                <MdFlightTakeoff className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Departure city"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-2">To</label>
              <div className="relative">
                <MdFlightTakeoff className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400 rotate-90" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Destination city"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field dark:[color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300">Max Price</label>
                <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400">${maxPrice}</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-100 dark:bg-surface-900 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-2">Sort</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="price-low" className="bg-white dark:bg-surface-800 text-surface-800 dark:text-white">Price: Low to High</option>
                <option value="price-high" className="bg-white dark:bg-surface-800 text-surface-800 dark:text-white">Price: High to Low</option>
                <option value="duration" className="bg-white dark:bg-surface-800 text-surface-800 dark:text-white">Shortest Duration</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-surface-500 dark:text-slate-400 mb-6 font-medium"
        >
          {filtered.length} flights found
        </motion.p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/60 p-6 space-y-4 shadow-sm animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 skeleton rounded-xl" />
                  <div className="h-5 skeleton w-1/4" />
                </div>
                <div className="flex flex-col sm:flex-row gap-6 pt-2">
                  <div className="h-6 skeleton w-1/3" />
                  <div className="h-6 skeleton w-1/4 mx-auto" />
                  <div className="h-6 skeleton w-1/3 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filtered.map((flight, i) => (
              <FlightCard key={flight._id} flight={flight} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-surface-50 dark:bg-surface-800/20 rounded-3xl border border-surface-200/40 dark:border-surface-700/60">
            <p className="text-4xl mb-4">✈️</p>
            <p className="text-xl font-bold text-surface-700 dark:text-white mb-2">No flights found</p>
            <p className="text-surface-500 dark:text-slate-400 font-light">Try different search criteria</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
