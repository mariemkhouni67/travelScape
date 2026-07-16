import { motion } from 'framer-motion'
import { springSnappy } from '../../utils/transitions'

export default function BookingSteps({ step }) {
  const steps = ['Details', 'Review', 'Confirm']
  
  return (
    <div className="flex items-center justify-between mb-8 relative">
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-surface-200 dark:bg-surface-700 -z-10">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500" 
          initial={{ width: 0 }} 
          animate={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} 
          transition={springSnappy}
        />
      </div>
      {steps.map((lbl, i) => (
        <div key={lbl} className="flex flex-col items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            step >= i + 1 
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
              : 'bg-surface-200 dark:bg-surface-800 text-surface-500 dark:text-slate-400 border border-surface-200/40 dark:border-surface-700/60'
          }`}>
            {i + 1}
          </div>
          <span className={`text-xs font-bold ${
            step >= i + 1 ? 'text-surface-900 dark:text-white' : 'text-surface-400 dark:text-slate-450'
          }`}>
            {lbl}
          </span>
        </div>
      ))}
    </div>
  )
}
