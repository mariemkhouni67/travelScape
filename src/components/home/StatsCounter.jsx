import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiUsers, FiMapPin, FiHome, FiSmile, FiStar } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'

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
  const { data, loading } = useFetch('/admin/stats')
  
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
    <section className="py-24 bg-gradient-to-b from-white via-surface-50 to-surface-50 dark:from-[#050816] dark:via-[#0B1120] dark:to-[#0B1120] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="text-center p-8 bg-white dark:bg-[#111827] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 border border-surface-100 dark:border-surface-700 relative overflow-hidden group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold text-surface-900 dark:text-white mb-2 font-heading tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-surface-500 dark:text-[#94A3B8] font-semibold tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
