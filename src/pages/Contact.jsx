import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiUser, FiMessageSquare, FiMapPin, FiPhone } from 'react-icons/fi'
import Button from '../components/common/Button'
import { fadeUp, staggerContainer, staggerChild } from '../utils/transitions'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
      setTimeout(() => setStatus(null), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#070B1A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4 font-heading">
            Get in Touch
          </h1>
          <p className="text-surface-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light">
            Have questions about a booking? Want to partner with us? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-8"
          >
            <motion.h2 variants={staggerChild} className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Contact Information</motion.h2>
            <div className="space-y-6">
              {[
                {
                  icon: FiMapPin,
                  bg: 'bg-primary-50 dark:bg-primary-500/10 text-primary-500',
                  title: 'Office',
                  text: <>123 Travel Street, Suite 400<br />San Francisco, CA 94105</>
                },
                {
                  icon: FiPhone,
                  bg: 'bg-accent-50 dark:bg-accent-500/10 text-accent-500',
                  title: 'Phone',
                  text: <>+1 (555) 123-4567<br />Mon-Fri 9am to 6pm PST</>
                },
                {
                  icon: FiMail,
                  bg: 'bg-coral-50 dark:bg-coral-500/10 text-coral-500',
                  title: 'Email',
                  text: <>support@travelscape.com<br />partners@travelscape.com</>
                }
              ].map((item, idx) => (
                <motion.div key={idx} variants={staggerChild} className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-surface-900 dark:text-white text-lg">{item.title}</h3>
                    <p className="text-surface-500 dark:text-slate-300 font-light mt-0.5">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Styled Map Placeholder */}
            <motion.div
              variants={staggerChild}
              className="h-64 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700/60 relative bg-slate-900 flex flex-col items-center justify-center text-center p-6 group shadow-premium"
            >
              {/* Grid Background Pattern */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:20px_20px]" />
              {/* Radial gradient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-500/20 rounded-full blur-2xl group-hover:bg-primary-500/35 transition-colors duration-500 pointer-events-none" />

              {/* Glowing pin representation */}
              <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3">
                <FiMapPin className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
                </span>
              </div>
              <span className="relative z-10 font-bold text-white text-sm">TravelScape HQ Map Integration</span>
              <span className="relative z-10 text-xs text-slate-400 font-light mt-1">123 Travel Street, San Francisco, CA</span>
              
              {/* TODO: Replace with Leaflet MapContainer once tile server is configured */}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-surface-850/80 dark:backdrop-blur-xl p-8 rounded-3xl shadow-premium border border-surface-200 dark:border-surface-700/60"
          >
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Send us a Message</h2>
            {status === 'success' && (
              <div className="mb-6 p-4 bg-success-500/10 border border-success-500/20 text-success-600 dark:text-success-400 rounded-xl text-sm font-semibold">
                Thank you for your message! We'll get back to you shortly.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-3.5 w-4 h-4 text-surface-400 dark:text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-3.5 w-4 h-4 text-surface-400 dark:text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-surface-400 dark:text-slate-400" />
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="input-field pl-11 resize-none"
                  ></textarea>
                </div>
              </div>
              <Button type="submit" className="w-full mt-6" size="lg" loading={loading}>
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
