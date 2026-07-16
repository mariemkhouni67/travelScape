export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="skeleton h-52 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-16 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="skeleton w-full h-[600px] rounded-none" />
  )
}

export function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="skeleton h-8 w-64 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="skeleton h-80 rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          <div className="skeleton h-38 rounded-2xl" />
          <div className="skeleton h-38 rounded-2xl" />
          <div className="skeleton h-38 rounded-2xl" />
          <div className="skeleton h-38 rounded-2xl" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-5 w-1/2 rounded" />
      </div>
    </div>
  )
}

export default function Loader({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-primary-500 border-t-transparent rounded-full animate-spin`} />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-surface-950">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-surface-500 text-sm">Loading...</p>
      </div>
    </div>
  )
}
