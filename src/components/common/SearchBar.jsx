import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function SearchBar({ placeholder = 'Search destinations, hotels...', onSearch, className = '', variant = 'default' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    } else if (query.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(query)}`)
    }
  }

  if (variant === 'hero') {
    return (
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl mx-auto ${className}`}
      >
        <div className="relative flex items-center bg-white/95 dark:bg-surface-800/80 border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-2 rounded-2xl backdrop-blur-xl focus-within:border-primary-500/50 dark:focus-within:border-primary-500/40 focus-within:ring-4 focus-within:ring-primary-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 flex-1 px-4">
            <FiMapPin className="w-5 h-5 text-primary-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full py-3 text-surface-800 dark:text-white bg-transparent outline-none placeholder-surface-400 dark:placeholder-slate-400 text-base font-light"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <FiSearch className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </motion.form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400 transition-colors" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700/80 rounded-xl text-sm text-surface-800 dark:text-white placeholder-surface-400 dark:placeholder-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all duration-300 shadow-sm backdrop-blur-md"
      />
    </form>
  )
}
