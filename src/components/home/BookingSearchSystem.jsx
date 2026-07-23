import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiNavigation, FiHome, FiTruck, FiActivity, FiUser, 
  FiCalendar, FiMapPin, FiCheck, FiChevronDown, FiPlus, FiMinus, FiSearch,
  FiNavigation2, FiSend
} from 'react-icons/fi'

const tabItems = [
  { id: 'flights', label: 'Flights', icon: FiNavigation },
  { id: 'hotels', label: 'Hotels', icon: FiHome },
  { id: 'cars', label: 'Car Rental', icon: FiTruck },
  { id: 'trains', label: 'Train Tickets', icon: FiSend },
  { id: 'attractions', label: 'Attractions', icon: FiActivity },
  { id: 'taxis', label: 'Airport Taxi', icon: FiNavigation2 }
]

export default function BookingSearchSystem() {
  const [activeTab, setActiveTab] = useState('flights')
  
  // Custom Autocomplete / Dropdown states
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTravelers, setShowTravelers] = useState(false)

  // Calendar parameters
  const [dateRange, setDateRange] = useState({ start: '2026-07-28', end: '2026-08-04' })
  const [flexibleDates, setFlexibleDates] = useState(false)

  // Travelers parameters
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    rooms: 1,
    pets: false,
    cabin: 'Economy'
  })

  // Dropdown ref closures
  const calendarRef = useRef(null)
  const travelersRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
      if (travelersRef.current && !travelersRef.current.contains(event.target)) {
        setShowTravelers(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Modifiers
  const updateTravelers = (field, action) => {
    setTravelers(prev => {
      let value = prev[field]
      if (action === 'inc') value += 1
      if (action === 'dec' && value > 0) {
        if (field === 'adults' && value <= 1) return prev // keep at least 1 adult
        if (field === 'rooms' && value <= 1) return prev // keep at least 1 room
        value -= 1
      }
      return { ...prev, [field]: value }
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto relative z-35 mt-6">
      
      {/* ── Tabs Header Row ── */}
      <div className="flex flex-wrap gap-2 mb-4 bg-slate-950/40 backdrop-blur-xl border border-white/5 p-1.5 rounded-2xl w-fit">
        {tabItems.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setShowCalendar(false)
                setShowTravelers(false)
              }}
              className={`relative flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSearchTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/70 to-indigo-500/70 backdrop-blur-md rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Glassmorphic Form Card Wrapper ── */}
      <div 
        style={{
          background: 'rgba(12, 20, 38, 0.55)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)'
        }}
        className="rounded-[2rem] p-6 md:p-8 text-left relative overflow-visible"
      >
        <AnimatePresence mode="wait">
          {/* ✈️ FLIGHTS MODULE */}
          {activeTab === 'flights' && (
            <motion.div
              key="flights-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-6 items-center border-b border-white/5 pb-4">
                {/* Trip Type Selectors */}
                <div className="flex gap-4 text-xs font-semibold text-slate-350">
                  {['Round Trip', 'One Way', 'Multi-City'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer hover:text-white">
                      <input type="radio" name="flight-type" defaultChecked={mode === 'Round Trip'} className="accent-blue-500" />
                      {mode}
                    </label>
                  ))}
                </div>
                {/* Direct flight checkbox */}
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-350 cursor-pointer hover:text-white ml-auto">
                  <input type="checkbox" className="accent-blue-500" />
                  Direct Flights Only
                </label>
              </div>

              {/* Booking Input Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Origin</label>
                  <div className="relative">
                    <input type="text" placeholder="London (LHR)" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</label>
                  <div className="relative">
                    <input type="text" placeholder="Prague (PRG)" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                {/* Calendar Dropdown */}
                <div className="space-y-1.5 relative" ref={calendarRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dates</label>
                  <button 
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiCalendar className="w-4 h-4 text-slate-400" />
                      {dateRange.start} - {dateRange.end}
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showCalendar && <PremiumCalendar dateRange={dateRange} setDateRange={setDateRange} flexibleDates={flexibleDates} setFlexibleDates={setFlexibleDates} />}
                </div>

                {/* Travelers Dropdown */}
                <div className="space-y-1.5 relative" ref={travelersRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Travelers & Class</label>
                  <button 
                    onClick={() => setShowTravelers(!showTravelers)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiUser className="w-4 h-4 text-slate-400" />
                      {travelers.adults + travelers.children} Pax, {travelers.cabin}
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showTravelers && <TravelersSelector travelers={travelers} setTravelers={setTravelers} updateTravelers={updateTravelers} />}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex justify-end pt-2">
                <button className="px-9 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  <FiSearch className="w-4 h-4" />
                  Search Flights
                </button>
              </div>
            </motion.div>
          )}

          {/* 🏨 HOTELS MODULE */}
          {activeTab === 'hotels' && (
            <motion.div
              key="hotels-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-350 border-b border-white/5 pb-4">
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" className="accent-blue-500" />
                  Breakfast Included
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" className="accent-blue-500" />
                  Free Cancellation
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" className="accent-blue-500" />
                  Pets Allowed
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</label>
                  <div className="relative">
                    <input type="text" placeholder="Where are you staying?" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5 relative" ref={calendarRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Check-in / Check-out</label>
                  <button 
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiCalendar className="w-4 h-4 text-slate-400" />
                      {dateRange.start} - {dateRange.end}
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showCalendar && <PremiumCalendar dateRange={dateRange} setDateRange={setDateRange} flexibleDates={flexibleDates} setFlexibleDates={setFlexibleDates} />}
                </div>

                <div className="space-y-1.5 relative" ref={travelersRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guests & Rooms</label>
                  <button 
                    onClick={() => setShowTravelers(!showTravelers)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiUser className="w-4 h-4 text-slate-400" />
                      {travelers.adults + travelers.children} guests, {travelers.rooms} room{travelers.rooms > 1 && 's'}
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showTravelers && <TravelersSelector travelers={travelers} setTravelers={setTravelers} updateTravelers={updateTravelers} showRooms={true} />}
                </div>

                {/* Rating filter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hotel Rating</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    <option value="all">Any Rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ Very Good (4/5)</option>
                    <option value="3">⭐⭐⭐ Good (3/5)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-9 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  <FiSearch className="w-4 h-4" />
                  Search Hotels
                </button>
              </div>
            </motion.div>
          )}

          {/* 🚗 CAR RENTAL MODULE */}
          {activeTab === 'cars' && (
            <motion.div
              key="cars-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-350 border-b border-white/5 pb-4">
                {['Same return location', 'Automatic transmission', 'Unlimited mileage', 'Electric vehicles'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input type="checkbox" defaultChecked={opt === 'Unlimited mileage'} className="accent-blue-500" />
                    {opt}
                  </label>
                ))}
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pick-up Location</label>
                  <div className="relative">
                    <input type="text" placeholder="Airport or City..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Return Location</label>
                  <div className="relative">
                    <input type="text" placeholder="Same location" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5 relative" ref={calendarRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rental Period</label>
                  <button 
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiCalendar className="w-4 h-4 text-slate-400" />
                      {dateRange.start} - {dateRange.end}
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showCalendar && <PremiumCalendar dateRange={dateRange} setDateRange={setDateRange} flexibleDates={flexibleDates} setFlexibleDates={setFlexibleDates} />}
                </div>
              </div>

              {/* Animated Vehicle Category Cards */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Car Class</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { cat: 'Economy', desc: 'From $24/day', emoji: '🚗' },
                    { cat: 'SUV', desc: 'From $39/day', emoji: '🚙' },
                    { cat: 'Luxury', desc: 'From $79/day', emoji: '🚘' },
                    { cat: 'Electric', desc: 'From $35/day', emoji: '⚡' }
                  ].map((card) => (
                    <motion.div 
                      key={card.cat}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/10"
                    >
                      <span className="text-2xl">{card.emoji}</span>
                      <div>
                        <p className="text-white text-xs font-bold">{card.cat}</p>
                        <p className="text-slate-400 text-[10px]">{card.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-9 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  <FiSearch className="w-4 h-4" />
                  Search Rentals
                </button>
              </div>
            </motion.div>
          )}

          {/* 🚆 TRAIN MODULE */}
          {activeTab === 'trains' && (
            <motion.div
              key="trains-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-350 border-b border-white/5 pb-4">
                {['High-speed only', 'Direct trains', 'First Class', 'Flexible tickets'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input type="checkbox" defaultChecked={opt === 'High-speed only'} className="accent-blue-500" />
                    {opt}
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Departure Station</label>
                  <div className="relative">
                    <input type="text" placeholder="Station name..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Arrival Station</label>
                  <div className="relative">
                    <input type="text" placeholder="Station name..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5 relative" ref={calendarRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Travel Date</label>
                  <button 
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiCalendar className="w-4 h-4 text-slate-400" />
                      {dateRange.start}
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showCalendar && <PremiumCalendar dateRange={dateRange} setDateRange={setDateRange} flexibleDates={flexibleDates} setFlexibleDates={setFlexibleDates} />}
                </div>

                <div className="space-y-1.5 relative" ref={travelersRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Passengers</label>
                  <button 
                    onClick={() => setShowTravelers(!showTravelers)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiUser className="w-4 h-4 text-slate-400" />
                      {travelers.adults + travelers.children} Passengers
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showTravelers && <TravelersSelector travelers={travelers} setTravelers={setTravelers} updateTravelers={updateTravelers} />}
                </div>
              </div>

              {/* Simulated Route Track Animation */}
              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <motion.div 
                  initial={{ left: '-20%' }}
                  animate={{ left: '120%' }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-9 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  <FiSearch className="w-4 h-4" />
                  Search Trains
                </button>
              </div>
            </motion.div>
          )}

          {/* 📍 ATTRACTIONS MODULE */}
          {activeTab === 'attractions' && (
            <motion.div
              key="attractions-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</label>
                  <div className="relative">
                    <input type="text" placeholder="Explore landmarks or activities..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5 relative" ref={calendarRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Travel Date</label>
                  <button 
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiCalendar className="w-4 h-4 text-slate-400" />
                      {dateRange.start}
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showCalendar && <PremiumCalendar dateRange={dateRange} setDateRange={setDateRange} flexibleDates={flexibleDates} setFlexibleDates={setFlexibleDates} />}
                </div>

                <div className="space-y-1.5 relative" ref={travelersRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Travelers</label>
                  <button 
                    onClick={() => setShowTravelers(!showTravelers)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiUser className="w-4 h-4 text-slate-400" />
                      {travelers.adults + travelers.children} Travelers
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showTravelers && <TravelersSelector travelers={travelers} setTravelers={setTravelers} updateTravelers={updateTravelers} />}
                </div>
              </div>

              {/* Attraction Category Badges */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Popular Categories</span>
                <div className="flex flex-wrap gap-2">
                  {['Museums', 'Tours', 'Cruises', 'Food', 'Nightlife', 'Nature', 'Adventure'].map((cat) => (
                    <span 
                      key={cat} 
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-9 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  <FiSearch className="w-4 h-4" />
                  Find Attractions
                </button>
              </div>
            </motion.div>
          )}

          {/* 🚖 AIRPORT TAXI MODULE */}
          {activeTab === 'taxis' && (
            <motion.div
              key="taxis-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-6 items-center border-b border-white/5 pb-4">
                <div className="flex gap-4 text-xs font-semibold text-slate-350">
                  {['One Way', 'Round Trip'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer hover:text-white">
                      <input type="radio" name="taxi-type" defaultChecked={mode === 'One Way'} className="accent-blue-500" />
                      {mode}
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-350 ml-auto">
                  {['Meet & Greet', 'Child Seat', 'Wheelchair Accessible'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer hover:text-white">
                      <input type="checkbox" className="accent-blue-500" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pick-up Location</label>
                  <div className="relative">
                    <input type="text" placeholder="Airport or Address..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</label>
                  <div className="relative">
                    <input type="text" placeholder="Hotel or Address..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5 relative" ref={calendarRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date & Time</label>
                  <button 
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between hover:border-white/20"
                  >
                    <span className="flex items-center gap-2.5">
                      <FiCalendar className="w-4 h-4 text-slate-400" />
                      {dateRange.start} @ 14:30
                    </span>
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {showCalendar && <PremiumCalendar dateRange={dateRange} setDateRange={setDateRange} flexibleDates={flexibleDates} setFlexibleDates={setFlexibleDates} />}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Luggage & Pax</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    <option value="1">2 Bags, 3 Passengers</option>
                    <option value="2">4 Bags, 5 Passengers</option>
                    <option value="3">6 Bags, 8 Passengers</option>
                  </select>
                </div>
              </div>

              {/* Taxi Class Selector */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Vehicle Class</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { cat: 'Standard', desc: 'From $45', icon: '🚖' },
                    { cat: 'Comfort', desc: 'From $55', icon: '🚘' },
                    { cat: 'SUV', desc: 'From $70', icon: '🚙' },
                    { cat: 'Premium', desc: 'From $90', icon: '✨' },
                    { cat: 'Van', desc: 'From $80', icon: '🚐' }
                  ].map((car) => (
                    <motion.div 
                      key={car.cat}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 text-center"
                    >
                      <span className="text-2xl mb-1">{car.icon}</span>
                      <p className="text-white text-xs font-bold leading-tight">{car.cat}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{car.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-9 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  <FiNavigation2 className="w-4 h-4" />
                  Reserve Taxi
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Custom Sub-Components ──

function PremiumCalendar({ dateRange, setDateRange, flexibleDates, setFlexibleDates }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      className="absolute top-[105%] left-0 md:left-auto md:right-0 bg-slate-900/95 border border-white/10 backdrop-blur-2xl p-5 rounded-2xl shadow-2xl w-[320px] md:w-[600px] z-50 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Month 1 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-white text-sm font-bold border-b border-white/5 pb-2">
          <span>July 2026</span>
          <span className="text-xs font-normal text-slate-400">Holiday season</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="text-slate-450 font-bold">{d}</span>)}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1
            const isSelected = day === 28
            const isInRange = day > 28
            return (
              <span 
                key={i} 
                className={`py-1 rounded-md cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-500 text-white font-bold' : isInRange ? 'bg-blue-500/10 text-blue-300' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {day}
                {day === 28 && <span className="block text-[6px] text-white/80">$45</span>}
              </span>
            )
          })}
        </div>
      </div>

      {/* Month 2 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-white text-sm font-bold border-b border-white/5 pb-2">
          <span>August 2026</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="text-slate-450 font-bold">{d}</span>)}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1
            const isSelected = day === 4
            const isInRange = day < 4
            return (
              <span 
                key={i} 
                className={`py-1 rounded-md cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-500 text-white font-bold' : isInRange ? 'bg-blue-500/10 text-blue-300' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {day}
              </span>
            )
          })}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="md:col-span-2 border-t border-white/5 pt-3.5 flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input 
            type="checkbox" 
            checked={flexibleDates} 
            onChange={(e) => setFlexibleDates(e.target.checked)} 
            className="accent-blue-500" 
          />
          Flexible Dates (± 3 days)
        </label>
        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Lowest price indicators enabled</span>
      </div>
    </motion.div>
  )
}

function TravelersSelector({ travelers, setTravelers, updateTravelers, showRooms = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      className="absolute top-[105%] right-0 bg-slate-900/95 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl w-[280px] space-y-4.5 z-50 text-xs"
    >
      {[
        { field: 'adults', label: 'Adults', desc: 'Age 12+' },
        { field: 'children', label: 'Children', desc: 'Age 2-11' },
        { field: 'infants', label: 'Infants', desc: 'Under 2' }
      ].map((row) => (
        <div key={row.field} className="flex justify-between items-center">
          <div>
            <p className="text-white font-bold">{row.label}</p>
            <p className="text-[10px] text-slate-400">{row.desc}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => updateTravelers(row.field, 'dec')}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer"
            >
              <FiMinus />
            </button>
            <span className="text-white font-bold text-sm w-4 text-center">{travelers[row.field]}</span>
            <button 
              onClick={() => updateTravelers(row.field, 'inc')}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      ))}

      {showRooms && (
        <div className="flex justify-between items-center border-t border-white/5 pt-3.5">
          <div>
            <p className="text-white font-bold">Rooms</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => updateTravelers('rooms', 'dec')}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer"
            >
              <FiMinus />
            </button>
            <span className="text-white font-bold text-sm w-4 text-center">{travelers.rooms}</span>
            <button 
              onClick={() => updateTravelers('rooms', 'inc')}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      )}

      {/* Cabin Class Selection */}
      <div className="space-y-1.5 border-t border-white/5 pt-3.5">
        <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Cabin Class</span>
        <div className="grid grid-cols-2 gap-1.5">
          {['Economy', 'Premium', 'Business', 'First'].map((cl) => (
            <button
              key={cl}
              onClick={() => setTravelers(prev => ({ ...prev, cabin: cl }))}
              className={`py-1.5 px-2 rounded-lg border text-center font-bold text-[10px] transition-colors cursor-pointer ${
                travelers.cabin === cl 
                  ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                  : 'bg-white/5 border-white/10 text-slate-350 hover:bg-white/10'
              }`}
            >
              {cl}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
