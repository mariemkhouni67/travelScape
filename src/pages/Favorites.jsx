import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useFetch from '../hooks/useFetch'
import DestinationCard from '../components/cards/DestinationCard'
import HotelCard from '../components/cards/HotelCard'
import { useState } from 'react'
import { staggerContainer } from '../utils/transitions'

export default function Favorites() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('destinations')

  const { data: allDestinations = [] } = useFetch('/destinations')
  const { data: allHotels = [] } = useFetch('/hotels')

  const favoriteDestinations = allDestinations.filter(d => user?.favorites?.includes(d._id))
  const favoriteHotels = allHotels.filter(h => user?.favorites?.includes(h._id))

  const tabClass = (tab) =>
    `px-6 py-2.5 rounded-xl font-bold transition-all duration-200 cursor-pointer active:scale-95 border ${
      activeTab === tab
        ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/10'
        : 'bg-surface-100 dark:bg-surface-850 border-surface-200 dark:border-surface-700/60 text-surface-600 dark:text-slate-350 hover:bg-surface-200 dark:hover:bg-surface-800'
    }`

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#070B1A] text-surface-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-4 font-heading tracking-tight">
            {t('favorites.title', 'Your Favorites')}
          </h1>
          <p className="text-surface-500 dark:text-slate-400 text-lg font-light">
            {t('favorites.subtitle', 'Saved destinations and hotels for your next trip.')}
          </p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('destinations')} className={tabClass('destinations')}>
            {t('favorites.destinations', 'Destinations')} ({favoriteDestinations.length})
          </button>
          <button onClick={() => setActiveTab('hotels')} className={tabClass('hotels')}>
            {t('nav.hotels', 'Hotels')} ({favoriteHotels.length})
          </button>
        </div>

        {activeTab === 'destinations' && (
          favoriteDestinations.length > 0 ? (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteDestinations.map((dest, i) => <DestinationCard key={dest._id} destination={dest} index={i} />)}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-surface-50 dark:bg-surface-850/45 border border-surface-200/40 dark:border-surface-700/60 rounded-3xl">
              <p className="text-4xl mb-4 animate-bounce-slow">❤️</p>
              <p className="text-xl font-bold text-surface-700 dark:text-white mb-2">{t('favorites.noDestinations', 'No favorite destinations yet')}</p>
              <p className="text-surface-500 dark:text-slate-400 font-light">{t('favorites.noDestinationsHint', 'Start exploring and save your favorite places!')}</p>
            </div>
          )
        )}

        {activeTab === 'hotels' && (
          favoriteHotels.length > 0 ? (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteHotels.map((hotel, i) => <HotelCard key={hotel._id} hotel={hotel} index={i} />)}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-surface-50 dark:bg-surface-850/45 border border-surface-200/40 dark:border-surface-700/60 rounded-3xl">
              <p className="text-4xl mb-4 animate-bounce-slow">🏨</p>
              <p className="text-xl font-bold text-surface-700 dark:text-white mb-2">{t('favorites.noHotels', 'No favorite hotels yet')}</p>
              <p className="text-surface-500 dark:text-slate-400 font-light">{t('favorites.noHotelsHint', "Save hotels you'd love to stay at.")}</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
