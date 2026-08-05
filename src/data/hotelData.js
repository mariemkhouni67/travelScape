// ═══════════════════════════════════════════════════════════════════════════════
// TravelScape — Region-Specific Unique Identity Hotel Catalog Architecture
// 5 Regions · 60 Custom Identity Styles (12 unique styles per region)
// ═══════════════════════════════════════════════════════════════════════════════

export const REGIONS = [
  { id: 'europe', label: 'Europe', flag: '🇪🇺', code: 'EU' },
  { id: 'asia', label: 'Asia', flag: '🌏', code: 'AS' },
  { id: 'americas', label: 'Americas', flag: '🌎', code: 'AM' },
  { id: 'africa_me', label: 'Africa & Middle East', flag: '🌍', code: 'AME' },
  { id: 'oceania', label: 'Oceania', flag: '🇦🇺', code: 'OC' },
]

// ── Region-Specific Unique Tourism Styles ──────────────────────────────────────

export const REGION_STYLES = {
  europe: [
    { id: 'palaces', label: 'Luxury Palaces', icon: '🏰' },
    { id: 'castles', label: 'Historic Castles', icon: '🏛️' },
    { id: 'boutique', label: 'Boutique Hotels', icon: '✨' },
    { id: 'alpine', label: 'Alpine Resorts', icon: '🏔️' },
    { id: 'ski', label: 'Ski Resorts', icon: '⛷️' },
    { id: 'inns', label: 'Countryside Inns', icon: '🏡' },
    { id: 'wine', label: 'Wine Estate Hotels', icon: '🍷' },
    { id: 'canal', label: 'Canal Hotels', icon: '🛶' },
    { id: 'city_boutique', label: 'City Boutique Hotels', icon: '🏙️' },
    { id: 'business', label: 'Business Hotels', icon: '💼' },
    { id: 'romantic', label: 'Romantic Escapes', icon: '🌹' },
    { id: 'royal', label: 'Royal Heritage Hotels', icon: '👑' },
  ],
  asia: [
    { id: 'ryokan', label: 'Ryokans', icon: '⛩️' },
    { id: 'onsen', label: 'Onsen Resorts', icon: '♨️' },
    { id: 'luxury', label: 'Luxury Resorts', icon: '💎' },
    { id: 'villas', label: 'Beach Villas', icon: '🏖️' },
    { id: 'island', label: 'Private Island Resorts', icon: '🏝️' },
    { id: 'zen', label: 'Zen Retreats', icon: '🧘' },
    { id: 'boutique', label: 'Boutique Hotels', icon: '✨' },
    { id: 'floating', label: 'Floating Resorts', icon: '🛥️' },
    { id: 'jungle', label: 'Jungle Lodges', icon: '🌿' },
    { id: 'temple', label: 'Temple Heritage Hotels', icon: '🛕' },
    { id: 'business', label: 'Business Hotels', icon: '💼' },
    { id: 'sky', label: 'Modern Sky Hotels', icon: '🏙️' },
  ],
  americas: [
    { id: 'beach', label: 'Beach Resorts', icon: '🏖️' },
    { id: 'casino', label: 'Casino Hotels', icon: '🎰' },
    { id: 'luxury_city', label: 'Luxury City Hotels', icon: '🏙️' },
    { id: 'mountain', label: 'Mountain Lodges', icon: '🏔️' },
    { id: 'national_park', label: 'National Park Lodges', icon: '🌲' },
    { id: 'eco', label: 'Eco Resorts', icon: '🌿' },
    { id: 'boutique', label: 'Boutique Hotels', icon: '✨' },
    { id: 'all_inclusive', label: 'All Inclusive Resorts', icon: '🍹' },
    { id: 'surf', label: 'Surf Resorts', icon: '🏄' },
    { id: 'business', label: 'Business Hotels', icon: '💼' },
    { id: 'desert', label: 'Desert Resorts', icon: '🌵' },
    { id: 'lake', label: 'Lake Resorts', icon: '⛵' },
  ],
  africa_me: [
    { id: 'safari', label: 'Safari Lodges', icon: '🦁' },
    { id: 'desert', label: 'Luxury Desert Camps', icon: '⛺' },
    { id: 'palace', label: 'Palace Hotels', icon: '🏰' },
    { id: 'beach', label: 'Beach Resorts', icon: '🏖️' },
    { id: 'riad', label: 'Boutique Riads', icon: '🏺' },
    { id: 'oasis', label: 'Oasis Resorts', icon: '🌴' },
    { id: 'luxury', label: 'Luxury Resorts', icon: '💎' },
    { id: 'eco', label: 'Eco Lodges', icon: '🌿' },
    { id: 'business', label: 'Business Hotels', icon: '💼' },
    { id: 'island', label: 'Island Resorts', icon: '🏝️' },
    { id: 'villas', label: 'Private Villas', icon: '🏡' },
    { id: 'spa', label: 'Spa Retreats', icon: '🧘' },
  ],
  oceania: [
    { id: 'beach', label: 'Beach Resorts', icon: '🏖️' },
    { id: 'island', label: 'Island Resorts', icon: '🏝️' },
    { id: 'eco', label: 'Eco Lodges', icon: '🌿' },
    { id: 'rainforest', label: 'Rainforest Retreats', icon: '🌧️' },
    { id: 'villas', label: 'Luxury Villas', icon: '🏡' },
    { id: 'surf', label: 'Surf Resorts', icon: '🏄' },
    { id: 'wine', label: 'Wine Country Hotels', icon: '🍷' },
    { id: 'mountain', label: 'Mountain Lodges', icon: '🏔️' },
    { id: 'business', label: 'Business Hotels', icon: '💼' },
    { id: 'harbour', label: 'Harbour Hotels', icon: '⛵' },
    { id: 'glamping', label: 'Glamping', icon: '⛺' },
    { id: 'private_island', label: 'Private Island Resorts', icon: '🏝️' },
  ]
}

// ── Curated Image Collections ──────────────────────────────────────────────────

const REGION_PHOTOS = {
  europe: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  ],
  asia: [
    'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  ],
  americas: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  ],
  africa_me: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
  ],
  oceania: [
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  ]
}

const REGION_CONFIGS = {
  europe: {
    regionName: 'Europe',
    flag: '🇪🇺',
    bestSeason: 'May – September',
    weather: 'Warm Mediterranean & Cool Alpine Breezes',
    localExperiences: 'Michelin Gastronomy, Private Wine Tasting, Châteaux Tours',
    cities: ['Paris', 'London', 'Florence', 'Venice', 'Rome', 'Vienna', 'St. Moritz', 'Barcelona', 'Santorini', 'Amsterdam'],
    country: 'Europe'
  },
  asia: {
    regionName: 'Asia',
    flag: '🌏',
    bestSeason: 'October – April',
    weather: 'Tropical Breeze & Clear Sunny Skies',
    localExperiences: 'Tea Ceremonies, Omakase Dining, Ancient Temple Pilgrimages',
    cities: ['Tokyo', 'Singapore', 'Kyoto', 'Bangkok', 'Bali', 'Hong Kong', 'Seoul', 'Maldives', 'Phuket', 'Chiang Mai'],
    country: 'Asia'
  },
  americas: {
    regionName: 'Americas',
    flag: '🌎',
    bestSeason: 'Year-round',
    weather: 'Sunny Coastlines & Powder Snow Mountains',
    localExperiences: 'Broadway VIP Seats, Napa Valley Helicopter Wine Tours, Ocean Cruising',
    cities: ['New York', 'Los Angeles', 'Miami', 'Cancún', 'Banff', 'Aspen', 'Maui', 'Rio de Janeiro', 'Toronto', 'Cusco'],
    country: 'Americas'
  },
  africa_me: {
    regionName: 'Africa & Middle East',
    flag: '🌍',
    bestSeason: 'October – April',
    weather: 'Pleasant 26°C Sunny Weather',
    localExperiences: 'Private Red Dune Safaris, Falconry, Hot Air Balloon over Serengeti',
    cities: ['Dubai', 'Abu Dhabi', 'Marrakech', 'Cape Town', 'Cairo', 'Doha', 'Zanzibar', 'Sabi Sand', 'Muscat', 'Aswan'],
    country: 'Africa & Middle East'
  },
  oceania: {
    regionName: 'Oceania',
    flag: '🇦🇺',
    bestSeason: 'November – April',
    weather: 'Bright Coastal Sunshine & Clear Marine Waters',
    localExperiences: 'Great Barrier Reef Helicopters, Sydney Harbour Yachting, Wine Tours',
    cities: ['Sydney', 'Melbourne', 'Queenstown', 'Auckland', 'Hamilton Island', 'Bora Bora', 'Fiji', 'Blue Mountains', 'Hobart', 'Christchurch'],
    country: 'Oceania'
  }
}

// Build region catalog dynamically so each region gets its own unique styles
function buildCatalogForRegion(rKey) {
  const cfg = REGION_CONFIGS[rKey]
  const stylesList = REGION_STYLES[rKey] || []
  const photos = REGION_PHOTOS[rKey] || REGION_PHOTOS.europe
  const styles = {}

  stylesList.forEach((styleObj, sIdx) => {
    const sKey = styleObj.id
    const imgList = photos

    const hotelTemplates = [
      { name: `${cfg.cities[0]} ${styleObj.label} Sanctuary`, city: cfg.cities[0], price: 950, rating: 4.95 },
      { name: `${cfg.cities[1]} Grand ${styleObj.label}`, city: cfg.cities[1], price: 880, rating: 4.92 },
      { name: `${cfg.cities[2]} Heritage ${styleObj.label}`, city: cfg.cities[2], price: 760, rating: 4.89 },
      { name: `${cfg.cities[3]} Royal ${styleObj.label}`, city: cfg.cities[3], price: 690, rating: 4.87 },
      { name: `${cfg.cities[4]} Horizon ${styleObj.label}`, city: cfg.cities[4], price: 620, rating: 4.85 },
      { name: `${cfg.cities[5]} St. Regis ${styleObj.label}`, city: cfg.cities[5], price: 1100, rating: 4.96 },
    ]

    const hotels = hotelTemplates.map((t, idx) => ({
      id: `${rKey}-${sKey}-${idx + 1}`,
      name: t.name,
      city: t.city,
      country: cfg.country,
      region: rKey,
      style: sKey,
      rating: t.rating,
      price: t.price,
      desc: `Exclusive ${styleObj.label} experience in ${t.city}, ${cfg.regionName}. Offering premier ${cfg.localExperiences.split(',')[0]} and luxury amenities.`,
      amenities: ['Private Spa', 'Michelin Dining', 'Butler Service', 'Panoramas', 'Infinity Pool'].slice(0, 3 + (idx % 3)),
      img: imgList[(sIdx + idx) % imgList.length],
      gallery: imgList
    }))

    styles[sKey] = {
      styleLabel: styleObj.label,
      icon: styleObj.icon,
      featured: {
        name: `${hotels[0].name}`,
        city: `${hotels[0].city}, ${cfg.country}`,
        price: hotels[0].price,
        desc: `Top-rated ${styleObj.label} recommendation in ${cfg.regionName}. ${cfg.bestSeason} special rate.`,
        cta: `Reserve ${styleObj.label}`,
        image: hotels[0].img
      },
      hotels
    }
  })

  return {
    regionName: cfg.regionName,
    flag: cfg.flag,
    bestSeason: cfg.bestSeason,
    weather: cfg.weather,
    localExperiences: cfg.localExperiences,
    styles
  }
}

// ── Export Multi-Region Custom Identity Hotel Catalog ───────────────────────

export const HOTEL_DATA = {
  europe: buildCatalogForRegion('europe'),
  asia: buildCatalogForRegion('asia'),
  americas: buildCatalogForRegion('americas'),
  africa_me: buildCatalogForRegion('africa_me'),
  oceania: buildCatalogForRegion('oceania'),
}

// ── Query Helpers ────────────────────────────────────────────────────────────

export function getRegionStyles(regionId = 'europe') {
  return REGION_STYLES[regionId] || REGION_STYLES.europe
}

export function getAllHotels() {
  const list = []
  Object.keys(HOTEL_DATA).forEach((rKey) => {
    const regObj = HOTEL_DATA[rKey]
    if (regObj && regObj.styles) {
      Object.keys(regObj.styles).forEach((sKey) => {
        const styleObj = regObj.styles[sKey]
        if (styleObj && styleObj.hotels) {
          list.push(...styleObj.hotels)
        }
      })
    }
  })
  return list
}

export function getFilteredHotels(regionId = 'all', styleId = 'all') {
  let list = getAllHotels()
  if (regionId && regionId !== 'all') {
    list = list.filter((h) => h.region === regionId)
  }
  if (styleId && styleId !== 'all') {
    list = list.filter((h) => h.style === styleId)
  }
  return list
}

export function getRegionInfo(regionId) {
  return HOTEL_DATA[regionId] || null
}

export function getStyleInfo(regionId, styleId) {
  const region = HOTEL_DATA[regionId]
  if (!region) return null
  return region.styles[styleId] || null
}
