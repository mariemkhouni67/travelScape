import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMail, FiCheck, FiCompass, FiShield, FiTrendingUp } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple email validation
    if (!email) {
      setError('Please enter your email address.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail('')
    }, 1500)
  }

  const benefits = [
    { icon: FiCompass, text: 'Exclusive curation of hidden gems' },
    { icon: FiTrendingUp, text: 'Up to 40% off member-only travel deals' },
    { icon: FiShield, text: 'Zero spam. Unsubscribe in a single click' },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-surface-50 dark:from-[#050816] dark:to-[#0B1120] transition-colors duration-300">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-surface-900 via-surface-950 to-surface-900 border border-surface-800 dark:border-surface-800/80 p-6 sm:p-12 md:p-16 lg:p-20 shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Accent radial light */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/25 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-coral-500/20 to-primary-500/25 rounded-full blur-3xl opacity-60" />

          {/* Elegant top line decoration */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Column: Info */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/10 text-white font-medium text-xs tracking-wider uppercase backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse-soft" />
                Travelscape Explorer Club
              </motion.span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                <span className="inline-block">Inspiring</span>{' '}
                <span className="inline-block">Destinations</span>{' '}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-300 to-coral-400">
                  Delivered Weekly.
                </span>
              </h2>

              <p className="text-surface-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Join our premium community of 50,000+ wanderlust enthusiasts. Discover hidden gems, save big on top hotels, and master the art of seamless travel.
              </p>

              {/* Benefits Checklist */}
              <ul className="space-y-4.5 pt-4">
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-surface-200"
                  >
                    <div className="w-6 h-6 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0 text-primary-400 mt-0.5">
                      <benefit.icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{benefit.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Column: Interaction Card */}
            <div className="lg:col-span-5 w-full">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="subscribe-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-white/5 dark:bg-surface-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
                  >
                    {/* Glowing card border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10 pointer-events-none" />

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary-500/20 border border-primary-500/30 rounded-xl flex items-center justify-center text-primary-400">
                        <FiMail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base">Stay in the Loop</h4>
                        <p className="text-xs text-surface-400 mt-0.5">No spam. Only handpicked deals.</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                      <div className="space-y-2">
                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                        <div className="relative">
                          <input
                            id="newsletter-email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (error) setError('')
                            }}
                            className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-surface-800/80 dark:bg-surface-950/80 border text-white placeholder-surface-500 text-sm focus:outline-none transition-all duration-300 ${
                              error 
                                ? 'border-error-500 focus:border-error-500 focus:ring-1 focus:ring-error-500' 
                                : 'border-surface-700/80 hover:border-surface-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                            }`}
                            aria-invalid={!!error}
                            aria-describedby={error ? "newsletter-error" : undefined}
                          />
                          <FiMail className="absolute left-4.5 top-1/2 -translate-y-1/2 text-surface-500 w-4.5 h-4.5 pointer-events-none" />
                        </div>
                        {error && (
                          <motion.p
                            id="newsletter-error"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-error-500 font-medium pl-1"
                          >
                            {error}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-bold text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Gradient background */}
                        <span className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 group-hover:from-primary-600 group-hover:via-accent-500 group-hover:to-primary-600 transition-all duration-500" />
                        {/* Shimmer sweep */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        <span className="absolute inset-0 shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow duration-300 rounded-2xl" />

                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Subscribing...
                            </>
                          ) : (
                            <>
                              Subscribe Now
                              <FiSend className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-full bg-white/5 dark:bg-surface-900/40 backdrop-blur-xl border border-primary-500/20 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="w-16 h-16 bg-success-500/20 border border-success-500/30 text-success-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                    >
                      <FiCheck className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-2">Welcome to the Club!</h3>
                    <p className="text-surface-300 text-sm mb-6 max-w-xs mx-auto">
                      Thank you for subscribing. We’ve sent a confirmation email with your first set of exclusive deals!
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-semibold text-primary-400 hover:text-primary-300 underline focus:outline-none focus:ring-1 focus:ring-primary-400 rounded px-2 py-1"
                    >
                      Subscribe another email
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
