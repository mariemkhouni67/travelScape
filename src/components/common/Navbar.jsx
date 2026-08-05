import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  FiUser, FiLogOut, FiHeart, FiSettings, FiChevronDown, FiChevronRight,
  FiNavigation, FiHome, FiTruck, FiSend, FiActivity, FiNavigation2, FiGlobe, FiPhone,
  FiSearch, FiRefreshCw, FiArrowRight, FiCompass, FiClock, FiTag, FiSun, FiGrid,
  FiStar, FiAward, FiZap, FiMapPin, FiGift, FiCreditCard, FiTrendingUp, FiBookOpen,
  FiAnchor, FiCoffee, FiMoon, FiCheckCircle, FiUserCheck, FiUsers, FiHeadphones,
  FiMessageSquare, FiHelpCircle, FiInfo, FiLogIn
} from 'react-icons/fi'
import { RiCompassDiscoverLine } from 'react-icons/ri'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { REGIONS, REGION_MEGA_DATA, HOTEL_CATEGORIES_DATA } from '../../data/destinationMegaData'
import { REGION_STYLES } from '../../data/hotelData'

// ─── Dynamic Context-Aware Mega Menu Builder ─────────────────────────────────
function getMegaMenus(selectedRegion = 'europe', selectedHotelCategory) {
  const r = (REGION_MEGA_DATA && REGION_MEGA_DATA[selectedRegion]) || (REGION_MEGA_DATA && REGION_MEGA_DATA.europe) || {}
  const regHotels = (HOTEL_CATEGORIES_DATA && HOTEL_CATEGORIES_DATA[selectedRegion]) || (HOTEL_CATEGORIES_DATA && HOTEL_CATEGORIES_DATA.europe) || {}
  const availableKeys = Object.keys(regHotels)
  const activeKey = (selectedHotelCategory && regHotels[selectedHotelCategory]) ? selectedHotelCategory : availableKeys[0]
  const activeHotelCat = regHotels[activeKey] || {
    title: 'Luxury Accommodations',
    hotels: [],
    promo: { title: 'Luxury Stay', desc: 'Book top hotels worldwide', cta: 'Explore Hotels' }
  }

  return [
    {
      id: 'flights',
      label: 'Flights',
      path: '/flights',
      icon: FiNavigation,
      badge: 'Popular',
      featured: {
        title: `${r.flag} ${r.name} Flight Deals`,
        desc: `Direct flights to ${r.flights.airports} with ${r.flights.airlines}. (${r.flights.duration})`,
        cta: `Explore ${r.name} Flights`,
        path: '/flights',
        bg: 'from-blue-600 via-indigo-600 to-purple-600'
      },
      sections: [
        {
          title: `Flight Options (${r.name})`,
          items: [
            { label: 'Search Flights', desc: `Lowest fares to ${r.name}`, path: '/flights', icon: FiSearch },
            { label: 'Top Hub Airports', desc: r.flights.airports, path: '/flights', icon: FiMapPin },
            { label: 'Featured Airlines', desc: r.flights.airlines, path: '/flights', icon: FiNavigation },
            { label: 'Flight Duration', desc: r.flights.duration, path: '/flights', icon: FiClock },
          ]
        },
        {
          title: 'Fares & Tracker',
          items: [
            { label: 'Starting Rate', desc: r.flights.start_price, path: '/flights', icon: FiTag },
            { label: 'Live Flight Tracker', desc: `Live routes to ${r.name}`, path: '/flights', icon: FiRefreshCw },
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
        title: activeHotelCat.promo.title,
        desc: `${activeHotelCat.promo.desc} Starting from $${activeHotelCat.hotels[0]?.price || 450}/night in ${r.name}.`,
        cta: activeHotelCat.promo.cta,
        path: `/hotels?category=${selectedHotelCategory}`,
        bg: 'from-purple-600 via-pink-600 to-rose-600',
        image: activeHotelCat.promo?.image || activeHotelCat.hotels[0]?.image,
      },
      sections: [
        {
          title: `${activeHotelCat.title} (${r.flag} ${r.name})`,
          items: activeHotelCat.hotels.map((h) => ({
            label: h.name,
            desc: `${h.location} • $${h.price}/night • ★ ${h.rating}`,
            subDesc: h.features.join(' • '),
            path: `/hotels`,
            icon: FiStar,
          }))
        },
        {
          title: `Category Info & Season (${r.name})`,
          items: [
            { label: 'Best Visit Months', desc: `${r.weather.best_months} (${r.weather.season})`, path: '/hotels', icon: FiClock },
            { label: 'Exclusive Deal', desc: `Up to 35% off on ${activeHotelCat.title}`, path: '/hotels', icon: FiZap },
            { label: 'Curated Amenities', desc: activeHotelCat.hotels[0]?.features.join(', '), path: '/hotels', icon: FiAward },
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
        title: `${r.flag} ${r.name} Car Rentals`,
        desc: `Rent with ${r.cars.providers}. Hubs: ${r.cars.pickup}. ${r.cars.daily_price}`,
        cta: `Rent in ${r.name}`,
        path: '/cars',
        bg: 'from-emerald-600 via-teal-600 to-cyan-600'
      },
      sections: [
        {
          title: `Fleet & Pickup (${r.name})`,
          items: [
            { label: 'Economy & City Fleet', desc: `Available across ${r.name}`, path: '/cars', icon: FiTruck },
            { label: 'SUVs & 4WD Drives', desc: `Explore ${r.name} scenic routes`, path: '/cars', icon: FiNavigation },
            { label: 'Popular Pickup Hubs', desc: r.cars.pickup, path: '/cars', icon: FiMapPin },
            { label: 'Top Rental Brands', desc: r.cars.providers, path: '/cars', icon: FiAward },
          ]
        },
        {
          title: 'Rates & Benefits',
          items: [
            { label: 'Estimated Daily Price', desc: r.cars.daily_price, path: '/cars', icon: FiTag },
            { label: 'Free Cancellation', desc: 'Zero fees up to 48h prior', path: '/cars', icon: FiGift },
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
        title: `${r.flag} ${r.name} Express Rail`,
        desc: `Networks: ${r.trains.networks}. Top routes: ${r.trains.routes}`,
        cta: `Get ${r.name} Rail Pass`,
        path: '/trains',
        bg: 'from-amber-600 via-orange-600 to-red-600'
      },
      sections: [
        {
          title: `High-Speed Rail (${r.name})`,
          items: [
            { label: 'Train Networks', desc: r.trains.networks, path: '/trains', icon: FiZap },
            { label: 'Popular Express Routes', desc: r.trains.routes, path: '/trains', icon: FiTrendingUp },
            { label: 'Cross-Border Trains', desc: `Scenic journeys across ${r.name}`, path: '/trains', icon: FiGlobe },
          ]
        },
        {
          title: 'Passes & E-Tickets',
          items: [
            { label: 'Regional Rail Passes', desc: `Unlimited passes across ${r.name}`, path: '/trains', icon: FiCreditCard },
            { label: 'Instant Mobile Pass', desc: 'Digital boarding & seat booking', path: '/trains', icon: FiSend },
          ]
        }
      ]
    },
    {
      id: 'destinations',
      label: 'Destinations',
      path: '/destinations',
      icon: FiGlobe,
      badge: 'Trending',
      featured: {
        title: `${r.flag} Explore ${r.name}`,
        desc: r.tagline,
        cta: `Discover ${r.name}`,
        path: '/destinations',
        bg: 'from-sky-600 via-indigo-600 to-purple-700'
      },
      sections: [
        {
          title: `Tours & Heritage (${r.name})`,
          items: [
            { label: 'Tours & Landmarks', desc: r.destinations.tours, path: '/attractions#tours', icon: FiCompass },
            { label: 'Museums & Art', desc: r.destinations.museums, path: '/attractions#museums', icon: FiBookOpen },
            { label: 'Historical Sites', desc: r.destinations.historical_sites, path: '/attractions#historical', icon: FiGlobe },
            { label: 'Cruises & Water', desc: r.destinations.cruises, path: '/attractions#cruises', icon: FiAnchor },
          ]
        },
        {
          title: 'Experiences & Lifestyle',
          items: [
            { label: 'Adventure & Nature', desc: r.destinations.adventure, path: '/attractions#adventure', icon: FiNavigation },
            { label: 'Food & Culinary', desc: r.destinations.food, path: '/attractions#food', icon: FiCoffee },
            { label: 'Nightlife & Clubs', desc: r.destinations.nightlife, path: '/attractions#nightlife', icon: FiMoon },
            { label: 'Beaches & Coast', desc: r.destinations.beaches, path: '/attractions#beaches', icon: FiSun },
            { label: 'Festivals & Events', desc: r.destinations.festivals, path: '/attractions#tours', icon: FiStar },
          ]
        }
      ]
    },
    {
      id: 'taxis',
      label: 'Taxi Booking',
      path: '/taxis',
      icon: FiNavigation2,
      featured: {
        title: `${r.flag} ${r.name} Airport Transfers`,
        desc: `Cabs: ${r.taxis.providers}. Terminal transfers: ${r.taxis.airport_transfer}`,
        cta: `Reserve ${r.name} Taxi`,
        path: '/taxis',
        bg: 'from-cyan-600 via-blue-600 to-indigo-600'
      },
      sections: [
        {
          title: `Local Cabs & Transfers (${r.name})`,
          items: [
            { label: 'Local Taxi Providers', desc: r.taxis.providers, path: '/taxis', icon: FiCheckCircle },
            { label: 'Airport Express Transfer', desc: r.taxis.airport_transfer, path: '/taxis', icon: FiMapPin },
            { label: 'Meet & Greet Service', desc: 'Personalized gate pickup service', path: '/taxis', icon: FiUserCheck },
          ]
        },
        {
          title: 'Fares & Duration',
          items: [
            { label: 'Estimated Fare', desc: r.taxis.average_fare, path: '/taxis', icon: FiAward },
            { label: 'Ride Duration', desc: 'Approx. 30 – 45 min terminal pickup', path: '/taxis', icon: FiClock },
          ]
        }
      ]
    },
    {
      id: 'contact',
      label: 'Travel Tips',
      path: '/contact',
      icon: FiPhone,
      featured: {
        title: `${r.flag} ${r.name} Travel Guide`,
        desc: `Currency: ${r.tips.currency} | Visa: ${r.tips.visa}`,
        cta: `${r.name} Travel Guide`,
        path: '/contact',
        bg: 'from-slate-700 via-slate-800 to-slate-900'
      },
      sections: [
        {
          title: `Essential Info (${r.name})`,
          items: [
            { label: 'Best Months to Visit', desc: `${r.weather.best_months} (${r.weather.season})`, path: '/contact', icon: FiSun },
            { label: 'Currency & Language', desc: `${r.tips.currency} • ${r.tips.language}`, path: '/contact', icon: FiGlobe },
          ]
        },
        {
          title: 'Visa & Support',
          items: [
            { label: 'Visa Requirements', desc: r.tips.visa, path: '/contact', icon: FiHelpCircle },
            { label: 'Time Zone', desc: r.tips.timezone, path: '/contact', icon: FiClock },
            { label: '24/7 Concierge Support', desc: 'Live booking assistance', path: '/contact', icon: FiMessageSquare },
          ]
        }
      ]
    }
  ]
}

// ─── Compact Pill Badge Component ─────────────────────────────────────────────
function NavBadge({ badge }) {
  if (!badge) return null

  let style = 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30 shadow-[0_0_8px_rgba(59,130,246,0.2)]'
  if (badge.toLowerCase().includes('popular')) {
    style = 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 text-amber-300 border-amber-400/40 shadow-[0_0_8px_rgba(245,158,11,0.25)]'
  } else if (badge.toLowerCase().includes('value')) {
    style = 'bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-[0_0_8px_rgba(16,185,129,0.25)]'
  } else if (badge.toLowerCase().includes('trending')) {
    style = 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 text-purple-300 border-purple-400/40 shadow-[0_0_8px_rgba(168,85,247,0.25)]'
  }

  return (
    <span className={`px-1 py-[0.5px] text-[7px] xl:text-[7.5px] font-extrabold uppercase tracking-tighter rounded-full border backdrop-blur-md transition-all duration-300 pointer-events-none whitespace-nowrap leading-none ${style}`}>
      {badge}
    </span>
  )
}

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
function HamburgerIcon({ isOpen }) {
  return (
    <div className="w-5 h-4 relative flex flex-col justify-between" aria-hidden="true">
      <motion.span
        className="block h-0.5 rounded-full bg-current origin-center"
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-0.5 rounded-full bg-current origin-center"
        animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-0.5 rounded-full bg-current origin-center"
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
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
      className={`flex items-center gap-2 px-3 py-1.5 mx-1 mb-0.5 rounded-xl text-xs font-semibold transition-all duration-300 group ${
        danger
          ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
          : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 text-slate-400 group-hover:text-blue-400" />
      {label}
    </Link>
  )
}

// ─── Main Navbar Component (Single Row Guaranteed Fit & High-Visibility Auth) ─
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const [expandedMobile, setExpandedMobile] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('europe')
  const [selectedHotelCategory, setSelectedHotelCategory] = useState('iconic')

  const hoverTimeoutRef = useRef(null)
  const profileRef = useRef(null)

  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  // Dynamic context-aware mega menu array based on active region & hotel category
  const MEGA_MENUS = useMemo(() => getMegaMenus(selectedRegion, selectedHotelCategory), [selectedRegion, selectedHotelCategory])

  // Scroll detection
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20))

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
      {/* ── Fixed Navbar Container (70px height baseline, 60px on scroll) ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.15 }}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 dark:bg-[#070B1A]/85 backdrop-blur-[28px] border-b border-white/12 shadow-[0_14px_45px_rgba(0,0,0,0.5)]'
            : 'bg-slate-950/70 dark:bg-[#070B1A]/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)]'
        }`}
      >
        <div className="w-full mx-auto px-2 sm:px-3 lg:px-3 xl:px-5">
          <div
            className="flex items-center gap-2 lg:gap-3 transition-all duration-300"
            style={{ height: scrolled ? '60px' : '70px' }}
          >
            {/* ── Brand Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-1.5 group focus:outline-none rounded-xl flex-shrink-0"
              aria-label="TravelScape Home"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 6 }}
                whileTap={{ scale: 0.94 }}
                className="relative w-8 h-8 xl:w-8.5 xl:h-8.5 flex-shrink-0"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
                <span className="relative w-8 h-8 xl:w-8.5 xl:h-8.5 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 border border-white/20">
                  <RiCompassDiscoverLine className="w-4 h-4 xl:w-4.5 xl:h-4.5 text-white" />
                </span>
              </motion.div>
              <span className="text-base xl:text-lg font-bold font-heading text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                Travel
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">
                  Scape
                </span>
              </span>
            </Link>

            {/* ── Desktop Mega Nav Links (100% Single Row, Flex-1 ensures controls stay visible) ── */}
            <nav className="hidden lg:flex items-center flex-1 min-w-0 gap-[1px] xl:gap-1 flex-nowrap" aria-label="Primary navigation">
              {MEGA_MENUS.map((menu) => {
                const Icon = menu.icon
                const isActive = isLinkActive(menu.path)
                const isHovered = activeMega === menu.id

                return (
                  <div
                    key={menu.id}
                    className="relative flex items-center h-full flex-shrink-0"
                    onMouseEnter={() => handleMouseEnter(menu.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                      <Link
                        to={menu.path}
                        className={`relative flex items-center gap-[3px] xl:gap-1 px-1.5 py-1 xl:px-2.5 xl:py-1.5 rounded-xl text-[10px] xl:text-[11.5px] font-semibold tracking-tight whitespace-nowrap transition-all duration-300 group cursor-pointer ${
                          isActive || isHovered
                            ? 'text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {/* Premium Glass Hover Background */}
                        <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                          isHovered 
                            ? 'bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]' 
                            : 'opacity-0 group-hover:opacity-100 bg-white/5 border border-transparent'
                        }`} />

                        {/* Animated Icon (Scale + Translate Y on hover) */}
                        <Icon
                          className={`w-3 h-3 xl:w-[13px] xl:h-[13px] flex-shrink-0 transition-all duration-300 ${
                            isActive || isHovered 
                              ? 'text-blue-400 scale-110 -translate-y-[1px]' 
                              : 'text-slate-400 group-hover:text-blue-300 group-hover:scale-110 group-hover:-translate-y-[1px]'
                          }`}
                        />
                        <span className="relative z-10">{t(`nav.${menu.id}`, menu.label)}</span>

                        <NavBadge badge={menu.badge} />

                        {/* Smooth Rotating Dropdown Chevron */}
                        <FiChevronDown
                          className={`w-[10px] h-[10px] xl:w-[11px] xl:h-[11px] text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                            isHovered ? 'rotate-180 text-blue-400' : 'group-hover:text-slate-200'
                          }`}
                        />

                        {/* Animated Glowing Gradient Active Underline */}
                        {isActive && (
                          <motion.span
                            layoutId="navbar-active-underline"
                            className="absolute -bottom-0.5 left-1.5 right-1.5 h-0.5 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                      </Link>
                    </motion.div>

                    {/* ── Mega Menu Dropdown Panel ── */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 mt-2 w-[720px] xl:w-[780px] p-5 rounded-[22px] overflow-hidden origin-top-left z-50 text-left"
                          style={{
                            background: 'rgba(9, 14, 28, 0.96)',
                            backdropFilter: 'blur(32px)',
                            WebkitBackdropFilter: 'blur(32px)',
                            border: '1px solid rgba(255, 255, 255, 0.14)',
                            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5), 0 0 30px rgba(79, 124, 255, 0.12)'
                          }}
                        >
                          {/* ── Region Selector Header Bar ── */}
                          <div className="mb-3.5 pb-2.5 border-b border-white/10 flex items-center justify-between gap-2 relative z-10">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                              <FiGlobe className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
                              <span>Select Region:</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                              {REGIONS.map((reg) => {
                                const isRegSelected = selectedRegion === reg.id
                                return (
                                  <button
                                    key={reg.id}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedRegion(reg.id)
                                      const newStyles = REGION_STYLES[reg.id] || []
                                      if (newStyles.length > 0) {
                                        setSelectedHotelCategory(newStyles[0].id)
                                      }
                                    }}
                                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                                      isRegSelected
                                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/40 scale-[1.02]'
                                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                                    }`}
                                  >
                                    <span className="text-xs">{reg.flag}</span>
                                    <span>{reg.label}</span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>

                          {/* ── Hotel Category Selector Bar (rendered only for Hotels tab) ── */}
                          {menu.id === 'hotels' && (
                            <div className="mb-3.5 pb-2.5 border-b border-white/10 flex items-center justify-between gap-2 relative z-10">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                                <FiHome className="w-3.5 h-3.5 text-purple-400" />
                                <span>Hotel Style:</span>
                              </div>
                              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-[580px] scrollbar-none">
                                {(REGION_STYLES[selectedRegion] || []).map((cat) => {
                                  const isCatSelected = selectedHotelCategory === cat.id
                                  return (
                                    <button
                                      key={cat.id}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedHotelCategory(cat.id)
                                      }}
                                      className={`relative px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                                        isCatSelected
                                          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-md shadow-purple-500/25 border border-purple-400/40 scale-[1.02]'
                                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                                      }`}
                                    >
                                      <span>{cat.icon}</span>
                                      <span>{cat.label}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-12 gap-5 relative z-10">
                            {/* Left Sub-Sections (8 Columns) */}
                            <div className="col-span-8 grid grid-cols-2 gap-5">
                              {menu.sections.map((section, idx) => (
                                <div key={idx} className="space-y-2.5">
                                  <h4 className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-1.5">
                                    {section.title}
                                  </h4>
                                  <div className="space-y-1">
                                    {section.items.map((item, iIdx) => {
                                      const ItemIcon = item.icon
                                      return (
                                        <Link
                                          key={iIdx}
                                          to={item.path}
                                          onClick={() => setActiveMega(null)}
                                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300 group"
                                        >
                                          <div className="w-6.5 h-6.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 flex-shrink-0 mt-0.5 shadow-sm">
                                            <ItemIcon className="w-3.5 h-3.5" />
                                          </div>
                                          <div className="min-w-0">
                                            <p className="text-[11.5px] font-bold text-slate-200 group-hover:text-white transition-colors duration-300 flex items-center gap-1">
                                              {item.label}
                                              <FiChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400" />
                                            </p>
                                            <p className="text-[9.5px] text-slate-400 group-hover:text-slate-300 truncate font-light">
                                              {item.desc}
                                            </p>
                                            {item.subDesc && (
                                              <p className="text-[8.5px] text-purple-300/80 truncate font-mono mt-0.5">
                                                {item.subDesc}
                                              </p>
                                            )}
                                          </div>
                                        </Link>
                                      )
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Right Featured Promo Banner (4 Columns with Dynamic Photo Support) */}
                            <div
                              className="col-span-4 flex flex-col justify-between p-4.5 rounded-2xl border border-white/15 relative overflow-hidden text-white shadow-xl group transition-all duration-500"
                              style={{
                                background: menu.featured.image
                                  ? `linear-gradient(to bottom, rgba(9, 14, 28, 0.45), rgba(9, 14, 28, 0.95)), url(${menu.featured.image}) center/cover no-repeat`
                                  : `linear-gradient(135deg, rgba(30,58,138,0.75), rgba(88,28,135,0.75))`
                              }}
                            >
                              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                              
                              <div className="relative z-10 space-y-1.5">
                                <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/25">
                                  ✨ Featured Recommendation
                                </span>
                                <h5 className="text-xs font-bold leading-snug font-heading text-white">
                                  {menu.featured.title}
                                </h5>
                                <p className="text-[10px] text-slate-200 font-light leading-relaxed">
                                  {menu.featured.desc}
                                </p>
                              </div>

                              <Link
                                to={menu.featured.path}
                                onClick={() => setActiveMega(null)}
                                className="relative z-10 mt-3 px-3.5 py-2 rounded-xl text-[11px] font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all duration-300 flex items-center justify-between shadow-lg group-hover:scale-[1.02]"
                              >
                                <span>{menu.featured.cta}</span>
                                <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300 text-blue-600" />
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

            {/* ── Desktop Controls (Language, Theme, Profile/Auth - Always Visible) ── */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-shrink-0">
              <LanguageSwitcher />
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
                    className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full border border-white/15 hover:border-blue-400/60 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/20 flex-shrink-0">
                      <span className="text-white text-[10px] font-bold leading-none">{userInitial}</span>
                    </div>
                    <span className="text-[10.5px] font-bold text-white max-w-[65px] truncate">
                      {userName}
                    </span>
                    <motion.span animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <FiChevronDown className="w-3 h-3 text-slate-300" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className="absolute ltr:right-0 rtl:left-0 mt-2.5 w-52 rounded-2xl overflow-hidden origin-top-right z-50 text-left ltr:text-left rtl:text-right"
                        style={{
                          background: 'rgba(10, 16, 32, 0.94)',
                          backdropFilter: 'blur(24px)',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)'
                        }}
                      >
                        <div className="px-3.5 py-2 bg-white/5 border-b border-white/10">
                          <p className="text-[11px] font-bold text-white truncate">{user?.name}</p>
                          <p className="text-[9.5px] text-slate-400 truncate">{user?.email}</p>
                        </div>
                        <div className="py-1">
                          <ProfileMenuItem to="/profile" onClick={() => setProfileOpen(false)} icon={FiUser} label={t('nav.myProfile', 'My Profile')} />
                          <ProfileMenuItem to="/favorites" onClick={() => setProfileOpen(false)} icon={FiHeart} label={t('nav.favorites', 'Favorites')} />
                          {isAdmin && <ProfileMenuItem to="/admin" onClick={() => setProfileOpen(false)} icon={FiSettings} label={t('nav.adminDashboard', 'Admin Dashboard')} />}
                        </div>
                        <div className="border-t border-white/10 py-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-3 py-1.5 mx-1 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors duration-300 cursor-pointer"
                          >
                            <FiLogOut className="w-3.5 h-3.5" />
                            {t('nav.signOut', 'Sign Out')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Auth Buttons - High Visibility "Sign In" ("Se connecter") */
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/login"
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-blue-400/50 rounded-xl transition-all duration-300 whitespace-nowrap group shadow-sm"
                  >
                    <FiUser className="w-3 h-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span>{t('nav.signIn', 'Sign In')}</span>
                  </Link>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/register"
                      className="relative inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold text-white rounded-xl overflow-hidden shadow-md shadow-blue-500/25 group transition-all duration-300 whitespace-nowrap"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-300 group-hover:brightness-110" />
                      <span className="relative z-10">{t('nav.getStarted', 'Get Started')}</span>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* ── Mobile Menu Trigger ── */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-white bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30 whitespace-nowrap shadow-sm"
                >
                  <FiUser className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('nav.signIn', 'Sign In')}</span>
                </Link>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? t('nav.closeMenu', 'Close menu') : t('nav.openMenu', 'Open menu')}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-all duration-300"
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
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
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <span className="w-7.5 h-7.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md border border-white/20">
                    <RiCompassDiscoverLine className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-base font-bold font-heading text-white">
                    Travel<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Scape</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7.5 h-7.5 rounded-lg bg-white/10 text-white flex items-center justify-center"
                >
                  <HamburgerIcon isOpen={true} />
                </button>
              </div>

              {/* Mobile Mega Nav Accordions */}
              <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {/* Mobile Region Selector */}
                <div className="mb-3.5 p-2.5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <FiGlobe className="w-3 h-3 text-blue-400" />
                    <span>Select Active Region</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {REGIONS.map((reg) => {
                      const isRegSelected = selectedRegion === reg.id
                      return (
                        <button
                          key={reg.id}
                          onClick={() => setSelectedRegion(reg.id)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                            isRegSelected
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-400/40 shadow-sm'
                              : 'text-slate-400 bg-white/5 border border-transparent'
                          }`}
                        >
                          <span>{reg.flag}</span>
                          <span>{reg.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

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
                        className="w-full flex items-center justify-between p-3 text-xs font-bold text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-blue-400" />
                          {t(`nav.${menu.id}`, menu.label)}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <NavBadge badge={menu.badge} />
                          <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-400' : ''}`} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-900/60 border-t border-white/10 px-3 py-2.5 space-y-2.5"
                          >
                            {menu.sections.map((sec, sIdx) => (
                              <div key={sIdx} className="space-y-1">
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
                                      className="flex items-center gap-2 p-1.5 rounded-lg text-[11px] font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors duration-300"
                                    >
                                      <ItemIcon className="w-3 h-3 text-blue-400" />
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
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-red-400 border border-red-500/20 bg-red-500/10 flex items-center justify-center gap-2"
                  >
                    <FiLogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2 text-xs font-bold border border-white/15 text-white rounded-xl bg-white/10 flex items-center justify-center gap-2"
                    >
                      <FiUser className="w-3.5 h-3.5 text-blue-400" />
                      {t('nav.signIn', 'Sign In')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2 text-xs font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-xl shadow-lg"
                    >
                      {t('nav.getStarted', 'Get Started')}
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
