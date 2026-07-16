/**
 * AirplaneAnimation — Premium Photorealistic Top-View Edition
 * ────────────────────────────────────────────────────────────
 * Loads the photorealistic Boeing 787 / Airbus A350 aircraft asset (/dreamliner_jet.png)
 * and animates it in a luxury, cinematic 3D loop constrained to the right side of the screen.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
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
    if (particles.current.length > 500) particles.current.shift()
  }, [])

  const drawTrail = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sort by depth so background contrails render behind the plane/foreground contrails
    particles.current.sort((a, b) => a.zDepth - b.zDepth)
    particles.current = particles.current.filter(p => p.life > 0)

    for (const p of particles.current) {
      const depthBlur = p.zDepth < 0 ? Math.abs(p.zDepth) * 4.5 : 0
      const depthFade = p.zDepth < 0 ? 1 - Math.abs(p.zDepth) * 0.45 : 1
      const finalAlpha = p.alpha * p.life * depthFade

      ctx.save()
      if (depthBlur > 0.4) ctx.filter = `blur(${depthBlur}px)`

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
  const scaleRef = useRef(1)

  const [planePos, setPlanePos] = useState({ x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0 })
  const [scale, setScale] = useState(1)
  const [motionBlur, setMotionBlur] = useState(0)

  const { addParticle, drawTrail } = useContrailCanvas(canvasRef)

  useEffect(() => {
    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    let W = container.offsetWidth
    let H = container.offsetHeight

    const syncCanvas = () => {
      if (!containerRef.current || !canvasRef.current) return
      W = containerRef.current.offsetWidth
      H = containerRef.current.offsetHeight
      canvasRef.current.width = W
      canvasRef.current.height = H

      // Responsive scale multiplier (plane occupies ~35-45% of right side)
      const sf = W < 640 ? 0.45 : W < 1024 ? 0.65 : 0.95
      scaleRef.current = sf
      setScale(sf)
    }

    window.addEventListener('resize', syncCanvas)
    syncCanvas()

    // ── Flight Path ───────────────────────────────────────────────────────
    // Constrains the loop entirely to the right side of the screen.
    // Center is set to 75% of screen width, radius is 12% of screen width.
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
      if (!startTime) startTime = now
      const t = ((now - startTime) % DURATION) / DURATION

      const pos = getPos(t)
      const dt = 0.0018
      const posN = getPos((t + dt) % 1)
      const posP = getPos((t - dt + 1) % 1)

      const dx = posN.x - pos.x, dy = posN.y - pos.y, dz = posN.z - pos.z
      const pdx = pos.x - posP.x, pdy = pos.y - posP.y, pdz = pos.z - posP.z

      // ── Calculate Rotations ──────────────────────────────────────────────
      // Yaw: heading direction in horizontal-depth space
      let yaw = Math.atan2(dz, dx) * (180 / Math.PI)
      
      // Pitch: climb/descent angle
      const horizSpeed = Math.sqrt(dx * dx + dz * dz) || 0.001
      const targetPitch = Math.max(-20, Math.min(20, Math.atan2(dy, horizSpeed) * (180 / Math.PI) * 1.5))

      // Roll: bank into curves
      const curHeading = Math.atan2(dy, dx)
      const prevHeading = Math.atan2(pdy, pdx)
      let dHead = curHeading - prevHeading
      if (dHead > Math.PI) dHead -= 2 * Math.PI
      if (dHead < -Math.PI) dHead += 2 * Math.PI
      const targetRoll = Math.max(-30, Math.min(30, dHead * (180 / Math.PI) * 12))

      // Motion blur proportional to coordinate velocity
      const speed = Math.sqrt(dx * dx + dy * dy)
      const targetBlur = Math.max(0, (speed - 1.5) * 0.15)

      // Smooth out transformations
      sPitch += (targetPitch - sPitch) * 0.1
      sRoll += (targetRoll - sRoll) * 0.1
      sYaw += (yaw - sYaw) * 0.1
      sBlur += (targetBlur - sBlur) * 0.1

      setPlanePos({ x: pos.x, y: pos.y, z: pos.z, yaw: sYaw, pitch: sPitch, roll: sRoll })
      setMotionBlur(sBlur)

      // ── Contrail Emission ────────────────────────────────────────────────
      const cs = scaleRef.current * (1 + 0.35 * pos.z)
      const headingRad = Math.atan2(dy, dx)
      // emit contrail from the rear engines (~110px back from center at full scale)
      const trailX = pos.x + Math.cos(headingRad) * -(110 * cs)
      const trailY = pos.y + Math.sin(headingRad) * -(110 * cs)
      addParticle(trailX, trailY, cs, pos.z)
      drawTrail()

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('resize', syncCanvas)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [prefersReduced, addParticle, drawTrail])

  if (prefersReduced) return null

  // ── Depth parameters ───────────────────────────────────────────────────────
  const currentScale = scale * (1 + 0.35 * planePos.z)
  const depthBlur = planePos.z < 0 ? Math.abs(planePos.z) * 2.2 : 0
  const totalBlur = Math.min(3.0, depthBlur + motionBlur)
  const brightness = 1 + planePos.z * 0.15
  const contrast = 1 + planePos.z * 0.08

  // Ground/Ocean Shadow calculations
  const shadowW = 380 * currentScale
  const shadowH = 70 * currentScale
  const shadowX = planePos.x - 30 * currentScale
  const shadowY = planePos.y + (130 - planePos.z * 30) * currentScale
  const shadowOpa = 0.15 * (1 + planePos.z * 0.3)
  const shadowBlr = 16 + (1 - planePos.z) * 8

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
        style={{
          position: 'absolute',
          left: shadowX,
          top: shadowY,
          width: shadowW,
          height: shadowH,
          background: 'rgba(0, 0, 0, 0.22)',
          filter: `blur(${shadowBlr}px)`,
          borderRadius: '50%',
          transform: `translate(-50%, -50%) rotate(${planePos.yaw}deg)`,
          willChange: 'left, top, transform',
          opacity: shadowOpa,
          zIndex: 14,
        }}
      />

      {/* Airplane 3D Container */}
      <div
        style={{
          position: 'absolute',
          left: planePos.x,
          top: planePos.y,
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
          zIndex: 15,
        }}
      >
        <div
          style={{
            transform: `
              perspective(800px)
              rotateY(${planePos.yaw}deg)
              rotateX(${planePos.pitch}deg)
              rotateZ(${planePos.roll}deg)
            `,
            filter: `blur(${totalBlur}px) brightness(${brightness}) contrast(${contrast})`,
            willChange: 'transform, filter',
            transition: 'filter 0.15s ease-out',
          }}
        >
          <img
            src="/dreamliner_jet.png"
            alt="Commercial airliner"
            style={{
              width: 380 * currentScale,
              height: 'auto',
              display: 'block',
              background: 'transparent',
              filter: 'drop-shadow(0 25px 40px rgba(59,130,246,.35))',
              animation: 'float 6s ease-in-out infinite',
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
                top: `calc(50% + ${side * 35 * currentScale}px)`,
                transform: 'translate(-50%, -50%)',
                width: 45 * currentScale,
                height: 22 * currentScale,
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
