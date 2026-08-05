import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import { scaleIn } from '../utils/transitions'

export default function Login() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (email === 'admin@travelscape.com' && password === 'admin123') {
        login({ _id: 'admin1', name: 'Admin User', email, role: 'admin', favorites: [] }, 'mock-admin-token')
        navigate(from, { replace: true })
      } else if (email && password.length >= 6) {
        login({ _id: 'u1', name: email.split('@')[0], email, role: 'user', favorites: [] }, 'mock-user-token')
        navigate(from, { replace: true })
      } else {
        setError(t('login.invalidCredentials', 'Invalid email or password (min 6 characters)'))
      }
    } catch {
      setError(t('login.error', 'Login failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden bg-white dark:bg-[#070B1A] transition-colors duration-300">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />

      <motion.div initial="hidden" animate="visible" variants={scaleIn} className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-surface-800/80 dark:backdrop-blur-xl rounded-3xl p-8 shadow-premium border border-surface-100 dark:border-surface-700/60">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/25">
              <span className="text-white font-bold text-2xl font-heading">T</span>
            </div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white font-heading">{t('login.title', 'Welcome back')}</h1>
            <p className="text-surface-500 dark:text-slate-400 text-sm mt-1">{t('login.subtitle', 'Sign in to your TravelScape account')}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-500/10 border border-error-500/20 rounded-xl text-error-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">{t('contact.email', 'Email')}</label>
              <div className="relative">
                <FiMail className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400" />
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-field ltr:pl-11 rtl:pr-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-surface-700 dark:text-slate-300 mb-1.5">{t('login.password', 'Password')}</label>
              <div className="relative">
                <FiLock className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required minLength={6}
                  className="input-field ltr:pl-11 rtl:pr-11 ltr:pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:text-slate-400 dark:hover:text-white"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg" loading={loading}>
              {t('login.signIn', 'Sign In')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-surface-500 dark:text-slate-400">
              {t('login.noAccount', "Don't have an account?")}{' '}
              <Link to="/register" className="text-primary-500 font-semibold hover:underline">
                {t('login.signUp', 'Sign up')}
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-surface-50 dark:bg-surface-900/60 border border-surface-200/40 dark:border-surface-700/40 rounded-xl">
            <p className="text-xs font-bold text-surface-600 dark:text-slate-300 mb-2 uppercase tracking-wider">{t('login.demoCredentials', 'Demo credentials')}:</p>
            <p className="text-xs text-surface-500 dark:text-slate-400">Admin: admin@travelscape.com / admin123</p>
            <p className="text-xs text-surface-500 dark:text-slate-400">User: any email / 6+ char password</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
