import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import { scaleIn } from '../utils/transitions'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      login(
        { _id: Date.now().toString(), name, email, role: 'user', favorites: [] },
        'mock-token-' + Date.now()
      )
      navigate('/')
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 py-10 relative overflow-hidden bg-white dark:bg-[#070B1A] transition-colors duration-300">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={scaleIn}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-surface-800/80 dark:backdrop-blur-xl rounded-3xl p-8 shadow-premium border border-surface-100 dark:border-surface-700/60">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/25">
              <span className="text-white font-bold text-2xl font-heading">T</span>
            </div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white font-heading">Create an account</h1>
            <p className="text-surface-500 dark:text-slate-400 text-sm mt-1">Start your journey with TravelScape</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-500/10 border border-error-500/20 rounded-xl text-error-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:text-slate-400 dark:hover:text-white"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-surface-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
