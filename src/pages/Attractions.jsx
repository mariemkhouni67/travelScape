import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiCompass, FiBookOpen, FiGlobe, FiAnchor, FiNavigation,
  FiCoffee, FiMoon, FiSun, FiStar, FiMapPin, FiChevronRight, FiClock, FiCheck
} from 'react-icons/fi'
import { useLocation, Link } from 'react-router-dom'
import { REGIONS, REGION_MEGA_DATA } from '../data/destinationMegaData'

export default function Attractions() {
  const location = useLocation()
  const [selectedRegion, setSelectedRegion] = useState('europe')

  const regionData = REGION_MEGA_DATA[selectedRegion] || REGION_MEGA_DATA.europe

  // Smooth scroll to section on hash change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
  }, [location.hash])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white border border-white/15 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(99, 102, 241, 0.25), rgba(15, 23, 42, 0.95))',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30">
            <FiCompass className="w-4 h-4" /> Global Attractions & Experiences
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Tours, Museums & Experiences in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">{regionData.name}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Skip-the-line entries, guided tours, culinary experiences, and coastal adventures across {regionData.name}.
          </p>

          {/* Region Tabs */}
          <div className="pt-2 flex flex-wrap gap-2">
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 border border-sky-400/40'
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

      {/* Quick Category Anchors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10">
        <a href="#tours" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiCompass className="text-sky-400" /> Tours</a>
        <a href="#museums" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiBookOpen className="text-indigo-400" /> Museums</a>
        <a href="#historical" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiGlobe className="text-amber-400" /> Historical Sites</a>
        <a href="#cruises" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiAnchor className="text-cyan-400" /> Cruises</a>
        <a href="#adventure" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiNavigation className="text-emerald-400" /> Adventure</a>
        <a href="#food" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiCoffee className="text-rose-400" /> Food & Dining</a>
        <a href="#nightlife" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiMoon className="text-purple-400" /> Nightlife</a>
        <a href="#beaches" className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 whitespace-nowrap flex items-center gap-1.5"><FiSun className="text-yellow-400" /> Beaches</a>
      </div>

      {/* ── SECTION: TOURS ── */}
      <section id="tours" className="scroll-mt-28 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <FiCompass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Tours & Guided Experiences ({regionData.name})</h2>
            <p className="text-xs text-slate-400">{regionData.destinations.tours}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AttractionCard
            title={`VIP Guided Tour in ${regionData.name}`}
            desc={regionData.destinations.tours}
            price="$65"
            duration="3 Hours"
            badge="Best Seller"
            tagColor="sky"
          />
          <AttractionCard
            title="Private Sightseeing & Chauffeur"
            desc="Full-day custom itinerary with local expert guide."
            price="$180"
            duration="Full Day"
            badge="Luxury"
            tagColor="sky"
          />
          <AttractionCard
            title="Small Group Walking Tour"
            desc="Explore secret alleys, hidden gems & authentic local spots."
            price="$35"
            duration="2.5 Hours"
            badge="Popular"
            tagColor="sky"
          />
        </div>
      </section>

      {/* ── SECTION: MUSEUMS ── */}
      <section id="museums" className="scroll-mt-28 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <FiBookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Museums & Art Galleries ({regionData.name})</h2>
            <p className="text-xs text-slate-400">{regionData.destinations.museums}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AttractionCard
            title="Skip-The-Line Fast Track Pass"
            desc={`Priority entry to ${regionData.destinations.museums}`}
            price="$45"
            duration="Flexible Entry"
            badge="Instant Access"
            tagColor="indigo"
          />
          <AttractionCard
            title="Curated Art & History Pass"
            desc="Access top 5 museums with audio guide included."
            price="$75"
            duration="3 Days Valid"
            badge="Great Value"
            tagColor="indigo"
          />
          <AttractionCard
            title="Night at the Museum Private Tour"
            desc="Exclusive after-hours entry with art historian."
            price="$150"
            duration="2 Hours"
            badge="Exclusive"
            tagColor="indigo"
          />
        </div>
      </section>

      {/* ── SECTION: HISTORICAL SITES ── */}
      <section id="historical" className="scroll-mt-28 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <FiGlobe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Historical & World Heritage Sites ({regionData.name})</h2>
            <p className="text-xs text-slate-400">{regionData.destinations.historical_sites}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttractionCard
            title={`UNESCO Heritage Tour in ${regionData.name}`}
            desc={regionData.destinations.historical_sites}
            price="$85"
            duration="Full Day"
            badge="UNESCO Site"
            tagColor="amber"
          />
          <AttractionCard
            title="Ancient Ruins & Archaeology Tour"
            desc="Guided exploration with archaeologist expert."
            price="$95"
            duration="4 Hours"
            badge="Top Rated"
            tagColor="amber"
          />
        </div>
      </section>

      {/* ── SECTION: CRUISES ── */}
      <section id="cruises" className="scroll-mt-28 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <FiAnchor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Cruises & Boat Trips ({regionData.name})</h2>
            <p className="text-xs text-slate-400">{regionData.destinations.cruises}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AttractionCard
            title={`Sunset Yacht Cruise in ${regionData.name}`}
            desc={regionData.destinations.cruises}
            price="$110"
            duration="3 Hours"
            badge="Romantic"
            tagColor="cyan"
          />
          <AttractionCard
            title="Catamaran & Snorkeling Trip"
            desc="Crystal clear waters, buffet lunch & open bar."
            price="$95"
            duration="5 Hours"
            badge="Popular"
            tagColor="cyan"
          />
          <AttractionCard
            title="Multi-Day Island Cruise"
            desc="Explore coastal islands in luxury cabin."
            price="$450"
            duration="3 Days"
            badge="All-Inclusive"
            tagColor="cyan"
          />
        </div>
      </section>

      {/* ── SECTION: ADVENTURE ── */}
      <section id="adventure" className="scroll-mt-28 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <FiNavigation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Adventure & Outdoor Sports ({regionData.name})</h2>
            <p className="text-xs text-slate-400">{regionData.destinations.adventure}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AttractionCard
            title={`Thrill Seeker Adventure in ${regionData.name}`}
            desc={regionData.destinations.adventure}
            price="$140"
            duration="4 Hours"
            badge="Adrenaline"
            tagColor="emerald"
          />
          <AttractionCard
            title="Mountain Hiking & Wildlife Trek"
            desc="Scenic wilderness trail with certified wilderness guide."
            price="$70"
            duration="6 Hours"
            badge="Nature"
            tagColor="emerald"
          />
          <AttractionCard
            title="Scuba Diving & Reef Exploration"
            desc="PADI certified dive master included."
            price="$125"
            duration="Half Day"
            badge="Ocean"
            tagColor="emerald"
          />
        </div>
      </section>

      {/* ── SECTION: FOOD ── */}
      <section id="food" className="scroll-mt-28 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <FiCoffee className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Food & Culinary Experiences ({regionData.name})</h2>
            <p className="text-xs text-slate-400">{regionData.destinations.food}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttractionCard
            title={`Authentic Food & Wine Tasting in ${regionData.name}`}
            desc={regionData.destinations.food}
            price="$85"
            duration="3.5 Hours"
            badge="Gourmet"
            tagColor="rose"
          />
          <AttractionCard
            title="Masterclass Cooking Class"
            desc="Learn local recipes from Michelin-trained chef."
            price="$110"
            duration="3 Hours"
            badge="Hands-On"
            tagColor="rose"
          />
        </div>
      </section>

      {/* ── SECTION: NIGHTLIFE ── */}
      <section id="nightlife" className="scroll-mt-28 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <FiMoon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Nightlife & VIP Lounges ({regionData.name})</h2>
            <p className="text-xs text-slate-400">{regionData.destinations.nightlife}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttractionCard
            title={`VIP Club & Rooftop Pass in ${regionData.name}`}
            desc={regionData.destinations.nightlife}
            price="$95"
            duration="Night Access"
            badge="VIP Entry"
            tagColor="purple"
          />
          <AttractionCard
            title="Speakeasy & Cocktail Crawl"
            desc="Access 4 hidden lounges with complimentary drinks."
            price="$60"
            duration="4 Hours"
            badge="Nightlife"
            tagColor="purple"
          />
        </div>
      </section>
    </div>
  )
}

function AttractionCard({ title, desc, price, duration, badge, tagColor }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/50 transition-all duration-300 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
            {badge}
          </span>
          <span className="text-lg font-bold text-white">{price}</span>
        </div>

        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <FiClock className="w-3.5 h-3.5 text-sky-400" /> {duration}
        </span>
        <Link
          to="/booking/activity/1"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-1 hover:from-sky-400 hover:to-indigo-500 transition-all shadow-md"
        >
          <span>Book Now</span>
          <FiChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
