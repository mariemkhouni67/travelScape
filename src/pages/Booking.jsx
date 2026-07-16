import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import Button from '../components/common/Button'
import BookingSteps from '../components/booking/BookingSteps'
import BookingForm from '../components/booking/BookingForm'
import bookingService from '../services/bookingService'

export default function Booking() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    guests: 1
  })

  const endpoint = type === 'hotel' ? `/hotels/${id}` : `/flights/${id}`
  const { data: item, loading: fetchingItem } = useFetch(endpoint)

  if (fetchingItem) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-surface-50 dark:bg-[#070B1A] transition-colors duration-300">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-surface-500 dark:text-slate-400">Loading details...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-surface-50 dark:bg-[#070B1A] transition-colors duration-300">
        <div className="text-center">
          <p className="text-6xl mb-4">⚠️</p>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Item not found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    )
  }

  const calculateTotalPrice = () => {
    if (type === 'flight') {
      return item.price * bookingData.guests
    }
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
    return item.pricePerNight * diffDays * bookingData.guests
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await bookingService.createBooking({
        type,
        refId: item._id,
        dates: { 
          start: bookingData.startDate ? new Date(bookingData.startDate) : new Date(), 
          end: bookingData.endDate ? new Date(bookingData.endDate) : new Date() 
        },
        guests: bookingData.guests,
        totalPrice: calculateTotalPrice()
      })
      navigate('/profile')
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-surface-50 dark:bg-[#070B1A] text-surface-900 dark:text-white transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress */}
        <BookingSteps step={step} />

        <div className="bg-white dark:bg-surface-850/80 dark:backdrop-blur-xl rounded-3xl p-8 shadow-premium border border-surface-200 dark:border-surface-700/60">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white font-heading">Booking Details</h2>
                {type === 'hotel' ? (
                  <div className="p-4 bg-surface-50 dark:bg-surface-900/60 border border-surface-200/40 dark:border-surface-700/60 rounded-xl">
                    <p className="font-bold text-surface-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-surface-500 dark:text-slate-400 font-light mt-0.5">{item.location}</p>
                  </div>
                ) : (
                  <div className="p-4 bg-surface-50 dark:bg-surface-900/60 border border-surface-200/40 dark:border-surface-700/60 rounded-xl">
                    <p className="font-bold text-surface-900 dark:text-white">{item.airline}</p>
                    <p className="text-sm text-surface-500 dark:text-slate-400 font-light mt-0.5">{item.from} to {item.to}</p>
                  </div>
                )}
                
                <BookingForm 
                  type={type} 
                  item={item} 
                  onSubmit={(data) => {
                    setBookingData(data)
                    setStep(2)
                  }} 
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white font-heading">Review Booking</h2>
                <div className="p-6 bg-surface-50 dark:bg-surface-900/60 border border-surface-200/40 dark:border-surface-700/60 rounded-2xl mb-6 space-y-3">
                  {type === 'hotel' ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-surface-500 dark:text-slate-400">Check-in</span>
                        <span className="font-semibold text-surface-900 dark:text-white">{bookingData.startDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-surface-500 dark:text-slate-400">Check-out</span>
                        <span className="font-semibold text-surface-900 dark:text-white">{bookingData.endDate}</span>
                      </div>
                    </>
                  ) : null}
                  <div className="flex justify-between text-sm border-b border-surface-200 dark:border-surface-700/80 pb-3">
                    <span className="text-surface-500 dark:text-slate-400">{type === 'hotel' ? 'Guests' : 'Passengers'}</span>
                    <span className="font-semibold text-surface-900 dark:text-white">{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between pt-1 items-center">
                    <span className="text-surface-600 dark:text-slate-300 font-bold">Total Price</span>
                    <span className="text-2xl font-extrabold text-surface-900 dark:text-white">
                      ${calculateTotalPrice()}
                    </span>
                  </div>
                  <p className="text-xs text-surface-400 dark:text-slate-450 font-light">Taxes and fees included</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 font-bold">Back</Button>
                  <Button onClick={handleConfirm} loading={loading} className="flex-1 font-bold">Confirm Booking</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
