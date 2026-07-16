import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  FiUser, FiLogOut, FiHeart, FiSettings, FiChevronDown,
} from 'react-icons/fi'
import { MdFlight, MdHotel, MdExplore, MdHome, MdContactMail } from 'react-icons/md'
import { RiCompassDiscoverLine } from 'react-icons/ri'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from './ThemeToggle'

// ─── Nav link definitions ────────────────────────────────────────────────────
const NAV_LINKS = [
  { path: '/',            label: 'Home',         icon: MdHome },
  { path: '/destinations', label: 'Destinations', icon: MdExplore },
  { path: '/hotels',      label: 'Hotels',        icon: MdHotel },
  { path: '/flights',     label: 'Flights',       icon: MdFlight },
  { path: '/contact',     label: 'Contact',       icon: MdContactMail },
]

// ─── Animated hamburger (3 morphing lines) ───────────────────────────────────
function HamburgerIcon({ isOpen }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between" aria-hidden="true">
      <motion.span
        className="block h-0.5 rounded-full bg-current origin-center"
        animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-0.5 rounded-full bg-current origin-center"
        animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-0.5 rounded-full bg-current origin-center"
        animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

// ─── Desktop nav link ────────────────────────────────────────────────────────
function DesktopNavLink({ link, isActive }) {
  const Icon = link.icon
  return (
    <Link
      to={link.path}
      className="relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 group"
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Active background pill */}
      {isActive && (
        <motion.span
          layoutId="navbar-active-pill"
          className="absolute inset-0 bg-primary-50 dark:bg-primary-500/10 rounded-xl"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      {/* Hover background */}
      <span className="absolute inset-0 rounded-xl bg-surface-100 dark:bg-surface-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${
          isActive
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-surface-600 dark:text-slate-300 group-hover:text-surface-900 dark:group-hover:text-white'
        }`}
      >
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isActive
              ? 'text-primary-500'
              : 'text-surface-400 dark:text-slate-400 group-hover:text-surface-600 dark:group-hover:text-slate-300'
          } group-hover:scale-110`}
        />
        {link.label}
      </span>

      {/* Active underline accent */}
      {isActive && (
        <motion.span
          layoutId="navbar-active-underline"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
    </Link>
  )
}

// ─── Profile dropdown menu item ───────────────────────────────────────────────
function ProfileMenuItem({ to, onClick, icon: Icon, label, danger = false }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      role="menuitem"
      className={`flex items-center gap-3 px-3.5 py-2.5 mx-1.5 mb-0.5 rounded-xl text-sm font-semibold transition-all duration-150 group ${
        danger
          ? 'text-error-500 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-950/30'
          : 'text-surface-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-surface-700/40'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-surface-400 dark:text-slate-400 group-hover:text-current" />
      {label}
    </Link>
  )
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll detection via framer-motion's scroll hook
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [profileOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleLogout = useCallback(() => {
    logout()
    setProfileOpen(false)
    setIsOpen(false)
    navigate('/')
  }, [logout, navigate])

  const isLinkActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U'
  const userName = user?.name?.split(' ')[0] || 'User'

  return (
    <>
      {/* ── Sticky Nav ───────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.15 }}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200/40 dark:border-surface-900 shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-none'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? '4.25rem' : '5rem' }}
          >
            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl"
              aria-label="TravelScape Home"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 6 }}
                whileTap={{ scale: 0.94 }}
                className="relative w-10 h-10 flex-shrink-0"
              >
                {/* Glow ring */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
                <span className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow duration-300">
                  <RiCompassDiscoverLine className="w-6 h-6 text-white" />
                </span>
              </motion.div>
              <span className="text-2xl font-bold font-heading text-surface-900 dark:text-white tracking-tight group-hover:text-primary-600 transition-colors duration-200">
                Travel
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                  Scape
                </span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ──────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary links">
              {NAV_LINKS.map((link) => (
                <DesktopNavLink
                  key={link.path}
                  link={link}
                  isActive={isLinkActive(link.path)}
                />
              ))}
            </nav>

            {/* ── Desktop Right Controls ─────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />

              {isAuthenticated ? (
                /* Profile button + dropdown */
                <div ref={profileRef} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setProfileOpen((v) => !v)}
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                    aria-label="Open user menu"
                    className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full border border-surface-200 dark:border-surface-700 hover:border-primary-400/70 bg-white/60 dark:bg-surface-800/60 hover:bg-white dark:hover:bg-surface-700 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 group"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white flex-shrink-0">
                      <span className="text-white text-sm font-bold leading-none">{userInitial}</span>
                    </div>
                    <span className="text-sm font-semibold text-surface-700 dark:text-surface-300 max-w-[80px] truncate">
                      {userName}
                    </span>
                    <motion.span
                      animate={{ rotate: profileOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown className="w-4 h-4 text-surface-400 group-hover:text-surface-600 transition-colors" />
                    </motion.span>
                  </motion.button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className="absolute right-0 mt-3 w-64 bg-white/90 dark:bg-surface-800/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-surface-200/50 dark:border-surface-700/80 overflow-hidden origin-top-right"
                        role="menu"
                        aria-label="User menu"
                      >
                        {/* User info header */}
                        <div className="px-5 py-4 bg-gradient-to-br from-primary-50/50 to-accent-50/10 dark:from-primary-950/20 dark:to-accent-950/10 border-b border-surface-100 dark:border-surface-700/80">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-md flex-shrink-0">
                              <span className="text-white font-bold">{userInitial}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-surface-900 dark:text-white truncate">{user?.name}</p>
                              <p className="text-xs text-surface-500 dark:text-slate-300 truncate mt-0.5">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="py-2">
                          <ProfileMenuItem
                            to="/profile"
                            onClick={() => setProfileOpen(false)}
                            icon={FiUser}
                            label="My Profile"
                          />
                          <ProfileMenuItem
                            to="/favorites"
                            onClick={() => setProfileOpen(false)}
                            icon={FiHeart}
                            label="Favorites"
                          />
                          {isAdmin && (
                            <ProfileMenuItem
                              to="/admin"
                              onClick={() => setProfileOpen(false)}
                              icon={FiSettings}
                              label="Admin Dashboard"
                            />
                          )}
                        </div>

                        {/* Divider + logout */}
                        <div className="border-t border-surface-100 dark:border-surface-700/80 py-2">
                          <button
                            onClick={handleLogout}
                            role="menuitem"
                            className="flex items-center gap-3 w-full px-3.5 py-2.5 mx-1.5 rounded-xl text-sm font-semibold text-error-500 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-950/30 transition-all duration-150 group cursor-pointer"
                          >
                            <FiLogOut className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-error-400 dark:text-error-500/80 group-hover:text-current" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Auth buttons */
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2.5 text-sm font-bold text-surface-700 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/register"
                      className="relative inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-white rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 group"
                    >
                      {/* Gradient background */}
                      <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300" />
                      {/* Shimmer overlay */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      {/* Shadow */}
                      <span className="absolute inset-0 shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow duration-300 rounded-xl" />
                      <span className="relative">Get Started</span>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* ── Mobile Controls ────────────────────────────────────────── */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  isOpen
                    ? 'bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                <HamburgerIcon isOpen={isOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] lg:hidden bg-white/98 dark:bg-[#0B1120]/98 backdrop-blur-2xl border-l border-surface-200/60 dark:border-surface-700/60 shadow-[-24px_0_60px_rgba(0,0,0,0.08)] dark:shadow-[-24px_0_60px_rgba(0,0,0,0.4)] flex flex-col overflow-y-auto"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-surface-100 dark:border-surface-700">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
                >
                  <span className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/30">
                    <RiCompassDiscoverLine className="w-5 h-5 text-white" />
                  </span>
                  <span className="text-lg font-bold font-heading text-surface-900 dark:text-white">
                    Travel<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Scape</span>
                  </span>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <HamburgerIcon isOpen={true} />
                </motion.button>
              </div>

              {/* User info (if logged in) */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mx-4 mt-4 p-4 bg-gradient-to-br from-primary-50 to-accent-50/20 rounded-2xl border border-primary-100/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-md flex-shrink-0">
                      <span className="text-white font-bold text-sm">{userInitial}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-surface-900 text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-surface-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Nav links */}
              <nav className="flex-1 px-4 py-4 space-y-1" aria-label="Mobile navigation">
                <p className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-surface-400">
                  Navigation
                </p>
                {NAV_LINKS.map((link, i) => {
                  const isActive = isLinkActive(link.path)
                  const Icon = link.icon
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                        }`}
                      >
                        <span
                          className={`w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-100 text-primary-600'
                              : 'bg-surface-100 text-surface-500 group-hover:bg-primary-50 group-hover:text-primary-500'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="ml-auto w-2 h-2 rounded-full bg-primary-500"
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Account section */}
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <p className="px-3 pt-4 pb-2 text-xs font-bold uppercase tracking-widest text-surface-400">
                      Account
                    </p>
                    <div className="space-y-1">
                      {[
                        { to: '/profile', icon: FiUser, label: 'My Profile' },
                        { to: '/favorites', icon: FiHeart, label: 'Favorites' },
                        ...(isAdmin ? [{ to: '/admin', icon: FiSettings, label: 'Admin Dashboard' }] : []),
                      ].map((item, i) => (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.38 + i * 0.05, type: 'spring', stiffness: 400, damping: 30 }}
                        >
                          <Link
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-all duration-200 group"
                          >
                            <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-100 text-surface-500 group-hover:bg-primary-50 group-hover:text-primary-500 transition-all duration-200 flex-shrink-0">
                              <item.icon className="w-5 h-5" />
                            </span>
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </nav>

              {/* Bottom auth / sign-out */}
              <div className="px-4 pb-6 pt-3 border-t border-surface-100">
                {isAuthenticated ? (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-xl text-sm font-bold text-error-500 border-2 border-error-200 hover:bg-error-50 hover:border-error-400 transition-all duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign Out
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                    className="flex flex-col gap-2.5"
                  >
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center px-4 py-3.5 text-sm font-bold border-2 border-surface-200 rounded-xl text-surface-700 hover:border-primary-400 hover:text-primary-600 transition-all duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="relative w-full text-center px-4 py-3.5 text-sm font-bold text-white rounded-xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500" />
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="absolute inset-0 shadow-lg shadow-primary-500/30 rounded-xl" />
                      <span className="relative">Get Started Free</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
