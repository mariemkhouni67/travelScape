import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGlobe, FiChevronDown, FiSearch, FiCheck, FiClock, FiLoader } from 'react-icons/fi'
import { SUPPORTED_LANGUAGES } from '../../i18n'

const RECENT_LANGS_KEY = 'travelscape_recent_languages'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [recentCodes, setRecentCodes] = useState([])
  const [isChanging, setIsChanging] = useState(false)
  const dropdownRef = useRef(null)

  // Current active language object
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === (i18n.language || 'en').split('-')[0]) ||
    SUPPORTED_LANGUAGES[0]

  // Load recently used languages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_LANGS_KEY)
      if (saved) {
        setRecentCodes(JSON.parse(saved))
      }
    } catch {
      // Ignore storage errors
    }
  }, [])

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle switching language
  const handleSelectLanguage = async (langCode) => {
    if (langCode === currentLang.code) {
      setIsOpen(false)
      return
    }

    setIsChanging(true)

    // Update recent languages in state and localStorage
    const updatedRecents = [langCode, ...recentCodes.filter((c) => c !== langCode)].slice(0, 3)
    setRecentCodes(updatedRecents)
    try {
      localStorage.setItem(RECENT_LANGS_KEY, JSON.stringify(updatedRecents))
    } catch {
      // Ignore storage errors
    }

    await i18n.changeLanguage(langCode)
    setTimeout(() => {
      setIsChanging(false)
      setIsOpen(false)
      setSearchQuery('')
    }, 250)
  }

  // Filter languages based on search query
  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Recent language objects (excluding current if searchQuery is active)
  const recentLangs = recentCodes
    .map((code) => SUPPORTED_LANGUAGES.find((l) => l.code === code))
    .filter(Boolean)

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50">
      {/* Compact Icon Trigger Button (matches ThemeToggle size) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Select language"
        className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
          isOpen
            ? 'bg-white/15 border border-blue-400/40 shadow-[0_0_12px_rgba(59,130,246,0.25)]'
            : 'bg-white/8 dark:bg-surface-800 border border-white/10 hover:bg-white/15 hover:border-blue-400/40'
        }`}
      >
        {/* Glow ring */}
        <span className={`absolute inset-0 rounded-xl transition-opacity duration-300 bg-blue-400/10 ${isOpen ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`} />

        {/* Animated Flag or Spinning Globe while changing */}
        <AnimatePresence mode="wait">
          {isChanging ? (
            <motion.span
              key="loading"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative z-10 flex items-center justify-center"
            >
              <FiGlobe className="w-5 h-5 text-blue-400 animate-spin" />
            </motion.span>
          ) : (
            <motion.span
              key={currentLang.code}
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 text-lg leading-none"
            >
              {currentLang.flag}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Glassmorphic Animated Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="absolute ltr:right-0 rtl:left-0 mt-3 w-72 rounded-2xl overflow-hidden shadow-2xl z-50 text-left ltr:text-left rtl:text-right"
            style={{
              background: 'rgba(10, 16, 32, 0.94)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.15)',
            }}
          >
            {/* Search Input Box */}
            <div className="p-3 border-b border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <FiSearch className="absolute ltr:left-3 rtl:right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('switcher.searchLanguage', 'Search language...')}
                  className="w-full ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs text-white placeholder-slate-400 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400/80 transition-colors"
                />
              </div>
            </div>

            {/* Dropdown Content */}
            <div className="max-h-64 overflow-y-auto p-2 space-y-3 custom-scrollbar">
              {/* Recently Used Section */}
              {!searchQuery && recentLangs.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    <FiClock className="w-3 h-3" />
                    <span>{t('switcher.recentLanguages', 'Recently Used')}</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {recentLangs.map((lang) => (
                      <LanguageOption
                        key={`recent-${lang.code}`}
                        lang={lang}
                        isSelected={currentLang.code === lang.code}
                        onSelect={handleSelectLanguage}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Languages Section */}
              <div>
                {!searchQuery && recentLangs.length > 0 && (
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>{t('switcher.allLanguages', 'All Languages')}</span>
                  </div>
                )}

                {filteredLanguages.length > 0 ? (
                  <div className="mt-1 space-y-1">
                    {filteredLanguages.map((lang) => (
                      <LanguageOption
                        key={lang.code}
                        lang={lang}
                        isSelected={currentLang.code === lang.code}
                        onSelect={handleSelectLanguage}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-6 text-center text-xs text-slate-400">
                    {t('switcher.noResults', 'No languages found')}
                  </div>
                )}
              </div>
            </div>

            {/* Subtle Loading Footer */}
            {isChanging && (
              <div className="px-3 py-2 bg-blue-600/20 border-t border-blue-500/20 flex items-center justify-center gap-2 text-xs font-semibold text-blue-300">
                <FiLoader className="w-3.5 h-3.5 animate-spin" />
                <span>{t('switcher.changingLanguage', 'Switching language...')}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LanguageOption({ lang, isSelected, onSelect }) {
  return (
    <motion.button
      whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(lang.code)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/40 text-white font-bold'
          : 'text-slate-200 hover:text-white border border-transparent'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-base leading-none">{lang.flag}</span>
        <div className="flex flex-col ltr:text-left rtl:text-right">
          <span className="leading-tight">{lang.nativeName}</span>
          <span className="text-[10px] text-slate-400 leading-tight">{lang.name}</span>
        </div>
      </div>
      {isSelected && <FiCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />}
    </motion.button>
  )
}
