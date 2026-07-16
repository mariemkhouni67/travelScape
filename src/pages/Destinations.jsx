import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import DestinationCard from '../components/cards/DestinationCard'
import SearchBar from '../components/common/SearchBar'
import useDebounce from '../hooks/useDebounce'
import { FiSliders } from 'react-icons/fi'
import { staggerContainer, staggerChild } from '../utils/transitions'

export default function Destinations() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const debouncedSearch = useDebounce(search)
  const { data: destinations = [], loading } = useFetch('/destinations')

  const locations = useMemo(() => ['All', ...new Set(destinations.map(d => d.location))], [destinations])

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ]

  const filtered = useMemo(() => {
    let results = [...destinations]

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      results = results.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q)
      )
    }

    // Location filter
    if (location !== 'All') {
      results = results.filter(d => d.location === location)
    }

    // Price filter
    results = results.filter(d => d.price >= priceRange[0] && d.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        results.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        results.sort((a, b) => b.avgRating - a.avgRating)
        break
      default:
        break
    }

    return results
  }, [destinations, debouncedSearch, location, sortBy, priceRange])

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
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4 font-heading tracking-tight">
            Explore Destinations
          </h1>
          <p className="text-surface-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light">
            From tropical paradises to mountain retreats — find your perfect getaway
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <SearchBar
              placeholder="Search destinations..."
              onSearch={setSearch}
              className="flex-1"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-6 py-3.5 border rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                showFilters
                  ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-white/80 dark:bg-surface-800/40 border-surface-200 dark:border-surface-700/80 text-surface-700 dark:text-slate-200 hover:border-primary-500 dark:hover:border-primary-500/80 hover:bg-white dark:hover:bg-surface-800/60 shadow-sm'
              }`}
            >
              <FiSliders className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-90' : ''}`} />
              Filters
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="bg-white/90 dark:bg-surface-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-surface-200/60 dark:border-surface-700/60 shadow-premium space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 divide-y md:divide-y-0 md:divide-x divide-surface-200 dark:divide-surface-700/60">
                    
                    {/* Location Column (col-span-6) */}
                    <div className="md:col-span-6 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">Location</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {locations.map(loc => (
                          <button
                            key={loc}
                            onClick={() => setLocation(loc)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                              location === loc
                                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                                : 'bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-slate-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:border-surface-300 dark:hover:border-surface-600'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort Column (col-span-3) */}
                    <div className="md:col-span-3 md:pl-8 pt-6 md:pt-0 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">Sort By</label>
                      <div className="relative pt-1">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700/60 rounded-xl text-sm font-semibold text-surface-700 dark:text-slate-200 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300"
                        >
                          {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-white dark:bg-surface-800 text-surface-800 dark:text-white">{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Price Column (col-span-3) */}
                    <div className="md:col-span-3 md:pl-8 pt-6 md:pt-0 space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">Max Budget</label>
                        <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400">${priceRange[1]}</span>
                      </div>
                      <div className="pt-3">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="50"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                          className="w-full h-1.5 bg-surface-100 dark:bg-surface-900 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-surface-450 mt-2">
                          <span>$0</span>
                          <span>$1,000</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-surface-500 dark:text-slate-400 mb-6 font-medium"
        >
          {filtered.length} destinations found
        </motion.p>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/60 p-5 space-y-4">
                <div className="aspect-[4/3] skeleton w-full" />
                <div className="h-6 skeleton w-3/4" />
                <div className="h-4 skeleton w-full" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 skeleton w-1/3" />
                  <div className="h-8 skeleton w-1/4 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((dest, i) => (
              <DestinationCard key={dest._id} destination={dest} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-surface-50 dark:bg-surface-800/20 rounded-3xl border border-surface-200/40 dark:border-surface-700/60">
            <p className="text-4xl mb-4">🏝️</p>
            <p className="text-xl font-bold text-surface-700 dark:text-white mb-2">No destinations found</p>
            <p className="text-surface-500 dark:text-slate-400 font-light">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
