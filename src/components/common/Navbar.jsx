import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  FiUser, FiLogOut, FiHeart, FiSettings, FiChevronDown, FiChevronRight,
  FiNavigation, FiHome, FiTruck, FiSend, FiActivity, FiNavigation2, FiGlobe, FiPhone,
  FiSearch, FiRefreshCw, FiArrowRight, FiCompass, FiClock, FiTag, FiSun, FiGrid,
  FiStar, FiAward, FiZap, FiMapPin, FiGift, FiCreditCard, FiTrendingUp, FiBookOpen,
  FiAnchor, FiCoffee, FiMoon, FiCheckCircle, FiUserCheck, FiUsers, FiHeadphones,
  FiMessageSquare, FiHelpCircle, FiInfo
} from 'react-icons/fi'
import { RiCompassDiscoverLine } from 'react-icons/ri'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from './ThemeToggle'

// ─── Mega Menu Configuration ──────────────────────────────────────────────────
const MEGA_MENUS = [
  {
    id: 'flights',
    label: 'Flights',
    path: '/flights',
    icon: FiNavigation,
    badge: 'Popular',
    featured: {
      title: 'Summer Flight Flash Sale',
      desc: 'Save up to 35% on European & Asian round trips this week.',
      cta: 'Explore Flight Deals',
      path: '/flights',
      bg: 'from-blue-600 via-indigo-600 to-purple-600'
    },
    sections: [
      {
        title: 'Flight Options',
        items: [
          { label: 'Search Flights', desc: 'Find lowest fares worldwide', path: '/flights', icon: FiSearch },
          { label: 'Round Trip', desc: 'Flexible return dates & savings', path: '/flights', icon: FiRefreshCw },
          { label: 'One Way', desc: 'Single destination travel', path: '/flights', icon: FiArrowRight },
          { label: 'Multi-City', desc: 'Custom stopovers & routes', path: '/flights', icon: FiCompass },
        ]
      },
      {
        title: 'Services & Deals',
        items: [
          { label: 'Flight Status', desc: 'Real-time live flight tracker', path: '/flights', icon: FiClock },
          { label: 'Flight Deals', desc: 'Exclusive member discounts', path: '/flights', icon: FiTag },
        ]
      }
    ]
  },
  {
    id: 'hotels',
    label: 'Hotels',
    path: '/hotels',
    icon: FiHome,
    badge: 'Best Value',
    featured: {
      title: 'Luxury Resorts & Villas',
      desc: 'Get complimentary breakfast & spa credits at top 5-star hotels.',
      cta: 'View Resorts',
      path: '/hotels',
      bg: 'from-purple-600 via-pink-600 to-rose-600'
    },
    sections: [
      {
        title: 'Stay Categories',
        items: [
          { label: 'Hotels', desc: 'City center boutique & chains', path: '/hotels', icon: FiHome },
          { label: 'Resorts', desc: 'All-inclusive beachfront stays', path: '/hotels', icon: FiSun },
          { label: 'Apartments', desc: 'Self-catering urban homes', path: '/hotels', icon: FiGrid },
          { label: 'Villas', desc: 'Private pool & luxury estates', path: '/hotels', icon: FiStar },
        ]
      },
      {
        title: 'Exclusive Offers',
        items: [
          { label: 'Luxury Hotels', desc: '5-star curated collections', path: '/hotels', icon: FiAward },
          { label: 'Last Minute Deals', desc: 'Save up to 50% tonight', path: '/hotels', icon: FiZap },
        ]
      }
    ]
  },
  {
    id: 'cars',
    label: 'Car Rental',
    path: '/cars',
    icon: FiTruck,
    featured: {
      title: 'Free Extra Driver & GPS',
      desc: 'Book early and enjoy zero-cancellation fees on premium vehicles.',
      cta: 'Search Rentals',
      path: '/cars',
      bg: 'from-emerald-600 via-teal-600 to-cyan-600'
    },
    sections: [
      {
        title: 'Vehicle Fleet',
        items: [
          { label: 'Economy Cars', desc: 'Budget-friendly city drives', path: '/cars', icon: FiTruck },
          { label: 'SUVs', desc: 'Spacious 4WD for family trips', path: '/cars', icon: FiNavigation },
          { label: 'Luxury Cars', desc: 'Drive in high-end comfort', path: '/cars', icon: FiAward },
          { label: 'Electric Vehicles', desc: 'Eco-friendly Tesla & EVs', path: '/cars', icon: FiZap },
        ]
      },
      {
        title: 'Rental Services',
        items: [
          { label: 'Airport Pickup', desc: 'Instant keyless terminal handover', path: '/cars', icon: FiMapPin },
          { label: 'Special Offers', desc: 'Weekend & long-term savings', path: '/cars', icon: FiGift },
        ]
      }
    ]
  },
  {
    id: 'trains',
    label: 'Train Tickets',
    path: '/trains',
    icon: FiSend,
    featured: {
      title: 'European Rail Pass 2026',
      desc: 'Unlimited high-speed train travel across 33 European countries.',
      cta: 'Get Rail Pass',
      path: '/trains',
      bg: 'from-amber-600 via-orange-600 to-red-600'
    },
    sections: [
      {
        title: 'Train Travel',
        items: [
          { label: 'High-Speed Trains', desc: 'Express Eurostar, TGV & Shinkansen', path: '/trains', icon: FiZap },
          { label: 'International Routes', desc: 'Cross-border scenic journeys', path: '/trains', icon: FiGlobe },
        ]
      },
      {
        title: 'Passes & Routes',
        items: [
          { label: 'Rail Passes', desc: 'Unlimited regional & country passes', path: '/trains', icon: FiCreditCard },
          { label: 'Popular Routes', desc: 'Paris to London, Tokyo to Kyoto', path: '/trains', icon: FiTrendingUp },
        ]
      }
    ]
  },
  {
    id: 'attractions',
    label: 'Attractions',
    path: '/attractions',
    icon: FiActivity,
    badge: 'Trending',
    featured: {
      title: 'Skip-The-Line Experience',
      desc: 'Guaranteed instant entry passes for Louvre, Colosseum & Eiffel Tower.',
      cta: 'Book Attractions',
      path: '/attractions',
      bg: 'from-sky-600 via-blue-600 to-indigo-700'
    },
    sections: [
      {
        title: 'Activities & Tours',
        items: [
          { label: 'Tours', desc: 'Guided day trips & walking tours', path: '/attractions', icon: FiCompass },
          { label: 'Museums', desc: 'Art galleries & historical sites', path: '/attractions', icon: FiBookOpen },
          { label: 'Cruises', desc: 'Sunset cruises & river boat tours', path: '/attractions', icon: FiAnchor },
        ]
      },
      {
        title: 'Experiences',
        items: [
          { label: 'Adventure', desc: 'Helicopter, scuba & skydiving', path: '/attractions', icon: FiNavigation },
          { label: 'Food Experiences', desc: 'Wine tasting & cooking classes', path: '/attractions', icon: FiCoffee },
          { label: 'Nightlife', desc: 'VIP club entry & lounge passes', path: '/attractions', icon: FiMoon },
        ]
      }
    ]
  },
  {
    id: 'taxis',
    label: 'Airport Taxi',
    path: '/taxis',
    icon: FiNavigation2,
    featured: {
      title: 'Flight Delay Auto-Tracking',
      desc: 'Free 60-min driver waiting time with automatic flight status sync.',
      cta: 'Reserve Taxi',
      path: '/taxis',
      bg: 'from-cyan-600 via-blue-600 to-indigo-600'
    },
    sections: [
      {
        title: 'Transfer Types',
        items: [
          { label: 'Book Taxi', desc: 'Instant online fixed fare cab', path: '/taxis', icon: FiCheckCircle },
          { label: 'Airport Transfer', desc: 'Door-to-door terminal pickups', path: '/taxis', icon: FiMapPin },
          { label: 'Meet & Greet', desc: 'Driver greets at arrivals gate', path: '/taxis', icon: FiUserCheck },
        ]
      },
      {
        title: 'Premium Services',
        items: [
          { label: 'Luxury Transfer', desc: 'Executive Mercedes E-Class & S-Class', path: '/taxis', icon: FiAward },
          { label: 'Shuttle Service', desc: 'Shared & private group minibuses', path: '/taxis', icon: FiUsers },
        ]
      }
    ]
  },
  {
    id: 'destinations',
    label: 'Destinations',
    path: '/destinations',
    icon: FiGlobe,
    featured: {
      title: 'Top 10 Places in 2026',
      desc: 'Explore hand-picked travel guides, itineraries & hidden gems.',
      cta: 'Explore Guides',
      path: '/destinations',
      bg: 'from-indigo-600 via-purple-600 to-pink-600'
    },
    sections: [
      {
        title: 'Global Continents',
        items: [
          { label: 'Europe', desc: 'Paris, Prague, Rome, London', path: '/destinations', icon: FiGlobe },
          { label: 'Asia', desc: 'Tokyo, Bali, Bangkok, Singapore', path: '/destinations', icon: FiGlobe },
          { label: 'America', desc: 'New York, Miami, Cancun, Rio', path: '/destinations', icon: FiGlobe },
        ]
      },
      {
        title: 'Exotic Regions',
        items: [
          { label: 'Africa', desc: 'Cairo, Cape Town, Marrakech', path: '/destinations', icon: FiGlobe },
          { label: 'Middle East', desc: 'Dubai, Petra, Istanbul, Doha', path: '/destinations', icon: FiGlobe },
          { label: 'Oceania', desc: 'Sydney, Fiji, Auckland, Bora Bora', path: '/destinations', icon: FiGlobe },
        ]
      }
    ]
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    icon: FiPhone,
    featured: {
      title: '24/7 Global Travel Support',
      desc: 'Need urgent booking changes or assistance? Our concierge is live.',
      cta: 'Contact Us',
      path: '/contact',
      bg: 'from-slate-700 via-slate-800 to-slate-900'
    },
    sections: [
      {
        title: 'Customer Support',
        items: [
          { label: 'Customer Support', desc: 'Direct phone & email hotline', path: '/contact', icon: FiHeadphones },
          { label: 'Live Chat', desc: 'Instant AI & agent response', path: '/contact', icon: FiMessageSquare },
        ]
      },
      {
        title: 'Help Resources',
        items: [
          { label: 'Help Center', desc: 'Booking management & policies', path: '/contact', icon: FiHelpCircle },
          { label: 'FAQs', desc: 'Refunds, changes & cancellations', path: '/contact', icon: FiInfo },
        ]
      }
    ]
  }
]

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
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

// ─── Profile Menu Item ───────────────────────────────────────────────────────
function ProfileMenuItem({ to, onClick, icon: Icon, label, danger = false }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      role="menuitem"
      className={`flex items-center gap-3 px-3.5 py-2.5 mx-1.5 mb-0.5 rounded-xl text-sm font-semibold transition-all duration-150 group ${
        danger
          ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30'
          : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/60'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-slate-400 group-hover:text-current" />
      {label}
    </Link>
  )
}

// ─── Main Navbar Component ───────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const [expandedMobile, setExpandedMobile] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const hoverTimeoutRef = useRef(null)
  const profileRef = useRef(null)

  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll detection
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveMega(null)
    setProfileOpen(false)
  }, [location.pathname])

  // Profile click outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [profileOpen])

  // Body scroll lock on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleMouseEnter = (menuId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setActiveMega(menuId)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMega(null)
    }, 180)
  }

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
      {/* ── Fixed Navbar Container ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.15 }}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.3)]'
            : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? '4.25rem' : '5rem' }}
          >
            {/* ── Brand Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none rounded-xl flex-shrink-0"
              aria-label="TravelScape Home"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 6 }}
                whileTap={{ scale: 0.94 }}
                className="relative w-10 h-10 flex-shrink-0"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
                <span className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
                  <RiCompassDiscoverLine className="w-6 h-6 text-white" />
                </span>
              </motion.div>
              <span className="text-2xl font-bold font-heading text-white tracking-tight group-hover:text-blue-400 transition-colors duration-200">
                Travel
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">
                  Scape
                </span>
              </span>
            </Link>

            {/* ── Desktop Mega Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Primary navigation">
              {MEGA_MENUS.map((menu) => {
                const Icon = menu.icon
                const isActive = isLinkActive(menu.path)
                const isHovered = activeMega === menu.id

                return (
                  <div
                    key={menu.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(menu.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={menu.path}
                      className={`relative flex items-center gap-2 px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                        isActive || isHovered
                          ? 'text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {/* Hover background pill */}
                      <span className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                        isHovered 
                          ? 'bg-white/10 backdrop-blur-md border border-white/15' 
                          : 'opacity-0 group-hover:opacity-100 bg-white/5'
                      }`} />

                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                          isActive || isHovered ? 'text-blue-400 scale-110' : 'text-slate-400 group-hover:text-blue-300'
                        }`}
                      />
                      <span>{menu.label}</span>

                      {menu.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
                          {menu.badge}
                        </span>
                      )}

                      <FiChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
                          isHovered ? 'rotate-180 text-blue-400' : 'group-hover:text-slate-200'
                        }`}
                      />

                      {/* Active underline accent */}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-underline"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </Link>

                    {/* ── Mega Menu Dropdown ── */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] xl:w-[780px] p-6 rounded-[22px] overflow-hidden origin-top z-50 text-left"
                          style={{
                            background: 'rgba(10, 16, 32, 0.92)',
                            backdropFilter: 'blur(28px)',
                            WebkitBackdropFilter: 'blur(28px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)'
                          }}
                        >
                          <div className="grid grid-cols-12 gap-6 relative z-10">
                            {/* Left Sub-Sections (8 Columns) */}
                            <div className="col-span-8 grid grid-cols-2 gap-6">
                              {menu.sections.map((section, idx) => (
                                <div key={idx} className="space-y-3">
                                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
                                    {section.title}
                                  </h4>
                                  <div className="space-y-1.5">
                                    {section.items.map((item, iIdx) => {
                                      const ItemIcon = item.icon
                                      return (
                                        <Link
                                          key={iIdx}
                                          to={item.path}
                                          onClick={() => setActiveMega(null)}
                                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200 group"
                                        >
                                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5">
                                            <ItemIcon className="w-4 h-4" />
                                          </div>
                                          <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-1">
                                              {item.label}
                                              <FiChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                                            </p>
                                            <p className="text-[10px] text-slate-400 group-hover:text-slate-300 truncate font-light">
                                              {item.desc}
                                            </p>
                                          </div>
                                        </Link>
                                      )
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Right Featured Promo Banner (4 Columns) */}
                            <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br border border-white/15 relative overflow-hidden text-white shadow-xl" style={{ background: `linear-gradient(135deg, rgba(30,58,138,0.7), rgba(88,28,135,0.7))` }}>
                              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                              
                              <div className="relative z-10 space-y-2">
                                <span className="inline-block px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                  ✨ Exclusive Promo
                                </span>
                                <h5 className="text-sm font-bold leading-snug font-heading text-white">
                                  {menu.featured.title}
                                </h5>
                                <p className="text-[11px] text-slate-200 font-light leading-relaxed">
                                  {menu.featured.desc}
                                </p>
                              </div>

                              <Link
                                to={menu.featured.path}
                                onClick={() => setActiveMega(null)}
                                className="relative z-10 mt-4 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all flex items-center justify-between shadow-lg group"
                              >
                                <span>{menu.featured.cta}</span>
                                <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-blue-600" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>

            {/* ── Desktop Controls ── */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <ThemeToggle />

              {isAuthenticated ? (
                /* Profile Dropdown */
                <div ref={profileRef} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setProfileOpen((v) => !v)}
                    aria-expanded={profileOpen}
                    aria-label="Open user menu"
                    className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full border border-white/15 hover:border-blue-400/60 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/20 flex-shrink-0">
                      <span className="text-white text-xs font-bold leading-none">{userInitial}</span>
                    </div>
                    <span className="text-xs font-bold text-white max-w-[80px] truncate">
                      {userName}
                    </span>
                    <motion.span animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronDown className="w-4 h-4 text-slate-300" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className="absolute right-0 mt-3 w-60 rounded-2xl overflow-hidden origin-top-right z-50 text-left"
                        style={{
                          background: 'rgba(10, 16, 32, 0.92)',
                          backdropFilter: 'blur(24px)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)'
                        }}
                      >
                        <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                          <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                        </div>
                        <div className="py-2">
                          <ProfileMenuItem to="/profile" onClick={() => setProfileOpen(false)} icon={FiUser} label="My Profile" />
                          <ProfileMenuItem to="/favorites" onClick={() => setProfileOpen(false)} icon={FiHeart} label="Favorites" />
                          {isAdmin && <ProfileMenuItem to="/admin" onClick={() => setProfileOpen(false)} icon={FiSettings} label="Admin Dashboard" />}
                        </div>
                        <div className="border-t border-white/10 py-1.5">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3.5 py-2 mx-1.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            <FiLogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Auth Buttons */
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white transition-colors rounded-xl"
                  >
                    Sign In
                  </Link>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/register"
                      className="relative inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold text-white rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-300" />
                      <span className="relative">Get Started</span>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* ── Mobile Menu Trigger ── */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-all"
              >
                <HamburgerIcon isOpen={isOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Responsive Mega Menu Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,90vw)] lg:hidden bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto text-left"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
                  <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                    <RiCompassDiscoverLine className="w-5 h-5 text-white" />
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    Travel<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Scape</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
                >
                  <HamburgerIcon isOpen={true} />
                </button>
              </div>

              {/* Mobile Mega Nav Accordions */}
              <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Navigation & Services
                </p>
                {MEGA_MENUS.map((menu) => {
                  const Icon = menu.icon
                  const isExpanded = expandedMobile === menu.id

                  return (
                    <div key={menu.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                      <button
                        onClick={() => setExpandedMobile(isExpanded ? null : menu.id)}
                        className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-white hover:bg-white/5 transition-all"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-blue-400" />
                          {menu.label}
                        </span>
                        <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-blue-400' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-900/60 border-t border-white/10 px-3 py-3 space-y-3"
                          >
                            {menu.sections.map((sec, sIdx) => (
                              <div key={sIdx} className="space-y-1.5">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
                                  {sec.title}
                                </span>
                                {sec.items.map((it, iIdx) => {
                                  const ItemIcon = it.icon
                                  return (
                                    <Link
                                      key={iIdx}
                                      to={it.path}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-white/10"
                                    >
                                      <ItemIcon className="w-3.5 h-3.5 text-blue-400" />
                                      {it.label}
                                    </Link>
                                  )
                                })}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="p-4 border-t border-white/10">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl text-xs font-bold text-red-400 border border-red-500/20 bg-red-500/10 flex items-center justify-center gap-2"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2.5 text-xs font-bold border border-white/15 text-white rounded-xl"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2.5 text-xs font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-xl shadow-lg"
                    >
                      Get Started Free
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
