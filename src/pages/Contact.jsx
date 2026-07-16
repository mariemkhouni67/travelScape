import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiUser, FiMessageSquare, FiMapPin, FiPhone } from 'react-icons/fi'
import Button from '../components/common/Button'

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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4 font-heading">
            Get in Touch
          </h1>
          <p className="text-surface-500 dark:text-[#94A3B8] max-w-2xl mx-auto text-lg">
            Have questions about a booking? Want to partner with us? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Contact Information</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiMapPin className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white text-lg">Office</h3>
                  <p className="text-surface-500 dark:text-[#94A3B8]">123 Travel Street, Suite 400<br/>San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-50 dark:bg-accent-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiPhone className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white text-lg">Phone</h3>
                  <p className="text-surface-500 dark:text-[#94A3B8]">+1 (555) 123-4567<br/>Mon-Fri 9am to 6pm PST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coral-50 dark:bg-coral-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiMail className="w-5 h-5 text-coral-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white text-lg">Email</h3>
                  <p className="text-surface-500 dark:text-[#94A3B8]">support@travelscape.com<br/>partners@travelscape.com</p>
                </div>
              </div>
            </div>
            <div className="h-64 rounded-2xl overflow-hidden bg-surface-200 dark:bg-surface-800">
              {/* Map placeholder */}
              <div className="w-full h-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                <span className="text-surface-400 dark:text-surface-500">Map Integration Here</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-[#111827] p-8 rounded-3xl shadow-xl shadow-black/5 dark:shadow-black/30 border border-surface-200 dark:border-surface-700">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Send us a Message</h2>
            {status === 'success' && (
              <div className="mb-6 p-4 bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400 rounded-xl">
                Thank you for your message! We'll get back to you shortly.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-[#94A3B8] mb-1.5">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-3 w-4 h-4 text-surface-400" />
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-11 pr-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl outline-none focus:border-primary-500 text-surface-900 dark:text-white dark:placeholder-surface-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-[#94A3B8] mb-1.5">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-3 w-4 h-4 text-surface-400" />
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-11 pr-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl outline-none focus:border-primary-500 text-surface-900 dark:text-white dark:placeholder-surface-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-[#94A3B8] mb-1.5">Subject</label>
                <input type="text" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl outline-none focus:border-primary-500 text-surface-900 dark:text-white dark:placeholder-surface-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-[#94A3B8] mb-1.5">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-3 w-4 h-4 text-surface-400" />
                  <textarea rows="4" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full pl-11 pr-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl outline-none focus:border-primary-500 text-surface-900 dark:text-white dark:placeholder-surface-500 resize-none"></textarea>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
