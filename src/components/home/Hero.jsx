import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SearchBar from '../common/SearchBar'
import AirplaneAnimation from './AirplaneAnimation'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  // Parallax translation and opacity fades
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* 🌅 Cinematic Aerial Ocean/Islands Sunset Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover select-none pointer-events-none"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-tropical-beach-aerial-shot-11756-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Luxury gradient overlay: deep navy/black on the left for text legibility, fading to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20" />
      </motion.div>

      {/* Ambient background glows for glassmorphism pop */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ✈️ Photorealistic 3D Airplane Animation Layer */}
      <AirplaneAnimation />

      {/* ── Outer Hero Grid Container ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28 flex flex-col justify-between min-h-screen"
      >
        {/* Spacer for navigation bar layout */}
        <div className="h-12 md:h-16" />

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          {/* Left-Aligned Copy Content Column */}
          <div className="lg:col-span-7 text-left flex flex-col items-start select-none">
            {/* Premium Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white text-xs font-semibold uppercase tracking-wider shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                ✈️ Premium Luxury Travel
              </span>
            </motion.div>

            {/* Apple-style Luxury Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 font-heading tracking-tight"
            >
              Your Next <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Adventure
              </span>{' '}
              <br />
              Starts Here
            </motion.h1>

            {/* Subheading copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed font-light"
            >
              Experience ultra-luxury travel curated for the modern explorer. Discover breathtaking destinations, bespoke accommodations, and seamless flights.
            </motion.p>

            {/* Interactive Search Widget */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-xl"
            >
              <SearchBar variant="hero" placeholder="Where do you want to go?" />
            </motion.div>
          </div>

          {/* Right Column Spacer (Leaves clean space for foreground plane) */}
          <div className="lg:col-span-5 hidden lg:block h-[450px] pointer-events-none" />
        </div>

        {/* Bottom Panel: Stats and Scroll Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-12 w-full">
          {/* Glassmorphism Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="backdrop-blur-2xl bg-slate-900/40 border border-white/5 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden w-full sm:max-w-md"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            <div className="grid grid-cols-3 divide-x divide-white/10 relative z-10">
              {[
                { label: 'Destinations', value: '500+' },
                { label: 'Hotels', value: '1,200+' },
                { label: 'Happy Guests', value: '50K+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-3">
                  <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none mb-1.5 font-heading">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="hidden md:flex flex-col items-center gap-2 select-none self-end pb-2"
          >
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
            >
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom horizontal fade overlay into map/page background */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
    </section>
  )
}
