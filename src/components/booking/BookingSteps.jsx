import { motion } from 'framer-motion'

export default function BookingSteps({ step }) {
  const steps = ['Details', 'Review', 'Confirm']
  
  return (
    <div className="flex items-center justify-between mb-8 relative">
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-surface-200 dark:bg-surface-700 -z-10">
        <motion.div 
          className="h-full bg-primary-500" 
          initial={{ width: 0 }} 
          animate={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} 
        />
      </div>
      {steps.map((lbl, i) => (
        <div key={lbl} className="flex flex-col items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= i + 1 
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
              : 'bg-surface-200 dark:bg-surface-700 text-surface-500'
          }`}>
            {i + 1}
          </div>
          <span className={`text-xs font-medium ${
            step >= i + 1 ? 'text-surface-900 dark:text-white' : 'text-surface-500'
          }`}>
            {lbl}
          </span>
        </div>
      ))}
    </div>
  )
}
