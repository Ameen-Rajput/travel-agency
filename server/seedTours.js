const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/Tour');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/marwa-travel';

const sampleTours = [
  {
    country: 'Switzerland',
    description: 'Explore the breathtaking snow-capped mountains, pristine lakes, and scenic train rides of Interlaken and Zermatt.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Embark on a fairytale journey through Switzerland. Visit Zurich, Lucerne, Interlaken, and Zermatt. Enjoy scenic train rides, cable car excursions up majestic peaks, and strolls through historic old towns.',
    duration: '7 Days / 6 Nights',
    featured: true,
    included: [
      'Round-trip flights',
      'Luxury hotel accommodations',
      'Daily Swiss breakfast & local dinners',
      'First-class Swiss Travel Pass',
      'Professional multi-lingual guide',
      'Excursion to Jungfraujoch (Top of Europe)',
      'Travel insurance'
    ],
    hotels: [
      { name: 'Swiss Grand Hotel Lucerne', rating: 5, type: 'Luxury' },
      { name: 'Hotel Alpenrose Interlaken', rating: 4, type: 'Premium' }
    ],
    restaurants: [
      'Fondue Stube Lucerne',
      'Alpenblick Restaurant Zermatt',
      'Traditional Swiss Chalet Dining'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Lucerne', activities: 'Transfer to Lucerne, check-in, guided walking tour of Chapel Bridge and Lion Monument, welcome fondue dinner.' },
      { day: 2, title: 'Mount Pilatus Excursion', activities: 'Ride the world\'s steepest cogwheel railway to the summit of Mt. Pilatus. Panoramic views of lake and mountains.' },
      { day: 3, title: 'Lucerne to Interlaken', activities: 'Scenic train ride to Interlaken. Afternoon at leisure for paragliding or shopping.' },
      { day: 4, title: 'Jungfraujoch - Top of Europe', activities: 'Travel by train to the highest railway station in Europe. Experience the Ice Palace and Sphinx observatory.' },
      { day: 5, title: 'Interlaken to Zermatt', activities: 'Train transfer to Zermatt. Walk through the car-free alpine village at the foot of the Matterhorn.' },
      { day: 6, title: 'Gornergrat Scenic Railway', activities: 'Ride the open-air cog railway up to Gornergrat for the best views of the Matterhorn.' },
      { day: 7, title: 'Departure from Zurich', activities: 'Return train to Zurich Airport for your flight home.' }
    ]
  },
  {
    country: 'Maldives',
    description: 'Paradise on Earth with crystal clear turquoise waters, private overwater villas, and vibrant coral reefs.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Indulge in a luxurious escape to the Maldives. Stay in a stunning overwater villa with direct access to the warm ocean, enjoy world-class diving and snorkeling, and experience beautiful romantic dinners on the beach.',
    duration: '5 Days / 4 Nights',
    featured: true,
    included: [
      'Speedboat / Seaplane transfers',
      'Overwater villa stay',
      'All-inclusive meal plan (breakfast, lunch, dinner & drinks)',
      'Snorkeling gear & coral reef tour',
      'Sunset cruise with dolphin watching',
      'Spa voucher'
    ],
    hotels: [
      { name: 'Paradise Island Resort', rating: 5, type: 'Luxury' },
      { name: 'Sun Siyam Olhuveli', rating: 5, type: 'Luxury' }
    ],
    restaurants: [
      'Ithaa Undersea Restaurant',
      'Feast Restaurant Beachfront',
      'The Lagoon Bar & Dining'
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Paradise', activities: 'Seaplane transfer to resort, welcome drinks, check-in to overwater villa, sunset beach dinner.' },
      { day: 2, title: 'Snorkeling Safari', activities: 'Guided snorkeling tour to explore the house reef. Swim with sea turtles and colorful fishes.' },
      { day: 3, title: 'Dolphin Cruise & Sunset', activities: 'Leisurely morning. Late afternoon yacht cruise to watch dolphins playing in the sunset.' },
      { day: 4, title: 'Spa & Relaxation', activities: 'Indulge in a 90-minute signature Balinese massage. Candlelit dinner on a private sandbank.' },
      { day: 5, title: 'Departure', activities: 'Enjoy a final morning swim, checkout, and transfer back to Male International Airport.' }
    ]
  },
  {
    country: 'Japan',
    description: 'Experience the perfect blend of ultra-modern technology and timeless cultural heritage with cherry blossoms and historic temples.',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Discover the ancient and modern faces of Japan. From the futuristic neon streets of Tokyo to the tranquil traditional temples of Kyoto, this tour offers an unforgettable immersion into Japanese culture.',
    duration: '8 Days / 7 Nights',
    featured: true,
    included: [
      'Bullet Train (Shinkansen) passes',
      'Premium boutique hotel stays',
      'Traditional Ryokan overnight with Kaiseki dinner',
      'Tokyo Robot Restaurant & teamLab Planets tickets',
      'Guided Kyoto temple tours',
      'Sushi making masterclass'
    ],
    hotels: [
      { name: 'Shibuya Stream Hotel Tokyo', rating: 5, type: 'Boutique' },
      { name: 'Kyoto Ryokan Gion Sano', rating: 5, type: 'Traditional' }
    ],
    restaurants: [
      'Gion Kagayaki Kaiseki',
      'Ichiran Ramen Shibuya',
      'Tsukiji Fish Market Tour Eats'
    ],
    itinerary: [
      { day: 1, title: 'Tokyo Arrival', activities: 'Airport pickup, transfer to Shibuya hotel, evening tour of Shibuya Crossing and neon skyline.' },
      { day: 2, title: 'Tokyo Tech & Tradition', activities: 'Visit Senso-ji temple in Asakusa, then experience teamLab Planets digital art museum and Akihabara.' },
      { day: 3, title: 'Mount Fuji & Hakone', activities: 'Day trip to Mt. Fuji 5th Station, cruise on Lake Ashi, and hot spring bath (onsen) experience.' },
      { day: 4, title: 'Bullet Train to Kyoto', activities: 'Ride the Shinkansen to Kyoto. Check in to a traditional Ryokan. Enjoy an multi-course Kaiseki dinner.' },
      { day: 5, title: 'Golden Pavilion & Arashiyama', activities: 'Visit Kinkaku-ji (Golden Pavilion), walk through the Arashiyama Bamboo Grove, and visit Fushimi Inari Shrine.' },
      { day: 6, title: 'Historic Nara Day Trip', activities: 'Visit Nara Park to feed the friendly deer, and see the giant Buddha statue at Todai-ji temple.' },
      { day: 7, title: 'Osaka Street Food & Castle', activities: 'Travel to Osaka, explore Osaka Castle, and enjoy a food tour in the bustling Dotonbori district.' },
      { day: 8, title: 'Departure', activities: 'Transfer to Kansai International Airport for departure.' }
    ]
  },
  {
    country: 'Italy',
    description: 'Indulge in exquisite Italian cuisine, explore ancient historic landmarks, and enjoy the dramatic cliffs of the Amalfi coast.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Explore the highlights of Italy. Walk through history in Rome, see Renaissance art masterpieces in Florence, and wind down on the picturesque beaches of the Amalfi Coast.',
    duration: '7 Days / 6 Nights',
    featured: false,
    included: [
      'High-speed train transfers between cities',
      'Charming boutique hotels',
      'Colosseum & Vatican skip-the-line tickets',
      'Tuscan wine tasting tour',
      'Amalfi Coast boat cruise',
      'Daily Italian breakfasts'
    ],
    hotels: [
      { name: 'Hotel Quirinale Rome', rating: 4, type: 'Historic' },
      { name: 'Positano Coast Resort', rating: 5, type: 'Luxury' }
    ],
    restaurants: [
      'Da Enzo al 29 Rome',
      'La Sponda Positano',
      'Taverna di Cecco Florence'
    ],
    itinerary: [
      { day: 1, title: 'Benvenuti a Roma', activities: 'Check-in to historic center hotel, evening walk to Trevi Fountain and Pantheon.' },
      { day: 2, title: 'Colosseum & Vatican City', activities: 'Guided skip-the-line tour of the Colosseum & Roman Forum. Afternoon visit to the Vatican Museums and Sistine Chapel.' },
      { day: 3, title: 'Florence Renaissance Tour', activities: 'Morning train to Florence. View Michelangelo\'s David at the Accademia Gallery, visit the Duomo.' },
      { day: 4, title: 'Tuscan Wine & Val d\'Orcia', activities: 'Day tour of Tuscan wineries. Taste Chianti wine and enjoy a traditional farm-to-table lunch.' },
      { day: 5, title: 'Amalfi Coast / Positano', activities: 'Train to Naples, transfer to Positano on the Amalfi Coast. Swim in the Mediterranean and explore cliffside shops.' },
      { day: 6, title: 'Capri Island Boat Tour', activities: 'Excursion by private boat to Capri. Explore the Blue Grotto and enjoy lunch overlooking the Faraglioni rocks.' },
      { day: 7, title: 'Arrivederci Italia', activities: 'Transfer to Naples Airport for return flight.' }
    ]
  },
  {
    country: 'Egypt',
    description: 'Journey back in time to the land of Pharaohs. Discover the Great Pyramids of Giza, the Sphinx, and cruise along the historic Nile River.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Immerse yourself in Egypt\'s legendary history. Stand before the awe-inspiring Pyramids of Giza, navigate the majestic Nile River on a luxury cruise ship, and see the treasures of King Tutankhamun.',
    duration: '6 Days / 5 Nights',
    featured: false,
    included: [
      'Domestic flights (Cairo - Aswan / Luxor - Cairo)',
      '3-night Luxury Nile Cruise with full board',
      '5-star hotel accommodations in Cairo',
      'Private Egyptologist tour guide',
      'All entrance fees to temples and monuments',
      'Camel ride at Giza Pyramids'
    ],
    hotels: [
      { name: 'Four Seasons Cairo First Residence', rating: 5, type: 'Luxury' },
      { name: 'M/S Nile Goddess Cruise Ship', rating: 5, type: 'Premium Cruise' }
    ],
    restaurants: [
      'Felfela Traditional Cairo',
      '1886 Restaurant Luxor',
      'Nile Cruise Dining Deck'
    ],
    itinerary: [
      { day: 1, title: 'Cairo Arrival & Pyramids', activities: 'Meet and assist at airport, visit the Pyramids of Giza, Sphinx, and enjoy a camel ride. Evening Sound & Light show.' },
      { day: 2, title: 'Egyptian Museum & Old Cairo', activities: 'Guided tour of the Egyptian Museum (Tutankhamun treasures), then explore Khan el-Khalili bazaar and historic mosques.' },
      { day: 3, title: 'Fly to Aswan & Cruise Embarkation', activities: 'Fly to Aswan. Visit Philae Temple and the High Dam. Board the luxury Nile cruise ship.' },
      { day: 4, title: 'Kom Ombo & Edfu Temples', activities: 'Sail to Kom Ombo and visit the dual temple of Sobek & Haroeris. Continue sailing to Edfu to visit Horus Temple.' },
      { day: 5, title: 'Valley of the Kings in Luxor', activities: 'Cross to the West Bank of Luxor. Explore the tomb of King Tutankhamun in the Valley of the Kings, Queen Hatshepsut Temple, and Colossi of Memnon.' },
      { day: 6, title: 'Luxor Temple & Fly to Cairo', activities: 'Visit Karnak and Luxor temples. Transfer to Luxor Airport for flight back to Cairo and departure.' }
    ]
  },
  {
    country: 'Iceland',
    description: 'Witness the magical Aurora Borealis, majestic waterfalls, volcanic black sand beaches, and relaxing geothermal hot springs.',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1520637100090-8d9213151124?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Explore the land of fire and ice. Bathe in the warm waters of the Blue Lagoon, marvel at massive waterfalls, see erupting geysers, and set off on night excursions to hunt the spectacular Northern Lights.',
    duration: '6 Days / 5 Nights',
    featured: true,
    included: [
      'Super Jeep Northern Lights hunts',
      'Blue Lagoon Premium Comfort entry',
      'Glacier hiking tour with specialized gear',
      'Scenic Golden Circle tour',
      'Boutique accommodations in Reykjavik',
      'All local transfers'
    ],
    hotels: [
      { name: 'Hotel Reykjavik Saga', rating: 4, type: 'Modern Boutique' },
      { name: 'Fosshotel Glacier Lagoon', rating: 4, type: 'Scenic' }
    ],
    restaurants: [
      'Dill Restaurant Reykjavik',
      'Grillmarkadurinn (Grill Market)',
      'Messinn Seafood Restaurant'
    ],
    itinerary: [
      { day: 1, title: 'Blue Lagoon Spa & Reykjavik', activities: 'Airport pickup, transfer directly to the Blue Lagoon for a relaxing soak, check-in to Reykjavik hotel, welcome dinner.' },
      { day: 2, title: 'The Golden Circle', activities: 'Visit Thingvellir National Park, Gullfoss (Golden Waterfall), and the active Geysir geothermal area.' },
      { day: 3, title: 'South Coast Waterfalls & Black Beach', activities: 'Drive past waterfalls like Seljalandsfoss and Skogafoss. Walk along the dramatic Reynisfjara Black Sand Beach.' },
      { day: 4, title: 'Glacier Hike & Ice Cave', activities: 'Breathtaking guided hike on Solheimajokull Glacier. Explore crystal blue ice caves (winter option).' },
      { day: 5, title: 'Jokulsarlon Glacier Lagoon', activities: 'See floating icebergs on Glacier Lagoon and Diamond Beach. Evening tour for the Northern Lights.' },
      { day: 6, title: 'Reykjavik Exploration & Departure', activities: 'Visit Hallgrimskirkja church and Harpa Concert Hall. Free time for shopping before airport transfer.' }
    ]
  },
  {
    country: 'Peru',
    description: 'Trek through the historic Inca Trail to the majestic ruins of Machu Picchu and discover the rich heritage of the Sacred Valley.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Unlock the secrets of the Inca Empire. From the vibrant colonial city of Cusco, travel through the fertile Sacred Valley, and climb up to the breathtaking ruins of Machu Picchu nested high in the Andes mountains.',
    duration: '7 Days / 6 Nights',
    featured: false,
    included: [
      'Vistadome train tickets to Machu Picchu',
      'Guided private tour of Machu Picchu Citadel',
      'Authentic Peruvian cooking class',
      'All boutique hotel stays',
      'Inner-country flight (Lima - Cusco)',
      'Acclimatization excursions'
    ],
    hotels: [
      { name: 'JW Marriott El Convento Cusco', rating: 5, type: 'Historic Luxury' },
      { name: 'Sumaq Machu Picchu Hotel', rating: 5, type: 'Premium Riverside' }
    ],
    restaurants: [
      'Cicciolina Cusco',
      'Chicha by Gaston Acurio',
      'Mil Centro Moray'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Lima', activities: 'Airport pickup, check-in to Miraflores hotel. Evening gastronomy food walk.' },
      { day: 2, title: 'Fly to Cusco', activities: 'Morning flight to Cusco. Easy walking tour around Plaza de Armas to acclimatize to high altitude.' },
      { day: 3, title: 'Sacred Valley Tour', activities: 'Explore the Pisac ruins and local market, then visit the massive fortress of Ollantaytambo.' },
      { day: 4, title: 'Vistadome Train to Machu Picchu', activities: 'Board the scenic Vistadome train. Check-in to Aguas Calientes hotel, evening soak in natural hot springs.' },
      { day: 5, title: 'Machu Picchu Sanctuary Tour', activities: 'Spend the morning exploring the spectacular Machu Picchu citadel with a private guide. Return to Cusco by train.' },
      { day: 6, title: 'Rainbow Mountain Challenge', activities: 'Optional early morning trek to Rainbow Mountain, or leisure day in Cusco to explore galleries and cafes.' },
      { day: 7, title: 'Return to Lima & Departure', activities: 'Transfer to Cusco Airport for flight back to Lima and international connection.' }
    ]
  },
  {
    country: 'Australia',
    description: 'Snorkel in the world\'s largest coral reef system and visit the iconic Sydney Opera House and Bondi Beach.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Discover the sun-drenched beauty of Australia. Explore Sydney\'s iconic harbor, surf at Bondi Beach, and fly north to Cairns to dive into the kaleidoscope of colors at the Great Barrier Reef.',
    duration: '8 Days / 7 Nights',
    featured: false,
    included: [
      'Outer Barrier Reef catamaran cruise',
      'Snorkeling equipment & glass-bottom boat tour',
      'Sydney Opera House private guided tour',
      'Taronga Zoo entrance & cable car ride',
      'Luxury hotel accommodations',
      'Domestic flights (Sydney - Cairns)'
    ],
    hotels: [
      { name: 'Park Hyatt Sydney', rating: 5, type: 'Luxury Harborfront' },
      { name: 'Crystalbrook Riley Cairns', rating: 5, type: 'Modern Resort' }
    ],
    restaurants: [
      'Quay Restaurant Sydney',
      'Ochre Cairns (Native Australian Cuisine)',
      'Opera Bar Harborside Dining'
    ],
    itinerary: [
      { day: 1, title: 'G\'day Sydney', activities: 'Airport transfer, check-in, sunset harbor dinner cruise. View Harbour Bridge lit up.' },
      { day: 2, title: 'Sydney City & Opera House', activities: 'Guided tour of the Opera House, walk through Royal Botanic Gardens, and ride the ferry to Manly.' },
      { day: 3, title: 'Bondi Beach & Coastal Walk', activities: 'Learn to surf at Bondi Beach. Walk the famous Bondi to Coogee coastal path. Evening dine in Surry Hills.' },
      { day: 4, title: 'Fly to Tropical North Queensland', activities: 'Fly to Cairns. Check-in to luxury resort. Stroll along the Cairns Esplanade.' },
      { day: 5, title: 'Great Barrier Reef Day Cruise', activities: 'Ride a high-speed catamaran to the Outer Great Barrier Reef. Snorkel with marine life and enjoy a buffet lunch.' },
      { day: 6, title: 'Kuranda Rainforest Journey', activities: 'Ride the Scenic Railway through waterfalls to Kuranda village, and return via Skyrail Rainforest Cableway.' },
      { day: 7, title: 'Daintree Rainforest & Cape Tribulation', activities: 'Day tour to the oldest continuous rainforest. Spot wild crocodiles on a river cruise, swim in pristine creeks.' },
      { day: 8, title: 'Departure', activities: 'Enjoy a final tropical breakfast before transfer to Cairns Airport.' }
    ]
  },
  {
    country: 'Canada',
    description: 'Marvel at the turquoise glacial lakes, soaring rocky mountains, and dense pine forests in the heart of the Canadian Rockies.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Witness the unparalleled beauty of the Canadian Rockies. Cruise across the deep blue waters of Lake Louise, ride a giant Ice Explorer onto the Athabasca Glacier, and spot wildlife like grizzly bears in Banff National Park.',
    duration: '5 Days / 4 Nights',
    featured: false,
    included: [
      'Banff Gondola admission tickets',
      'Columbia Icefield Glacier adventure tour',
      'Lake Louise canoe rentals',
      'Mountain chalet resort stays',
      'Private airport shuttle transfers',
      'National Park passes'
    ],
    hotels: [
      { name: 'Fairmont Chateau Lake Louise', rating: 5, type: 'Luxury Castle' },
      { name: 'Banff Aspen Lodge', rating: 4, type: 'Cozy Lodge' }
    ],
    restaurants: [
      'The Grizzly House Banff',
      'Walliser Stube Lake Louise',
      'Three Ravens Restaurant'
    ],
    itinerary: [
      { day: 1, title: 'Calgary to Banff National Park', activities: 'Airport pickup, scenic drive to Banff. Check-in to mountain lodge. Ride the Banff Gondola for a mountain view.' },
      { day: 2, title: 'Lake Louise & Moraine Lake', activities: 'Visit the world-famous turquoise lakes. Canoe on Lake Louise and hike up the rockpile at Moraine Lake.' },
      { day: 3, title: 'Icefields Parkway Scenic Drive', activities: 'Drive along one of the world\'s most beautiful highways. Ride the Ice Explorer on Athabasca Glacier and walk the Skywalk.' },
      { day: 4, title: 'Johnston Canyon Hike & Hot Springs', activities: 'Hike through Johnston Canyon to see frozen/flowing waterfalls. Afternoon soak in the Banff Upper Hot Springs.' },
      { day: 5, title: 'Calgary Departure', activities: 'Morning wildlife viewing drive, shopping in Banff town, transfer back to Calgary Airport.' }
    ]
  },
  {
    country: 'France',
    description: 'Discover the City of Light with visits to the Eiffel Tower and Louvre Museum, followed by the sun-drenched beaches of Nice.',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    fullDescription: 'Fall in love with France. Experience the romance, art, and cafes of Paris, then board the high-speed TGV train to the glitz and glamour of the French Riviera.',
    duration: '7 Days / 6 Nights',
    featured: true,
    included: [
      'Eiffel Tower Summit priority access',
      'Louvre Museum guided highlights tour',
      'Seine River dinner cruise',
      'TGV Train tickets (Paris - Nice)',
      'Boutique hotel accommodations',
      'Monaco Day Excursion'
    ],
    hotels: [
      { name: 'Hotel Regina Louvre Paris', rating: 5, type: 'Elegant Classic' },
      { name: 'Hotel West End Nice', rating: 4, type: 'Sea View Promenade' }
    ],
    restaurants: [
      'Le Train Bleu Paris',
      'Le Chantecler Nice',
      'Charming Parisian Bistro Dining'
    ],
    itinerary: [
      { day: 1, title: 'Bonjour Paris', activities: 'Airport transfer, check-in, evening walking tour of Montmartre and Sacre-Coeur. Welcome dinner.' },
      { day: 2, title: 'Louvre & Eiffel Tower Summit', activities: 'Guided tour of the Louvre (Mona Lisa). Afternoon priority visit to the top floor of the Eiffel Tower.' },
      { day: 3, title: 'Palace of Versailles', activities: 'Day trip to Versailles to explore the Hall of Mirrors and magnificent royal gardens. Seine River dinner cruise in evening.' },
      { day: 4, title: 'TGV to Nice & French Riviera', activities: 'Relaxing high-speed train journey to Nice. Check-in to seafront hotel, walk along Promenade des Anglais.' },
      { day: 5, title: 'Monaco & Eze Village Day Trip', activities: 'Visit the medieval village of Eze, tour the perfume factory, then drive to Monaco. See the Prince\'s Palace and Casino.' },
      { day: 6, title: 'Cannes & Saint-Paul de Vence', activities: 'Visit Cannes (red carpet steps) and the beautiful hilltop artist village of Saint-Paul de Vence.' },
      { day: 7, title: 'Au Revoir France', activities: 'Enjoy a final croissant at a cafe, transfer to Nice Cote d\'Azur Airport for departure.' }
    ]
  }
];

async function seedDB() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    console.log('Clearing existing tours...');
    await Tour.deleteMany({});
    console.log('Cleared!');

    console.log('Inserting 10 sample tours...');
    await Tour.insertMany(sampleTours);
    console.log('Successfully inserted 10 tours!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDB();
