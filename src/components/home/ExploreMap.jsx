import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiStar, FiArrowRight, FiX, FiCompass } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useFetch from '../../hooks/useFetch'

// ─────────────────────────────────────────────
// Fix Leaflet default icon paths in Vite/Webpack
// ─────────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ─────────────────────────────────────────────
// Destination coordinates lookup
// ─────────────────────────────────────────────
const COORDS = {
  'd1': { lat: 36.3932,  lng: 25.4615  }, // Santorini
  'd2': { lat: -8.3405,  lng: 115.0920 }, // Bali
  'd3': { lat: 46.8182,  lng: 8.2275   }, // Swiss Alps
  'd4': { lat: 35.0116,  lng: 135.7681 }, // Kyoto
  'd5': { lat: 3.2028,   lng: 73.2207  }, // Maldives
  'd6': { lat: 31.6295,  lng: -7.9811  }, // Marrakech
  'd7': { lat: 40.6333,  lng: 14.6026  }, // Amalfi Coast
  'd8': { lat: -51.6230, lng: -69.2168 }, // Patagonia
}

// ─────────────────────────────────────────────
// Custom pulsing SVG marker icon
// ─────────────────────────────────────────────
function createCustomIcon(isSelected = false) {
  const color = isSelected ? '#8B5CF6' : '#4F7CFF'
  const ring = isSelected ? '#8B5CF6' : '#4F7CFF'
  const size = isSelected ? 44 : 36

  const pulseDiv = isSelected
    ? `<div style="position:absolute;inset:-8px;border-radius:50%;border:2px solid ${ring}55;animation:ts-pulse 1.5s ease-in-out infinite;"></div>`
    : ''

  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;transform:translate(-50%,-50%)">
        <div style="
          position:absolute;inset:0;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          background:linear-gradient(135deg,${color},${isSelected ? '#4F7CFF' : '#8B5CF6'});
          box-shadow:0 4px 20px ${color}66;
        "></div>
        <div style="
          position:absolute;top:50%;left:50%;
          transform:translate(-50%,-60%);
          color:white;font-size:${isSelected ? 14 : 12}px;
        ">📍</div>
        ${pulseDiv}
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

// ─────────────────────────────────────────────
// Auto-fit map bounds to all markers
// ─────────────────────────────────────────────
function MapFitter({ destinations }) {
  const map = useMap()

  useEffect(() => {
    if (!destinations || destinations.length === 0) return
    const points = destinations
      .map(d => COORDS[d._id])
      .filter(Boolean)
      .map(c => [c.lat, c.lng])

    if (points.length > 0) {
      const bounds = L.latLngBounds(points)
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 5, animate: true })
    }
  }, [destinations, map])

  return null
}

// ─────────────────────────────────────────────
// Star rating display
// ─────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <FiStar
          key={i}
          style={{ width: 12, height: 12, color: i <= Math.round(rating) ? '#F59E0B' : '#6B7280', fill: i <= Math.round(rating) ? '#F59E0B' : 'none' }}
        />
      ))}
      <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 700, color: '#F59E0B' }}>{rating}</span>
    </span>
  )
}

// ─────────────────────────────────────────────
// Destination info panel (overlay on map, right side)
// ─────────────────────────────────────────────
function DestinationPanel({ destination, onClose }) {
  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          key={destination._id}
          initial={{ opacity: 0, x: 50, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000,
            width: 284,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,124,255,0.25)',
            background: 'linear-gradient(160deg, #121A2E 0%, #18233D 100%)',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', height: 156, overflow: 'hidden' }}>
            <img
              src={destination.images?.[0]}
              alt={destination.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #121A2E 0%, transparent 55%)' }} />
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 8, right: 8,
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.8)', cursor: 'pointer',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            >
              <FiX style={{ width: 13, height: 13 }} />
            </button>
            {/* Price badge */}
            <div style={{
              position: 'absolute', bottom: 8, left: 12,
              padding: '3px 10px', borderRadius: 20,
              background: 'linear-gradient(135deg,#4F7CFF,#8B5CF6)',
              boxShadow: '0 2px 12px rgba(79,124,255,0.5)',
              fontSize: 11, fontWeight: 700, color: '#fff',
            }}>
              from ${destination.price}/night
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '14px 16px 16px' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 6, fontFamily: 'Outfit, Inter, sans-serif' }}>
              {destination.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <FiMapPin style={{ width: 12, height: 12, color: '#93b0ff', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#7C879E' }}>{destination.location}</span>
            </div>

            <StarRating rating={destination.avgRating} />

            <p style={{ fontSize: 12, color: '#7C879E', lineHeight: 1.55, margin: '10px 0 14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {destination.description}
            </p>

            <Link
              to={`/destinations/${destination._id}`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                width: '100%', padding: '9px 0', borderRadius: 12,
                background: 'linear-gradient(135deg, #4F7CFF 0%, #8B5CF6 100%)',
                boxShadow: '0 4px 16px rgba(79,124,255,0.35)',
                color: '#fff', fontSize: 13, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              View Details <FiArrowRight style={{ width: 13, height: 13 }} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────
// Dark tile overlay CSS
// ─────────────────────────────────────────────
const DARK_MAP_CSS = `
  .ts-map-wrap .leaflet-tile {
    filter: invert(100%) hue-rotate(180deg) brightness(0.85);
  }
  .ts-map-wrap .leaflet-container {
    background: #070B1A !important;
    font-family: Inter, sans-serif;
  }
  .ts-map-wrap .leaflet-control-zoom a {
    background: #121A2E !important;
    color: #93b0ff !important;
    border-color: rgba(79,124,255,0.3) !important;
    transition: all 0.2s;
  }
  .ts-map-wrap .leaflet-control-zoom a:hover {
    background: #18233D !important;
    color: #4F7CFF !important;
  }
  .ts-map-wrap .leaflet-control-attribution {
    background: rgba(7,11,26,0.7) !important;
    color: #5a6885 !important;
    backdrop-filter: blur(6px);
    font-size: 10px;
  }
  .ts-map-wrap .leaflet-control-attribution a {
    color: #7C879E !important;
  }
  @keyframes ts-pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.35; transform:scale(1.35); }
  }
`

// ─────────────────────────────────────────────
// Main ExploreMap component
// ─────────────────────────────────────────────
export default function ExploreMap() {
  const { data, loading } = useFetch('/destinations')
  const destinations = Array.isArray(data) ? data : []
  const [selected, setSelected] = useState(null)
  const [mapReady, setMapReady] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: "400px", once: true })

  const destWithCoords = destinations.filter(d => COORDS[d._id])

  return (
    <section ref={sectionRef} style={{ paddingTop: 80, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Inject CSS */}
      <style>{DARK_MAP_CSS}</style>

      {/* Background glows */}
      <div style={{ position: 'absolute', top: 0, left: '25%', width: 400, height: 400, background: 'rgba(79,124,255,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: '25%', width: 400, height: 400, background: 'rgba(139,92,246,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 16px', borderRadius: 99,
            background: 'rgba(79,124,255,0.12)',
            border: '1px solid rgba(79,124,255,0.25)',
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#93b0ff', marginBottom: 16,
          }}>
            <FiCompass style={{ width: 14, height: 14, animation: 'spin 4s linear infinite' }} />
            Interactive Map
          </span>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

          <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: '#fff', marginBottom: 12, fontFamily: 'Outfit, Inter, sans-serif', letterSpacing: '-0.02em' }}>
            Explore on{' '}
            <span style={{ background: 'linear-gradient(90deg,#93b0ff,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Map
            </span>
          </h2>
          <p style={{ color: '#7C879E', maxWidth: 520, margin: '0 auto', fontSize: 15 }}>
            Discover all destinations on the world map. Click a marker or a chip to explore.
          </p>
        </motion.div>

        {/* ── Map card ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(79,124,255,0.18)',
            position: 'relative',
          }}
        >
          {/* Loading overlay */}
          <AnimatePresence>
            {(loading || !mapReady) && (
              <motion.div
                key="map-loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 2000,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
                  background: 'linear-gradient(135deg,#121A2E,#18233D)',
                }}
              >
                <div style={{ position: 'relative', width: 64, height: 64 }}>
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: '4px solid transparent',
                    borderTopColor: '#4F7CFF',
                    borderRightColor: '#8B5CF6',
                    animation: 'spin 1s linear infinite',
                  }} />
                  <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiCompass style={{ width: 24, height: 24, color: '#93b0ff' }} />
                  </div>
                </div>
                <p style={{ color: '#7C879E', fontSize: 13, fontWeight: 500 }}>Loading interactive map…</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Leaflet map */}
          <div className="ts-map-wrap" style={{ height: 560 }}>
            {inView && (
              <MapContainer
                center={[20, 10]}
                zoom={2}
                style={{ width: '100%', height: '100%' }}
                zoomControl={true}
                whenReady={() => setMapReady(true)}
                maxZoom={14}
                minZoom={2}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  maxZoom={19}
                />
                <MapFitter destinations={destWithCoords} />

                {destWithCoords.map(dest => {
                  const { lat, lng } = COORDS[dest._id]
                  const isSelected = selected?._id === dest._id
                  return (
                    <Marker
                      key={dest._id}
                      position={[lat, lng]}
                      icon={createCustomIcon(isSelected)}
                      eventHandlers={{
                        click: () => setSelected(isSelected ? null : dest),
                      }}
                    />
                  )
                })}
              </MapContainer>
            )}

            {/* Info panel */}
            <DestinationPanel destination={selected} onClose={() => setSelected(null)} />

            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
              background: 'linear-gradient(to top, rgba(7,11,26,0.55), transparent)',
              pointerEvents: 'none', zIndex: 500,
            }} />
          </div>
        </motion.div>

        {/* ── Destination chips ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 28 }}
        >
          {destWithCoords.map(dest => {
            const isSelected = selected?._id === dest._id
            return (
              <button
                key={dest._id}
                onClick={() => setSelected(isSelected ? null : dest)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: isSelected
                    ? 'linear-gradient(135deg, #4F7CFF, #8B5CF6)'
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isSelected ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                  color: isSelected ? '#fff' : 'rgba(183,192,209,0.9)',
                  boxShadow: isSelected ? '0 4px 16px rgba(79,124,255,0.35)' : 'none',
                  transform: 'scale(1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                <FiMapPin style={{ width: 13, height: 13, flexShrink: 0 }} />
                {dest.name}
              </button>
            )
          })}
        </motion.div>

        {/* ── CTA ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          style={{ textAlign: 'center', marginTop: 36 }}
        >
          <Link
            to="/destinations"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 12,
              border: '2px solid rgba(79,124,255,0.35)',
              color: '#93b0ff', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#4F7CFF'; e.currentTarget.style.background = 'rgba(79,124,255,0.1)'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,124,255,0.35)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Explore All Destinations <FiArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
