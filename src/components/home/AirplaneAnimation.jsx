/**
 * AirplaneAnimation — Premium Photorealistic Top-View Edition
 * ────────────────────────────────────────────────────────────
 * Loads the photorealistic Boeing 787 / Airbus A350 aircraft asset (/dreamliner_jet.png)
 * and animates it in a luxury, cinematic 3D loop constrained to the right side of the screen.
 * Optimized: Uses direct DOM mutations via refs inside requestAnimationFrame to avoid React overhead.
 */

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

// ─── Trail Canvas Renderer ───────────────────────────────────────────────────
// Emits soft white contrail puffs with depth-based fade and expansion.
function useContrailCanvas(canvasRef) {
  const particles = useRef([])

  const addParticle = useCallback((x, y, pscale, zDepth) => {
    // Twin engine exhaust plumes
    for (let side of [-1, 1]) {
      particles.current.push({
        x: x + (Math.random() - 0.5) * 8 + side * 12 * pscale,
        y: y + (Math.random() - 0.5) * 8 + side * 6 * pscale,
        radius: (4 + Math.random() * 3) * pscale,
        alpha: 0.5 + Math.random() * 0.12,
        life: 1,
        decay: 0.003 + Math.random() * 0.002, // long-lasting luxurious contrail
        zDepth,
      })
    }
    // Cap particles at 200 to save CPU/GPU
    if (particles.current.length > 200) {
      // Remove dead ones first, then oldest
      particles.current = particles.current.filter(p => p.life > 0)
      while (particles.current.length > 200) {
        particles.current.shift()
      }
    }
  }, [])

  const drawTrail = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Only draw alive particles, avoid sorting every frame to save CPU
    particles.current = particles.current.filter(p => p.life > 0)

    for (const p of particles.current) {
      const depthFade = p.zDepth < 0 ? 1 - Math.abs(p.zDepth) * 0.45 : 1
      const finalAlpha = p.alpha * p.life * depthFade

      ctx.save()
      const r = p.radius * 6.5
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
      g.addColorStop(0, `rgba(255, 255, 255, ${finalAlpha * 0.95})`)
      g.addColorStop(0.35, `rgba(241, 245, 249, ${finalAlpha * 0.45})`)
      g.addColorStop(1, `rgba(255, 255, 255, 0)`)

      ctx.beginPath()
      ctx.fillStyle = g
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      p.life -= p.decay
      p.radius *= 1.0035 // gradual puff dispersion
    }
  }, [canvasRef])

  return { addParticle, drawTrail }
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AirplaneAnimation() {
  const prefersReduced = useReducedMotion()
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  
  // DOM Refs for direct manipulation to bypass React render cycle
  const shadowRef = useRef(null)
  const planePositionerRef = useRef(null)
  const planeRotatorRef = useRef(null)
  const planeImgRef = useRef(null)

  const { addParticle, drawTrail } = useContrailCanvas(canvasRef)

  useEffect(() => {
    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    let W = container.offsetWidth
    let H = container.offsetHeight
    let scale = 1

    let isVisible = true
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(container)

    const syncCanvas = () => {
      if (!containerRef.current || !canvasRef.current) return
      W = containerRef.current.offsetWidth
      H = containerRef.current.offsetHeight
      canvasRef.current.width = W
      canvasRef.current.height = H

      // Responsive scale multiplier (plane occupies ~35-45% of right side)
      scale = W < 640 ? 0.45 : W < 1024 ? 0.65 : 0.95
    }

    // Debounced resize
    let resizeTimer
    const handleResize = () => {
      cancelAnimationFrame(resizeTimer)
      resizeTimer = requestAnimationFrame(syncCanvas)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    syncCanvas()

    // ── Flight Path ───────────────────────────────────────────────────────
    const DURATION = 14000 // 14 seconds premium slow cinematic loop

    const getPos = (t) => {
      const a = 2 * Math.PI * t
      const centerX = W * 0.72 // right side center
      const centerY = H * 0.45 // middle vertical alignment
      const rx = W * 0.14      // horizontal radius (sweeps right side)
      const ry = H * 0.14      // vertical radius
      
      const x = centerX + rx * Math.cos(a)
      const y = centerY + ry * Math.sin(2 * a) // graceful double-loop profile
      const z = Math.sin(a)                    // depth projection

      // Gentle floating / turbulence
      const fx = Math.cos(t * 8 * Math.PI) * 8
      const fy = Math.sin(t * 12 * Math.PI) * 10
      return { x: x + fx, y: y + fy, z }
    }

    let startTime = null
    let sPitch = 0, sRoll = 0, sYaw = 0, sBlur = 0

    function loop(now) {
      rafRef.current = requestAnimationFrame(loop)
      
      if (!isVisible) return // Pause animation when off-screen

      if (!startTime) startTime = now
      const t = ((now - startTime) % DURATION) / DURATION

      const pos = getPos(t)
      const dt = 0.0018
      const posN = getPos((t + dt) % 1)
      const posP = getPos((t - dt + 1) % 1)

      const dx = posN.x - pos.x, dy = posN.y - pos.y, dz = posN.z - pos.z
      const pdx = pos.x - posP.x, pdy = pos.y - posP.y, pdz = pos.z - posP.z

      // ── Calculate Rotations ──────────────────────────────────────────────
      let yaw = Math.atan2(dz, dx) * (180 / Math.PI)
      
      const horizSpeed = Math.sqrt(dx * dx + dz * dz) || 0.001
      const targetPitch = Math.max(-20, Math.min(20, Math.atan2(dy, horizSpeed) * (180 / Math.PI) * 1.5))

      const curHeading = Math.atan2(dy, dx)
      const prevHeading = Math.atan2(pdy, pdx)
      let dHead = curHeading - prevHeading
      if (dHead > Math.PI) dHead -= 2 * Math.PI
      if (dHead < -Math.PI) dHead += 2 * Math.PI
      const targetRoll = Math.max(-30, Math.min(30, dHead * (180 / Math.PI) * 12))

      const speed = Math.sqrt(dx * dx + dy * dy)
      const targetBlur = Math.max(0, (speed - 1.5) * 0.15)

      // Smooth out transformations
      sPitch += (targetPitch - sPitch) * 0.1
      sRoll += (targetRoll - sRoll) * 0.1
      sYaw += (yaw - sYaw) * 0.1
      sBlur += (targetBlur - sBlur) * 0.1

      // ── Direct DOM Mutations ─────────────────────────────────────────────
      const currentScale = scale * (1 + 0.35 * pos.z)
      const depthBlur = pos.z < 0 ? Math.abs(pos.z) * 2.2 : 0
      const totalBlur = Math.min(3.0, depthBlur + sBlur)
      const brightness = 1 + pos.z * 0.15
      const contrast = 1 + pos.z * 0.08

      if (planePositionerRef.current) {
        planePositionerRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      
      if (planeRotatorRef.current) {
        planeRotatorRef.current.style.transform = `
          translate(-50%, -50%)
          perspective(800px)
          rotateY(${sYaw}deg)
          rotateX(${sPitch}deg)
          rotateZ(${sRoll}deg)
        `
        planeRotatorRef.current.style.filter = `blur(${totalBlur}px) brightness(${brightness}) contrast(${contrast})`
      }

      if (planeImgRef.current) {
        planeImgRef.current.style.width = `${380 * currentScale}px`
      }

      // Shadow DOM
      if (shadowRef.current) {
        const shadowW = 380 * currentScale
        const shadowH = 70 * currentScale
        const shadowX = pos.x - 30 * currentScale
        const shadowY = pos.y + (130 - pos.z * 30) * currentScale
        const shadowOpa = 0.15 * (1 + pos.z * 0.3)
        const shadowBlr = 16 + (1 - pos.z) * 8

        shadowRef.current.style.transform = `translate3d(${shadowX}px, ${shadowY}px, 0) translate(-50%, -50%) rotate(${sYaw}deg)`
        shadowRef.current.style.width = `${shadowW}px`
        shadowRef.current.style.height = `${shadowH}px`
        shadowRef.current.style.opacity = shadowOpa
        shadowRef.current.style.filter = `blur(${shadowBlr}px)`
      }

      // ── Contrail Emission ────────────────────────────────────────────────
      const cs = scale * (1 + 0.35 * pos.z)
      const headingRad = Math.atan2(dy, dx)
      // emit contrail from the rear engines (~110px back from center at full scale)
      const trailX = pos.x + Math.cos(headingRad) * -(110 * cs)
      const trailY = pos.y + Math.sin(headingRad) * -(110 * cs)
      addParticle(trailX, trailY, cs, pos.z)
      drawTrail()
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [prefersReduced, addParticle, drawTrail])

  if (prefersReduced) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 15,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Contrail Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Photorealistic Height-Aware Shadow */}
      <div
        ref={shadowRef}
        style={{
          position: 'absolute',
          left: 0, top: 0,
          background: 'rgba(0, 0, 0, 0.22)',
          borderRadius: '50%',
          willChange: 'transform, width, height, opacity, filter',
          zIndex: 14,
        }}
      />

      {/* Airplane 3D Container Positioner */}
      <div
        ref={planePositionerRef}
        style={{
          position: 'absolute',
          left: 0, top: 0,
          willChange: 'transform',
          zIndex: 15,
        }}
      >
        {/* Airplane Rotator */}
        <div
          ref={planeRotatorRef}
          style={{
            willChange: 'transform, filter',
          }}
        >
          <img
            ref={planeImgRef}
            src="/dreamliner_jet.png"
            alt="Commercial airliner"
            decoding="async"
            style={{
              height: 'auto',
              display: 'block',
              background: 'transparent',
              // Removed redundant animation: 'float 6s ease-in-out infinite' since RAF handles it
              filter: 'drop-shadow(0 25px 40px rgba(59,130,246,.35))',
              objectFit: 'contain',
            }}
          />

          {/* Engine heat shimmer / exhaust glow */}
          {[-1, 1].map((side) => (
            <div
              key={side}
              style={{
                position: 'absolute',
                left: '25%',
                top: `calc(50% + ${side * 35 * 0.65}px)`, // using an average scale for the glow positioning to avoid inline style calcs
                transform: 'translate(-50%, -50%)',
                width: 45 * 0.65,
                height: 22 * 0.65,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(147,197,253,0.7) 0%, rgba(59,130,246,0.2) 50%, transparent 80%)',
                filter: 'blur(5px)',
                animation: 'pulse-soft 0.8s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

