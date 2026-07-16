import { Link } from 'react-router-dom'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { RiCompassDiscoverLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

const footerLinks = {
  Destinations: [
    { label: 'Europe', path: '/destinations?location=Europe' },
    { label: 'Asia', path: '/destinations?location=Asia' },
    { label: 'Americas', path: '/destinations?location=Americas' },
    { label: 'Africa', path: '/destinations?location=Africa' },
  ],
  Company: [
    { label: 'About Us', path: '/contact' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '#' },
    { label: 'Press', path: '#' },
  ],
  Support: [
    { label: 'Help Center', path: '#' },
    { label: 'Cancellation', path: '#' },
    { label: 'Safety', path: '#' },
    { label: 'Terms', path: '#' },
  ],
}

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-50 dark:bg-surface-950 text-surface-600 dark:text-slate-300 border-t border-surface-200/60 dark:border-surface-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-surface-200/60 dark:border-surface-900">
          
          {/* Brand Column (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
              <span className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow duration-300">
                <RiCompassDiscoverLine className="w-6 h-6 text-white" />
              </span>
              <span className="text-2xl font-bold font-heading text-surface-900 dark:text-white tracking-tight group-hover:text-primary-600 transition-colors duration-200">
                Travel<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Scape</span>
              </span>
            </Link>
            <p className="text-sm text-surface-500 dark:text-slate-400 leading-relaxed max-w-sm font-light">
              Discover extraordinary destinations and create unforgettable memories. Your next adventure starts with TravelScape.
            </p>
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-surface-200/60 dark:bg-surface-900 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 border border-transparent dark:border-surface-800">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <span className="font-light">123 Travel Street, San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-surface-200/60 dark:bg-surface-900 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 border border-transparent dark:border-surface-800">
                  <FiMail className="w-4 h-4" />
                </div>
                <span className="font-light">hello@travelscape.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-surface-200/60 dark:bg-surface-900 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 border border-transparent dark:border-surface-800">
                  <FiPhone className="w-4 h-4" />
                </div>
                <span className="font-light">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Spacer column for larger screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Link Columns (col-span-6) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-5">
                <h4 className="text-surface-800 dark:text-white font-extrabold text-xs uppercase tracking-widest font-heading">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-surface-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1 -mx-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-xs sm:text-sm text-surface-500 dark:text-slate-400 font-light">
            © {new Date().getFullYear()} TravelScape. All rights reserved. Built with passion for explorers.
          </p>
          <div className="flex items-center gap-3.5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-surface-200/80 dark:bg-surface-900 hover:bg-gradient-to-br hover:from-primary-500 hover:to-accent-500 hover:text-white rounded-full flex items-center justify-center text-surface-600 dark:text-slate-300 border border-transparent dark:border-surface-800 shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
