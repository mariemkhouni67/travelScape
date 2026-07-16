import { useState } from 'react'
import Button from '../common/Button'
import { FiStar } from 'react-icons/fi'
import api from '../../services/api'

export default function ReviewForm({ targetId, targetType, onReviewAdded }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/reviews', { targetId, targetType, rating, comment })
      setComment('')
      if (onReviewAdded) onReviewAdded()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-50 dark:bg-surface-800/50 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
      <h3 className="text-lg font-bold mb-4 text-surface-900 dark:text-white">Leave a Review</h3>
      
      {error && <div className="mb-4 text-sm text-error-500 p-3 bg-error-50 dark:bg-error-500/10 rounded-xl">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">Rating</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(star => (
            <button 
              key={star} 
              type="button" 
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <FiStar className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-surface-300 dark:text-surface-600'}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">Comment</label>
        <textarea 
          required
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white outline-none focus:border-primary-500 transition-colors resize-none"
          placeholder="Share your experience..."
        />
      </div>
      <Button type="submit" loading={loading}>Submit Review</Button>
    </form>
  )
}
