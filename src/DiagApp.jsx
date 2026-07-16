// DIAGNOSTIC FILE - delete after debugging
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

let log = []

function tryImport(label, fn) {
  try {
    fn()
    log.push({ ok: true, label })
  } catch (e) {
    log.push({ ok: false, label, error: e.message })
  }
}

// Test 1: ThemeContext
try {
  await import('./context/ThemeContext.jsx')
  log.push({ ok: true, label: 'ThemeContext' })
} catch (e) {
  log.push({ ok: false, label: 'ThemeContext', error: e.message })
}

// Test 2: AuthContext
try {
  await import('./context/AuthContext.jsx')
  log.push({ ok: true, label: 'AuthContext' })
} catch (e) {
  log.push({ ok: false, label: 'AuthContext', error: e.message })
}

// Test 3: Navbar
try {
  await import('./components/common/Navbar.jsx')
  log.push({ ok: true, label: 'Navbar' })
} catch (e) {
  log.push({ ok: false, label: 'Navbar', error: e.message })
}

// Test 4: Footer
try {
  await import('./components/common/Footer.jsx')
  log.push({ ok: true, label: 'Footer' })
} catch (e) {
  log.push({ ok: false, label: 'Footer', error: e.message })
}

// Test 5: Home
try {
  await import('./pages/Home.jsx')
  log.push({ ok: true, label: 'Home' })
} catch (e) {
  log.push({ ok: false, label: 'Home', error: e.message })
}

// Test 6: Hero
try {
  await import('./components/home/Hero.jsx')
  log.push({ ok: true, label: 'Hero' })
} catch (e) {
  log.push({ ok: false, label: 'Hero', error: e.message })
}

// Test 7: StatsCounter
try {
  await import('./components/home/StatsCounter.jsx')
  log.push({ ok: true, label: 'StatsCounter' })
} catch (e) {
  log.push({ ok: false, label: 'StatsCounter', error: e.message })
}

// Test 8: FeaturedDestinations
try {
  await import('./components/home/FeaturedDestinations.jsx')
  log.push({ ok: true, label: 'FeaturedDestinations' })
} catch (e) {
  log.push({ ok: false, label: 'FeaturedDestinations', error: e.message })
}

// Test 9: PopularHotels
try {
  await import('./components/home/PopularHotels.jsx')
  log.push({ ok: true, label: 'PopularHotels' })
} catch (e) {
  log.push({ ok: false, label: 'PopularHotels', error: e.message })
}

// Test 10: Newsletter
try {
  await import('./components/home/Newsletter.jsx')
  log.push({ ok: true, label: 'Newsletter' })
} catch (e) {
  log.push({ ok: false, label: 'Newsletter', error: e.message })
}

// Test 11: App.jsx
try {
  await import('./App.jsx')
  log.push({ ok: true, label: 'App' })
} catch (e) {
  log.push({ ok: false, label: 'App', error: e.message })
}

function DiagPage() {
  return (
    <div style={{ fontFamily: 'monospace', padding: 20 }}>
      <h1 style={{ color: '#333' }}>🔍 TravelScape Diagnostics</h1>
      {log.map((item, i) => (
        <div key={i} style={{
          padding: '8px 12px',
          marginBottom: 6,
          background: item.ok ? '#d4edda' : '#f8d7da',
          borderRadius: 6,
          color: item.ok ? '#155724' : '#721c24',
        }}>
          {item.ok ? '✅' : '❌'} <strong>{item.label}</strong>
          {!item.ok && <div style={{ fontSize: 12, marginTop: 4 }}>Error: {item.error}</div>}
        </div>
      ))}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><DiagPage /></StrictMode>)
