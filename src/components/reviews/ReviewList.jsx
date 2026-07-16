import { FiStar } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'

export default function ReviewList({ targetId, refreshTrigger }) {
  const { data: reviews, loading, error } = useFetch(`/reviews/${targetId}`, [refreshTrigger])

  if (loading) return <div className="animate-pulse h-32 bg-surface-100 rounded-2xl"></div>
  if (error) return <div className="text-error-500 text-sm">Failed to load reviews.</div>
  
  if (!reviews || reviews.length === 0) {
    return <p className="text-surface-500 py-4">No reviews yet. Be the first to review!</p>
  }

  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <div key={review._id} className="bg-white rounded-2xl p-5 border border-surface-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white text-sm font-semibold">{review.userId?.name?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <p className="font-semibold text-surface-900 text-sm">{review.userId?.name || 'Anonymous'}</p>
              <p className="text-xs text-surface-500">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-surface-300'}`} />
              ))}
            </div>
          </div>
          <p className="text-surface-600 text-sm leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
