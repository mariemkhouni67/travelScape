import { useTheme } from '../../context/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
        darkMode
          ? 'bg-surface-800 text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
          : 'bg-surface-100 text-primary-600 shadow-[0_0_12px_rgba(79,124,255,0.15)]'
      }`}
    >
      {/* Glow ring */}
      <span
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          darkMode
            ? 'bg-amber-400/10 opacity-100'
            : 'bg-primary-500/10 opacity-100'
        }`}
      />

      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-10 flex items-center justify-center"
          >
            <FiSun className="w-5 h-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-10 flex items-center justify-center"
          >
            <FiMoon className="w-5 h-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
