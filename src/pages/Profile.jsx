import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiEdit2 } from 'react-icons/fi'
import Button from '../components/common/Button'
import bookingService from '../services/bookingService'

export default function Profile() {
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-surface-900 font-heading">My Profile</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Details */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-surface-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 relative group">
                  <span className="text-white text-3xl font-bold">{user?.name?.charAt(0)}</span>
                  <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiEdit2 className="w-6 h-6 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-surface-900">{user?.name}</h2>
                <span className="inline-block px-3 py-1 bg-surface-100 text-surface-600 text-xs rounded-full mt-2 capitalize">{user?.role}</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <FiUser className="w-4 h-4 text-surface-400" />
                  <span className="text-surface-700">{user?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FiMail className="w-4 h-4 text-surface-400" />
                  <span className="text-surface-700">{user?.email}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6">Edit Profile</Button>
            </div>
          </motion.div>

          {/* Bookings */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-surface-200">
              <h2 className="text-2xl font-bold text-surface-900 mb-6">Booking History</h2>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-4 text-surface-500">Loading bookings...</div>
                ) : bookings.length > 0 ? (
                  bookings.map(booking => (
                    <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-surface-200 rounded-2xl">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-surface-100 text-xs font-medium rounded text-surface-600 capitalize">{booking.type}</span>
                          <span className="text-sm text-surface-500">{new Date(booking.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-semibold text-surface-900">
                          {booking.refId?.name || booking.refId?.airline || 'Booking Ref'}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                        <span className="font-bold text-lg text-surface-900">${booking.totalPrice}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          booking.status === 'confirmed' ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-surface-500 border border-dashed border-surface-200 rounded-2xl">
                    No bookings found.
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
