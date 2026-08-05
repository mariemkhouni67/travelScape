import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiNavigation2, FiMapPin, FiClock, FiCheckCircle, FiUserCheck,
  FiAward, FiUsers, FiCheck, FiChevronRight, FiShield, FiPhoneCall
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { REGIONS, REGION_MEGA_DATA } from '../data/destinationMegaData'

const TAXI_TYPES = [
  {
    id: 1,
    name: 'Executive Sedan',
    desc: 'Mercedes E-Class, BMW 5 Series or Audi A6',
    passengers: 3,
    luggage: 3,
    price: 55,
    features: ['Flight Auto-Tracking', '60-min Free Wait Time', 'Driver Meet & Greet', 'Free Cancellation'],
  },
  {
    id: 2,
    name: 'Luxury First Class',
    desc: 'Mercedes S-Class or BMW 7 Series',
    passengers: 3,
    luggage: 3,
    price: 95,
    features: ['VIP Terminal Reception', 'Complimentary Water & WiFi', 'Leather Recline Seats', 'Chauffeur Service'],
  },
  {
    id: 3,
    name: 'Business Minivan',
    desc: 'Mercedes V-Class or VW Multivan',
    passengers: 7,
    luggage: 7,
    price: 85,
    features: ['Extra Legroom & Boot Space', 'Group Airport Transfer', 'Child Seats Available', 'Door-to-Door Service'],
  },
]

export default function AirportTaxi() {
  const { t } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState('europe')
  const [flightNumber, setFlightNumber] = useState('')

  const regionData = REGION_MEGA_DATA[selectedRegion] || REGION_MEGA_DATA.europe

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white border border-white/15 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.25), rgba(15, 23, 42, 0.95))',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <FiNavigation2 className="w-4 h-4" /> Airport Taxi & Private Transfer
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Airport Taxi Transfers in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">{regionData.name}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Free 60-minute driver waiting time with real-time automatic flight delay tracking. Fixed rate transparent fares.
          </p>

          {/* Region Selection */}
          <div className="pt-2 flex flex-wrap gap-2">
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
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

      {/* Region Service Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <FiCheckCircle className="w-4 h-4" /> Trusted Local Cabs & Apps
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{regionData.taxis.providers}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <FiMapPin className="w-4 h-4" /> Airport Express Pickups
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{regionData.taxis.airport_transfer}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <FiAward className="w-4 h-4" /> Average Fixed Rate
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{regionData.taxis.average_fare} (No hidden tolls)</p>
        </div>
      </div>

      {/* Available Transfer Options */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FiNavigation2 className="w-5 h-5 text-cyan-400" /> Select Your Transfer Vehicle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TAXI_TYPES.map((taxi) => (
            <div
              key={taxi.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{taxi.name}</h3>
                  <span className="text-lg font-bold text-cyan-400">${taxi.price}</span>
                </div>
                <p className="text-xs text-slate-400">{taxi.desc}</p>

                <div className="flex items-center gap-4 text-xs text-slate-300 border-t border-b border-white/10 py-2">
                  <span>👥 Up to {taxi.passengers} Passengers</span>
                  <span>🧳 {taxi.luggage} Bags</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {taxi.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <FiCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/booking/taxi/${taxi.id}`}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                <span>Reserve Taxi Transfer</span>
                <FiChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
