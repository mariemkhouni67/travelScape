import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
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

  if (fetchingItem) return <div className="pt-24 text-center">Loading...</div>
  if (!item) return <div className="pt-24 text-center">Item not found</div>

  const calculateTotalPrice = () => {
    if (type === 'flight') {
      return item.price * bookingData.guests
    }
    // Calculate hotel price based on days
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
    <div className="min-h-screen pt-24 pb-16 bg-surface-50">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress */}
        <BookingSteps step={step} />

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-surface-200">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold mb-6 text-surface-900">Booking Details</h2>
              {type === 'hotel' ? (
                <div className="p-4 bg-surface-50 rounded-xl">
                  <p className="font-bold text-surface-900">{item.name}</p>
                  <p className="text-sm text-surface-500">{item.location}</p>
                </div>
              ) : (
                <div className="p-4 bg-surface-50 rounded-xl">
                  <p className="font-bold text-surface-900">{item.airline}</p>
                  <p className="text-sm text-surface-500">{item.from} to {item.to}</p>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold mb-6 text-surface-900">Review Booking</h2>
              <div className="p-6 bg-surface-50 rounded-2xl mb-6 space-y-3">
                {type === 'hotel' ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-500">Check-in</span>
                      <span className="font-medium text-surface-900">{bookingData.startDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-500">Check-out</span>
                      <span className="font-medium text-surface-900">{bookingData.endDate}</span>
                    </div>
                  </>
                ) : null}
                <div className="flex justify-between text-sm border-b border-surface-200 pb-3">
                  <span className="text-surface-500">{type === 'hotel' ? 'Guests' : 'Passengers'}</span>
                  <span className="font-medium text-surface-900">{bookingData.guests}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-surface-600 font-semibold">Total Price</span>
                  <span className="text-2xl font-bold text-surface-900">
                    ${calculateTotalPrice()}
                  </span>
                </div>
                <p className="text-sm text-surface-500">Taxes and fees included</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={handleConfirm} loading={loading} className="flex-1">Confirm Booking</Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
