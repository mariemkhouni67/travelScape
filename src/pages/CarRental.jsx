import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiTruck, FiNavigation, FiAward, FiZap, FiMapPin, FiCalendar,
  FiClock, FiSearch, FiCheck, FiFilter, FiDollarSign, FiShield,
  FiChevronRight, FiUsers, FiCpu
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { REGIONS, REGION_MEGA_DATA } from '../data/destinationMegaData'

const CAR_CATEGORIES = [
  { id: 'all', label: 'All Fleet' },
  { id: 'economy', label: 'Economy & City' },
  { id: 'suv', label: 'SUVs & 4WD' },
  { id: 'luxury', label: 'Luxury & Sports' },
  { id: 'electric', label: 'Electric & Hybrid' },
]

const FLEET_DATA = [
  {
    id: 1,
    name: 'BMW 4 Series Convertible',
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    price: 95,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    rating: 4.9,
    reviews: 128,
    features: ['GPS Navigation', 'Leather Seats', 'Bluetooth', 'Convertible Top'],
    regions: ['europe', 'americas', 'oceania'],
  },
  {
    id: 2,
    name: 'Tesla Model Y Performance',
    category: 'electric',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    price: 85,
    seats: 5,
    transmission: 'Automatic',
    fuel: '100% Electric',
    rating: 4.95,
    reviews: 210,
    features: ['Autopilot', 'Long Range 530km', 'Glass Roof', 'Supercharging Access'],
    regions: ['europe', 'asia', 'americas', 'oceania'],
  },
  {
    id: 3,
    name: 'Range Rover Velar HSE',
    category: 'suv',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    price: 120,
    seats: 5,
    transmission: 'Automatic 4WD',
    fuel: 'Diesel Hybrid',
    rating: 4.88,
    reviews: 95,
    features: ['Terrain Response', 'Panoramic Roof', 'Meridian Sound', '360° Camera'],
    regions: ['europe', 'americas', 'africa_me', 'oceania'],
  },
  {
    id: 4,
    name: 'Audi A3 Sportback',
    category: 'economy',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    price: 45,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    rating: 4.75,
    reviews: 340,
    features: ['Virtual Cockpit', 'Apple CarPlay', 'Parking Sensors', 'Low Fuel Consumption'],
    regions: ['europe', 'asia', 'americas', 'africa_me'],
  },
  {
    id: 5,
    name: 'Mercedes-AMG G 63',
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80',
    price: 290,
    seats: 5,
    transmission: '9G-TRONIC 4WD',
    fuel: 'V8 Biturbo',
    rating: 4.98,
    reviews: 82,
    features: ['V8 Sound', 'Burmester Surround', 'Massage Seats', 'VIP Delivery'],
    regions: ['americas', 'africa_me', 'europe'],
  },
  {
    id: 6,
    name: 'Toyota RAV4 Hybrid 4WD',
    category: 'suv',
    image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=800&q=80',
    price: 60,
    seats: 5,
    transmission: 'e-CVT Automatic',
    fuel: 'Self-Charging Hybrid',
    rating: 4.82,
    reviews: 412,
    features: ['Safety Sense', 'Spacious Boot', 'Eco Drive Mode', 'Cruise Control'],
    regions: ['asia', 'oceania', 'americas', 'europe'],
  },
]

export default function CarRental() {
  const { t } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState('europe')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [pickupCity, setPickupCity] = useState('')

  const regionData = REGION_MEGA_DATA[selectedRegion] || REGION_MEGA_DATA.europe

  const filteredFleet = useMemo(() => {
    return FLEET_DATA.filter((car) => {
      const matchCat = selectedCategory === 'all' || car.category === selectedCategory
      const matchReg = car.regions.includes(selectedRegion)
      return matchCat && matchReg
    })
  }, [selectedCategory, selectedRegion])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white border border-white/15 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25), rgba(15, 23, 42, 0.95))',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <FiTruck className="w-4 h-4" /> Global Premium Car Rental
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Rent a Car in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{regionData.name}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Zero cancellation fees, keyless airport delivery, and unlimited mileage. Choose your preferred pickup hub in {regionData.name}.
          </p>

          {/* Region Tabs */}
          <div className="pt-2 flex flex-wrap gap-2">
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/40'
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

      {/* Quick Region Rental Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <FiMapPin className="w-4 h-4" /> Popular Pickup Locations
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{regionData.cars.pickup}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <FiAward className="w-4 h-4" /> Trusted Local Partners
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{regionData.cars.providers}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <FiDollarSign className="w-4 h-4" /> Starting Daily Price
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{regionData.cars.daily_price} (Insurance included)</p>
        </div>
      </div>

      {/* Fleet Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-wrap gap-2">
          {CAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFleet.map((car) => (
          <motion.div
            key={car.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                  ★ {car.rating} ({car.reviews})
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                  ${car.price} / day
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-400 capitalize">{car.category} Vehicle</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <FiUsers className="w-3.5 h-3.5 text-emerald-400" /> {car.seats} Seats
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCpu className="w-3.5 h-3.5 text-emerald-400" /> {car.transmission}
                  </span>
                </div>

                <div className="space-y-1">
                  {car.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <FiCheck className="w-3 h-3 text-emerald-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                to={`/booking/car/${car.id}`}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/25"
              >
                <span>Book Vehicle Now</span>
                <FiChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
