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
              <label className="block text-sm font-semibold mb-1.5 text-surface-700 dark:text-slate-300">Check-in Date</label>
              <input 
                required 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field dark:[color-scheme:dark]" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-surface-700 dark:text-slate-300">Check-out Date</label>
              <input 
                required 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field dark:[color-scheme:dark]" 
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1.5 text-surface-700 dark:text-slate-300">Number of Guests</label>
              <select 
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="input-field"
              >
                {[1,2,3,4].map(n => <option key={n} value={n} className="bg-white dark:bg-surface-800 text-surface-900 dark:text-white">{n} {n===1?'Guest':'Guests'}</option>)}
              </select>
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-1.5 text-surface-700 dark:text-slate-300">Passengers</label>
            <select 
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="input-field"
            >
              {[1,2,3,4].map(n => <option key={n} value={n} className="bg-white dark:bg-surface-800 text-surface-900 dark:text-white">{n} {n===1?'Passenger':'Passengers'}</option>)}
            </select>
          </div>
        )}
      </div>
      <Button type="submit" className="w-full mt-6" size="lg">Continue to Review</Button>
    </form>
  )
}
