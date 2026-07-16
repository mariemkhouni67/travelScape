import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent font-heading mb-4">404</h1>
        <h2 className="text-3xl font-bold text-surface-900 mb-4">Page Not Found</h2>
        <p className="text-surface-500 text-lg mb-8 max-w-md mx-auto">
          Oops! It looks like you're lost. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg">Go Back Home</Button>
        </Link>
      </motion.div>
    </div>
  )
}
