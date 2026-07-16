import Hero from '../components/home/Hero'
import StatsCounter from '../components/home/StatsCounter'
import FeaturedDestinations from '../components/home/FeaturedDestinations'
import ExploreMap from '../components/home/ExploreMap'
import PopularHotels from '../components/home/PopularHotels'
import Newsletter from '../components/home/Newsletter'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen"
    >
      <Hero />
      <StatsCounter />
      <FeaturedDestinations />
      <ExploreMap />
      <PopularHotels />
      <Newsletter />
    </motion.div>
  )
}
