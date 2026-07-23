import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiUsers, FiMapPin, FiHome, FiStar } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import { springSoft, staggerContainer, staggerChild } from '../../utils/transitions'

const icons = [FiUsers, FiMapPin, FiHome, FiStar]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const { data } = useFetch('/admin/stats')

  // Generic stats if API not running or unauthenticated
  const defaultStats = [
    { label: 'Happy Customers', value: 10000, suffix: 'K+' },
    { label: 'Destinations', value: 50, suffix: '+' },
    { label: 'Luxury Hotels', value: 500, suffix: '+' },
    { label: 'Reviews', value: 2500, suffix: '+' }
  ]

  const stats = data ? [
    { label: 'Total Users', value: data.users || 0, suffix: '' },
    { label: 'Destinations', value: data.destinations || 0, suffix: '' },
    { label: 'Hotels', value: data.hotels || 0, suffix: '' },
    { label: 'Reviews', value: data.reviews || 0, suffix: '' }
  ] : defaultStats

  return (
    <section className="py-24 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={stat.label}
                variants={staggerChild}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ willChange: 'transform' }}
                {...{ transition: { ...springSoft, duration: undefined } }}
                className="text-center p-8 bg-white dark:bg-surface-800/40 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 border border-surface-100 dark:border-surface-700/60 relative overflow-hidden group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold text-surface-900 dark:text-white mb-2 font-heading tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-surface-400 dark:text-slate-400 font-bold tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
