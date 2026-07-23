import React from 'react'

export default function SectionWaveDivider({ color = '#070B1A', className = '' }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-25 pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[40px] sm:h-[60px] md:h-[100px] lg:h-[120px]"
      >
        {/* Elegant upward curve */}
        <path
          d="M0,120 C360,30 1080,30 1440,120 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
