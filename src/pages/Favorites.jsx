import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import DestinationCard from '../components/cards/DestinationCard'
import HotelCard from '../components/cards/HotelCard'
import { useState } from 'react'

export default function Favorites() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('destinations')

  const { data: allDestinations = [] } = useFetch('/destinations')
  const { data: allHotels = [] } = useFetch('/hotels')

  const favoriteDestinations = allDestinations.filter(d => user?.favorites?.includes(d._id))
  const favoriteHotels = allHotels.filter(h => user?.favorites?.includes(h._id))

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-surface-900 mb-4 font-heading">Your Favorites</h1>
          <p className="text-surface-500 text-lg">Saved destinations and hotels for your next trip.</p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'destinations' ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600'}`}
          >
            Destinations ({favoriteDestinations.length})
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'hotels' ? 'bg-primary-500 text-white' : 'bg-surface-100 text-surface-600'}`}
          >
            Hotels ({favoriteHotels.length})
          </button>
        </div>

        {activeTab === 'destinations' && (
          favoriteDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteDestinations.map((dest, i) => (
                <DestinationCard key={dest._id} destination={dest} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-50 rounded-3xl">
              <p className="text-4xl mb-4">❤️</p>
              <p className="text-xl font-semibold text-surface-700 mb-2">No favorite destinations yet</p>
              <p className="text-surface-500">Start exploring and save your favorite places!</p>
            </div>
          )
        )}

        {activeTab === 'hotels' && (
          favoriteHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteHotels.map((hotel, i) => (
                <HotelCard key={hotel._id} hotel={hotel} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-50 rounded-3xl">
              <p className="text-4xl mb-4">🏨</p>
              <p className="text-xl font-semibold text-surface-700 mb-2">No favorite hotels yet</p>
              <p className="text-surface-500">Save hotels you'd love to stay at.</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
