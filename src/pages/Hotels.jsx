import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import HotelCard from '../components/cards/HotelCard'
import SearchBar from '../components/common/SearchBar'
import useDebounce from '../hooks/useDebounce'
import { FiSliders, FiGlobe, FiHome, FiStar, FiMapPin, FiChevronRight } from 'react-icons/fi'
import { staggerContainer } from '../utils/transitions'
import { REGIONS, HOTEL_DATA, getFilteredHotels, getRegionStyles } from '../data/hotelData'

// ── Map centralized hotel data to HotelCard-compatible format ────────────────
function toHotelCardFormat(h) {
  const imgSrc = h.img || h.image || (h.images && (h.images.hero || h.images[0])) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  return {
    _id: h.id,
    name: h.name,
    description: h.desc || h.description || '',
    images: [imgSrc],
    amenities: h.amenities || [],
    pricePerNight: h.price,
    rating: h.rating,
    location: h.location || `${h.city}, ${h.country}`,
    rooms: [],
  }
}

export default function Hotels() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  // ── Region & Style state (synced with URL query params from mega menu) ──
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'all')
  const [selectedStyle, setSelectedStyle] = useState(searchParams.get('category') || 'all')

  // ── Compute region-specific identity styles ──
  const availableStyles = useMemo(() => {
    if (selectedRegion === 'all') {
      return [
        { id: 'palaces', label: 'Luxury Palaces', icon: '🏰' },
        { id: 'ryokan', label: 'Ryokans', icon: '⛩️' },
        { id: 'beach', label: 'Beach Resorts', icon: '🏖️' },
        { id: 'safari', label: 'Safari Lodges', icon: '🦁' },
        { id: 'boutique', label: 'Boutique Hotels', icon: '✨' },
        { id: 'apartment', label: 'City Apartments', icon: '🏢' },
        { id: 'luxury', label: 'Luxury Resorts', icon: '💎' },
        { id: 'eco', label: 'Eco Lodges', icon: '🌿' },
        { id: 'mountain', label: 'Mountain Lodges', icon: '🏔️' },
      ]
    }
    return getRegionStyles(selectedRegion)
  }, [selectedRegion])

  const handleRegionChange = (regId) => {
    setSelectedRegion(regId)
    setSelectedStyle('all')
  }

  // ── Standard filters ──
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [maxPrice, setMaxPrice] = useState(2500)
  const [minRating, setMinRating] = useState(0)
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const debouncedSearch = useDebounce(search)

  // ── API hotels (fallback/additional) ──
  const { data: apiHotels = [], loading } = useFetch('/hotels')

  // ── Centralized hotels from hotelData.js ──
  const centralizedHotels = useMemo(() => {
    const rawHotels = getFilteredHotels(
      selectedRegion === 'all' ? 'all' : selectedRegion,
      selectedStyle === 'all' ? 'all' : selectedStyle
    )
    return rawHotels.map(toHotelCardFormat)
  }, [selectedRegion, selectedStyle])

  // ── Merge: centralized hotels first, then API hotels ──
  const allHotels = useMemo(() => {
    const centralIds = new Set(centralizedHotels.map(h => h._id))
    const apiMapped = apiHotels.filter(h => !centralIds.has(h._id))
    return [...centralizedHotels, ...apiMapped]
  }, [centralizedHotels, apiHotels])

  // ── All unique amenities across combined set ──
  const amenitiesList = useMemo(
    () => [...new Set(allHotels.flatMap(h => h.amenities))].sort(),
    [allHotels]
  )

  const sortOptions = [
    { value: 'popular', label: t('filters.mostPopular', 'Most Popular') },
    { value: 'price-low', label: t('filters.priceLow', 'Price: Low to High') },
    { value: 'price-high', label: t('filters.priceHigh', 'Price: High to Low') },
    { value: 'rating', label: t('filters.highestRated', 'Highest Rated') },
  ]

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  // ── Filtered & sorted result list ──
  const filtered = useMemo(() => {
    let results = [...allHotels]
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      results = results.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
      )
    }
    results = results.filter(h => h.pricePerNight <= maxPrice)
    results = results.filter(h => h.rating >= minRating)
    if (selectedAmenities.length > 0) {
      results = results.filter(h => selectedAmenities.every(a => h.amenities.includes(a)))
    }
    switch (sortBy) {
      case 'price-low': results.sort((a, b) => a.pricePerNight - b.pricePerNight); break
      case 'price-high': results.sort((a, b) => b.pricePerNight - a.pricePerNight); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      default: break
    }
    return results
  }, [allHotels, debouncedSearch, sortBy, maxPrice, minRating, selectedAmenities])

  // ── Region info for hero section ──
  const regionInfo = useMemo(() => {
    if (selectedRegion === 'all') return null
    return HOTEL_DATA[selectedRegion] || null
  }, [selectedRegion])

  // ── Style info ──
  const styleInfo = useMemo(() => {
    if (selectedStyle === 'all' || !regionInfo) return null
    return regionInfo.styles?.[selectedStyle] || null
  }, [selectedStyle, regionInfo])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#070B1A] text-surface-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4 font-heading tracking-tight">
            {t('hotels.pageTitle', 'Find Your Perfect Stay')}
          </h1>
          <p className="text-surface-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light">
            {regionInfo
              ? `${regionInfo.flag} ${regionInfo.regionName} — ${regionInfo.bestSeason}`
              : t('hotels.pageSubtitle', 'Browse luxury hotels and resorts worldwide, with amenities to match every travel style')
            }
          </p>
        </motion.div>

        {/* ── Region Filter Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <FiGlobe className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">Region</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRegionChange('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border ${
                selectedRegion === 'all'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 border-blue-400/40'
                  : 'bg-white/80 dark:bg-surface-800/40 border-surface-200 dark:border-surface-700/80 text-surface-600 dark:text-slate-300 hover:bg-surface-50 dark:hover:bg-surface-800/60'
              }`}
            >
              🌐 All Regions
            </button>
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => handleRegionChange(reg.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border flex items-center gap-1.5 ${
                  selectedRegion === reg.id
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 border-blue-400/40'
                    : 'bg-white/80 dark:bg-surface-800/40 border-surface-200 dark:border-surface-700/80 text-surface-600 dark:text-slate-300 hover:bg-surface-50 dark:hover:bg-surface-800/60'
                }`}
              >
                <span>{reg.flag}</span> {reg.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Hotel Style Filter Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <FiHome className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">
              Hotel Style {selectedRegion !== 'all' && `(${REGIONS.find(r => r.id === selectedRegion)?.label})`}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStyle('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border ${
                selectedStyle === 'all'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-md shadow-purple-500/25 border-purple-400/40'
                  : 'bg-white/80 dark:bg-surface-800/40 border-surface-200 dark:border-surface-700/80 text-surface-600 dark:text-slate-300 hover:bg-surface-50 dark:hover:bg-surface-800/60'
              }`}
            >
              ✨ All Styles
            </button>
            {availableStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border flex items-center gap-1.5 whitespace-nowrap ${
                  selectedStyle === style.id
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-md shadow-purple-500/25 border-purple-400/40 scale-[1.02]'
                    : 'bg-white/80 dark:bg-surface-800/40 border-surface-200 dark:border-surface-700/80 text-surface-600 dark:text-slate-300 hover:bg-surface-50 dark:hover:bg-surface-800/60'
                }`}
              >
                <span>{style.icon}</span>
                <span>{style.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Featured Recommendation Banner (when region + style selected) ── */}
        <AnimatePresence mode="wait">
          {styleInfo && (
            <motion.div
              key={`${selectedRegion}-${selectedStyle}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 rounded-2xl overflow-hidden border border-white/15 dark:border-white/10 shadow-xl relative group"
              style={{
                background: styleInfo.featured.image
                  ? `linear-gradient(to right, rgba(9,14,28,0.92), rgba(9,14,28,0.55)), url(${styleInfo.featured.image}) center/cover no-repeat`
                  : 'linear-gradient(135deg, rgba(30,58,138,0.85), rgba(88,28,135,0.85))'
              }}
            >
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="space-y-2 max-w-xl">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/25 text-white">
                    ✨ Featured {styleInfo.styleLabel}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">{styleInfo.featured.name || styleInfo.featured.title}</h3>
                  <p className="text-sm text-slate-200 font-light">{styleInfo.featured.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3 text-blue-400" /> {styleInfo.featured.city}</span>
                    <span className="flex items-center gap-1"><FiStar className="w-3 h-3 text-amber-400" /> From ${styleInfo.featured.price}/night</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 flex-shrink-0">
                  {styleInfo.featured.cta}
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Region Info Cards (weather, season, experiences) ── */}
        <AnimatePresence mode="wait">
          {regionInfo && (
            <motion.div
              key={`info-${selectedRegion}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-white/90 dark:bg-surface-800/60 backdrop-blur-xl rounded-xl p-4 border border-surface-200/60 dark:border-surface-700/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-surface-400 dark:text-slate-500 mb-1">Best Season</p>
                <p className="text-sm font-bold text-surface-800 dark:text-white">{regionInfo.bestSeason}</p>
              </div>
              <div className="bg-white/90 dark:bg-surface-800/60 backdrop-blur-xl rounded-xl p-4 border border-surface-200/60 dark:border-surface-700/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-surface-400 dark:text-slate-500 mb-1">Weather</p>
                <p className="text-sm font-bold text-surface-800 dark:text-white">{regionInfo.weather}</p>
              </div>
              <div className="bg-white/90 dark:bg-surface-800/60 backdrop-blur-xl rounded-xl p-4 border border-surface-200/60 dark:border-surface-700/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-surface-400 dark:text-slate-500 mb-1">Local Experiences</p>
                <p className="text-sm font-bold text-surface-800 dark:text-white">{regionInfo.localExperiences}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Search & Advanced Filters ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <SearchBar placeholder={t('hotels.searchPlaceholder', 'Search hotels...')} onSearch={setSearch} className="flex-1" />
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/80 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/80 rounded-xl text-sm font-semibold text-surface-700 dark:text-slate-200 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 backdrop-blur-md"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-white dark:bg-surface-800 text-surface-800 dark:text-white">{opt.label}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 px-6 py-3.5 border rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                  showFilters
                    ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-white/80 dark:bg-surface-800/40 border-surface-200 dark:border-surface-700/80 text-surface-700 dark:text-slate-200 hover:border-primary-500 dark:hover:border-primary-500/80 hover:bg-white dark:hover:bg-surface-800/60 shadow-sm'
                }`}
              >
                <FiSliders className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-90' : ''}`} />
                {t('filters.label', 'Filters')}
              </button>
            </div>
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
                    <div className="md:col-span-3 space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">{t('filters.maxBudget', 'Max Budget')}</label>
                        <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400">${maxPrice}/{t('hotels.perNight', 'night')}</span>
                      </div>
                      <div className="pt-2">
                        <input
                          type="range" min="50" max="2500" step="50"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full h-1.5 bg-surface-100 dark:bg-surface-900 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-surface-450 mt-2">
                          <span>$50</span><span>$2,500</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3 md:pl-8 pt-6 md:pt-0 space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">{t('filters.minRating', 'Min Rating')}</label>
                        <span className="text-sm font-extrabold text-amber-500">{minRating} ★</span>
                      </div>
                      <div className="pt-2">
                        <input
                          type="range" min="0" max="5" step="0.5"
                          value={minRating}
                          onChange={(e) => setMinRating(Number(e.target.value))}
                          className="w-full h-1.5 bg-surface-100 dark:bg-surface-900 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-surface-450 mt-2">
                          <span>0★</span><span>5★</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-6 md:pl-8 pt-6 md:pt-0 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-slate-400">{t('hotels.amenities', 'Amenities')}</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {amenitiesList.map(am => {
                          const isSelected = selectedAmenities.includes(am)
                          return (
                            <button
                              key={am}
                              onClick={() => toggleAmenity(am)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                                  : 'bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700/60 text-surface-600 dark:text-slate-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                              }`}
                            >
                              {am}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Results count ── */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-surface-500 dark:text-slate-400 mb-6 font-medium">
          {t('hotels.resultsCount', '{{count}} hotels found', { count: filtered.length })}
          {selectedRegion !== 'all' && ` in ${HOTEL_DATA[selectedRegion]?.regionName || selectedRegion}`}
          {selectedStyle !== 'all' && ` — ${availableStyles.find(s => s.id === selectedStyle)?.label || selectedStyle}`}
        </motion.p>

        {/* ── Hotel Cards Grid ── */}
        {loading && centralizedHotels.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="bg-white dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/60 p-5 space-y-4">
                <div className="aspect-[4/3] skeleton w-full" />
                <div className="h-6 skeleton w-3/4" />
                <div className="h-4 skeleton w-full" />
                <div className="flex gap-2">
                  <div className="h-5 skeleton w-1/4 rounded-lg" /><div className="h-5 skeleton w-1/4 rounded-lg" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-surface-100 dark:border-surface-700/80">
                  <div className="h-6 skeleton w-1/3" /><div className="h-10 skeleton w-1/3 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            key={`${selectedRegion}-${selectedStyle}`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((hotel, i) => (
                <motion.div
                  key={hotel._id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <HotelCard hotel={hotel} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-surface-50 dark:bg-surface-800/20 rounded-3xl border border-surface-200/40 dark:border-surface-700/60"
          >
            <p className="text-4xl mb-4">🏨</p>
            <p className="text-xl font-bold text-surface-700 dark:text-white mb-2">{t('hotels.noResults', 'No hotels found')}</p>
            <p className="text-surface-500 dark:text-slate-400 font-light">{t('filters.adjustFilters', 'Try adjusting your filters')}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
