import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  FiSend, FiGlobe, FiClock, FiTag, FiCheck, FiSearch,
  FiChevronRight, FiShield, FiTrendingUp, FiCreditCard, FiZap
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { REGIONS, REGION_MEGA_DATA } from '../data/destinationMegaData'

const TRAIN_ROUTES = [
  {
    id: 1,
    operator: 'Eurostar Express',
    route: 'London St Pancras ➔ Paris Gare du Nord',
    duration: '2h 16m',
    speed: '300 km/h',
    price: 68,
    class: 'Standard Premier',
    region: 'europe',
    popular: true,
  },
  {
    id: 2,
    operator: 'Shinkansen Bullet Train',
    route: 'Tokyo Station ➔ Kyoto Station',
    duration: '2h 15m',
    speed: '320 km/h',
    price: 94,
    class: 'Green Car Luxury',
    region: 'asia',
    popular: true,
  },
  {
    id: 3,
    operator: 'Glacier Express Scenic Rail',
    route: 'Zermatt ➔ St. Moritz (Swiss Alps)',
    duration: '7h 45m',
    speed: 'Panoramic Experience',
    price: 145,
    class: 'Excellence Class',
    region: 'europe',
    popular: true,
  },
  {
    id: 4,
    operator: 'Amtrak Acela Express',
    route: 'New York Penn ➔ Washington DC',
    duration: '2h 55m',
    speed: '240 km/h',
    price: 82,
    class: 'Business Class',
    region: 'americas',
    popular: true,
  },
  {
    id: 5,
    operator: 'Haramain High Speed Rail',
    route: 'Mecca ➔ Medina Direct',
    duration: '2h 20m',
    speed: '300 km/h',
    price: 48,
    class: 'Executive Class',
    region: 'africa_me',
    popular: false,
  },
  {
    id: 6,
    operator: 'TranzAlpine Express NZ',
    route: 'Christchurch ➔ Greymouth (Alpine Pass)',
    duration: '4h 30m',
    speed: 'Scenic Vista Rail',
    price: 115,
    class: 'Vista Class',
    region: 'oceania',
    popular: true,
  },
]

export default function TrainTickets() {
  const { t } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState('europe')

  const regionData = REGION_MEGA_DATA[selectedRegion] || REGION_MEGA_DATA.europe

  const filteredRoutes = useMemo(() => {
    return TRAIN_ROUTES.filter((r) => r.region === selectedRegion)
  }, [selectedRegion])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white border border-white/15 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(234, 88, 12, 0.25), rgba(15, 23, 42, 0.95))',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <FiZap className="w-4 h-4" /> High-Speed Train Tickets & Passes
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Book Train Travel in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-red-400">{regionData.name}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Instant digital e-tickets, seat selection, and regional rail passes across {regionData.name}.
          </p>

          {/* Region Selector */}
          <div className="pt-2 flex flex-wrap gap-2">
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 border border-amber-400/40'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
                }`}
              >
                <span>{reg.flag}</span>
                <span>{reg.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Region Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <FiZap className="w-5 h-5" /> Express Rail Networks
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{regionData.trains.networks}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-base">
            <FiTrendingUp className="w-5 h-5" /> Featured Express Routes
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{regionData.trains.routes}</p>
        </div>
      </div>

      {/* Routes & Tickets List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FiCreditCard className="w-5 h-5 text-amber-400" /> Popular Rail Tickets in {regionData.name}
        </h2>

        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {route.operator}
                    </span>
                    <span className="text-lg font-bold text-white">${route.price}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{route.route}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5 text-amber-400" /> {route.duration}</span>
                      <span className="flex items-center gap-1"><FiZap className="w-3.5 h-3.5 text-amber-400" /> {route.speed}</span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/booking/train/${route.id}`}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-amber-500/25"
                >
                  <span>Book Train E-Ticket</span>
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
            <FiSend className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Express Rail Routes in {regionData.name}</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">{regionData.trains.networks}. Select dates to search all regional connections.</p>
            <Link to="/booking/train/1" className="inline-block px-5 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-lg">Search All Train Fares</Link>
          </div>
        )}
      </div>
    </div>
  )
}
