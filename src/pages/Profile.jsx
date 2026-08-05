import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiUser, FiMail, FiEdit2 } from 'react-icons/fi'
import Button from '../components/common/Button'
import bookingService from '../services/bookingService'
import { staggerContainer, staggerChild } from '../utils/transitions'

export default function Profile() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getUserBookings()
        setBookings(data)
      } catch (error) {
        console.error('Failed to load bookings', error)
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchBookings()
  }, [user])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#070B1A] text-surface-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white font-heading tracking-tight">
            {t('profile.title', 'My Profile')}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Details */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <div className="bg-white dark:bg-surface-850/80 dark:backdrop-blur-xl rounded-3xl p-6 shadow-premium border border-surface-200 dark:border-surface-700/60">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 relative group shadow-lg">
                  <span className="text-white text-3xl font-extrabold">{user?.name?.charAt(0).toUpperCase()}</span>
                  <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FiEdit2 className="w-6 h-6 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-surface-900 dark:text-white">{user?.name}</h2>
                <span className="inline-block px-3 py-1 bg-surface-100 dark:bg-surface-900 text-surface-600 dark:text-slate-350 text-xs font-semibold rounded-full mt-2 capitalize">{user?.role}</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <FiUser className="w-4 h-4 text-surface-400 dark:text-slate-400" />
                  <span className="text-surface-750 dark:text-slate-200 font-medium">{user?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FiMail className="w-4 h-4 text-surface-400 dark:text-slate-400" />
                  <span className="text-surface-750 dark:text-slate-200 font-medium">{user?.email}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 font-bold">{t('profile.editProfile', 'Edit Profile')}</Button>
            </div>
          </motion.div>

          {/* Bookings */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="bg-white dark:bg-surface-850/80 dark:backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-premium border border-surface-200 dark:border-surface-700/60">
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 font-heading">
                {t('profile.bookingHistory', 'Booking History')}
              </h2>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-surface-500 dark:text-slate-400 font-light">
                    <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    {t('common.loading', 'Loading...')}
                  </div>
                ) : bookings.length > 0 ? (
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                    {bookings.map(booking => (
                      <motion.div
                        key={booking._id}
                        variants={staggerChild}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-surface-200 dark:border-surface-700/60 rounded-2xl bg-white dark:bg-surface-900/40"
                      >
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-[10px] font-bold rounded uppercase tracking-wider text-surface-600 dark:text-slate-300 capitalize">{booking.type}</span>
                            <span className="text-xs text-surface-500 dark:text-slate-400 font-light">{new Date(booking.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h3 className="font-bold text-surface-900 dark:text-white">
                            {booking.refId?.name || booking.refId?.airline || t('profile.bookingRef', 'Booking Ref')}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                          <span className="font-extrabold text-lg text-surface-900 dark:text-white">${booking.totalPrice}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            booking.status === 'confirmed'
                              ? 'bg-success-500/10 dark:bg-success-500/15 text-success-600 dark:text-success-400 border border-success-500/20'
                              : 'bg-warning-500/10 dark:bg-warning-500/15 text-warning-600 dark:text-warning-400 border border-warning-500/20'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-10 text-surface-500 dark:text-slate-400 border border-dashed border-surface-200 dark:border-surface-700/60 rounded-2xl font-light">
                    {t('profile.noBookings', 'No bookings found.')}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
