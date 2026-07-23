import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const destinations = [
  {
    name: 'Prague',
    img: 'https://images.unsplash.com/photo-1541849546-216509041214?q=80&w=1600',
    align: 'right',
    x: '75%',
    y: '10%',
    textOffset: 'translate-x-[-120%] translate-y-[-20%]'
  },
  {
    name: 'Berlin',
    img: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=1600',
    align: 'left',
    x: '30%',
    y: '30%',
    textOffset: 'translate-x-[40%] translate-y-[-20%]'
  },
  {
    name: 'Paris',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600',
    align: 'right',
    x: '80%',
    y: '50%',
    textOffset: 'translate-x-[-120%] translate-y-[-20%]'
  },
  {
    name: 'Madrid',
    img: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1600',
    align: 'left',
    x: '45%',
    y: '70%',
    textOffset: 'translate-x-[40%] translate-y-[-20%]'
  },
  {
    name: 'Milan',
    img: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1600',
    align: 'right',
    x: '80%',
    y: '90%',
    textOffset: 'translate-x-[-120%] translate-y-[-20%]'
  }
]

export default function TravelStripBackground() {
  const containerRef = useRef(null)
  
  // Hook scroll progress of this container to drive the parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Smooth slow parallax movement for background container
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // SVG curved path connecting:
  // (75, 50) -> (30, 150) -> (80, 250) -> (45, 350) -> (80, 450)
  const pathD = "M 75,50 C 20,70 10,130 30,150 C 50,170 100,230 80,250 C 60,270 20,330 45,350 C 70,370 90,430 80,450"

  // Soft floating particles
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
    setParticles(generated)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Parallax Container */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[116%] -top-[8%]"
      >
        {/* Strips Wrapper */}
        <div className="relative w-full h-full flex flex-col">
          {destinations.map((dest, idx) => (
            <div 
              key={dest.name} 
              className="relative w-full h-1/5 overflow-hidden border-b border-black/20"
            >
              {/* Cinematic Image / Ken Burns effect on scroll or animate */}
              <motion.img
                src={dest.img}
                alt={dest.name}
                loading="lazy"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1.02 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
              />
              
              {/* Horizontal Split Line Shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            </div>
          ))}

          {/* Dark Overlay (30-40%) for readability */}
          <div className="absolute inset-0 bg-[#070B1A]/35 backdrop-blur-[2px] mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B1A]/80 via-transparent to-[#070B1A]/80 pointer-events-none" />

          {/* Curved Travel Path & Waypoints SVG */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 500"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#80b3ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Static background shadow path for depth */}
            <path
              d={pathD}
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
              strokeOpacity="0.25"
              className="translate-x-[0.2%] translate-y-[0.1%]"
            />

            {/* The Main Travel Path Line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            />

            {/* Glowing comet / dot moving along path */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#glow-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="8 200"
              filter="url(#glow)"
              style={{
                animation: 'travel-pulse 10s linear infinite',
                willChange: 'stroke-dashoffset'
              }}
            />
          </svg>

          {/* Floating Waypoint Markers & City Text Overlay */}
          {destinations.map((dest, idx) => (
            <div
              key={`waypoint-${dest.name}`}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{ left: dest.x, top: dest.y }}
            >
              {/* Outer Pulse */}
              <div className="absolute w-6 h-6 rounded-full bg-white/20 border border-white/40 animate-ping duration-1000" />
              
              {/* Waypoint Dot */}
              <div className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] border border-blue-400 z-10" />

              {/* Handwritten text labels */}
              <div 
                className={`absolute select-none font-script text-white text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${dest.textOffset} pointer-events-none`}
                style={{ fontFamily: "'Satisfy', 'Caveat', cursive" }}
              >
                {dest.name}
              </div>
            </div>
          ))}

          {/* Floating Particles Overlay */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/30 backdrop-blur-sm pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* CSS Animation for SVG flow path */}
      <style>{`
        @keyframes travel-pulse {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -208;
          }
        }
      `}</style>
    </div>
  )
}
