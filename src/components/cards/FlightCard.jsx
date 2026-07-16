import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md'
import { FiClock, FiBriefcase, FiUsers } from 'react-icons/fi'
import { memo } from 'react'

const FlightCard = memo(function FlightCard({ flight, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group bg-white dark:bg-surface-800/40 rounded-2xl p-6 shadow-premium hover:shadow-premium-hover border border-surface-100 dark:border-surface-700/80 transition-all duration-300 backdrop-blur-xl"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Airline */}
        <div className="flex items-center gap-3 lg:w-40">
          <div className="w-10 h-10 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-100/30 dark:border-primary-500/20">
            <MdFlightTakeoff className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <p className="font-bold text-surface-900 dark:text-white text-sm">{flight.airline}</p>
            <p className="text-xs text-surface-500 dark:text-slate-300">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex-1 flex items-center gap-4">
          <div className="text-right flex-1">
            <p className="text-lg font-bold text-surface-900 dark:text-white">{flight.departTime}</p>
            <p className="text-sm text-surface-500 dark:text-slate-300">{flight.from}</p>
          </div>

          <div className="flex flex-col items-center gap-1 px-4 min-w-[120px]">
            <p className="text-xs text-surface-500 dark:text-slate-400">{flight.duration}</p>
            <div className="relative w-full flex items-center">
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <div className="flex-1 h-px bg-surface-300 dark:bg-surface-600 mx-1" />
              <MdFlightLand className="w-4 h-4 text-primary-500" />
            </div>
            <p className="text-xs text-primary-500 font-semibold">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} stop`}
            </p>
          </div>

          <div className="flex-1">
            <p className="text-lg font-bold text-surface-900 dark:text-white">{flight.arriveTime}</p>
            <p className="text-sm text-surface-500 dark:text-slate-300">{flight.to}</p>
          </div>
        </div>

        {/* Price & Seats */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-1 lg:w-40">
          <div className="text-right">
            <p className="text-2xl font-bold text-surface-900 dark:text-white">${flight.price}</p>
            <div className="flex items-center gap-1 text-xs text-surface-500 dark:text-slate-400 justify-end font-medium">
              <FiUsers className="w-3.5 h-3.5 text-primary-500" />
              <span>{flight.seatsAvailable} seats left</span>
            </div>
          </div>
          <Link
            to={`/booking/flight/${flight._id}`}
            className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-xl shadow-md shadow-primary-500/10 hover:shadow-primary-500/25 transition-all whitespace-nowrap active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Bottom info */}
      <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700/80 flex flex-wrap gap-4 text-xs text-surface-500 dark:text-slate-300 font-medium">
        <div className="flex items-center gap-1">
          <FiClock className="w-3.5 h-3.5 text-primary-500" />
          <span>Depart: {flight.departDate}</span>
        </div>
        {flight.returnDate && (
          <div className="flex items-center gap-1">
            <FiClock className="w-3.5 h-3.5 text-primary-500" />
            <span>Return: {flight.returnDate}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
})

export default FlightCard
