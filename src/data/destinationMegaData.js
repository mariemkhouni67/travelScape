import { REGIONS as CORE_REGIONS, REGION_STYLES, HOTEL_DATA } from './hotelData'

export const REGIONS = CORE_REGIONS
export const HOTEL_CATEGORIES = REGION_STYLES.europe

// Map HOTEL_DATA to HOTEL_CATEGORIES_DATA structure dynamically for all 13 categories
export const HOTEL_CATEGORIES_DATA = {}

Object.keys(HOTEL_DATA).forEach((rKey) => {
  const regObj = HOTEL_DATA[rKey]
  HOTEL_CATEGORIES_DATA[rKey] = {}

  Object.keys(regObj.styles).forEach((sKey) => {
    const styleObj = regObj.styles[sKey]
    HOTEL_CATEGORIES_DATA[rKey][sKey] = {
      title: `${styleObj.styleLabel} (${regObj.regionName})`,
      desc: `${regObj.bestSeason} • ${regObj.weather}`,
      hotels: styleObj.hotels.map((h) => ({
        name: `${h.name}`,
        location: `${h.city}, ${h.country}`,
        price: h.price,
        rating: h.rating,
        image: h.img,
        features: h.amenities,
      })),
      promo: {
        title: styleObj.featured.name || styleObj.featured.title,
        desc: `${styleObj.featured.desc} Local experiences: ${regObj.localExperiences}`,
        cta: styleObj.featured.cta,
        price: styleObj.featured.price,
        image: styleObj.featured.image || styleObj.hotels[0]?.img,
      }
    }
  })
})

export const REGION_MEGA_DATA = {
  europe: {
    id: 'europe',
    name: 'Europe',
    flag: '🇪🇺',
    tagline: 'Historic Landmarks, World-Class Museums & Alpine Adventures',
    destinations: {
      tours: 'Eiffel Tower, Colosseum, Big Ben, Sagrada Família',
      museums: 'Louvre Museum, British Museum, Vatican Museums, Prado Museum',
      historical_sites: 'Acropolis Athens, Pompeii Ruins, Stonehenge, Alhambra Palace',
      cruises: 'Mediterranean Cruise, Norwegian Fjords, Greek Isles Sunset',
      beaches: 'Amalfi Coast, Santorini, Algarve, French Riviera',
      adventure: 'Swiss Alps Trekking, Iceland Glacier Hikes, Mont Blanc Skiing',
      food: 'Parisian Bistro & Pastries, Naples Woodfired Pizza, Spanish Tapas',
      nightlife: 'Ibiza Megaclubs, Berlin Tresor & Berghain, Mykonos Beach Lounges',
      nature: 'Plitvice Lakes Croatia, Black Forest Germany, Swiss Interlaken',
      festivals: 'Oktoberfest Munich, Venice Carnival, Tomorrowland Belgium',
      luxury: 'Superyacht Charter Monaco, Private Châteaux Loire Valley',
    },
    flights: {
      airports: 'Paris CDG, London LHR, Rome FCO, Amsterdam AMS',
      airlines: 'Air France, British Airways, Lufthansa, KLM, Swiss',
      duration: '7h – 9h non-stop from US / Asia',
      start_price: 'from $420 round-trip',
    },
    cars: {
      providers: 'Sixt, Hertz Europe, Europcar, Avis',
      pickup: 'Heathrow T5, CDG Airport, Frankfurt Terminal 1',
      daily_price: 'from €32 / day',
    },
    trains: {
      networks: 'Eurostar, TGV, ICE Germany, Frecciarossa Italy, Italo',
      routes: 'Paris ➔ London (2h15m), Rome ➔ Florence (1h30m), Madrid ➔ Barcelona (2h30m)',
    },
    taxis: {
      providers: 'London Black Cabs, G7 Paris, FreeNow Europe, Taxi Milano',
      airport_transfer: 'Heathrow Express, CDG Direct Taxi, Fiumicino Express',
      average_fare: '€45 – €65 fixed airport fare',
    },
    weather: {
      season: 'Mild Spring & Warm Summer',
      best_months: 'May – September',
    },
    tips: {
      currency: 'EUR (€), GBP (£), CHF',
      language: 'English, French, German, Italian, Spanish',
      visa: 'Schengen Visa / ETIAS Waiver',
      timezone: 'CET / GMT (UTC+0 to UTC+2)',
    },
  },

  asia: {
    id: 'asia',
    name: 'Asia',
    flag: '🌏',
    tagline: 'Ancient Temples, Futuristic Megacities & Tropical Paradises',
    destinations: {
      tours: 'Great Wall of China, Mount Fuji, Angkor Wat, Taj Mahal',
      museums: 'Tokyo National Museum, National Palace Taipei, Palace Museum Beijing',
      historical_sites: 'Kyoto Fushimi Inari, Borobudur Temple, Ayutthaya Ruins',
      cruises: 'Ha Long Bay Luxury Cruise, Yangtze River Cruise, Kerala Backwaters',
      beaches: 'Phuket Thailand, Bali Indonesia, Maldives Atolls, Boracay',
      adventure: 'Nepal Annapurna Trek, Bali Scuba Diving, Mt. Batur Sunrise',
      food: 'Tokyo Omakase & Ramen, Bangkok Street Food, Seoul K-BBQ & Dim Sum',
      nightlife: 'Tokyo Shibuya & Roppongi, Bangkok RCA, Seoul Hongdae Clubs',
      nature: 'Mount Fuji Japan, Jiuzhaigou Valley, Mount Kinabalu',
      festivals: 'Songkran Water Festival, Lantern Festival Chiang Mai, Cherry Blossom Season',
      luxury: 'Private Overwater Villa Maldives, Aman Kyoto Sanctuary',
    },
    flights: {
      airports: 'Tokyo HND/NRT, Singapore SIN, Bangkok BKK, Seoul ICN',
      airlines: 'Singapore Airlines, ANA, Japan Airlines, Cathay Pacific, Korean Air',
      duration: '11h – 14h non-stop from US / EU',
      start_price: 'from $580 round-trip',
    },
    cars: {
      providers: 'Toyota Rent-a-Car, Hertz Asia, Budget, Avis',
      pickup: 'Tokyo Haneda T3, Bangkok Suvarnabhumi, Changi Airport T3',
      daily_price: 'from $28 / day',
    },
    trains: {
      networks: 'Shinkansen Bullet Train Japan, KTX Korea, High-Speed Rail China',
      routes: 'Tokyo ➔ Kyoto (2h15m), Seoul ➔ Busan (2h30m), Beijing ➔ Shanghai (4h18m)',
    },
    taxis: {
      providers: 'Grab Southeast Asia, Japan Taxi App, Kakao T Korea, Gojek',
      airport_transfer: 'Tokyo Narita Express (NEX), Changi MRT, Airport Rail Link BKK',
      average_fare: '$25 – $45 airport transfer',
    },
    weather: {
      season: 'Dry Season / Cherry Blossom',
      best_months: 'October – April (Tropics: Nov–Mar)',
    },
    tips: {
      currency: 'JPY (¥), SGD ($), THB (฿), KRW (₩)',
      language: 'Japanese, Mandarin, Thai, Korean, English',
      visa: 'eVisa / Visa on Arrival for major hubs',
      timezone: 'JST / SGT / ICT (UTC+7 to UTC+9)',
    },
  },

  americas: {
    id: 'americas',
    name: 'Americas',
    flag: '🌎',
    tagline: 'Iconic Cities, Natural Wonders & Vibrant Cultures',
    destinations: {
      tours: 'Statue of Liberty, Grand Canyon, Machu Picchu, Iguazu Falls',
      museums: 'MET NYC, Smithsonian Washington, MoMA, Museo Nacional Anthropology Mexico',
      historical_sites: 'Chichen Itza Maya Pyramids, Teotihuacan, Freedom Trail Boston',
      cruises: 'Caribbean Island Cruise, Alaska Glacier Bay, Galapagos Expedition',
      beaches: 'Miami Beach, Cancún Riviera Maya, Copacabana Rio, Oahu Hawaii',
      adventure: 'Patagonia Glacier Trekking, Yellowstone National Park, Costa Rica Ziplining',
      food: 'Texas BBQ & NYC Bagels, Mexican Tacos al Pastor, Peruvian Ceviche',
      nightlife: 'Las Vegas Strip, Miami South Beach, NYC Rooftop Lounges, Rio Samba',
      nature: 'Yosemite Valley, Banff National Park Canada, Amazon Rainforest',
      festivals: 'Rio de Janeiro Carnival, Mardi Gras New Orleans, Coachella',
      luxury: 'Private Ranch Aspen, Luxury Villa St. Barts, Bellagio Penthouse Vegas',
    },
    flights: {
      airports: 'New York JFK, Los Angeles LAX, Miami MIA, Cancún CUN',
      airlines: 'Delta Air Lines, United Airlines, American Airlines, LATAM, Air Canada',
      duration: '3h – 10h non-stop across Americas',
      start_price: 'from $190 round-trip',
    },
    cars: {
      providers: 'Enterprise, Hertz, Avis, Alamo, Budget',
      pickup: 'JFK Terminal 4, LAX Car Rental Center, Miami Airport Hub',
      daily_price: 'from $38 / day',
    },
    trains: {
      networks: 'Amtrak Acela Express, Brightline Florida, VIA Rail Canada',
      routes: 'NYC ➔ Washington DC (2h55m), Miami ➔ Orlando (3h30m), Toronto ➔ Montreal (5h)',
    },
    taxis: {
      providers: 'Uber US, Lyft, NYC Yellow Cabs, Taxi Radio Mexico',
      airport_transfer: 'JFK AirTrain + Subway, LAX FlyAway, Miami MetroRail',
      average_fare: '$35 – $65 flat rate',
    },
    weather: {
      season: 'Sunny Summers & Snow Sports Winter',
      best_months: 'Year-round (North: May–Oct, South: Dec–Mar)',
    },
    tips: {
      currency: 'USD ($), CAD ($), MXN ($), BRL (R$)',
      language: 'English, Spanish, Portuguese, French',
      visa: 'ESTA / US Visa / eTA Canada',
      timezone: 'EST / CST / PST (UTC-8 to UTC-4)',
    },
  },

  africa_me: {
    id: 'africa_me',
    name: 'Africa & Middle East',
    flag: '🌍',
    tagline: 'Pyramids, Desert Safaris & Ultra-Luxury Skyscrapers',
    destinations: {
      tours: 'Pyramids of Giza, Petra Treasury Jordan, Burj Khalifa Dubai, Table Mountain',
      museums: 'Grand Egyptian Museum, Museum of the Future Dubai, Louvre Abu Dhabi',
      historical_sites: 'Karnak Temple Luxor, Marrakech Medina, Carthage Ruins Tunis',
      cruises: 'Nile River Felucca Cruise, Red Sea Coral Reef Cruise, Dubai Marina Yacht',
      beaches: 'Zanzibar Spice Beaches, Red Sea Sharm El Sheikh, Jumeirah Dubai',
      adventure: 'Dubai Red Dune Desert Safari, Mt. Kilimanjaro Climb, Serengeti Wildlife Safari',
      food: 'Marrakech Tagine & Couscous, Lebanese Meze & Kebabs, Cape Town Wine Tasting',
      nightlife: 'Dubai Luxury Beach Clubs, Cairo Nile Lounges, Cape Town Waterfront',
      nature: 'Serengeti Migration Tanzania, Victoria Falls, Sahara Desert Dunes',
      festivals: 'Fes Festival of World Sacred Music, Cape Town International Jazz',
      luxury: 'Burj Al Arab 7-Star Hotel, Royal Mansour Marrakech, Luxury Desert Glamping',
    },
    flights: {
      airports: 'Dubai DXB, Cairo CAI, Cape Town CPT, Doha DOH',
      airlines: 'Emirates, Qatar Airways, Etihad, Ethiopian Airlines, EgyptAir',
      duration: '6h – 13h non-stop from Europe / US',
      start_price: 'from $510 round-trip',
    },
    cars: {
      providers: 'Hertz Middle East, Avis Africa, Sixt UAE, Europcar',
      pickup: 'Dubai Airport T3, Cape Town International, Cairo Terminal 3',
      daily_price: 'from $35 / day',
    },
    trains: {
      networks: 'Haramain High-Speed Rail Saudi, Gautrain South Africa, ONCF Morocco Al Boraq',
      routes: 'Tangier ➔ Casablanca (2h10m), Mecca ➔ Medina (2h20m), JNB ➔ Pretoria (35m)',
    },
    taxis: {
      providers: 'Careem Dubai & Middle East, Bolt South Africa, Cairo Taxi, Uber',
      airport_transfer: 'Dubai Metro Red Line, Cape Town MyCiTi Airport Shuttle',
      average_fare: '$20 – $40 airport transfer',
    },
    weather: {
      season: 'Warm Winters & Desert Sunshine',
      best_months: 'October – April',
    },
    tips: {
      currency: 'AED, EGP, ZAR, MAD, QAR',
      language: 'Arabic, English, French, Swahili',
      visa: 'Visa on Arrival / eVisa available',
      timezone: 'GST / EET / SAST (UTC+2 to UTC+4)',
    },
  },

  oceania: {
    id: 'oceania',
    name: 'Oceania',
    flag: '🇦🇺',
    tagline: 'Great Barrier Reef, Fiordland National Park & Pacific Island Bliss',
    destinations: {
      tours: 'Sydney Opera House, Great Barrier Reef, Milford Sound, Uluru Sacred Rock',
      museums: 'Museum of New Zealand Te Papa, Art Gallery of NSW, Melbourne Museum',
      historical_sites: 'Port Arthur Tasmania, Waitangi Treaty Grounds, Sydney Rocks',
      cruises: 'Great Barrier Reef Catamaran, Sydney Harbour Cruise, Fijian Islands Cruise',
      beaches: 'Bondi Beach Sydney, Whitehaven Beach Whitsundays, Bora Bora Lagoon',
      adventure: 'Queenstown Bungy & Skydiving, Great Ocean Road Drive, Blue Mountains Hike',
      food: 'Aussie Beachfront BBQ & Seafood, Flat White Coffee Culture, Marlborough Wine',
      nightlife: 'Sydney Harbour Rooftops, Melbourne Hidden Laneway Bars, Auckland Viaduct',
      nature: 'Fiordland National Park NZ, Daintree Rainforest, Rotorua Geysers',
      festivals: 'Vivid Sydney Light Festival, New Zealand International Arts Festival',
      luxury: 'Southern Ocean Lodge Kangaroo Island, Matakauri Lodge Queenstown',
    },
    flights: {
      airports: 'Sydney SYD, Melbourne MEL, Auckland AKL, Nadi NAN',
      airlines: 'Qantas, Air New Zealand, Virgin Australia, Fiji Airways',
      duration: '14h – 17h non-stop from US / Asia',
      start_price: 'from $790 round-trip',
    },
    cars: {
      providers: 'Hertz Australia, Avis NZ, Thrifty, Apex Car Rentals',
      pickup: 'Sydney Airport T1, Auckland International Terminal, Melbourne T4',
      daily_price: 'from A$42 / day',
    },
    trains: {
      networks: 'The Ghan Overland Train, Indian Pacific, TranzAlpine New Zealand',
      routes: 'Christchurch ➔ Greymouth TranzAlpine (4h30m), Sydney ➔ Melbourne (11h)',
    },
    taxis: {
      providers: '13cabs Australia, Corporate Cabs NZ, Uber Australia',
      airport_transfer: 'Sydney Airport Link Train, SkyBus Melbourne, Auckland SkyDrive',
      average_fare: 'A$45 – A$75 airport connection',
    },
    weather: {
      season: 'Southern Hemisphere Sunshine',
      best_months: 'November – April',
    },
    tips: {
      currency: 'AUD ($), NZD ($), FJD ($)',
      language: 'English, Māori',
      visa: 'ETA Australia / NZeTA New Zealand',
      timezone: 'AEST / NZST (UTC+10 to UTC+12)',
    },
  },
}
