import { useState } from 'react'
import Button from '../common/Button'

export default function BookingForm({ item, type, onSubmit }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [guests, setGuests] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      startDate,
      endDate,
      guests
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {type === 'hotel' ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Check-in Date</label>
              <input 
                required 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white outline-none focus:border-primary-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Check-out Date</label>
              <input 
                required 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white outline-none focus:border-primary-500 transition-colors" 
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Number of Guests</label>
              <select 
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white outline-none focus:border-primary-500 transition-colors"
              >
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
              </select>
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Passengers</label>
            <select 
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white outline-none focus:border-primary-500 transition-colors"
            >
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n===1?'Passenger':'Passengers'}</option>)}
            </select>
          </div>
        )}
      </div>
      <Button type="submit" className="w-full mt-6" size="lg">Continue to Review</Button>
    </form>
  )
}
