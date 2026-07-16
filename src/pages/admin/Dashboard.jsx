import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiMapPin, FiHome, FiCreditCard } from 'react-icons/fi'
import { MdFlight } from 'react-icons/md'
import AdminSidebar from '../../components/admin/AdminSidebar'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Users', value: '1,245', icon: FiUsers, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Destinations', value: '48', icon: FiMapPin, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-500/10' },
    { label: 'Hotels', value: '312', icon: FiHome, color: 'text-accent-500', bg: 'bg-accent-50 dark:bg-accent-500/10' },
    { label: 'Flights', value: '89', icon: MdFlight, color: 'text-coral-500', bg: 'bg-coral-50 dark:bg-coral-500/10' },
    { label: 'Revenue', value: '$45,231', icon: FiCreditCard, color: 'text-success-500', bg: 'bg-success-50 dark:bg-success-500/10' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-surface-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={activeTab}>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-surface-900 dark:text-white capitalize font-heading">{activeTab}</h1>
                {activeTab !== 'overview' && activeTab !== 'users' && (
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
                    Add New
                  </button>
                )}
              </div>

              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-sm border border-surface-200 dark:border-surface-700 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-surface-500 font-medium mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {activeTab !== 'overview' && (
                <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
                  <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white capitalize">Manage {activeTab}</h2>
                    <input 
                      type="text" 
                      placeholder={`Search ${activeTab}...`} 
                      className="px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                  <div className="p-8 text-center text-surface-500">
                    Data table for {activeTab} goes here. (Requires backend connection)
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
