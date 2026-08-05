import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { RiCompassDiscoverLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, staggerContainer } from '../../utils/transitions'

const footerLinks = {
  Destinations: [
    { label: 'Europe', path: '/destinations' },
    { label: 'Asia', path: '/destinations' },
    { label: 'Americas', path: '/destinations' },
    { label: 'Africa', path: '/destinations' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
  ],
  Support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Cancellation', path: '/cancellation' },
    { label: 'Safety', path: '/safety' },
    { label: 'Terms', path: '/terms' },
  ],
}

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
]

function SocialIcon({ social }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={social.href}
      aria-label={social.label}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: hovered ? 'linear-gradient(135deg, rgba(79, 124, 255, 0.9), rgba(139, 92, 246, 0.9))' : 'rgba(255, 255, 255, 0.05)',
        borderColor: hovered ? 'transparent' : 'rgba(255, 255, 255, 0.08)'
      }}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white/72 hover:text-white border shadow-sm transition-all duration-300 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <social.icon className="w-4 h-4" />
    </motion.a>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer 
      style={{
        background: 'rgba(8, 12, 24, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
      className="relative text-white/72 transition-colors duration-300 overflow-hidden"
    >
      {/* 🌫️ Smooth transparent gradient transition from the section above */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#070B1A] to-transparent pointer-events-none z-10" />

      {/* Subtle corner glows (blue/purple) */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 relative z-20">

        {/* Top section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/8"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
              <span className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow duration-300">
                <RiCompassDiscoverLine className="w-6 h-6 text-white" />
              </span>
              <span className="text-2xl font-bold font-heading text-white tracking-tight group-hover:text-primary-400 transition-colors duration-200">
                Travel<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Scape</span>
              </span>
            </Link>
            <p className="text-sm text-white/72 leading-relaxed max-w-sm font-light">
              {t('footer.tagline', 'Crafting unforgettable luxury travel experiences around the globe.')}
            </p>
            <div className="space-y-3.5 pt-2">
              {[
                { icon: FiMapPin, text: '123 Travel Street, San Francisco, CA' },
                { icon: FiMail, text: 'hello@travelscape.com' },
                { icon: FiPhone, text: '+1 (555) 123-4567' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-white/72">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary-400 flex-shrink-0 border border-white/8">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-light">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Link Columns */}
          <motion.div variants={fadeUp} className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-5">
                <h4 className="text-white/95 font-extrabold text-xs uppercase tracking-widest font-heading">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/72 hover:text-primary-400 font-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1 -mx-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-xs sm:text-sm text-white/72 font-light">
            {t('footer.copyright', `© ${new Date().getFullYear()} TravelScape Inc. All rights reserved.`)}
          </p>
          <div className="flex items-center gap-3.5">
            {socialLinks.map((social) => (
              <SocialIcon key={social.label} social={social} />
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
