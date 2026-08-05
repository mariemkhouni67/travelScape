import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiSend, FiMail, FiCheck, FiCompass, FiShield, FiTrendingUp } from 'react-icons/fi'

export default function Newsletter() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple email validation
    if (!email) {
      setError(t('common.validationRequired', 'Please enter your email address.'))
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t('common.invalidEmail', 'Please enter a valid email address.'))
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
    <section className="py-32 relative overflow-hidden transition-colors duration-300">
      {/* 🌫️ Soft top and bottom fades for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#070B1A] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070B1A] to-transparent pointer-events-none z-10" />

      {/* SVG noise texture for premium overlay depth */}
      <svg className="hidden" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.025 0" />
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(10, 16, 32, 0.40)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: 'rgba(255, 255, 255, 0.07)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.16)'
          }}
          className="relative overflow-hidden rounded-[2.5rem] border p-8 sm:p-14 md:p-20 lg:p-24"
        >
          {/* Subtle noise texture layer */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{ filter: 'url(#noiseFilter)' }}
          />

          {/* Animated floating light gradient inside the card */}
          <div 
            className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-gradient-to-br from-primary-500/10 to-accent-500/15 rounded-full blur-[100px] pointer-events-none opacity-80"
            style={{
              animation: 'floating-glow 12s ease-in-out infinite alternate'
            }}
          />
          <div 
            className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-gradient-to-tr from-coral-500/8 to-primary-500/12 rounded-full blur-[100px] pointer-events-none opacity-80"
            style={{
              animation: 'floating-glow 16s ease-in-out infinite alternate-reverse'
            }}
          />

          {/* Subtle top highlighting line */}
          <div className="absolute top-0 left-16 right-16 h-[1.5px] bg-gradient-to-r from-transparent via-primary-500/30 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center relative z-10">
            {/* Left Column: Info & Copy */}
            <div className="lg:col-span-7 text-left space-y-8">
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/5 border border-white/8 text-slate-200 font-medium text-xs tracking-wider uppercase backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-soft" />
                Travelscape Explorer Club
              </motion.span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
                {t('newsletter.title', 'Get Secret Deals & VIP Discounts')}
              </h2>

              <p className="text-slate-350 text-base sm:text-lg max-w-xl leading-relaxed font-light">
                {t('newsletter.subtitle', 'Subscribe to our exclusive newsletter and save up to 40% on your next trip.')}
              </p>

              {/* Benefits Checklist */}
              <ul className="space-y-4.5 pt-4">
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="flex items-start gap-4 text-sm sm:text-base text-slate-305"
                  >
                    <div className="w-6 h-6 rounded-lg bg-primary-500/15 border border-primary-500/25 flex items-center justify-center flex-shrink-0 text-primary-400 mt-0.5 shadow-sm">
                      <benefit.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-300">{benefit.text}</span>
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
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: 'rgba(18, 25, 45, 0.45)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)'
                    }}
                    className="w-full border rounded-[2rem] p-6 sm:p-9 relative overflow-hidden"
                  >
                    {/* Subtle glowing card border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />

                    <div className="flex items-center gap-3.5 mb-7">
                      <div className="w-10 h-10 bg-primary-500/15 border border-primary-500/20 rounded-xl flex items-center justify-center text-primary-350">
                        <FiMail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base">Stay in the Loop</h4>
                        <p className="text-xs text-slate-400 mt-0.5">No spam. Only handpicked deals.</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4.5 relative z-10">
                      <div className="space-y-2">
                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                        <div className="relative">
                          <input
                            id="newsletter-email"
                            type="email"
                            placeholder={t('newsletter.emailPlaceholder', 'Enter your email address')}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (error) setError('')
                            }}
                            className={`w-full ltr:pl-12 ltr:pr-5 rtl:pr-12 rtl:pl-5 py-4.5 rounded-xl border text-white placeholder-slate-400 text-sm focus:outline-none transition-all duration-300 bg-white/5 ${
                              error 
                                ? 'border-error-500/60 focus:border-error-500/80 focus:ring-1 focus:ring-error-500/40' 
                                : 'border-white/10 hover:border-white/20 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30'
                            }`}
                            aria-invalid={!!error}
                            aria-describedby={error ? "newsletter-error" : undefined}
                          />
                          <FiMail className="absolute ltr:left-4.5 rtl:right-4.5 top-1/2 -translate-y-1/2 text-slate-450 w-4.5 h-4.5 pointer-events-none" />
                        </div>
                        {error && (
                          <motion.p
                            id="newsletter-error"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-error-450 font-medium pl-1"
                          >
                            {error}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Gradient background with glow effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 group-hover:from-primary-600 group-hover:via-accent-500 group-hover:to-primary-600 transition-all duration-500" />
                        {/* Glow on hover */}
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(59,130,246,0.35)]" />
                        {/* Shimmer sweep */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              {t('newsletter.submitting', 'Subscribing...')}
                            </>
                          ) : (
                            <>
                              {t('newsletter.subscribe', 'Subscribe Now')}
                              <FiSend className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    style={{
                      background: 'rgba(18, 25, 45, 0.45)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)'
                    }}
                    className="w-full border rounded-[2rem] p-8 sm:p-10 text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="w-16 h-16 bg-success-500/15 border border-success-500/25 text-success-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                    >
                      <FiCheck className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-2">Welcome to the Club!</h3>
                    <p className="text-slate-350 text-sm mb-6 max-w-xs mx-auto font-light">
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

      {/* Floating Glow CSS Animations */}
      <style>{`
        @keyframes floating-glow {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(30px, -30px) scale(1.08) rotate(90deg);
          }
          100% {
            transform: translate(-10px, 20px) scale(0.95) rotate(180deg);
          }
        }
      `}</style>
    </section>
  )
}
