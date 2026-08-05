import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { FiClock, FiArrowLeft, FiCompass, FiShield, FiHelpCircle } from 'react-icons/fi'
import { RiCompassDiscoverLine } from 'react-icons/ri'

export default function ComingSoon() {
  const location = useLocation()
  const pageTitle = location.pathname.replace('/', '').replace('-', ' ').toUpperCase() || 'FEATURE'

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-xl shadow-blue-500/25">
          <RiCompassDiscoverLine className="w-8 h-8 text-white animate-spin-slow" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
          <FiClock className="w-3.5 h-3.5" /> Coming Soon • 2026 Experience
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
          {pageTitle} Page
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed font-light">
          We are enhancing our global travel platform with this feature. In the meantime, explore our verified flights, luxury hotels, destinations, and high-speed rail passes!
        </p>

        <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/destinations"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/10 transition-all"
          >
            <FiCompass className="w-4 h-4 text-blue-400" /> Explore Destinations
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
