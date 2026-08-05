import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FiMessageCircle,
  FiX,
  FiSend,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiStar,
  FiClock,
  FiHelpCircle,
  FiChevronDown,
} from 'react-icons/fi'
import {
  RiRobot2Line,
  RiSparklingLine,
  RiPlaneLine,
  RiHotelLine,
  RiCustomerService2Line,
} from 'react-icons/ri'

// ── Simulated AI Travel Assistant Responses ──
const TRAVEL_RESPONSES = {
  greeting: [
    "Hello! ✈️ I'm TravelScape AI, your personal travel assistant. How can I help you plan your perfect trip today?",
    "Welcome! 🌍 I'm here to help you discover amazing destinations, find the best flights, and book dream hotels. What are you looking for?",
    "Hi there! 🏖️ Ready to explore the world? Tell me where you'd like to go, and I'll help make it happen!",
  ],
  flights: [
    "Great question about flights! ✈️ We offer competitive prices on thousands of routes. You can search for flights on our Flights page — just enter your departure city, destination, and dates. Would you like me to help you find a specific route?",
    "Looking for flights? 🛫 I'd recommend checking our Flights page for real-time pricing. We partner with major airlines to get you the best deals. Popular routes right now include Paris, Tokyo, and New York!",
  ],
  hotels: [
    "We have an amazing selection of hotels! 🏨 From luxury resorts to cozy boutique stays, you'll find it all on our Hotels page. Any particular destination in mind?",
    "Looking for accommodation? 🏩 Our hotel partners range from 3-star to 5-star properties worldwide. Check out our Hotels page for exclusive deals, or tell me your destination and I'll suggest some options!",
  ],
  destinations: [
    "Oh, I love talking about destinations! 🌴 Some of our most popular picks right now are: Bali, Santorini, Tokyo, Paris, and the Maldives. Would you like details on any of these?",
    "Exploring new places? 🗺️ Check out our Destinations page for curated travel guides. Whether you want beaches, mountains, or city vibes — we've got you covered!",
  ],
  pricing: [
    "Our pricing is very competitive! 💰 Flights start from as low as $49 one-way on select routes. Hotels range from $30/night for budget options to premium luxury stays. Check our pages for real-time pricing!",
    "Great news on pricing! 🏷️ We regularly run flash sales with up to 40% off. Subscribe to our newsletter for the latest deals. Would you like help finding something within your budget?",
  ],
  booking: [
    "Booking with TravelScape is easy! 📋 Just browse our flights or hotels, select your dates, and click 'Book Now.' You'll need to create an account or sign in first. Need help with a specific booking?",
    "Ready to book? 🎫 Here's how: 1) Choose your flight/hotel, 2) Select your dates, 3) Sign in or create an account, 4) Confirm and pay. It's that simple!",
  ],
  support: [
    "I'm happy to help with support! 🛟 For urgent booking issues, please visit our Contact page. You can also email us or call our 24/7 helpline. What specific issue are you facing?",
    "Need support? 📞 Our team is available 24/7. Head to the Contact page for all support options. For quick questions, I'm right here to help!",
  ],
  default: [
    "That's a great question! 🤔 I can help with flights, hotels, destinations, bookings, and pricing. Could you tell me more about what you're looking for?",
    "I'd love to help! 💡 Try asking me about flight deals, hotel recommendations, popular destinations, or how to book. What interests you most?",
    "Interesting! 🌟 While I'm best at travel-related queries, I'll do my best to help. Could you rephrase or ask about flights, hotels, or destinations?",
  ],
}

// ── Quick Suggestion Chips ──
const QUICK_ACTIONS = [
  { icon: RiPlaneLine, label: 'Flights', key: 'flights' },
  { icon: RiHotelLine, label: 'Hotels', key: 'hotels' },
  { icon: FiMapPin, label: 'Destinations', key: 'destinations' },
  { icon: FiDollarSign, label: 'Pricing', key: 'pricing' },
  { icon: FiCalendar, label: 'Booking', key: 'booking' },
  { icon: RiCustomerService2Line, label: 'Support', key: 'support' },
]

function getAIResponse(message) {
  const lower = message.toLowerCase()

  if (lower.match(/\b(hi|hello|hey|bonjour|salut|مرحبا|hola|ciao|hallo)\b/))
    return pickRandom(TRAVEL_RESPONSES.greeting)
  if (lower.match(/\b(flight|fly|plane|airline|airport|avion|vol|طيران|vuelo|flug|volo)\b/))
    return pickRandom(TRAVEL_RESPONSES.flights)
  if (lower.match(/\b(hotel|stay|room|accommodation|resort|hôtel|فندق|alojamiento|unterkunft|albergo)\b/))
    return pickRandom(TRAVEL_RESPONSES.hotels)
  if (lower.match(/\b(destination|place|where|visit|travel|explore|explore|وجهة|destino|reiseziel|destinazione)\b/))
    return pickRandom(TRAVEL_RESPONSES.destinations)
  if (lower.match(/\b(price|cost|cheap|budget|deal|money|prix|سعر|precio|preis|prezzo)\b/))
    return pickRandom(TRAVEL_RESPONSES.pricing)
  if (lower.match(/\b(book|reserve|booking|reservation|réserver|حجز|reservar|buchen|prenotare)\b/))
    return pickRandom(TRAVEL_RESPONSES.booking)
  if (lower.match(/\b(help|support|contact|problem|issue|aide|مساعدة|ayuda|hilfe|aiuto)\b/))
    return pickRandom(TRAVEL_RESPONSES.support)

  return pickRandom(TRAVEL_RESPONSES.default)
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── Typing Indicator ──
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="flex items-center gap-1.5 bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
        <motion.span
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          className="w-2 h-2 rounded-full bg-indigo-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
        />
        <motion.span
          className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  )
}

// ── Single Message Bubble ──
function MessageBubble({ message, isLast }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4 py-1`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 mt-1 shadow-md shadow-blue-500/20">
          <RiRobot2Line className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-lg shadow-blue-500/20'
            : 'bg-white/10 dark:bg-white/8 text-white/90 rounded-bl-sm border border-white/10'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════
// ── MAIN CHATBOT COMPONENT ──
// ═══════════════════════════════════════════
export default function ChatBot() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Send initial greeting when first opened
  const handleOpen = () => {
    setIsOpen(true)
    setHasUnread(false)
    if (messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([
          {
            id: Date.now(),
            role: 'bot',
            content: pickRandom(TRAVEL_RESPONSES.greeting),
            time: new Date(),
          },
        ])
        setIsTyping(false)
      }, 800)
    }
  }

  // Send a message
  const handleSend = (text) => {
    const msg = (text || input).trim()
    if (!msg) return

    // Add user message
    const userMsg = { id: Date.now(), role: 'user', content: msg, time: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Simulate AI typing delay
    setIsTyping(true)
    const delay = 600 + Math.random() * 1200
    setTimeout(() => {
      const response = getAIResponse(msg)
      const botMsg = { id: Date.now() + 1, role: 'bot', content: response, time: new Date() }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)

      if (!isOpen) setHasUnread(true)
    }, delay)
  }

  // Handle quick action chip click
  const handleQuickAction = (key) => {
    const labels = {
      flights: t('chatbot.askFlights', 'Tell me about flights'),
      hotels: t('chatbot.askHotels', 'Tell me about hotels'),
      destinations: t('chatbot.askDestinations', 'What destinations do you recommend?'),
      pricing: t('chatbot.askPricing', 'What are your prices?'),
      booking: t('chatbot.askBooking', 'How do I book?'),
      support: t('chatbot.askSupport', 'I need help with something'),
    }
    handleSend(labels[key] || key)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* ── Floating Chat Toggle Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={handleOpen}
            aria-label={t('chatbot.open', 'Open chat assistant')}
            className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-2xl bg-blue-500/30 animate-ping opacity-40" />
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300" />

            <FiMessageCircle className="w-7 h-7 relative z-10" />

            {/* Unread Badge */}
            {hasUnread && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-[#050816] z-20"
              >
                !
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(10, 14, 30, 0.92)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 32px 80px rgba(0, 0, 0, 0.55), 0 0 40px rgba(59, 130, 246, 0.12)',
            }}
          >
            {/* ── Header ── */}
            <div className="relative px-5 py-4 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20">
              {/* Subtle shimmer */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <RiRobot2Line className="w-5 h-5 text-white" />
                  </div>
                  {/* Online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0e1e]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    TravelScape AI
                    <RiSparklingLine className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    {t('chatbot.online', 'Online • Ready to help')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  aria-label={t('chatbot.minimize', 'Minimize chat')}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <FiChevronDown className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  aria-label={t('chatbot.close', 'Close chat')}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto py-3 space-y-1 custom-scrollbar">
              {messages.length === 0 && !isTyping && (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 border border-white/10"
                  >
                    <RiRobot2Line className="w-8 h-8 text-blue-400" />
                  </motion.div>
                  <h4 className="text-white font-bold text-sm mb-1">
                    {t('chatbot.welcomeTitle', 'TravelScape AI Assistant')}
                  </h4>
                  <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                    {t('chatbot.welcomeDesc', 'Ask me anything about flights, hotels, destinations, and travel planning!')}
                  </p>

                  {/* Quick Action Chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {QUICK_ACTIONS.map((action) => {
                      const Icon = action.icon
                      return (
                        <motion.button
                          key={action.key}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAction(action.key)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-slate-300 bg-white/8 hover:bg-white/15 border border-white/10 hover:border-blue-400/40 transition-all duration-200 cursor-pointer"
                        >
                          <Icon className="w-3.5 h-3.5 text-blue-400" />
                          {action.label}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Actions (shown after conversation starts) ── */}
            {messages.length > 0 && (
              <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
                {QUICK_ACTIONS.slice(0, 4).map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.key}
                      onClick={() => handleQuickAction(action.key)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer"
                    >
                      <Icon className="w-3 h-3 text-blue-400/70" />
                      {action.label}
                    </button>
                  )
                })}
              </div>
            )}

            {/* ── Input Area ── */}
            <div className="px-4 py-3 border-t border-white/10 bg-white/3">
              <div className="flex items-center gap-2 bg-white/8 rounded-2xl border border-white/10 focus-within:border-blue-400/50 transition-all duration-300 px-4 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chatbot.placeholder', 'Ask about flights, hotels, destinations...')}
                  className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    input.trim() && !isTyping
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 text-slate-500'
                  }`}
                >
                  <FiSend className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[9px] text-slate-600 text-center mt-2">
                {t('chatbot.powered', 'Powered by TravelScape AI')} • {t('chatbot.disclaimer', 'For informational purposes')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
