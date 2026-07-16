export default function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = ['overview', 'destinations', 'hotels', 'flights', 'bookings', 'users']

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 shadow-sm border border-surface-200 dark:border-surface-700 sticky top-24">
        <h2 className="text-sm font-bold text-surface-500 uppercase tracking-wider mb-4 px-4">Admin Menu</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                activeTab === tab 
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' 
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
