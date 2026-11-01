/**
 * ====================================================================
 * VNDS PHOTOGRAPHY - GALLERY DATABASE
 * ====================================================================
 * මෙහි ඇති ඡායාරූප සහ විස්තර ඔබට පහසුවෙන්ම වෙනස් කළ හැක (You can easily edit photos here).
 * 
 * ඔබට අලුත් ඡායාරූපයක් එක් කිරීමට:
 * 1. ඔබේ photo එක images/ folder එකට දාන්න (හෝ online link එකක් භාවිතා කරන්න).
 * 2. පහත Array එකට අලුත් object එකක් එක් කරන්න.
 * 
 * Available Categories:
 * - 'weddings'    : මංගල හා ප්‍රී-ෂූට් (Weddings & Engagements)
 * - 'portraits'   : පෝට්රේට් සහ විලාසිතා (Portraits & Fashion)
 * - 'nature'      : ස්වභාවධර්ම හා වනජීවී (Nature & Wildlife)
 * - 'events'      : උත්සව හා ප්‍රසංග (Events & Celebrations)
 * - 'street'      : වීදි හා ගෘහ නිර්මාණ (Street & Architecture)
 * - 'commercial'  : වෙළඳ දැන්වීම් හා නිෂ්පාදන (Commercial & Lifestyle)
 */

const GALLERY_DATA = [
  // --- WEDDINGS ---
  {
    id: 1,
    title: "Elegance in White",
    sinhalaTitle: "සුදු සේලයේ මනාලිය",
    category: "weddings",
    categoryName: "Weddings",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait", // 'portrait' | 'landscape' | 'square'
    location: "Galle Fort, Sri Lanka",
    gear: "Sony A7R IV • 85mm f/1.4 • 1/500s • ISO 100",
    description: "Capturing the serene and emotional pre-ceremony moments of the bride in classic monochrome and natural backlight.",
    featured: true,
    likes: 142
  },
  {
    id: 2,
    title: "Golden Hour Promise",
    sinhalaTitle: "රන්වන් හිරු බැසයන මොහොතක",
    category: "weddings",
    categoryName: "Weddings",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
    aspect: "landscape",
    location: "Mirissa Beach, Sri Lanka",
    gear: "Canon EOS R5 • 35mm f/1.4 • 1/800s • ISO 160",
    description: "A sunset walk along the southern coastline, sealing love amidst the warm ocean breeze and golden rays.",
    featured: true,
    likes: 218
  },
  {
    id: 3,
    title: "Timeless Rings & Details",
    sinhalaTitle: "සදාතනික ප්‍රේමයේ මුදු සලකුණ",
    category: "weddings",
    categoryName: "Weddings",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80",
    aspect: "square",
    location: "Colombo Heritage Hotel",
    gear: "Sony A7 IV • 90mm Macro f/2.8 • 1/200s • ISO 200",
    description: "Delicate macro photography highlighting the intricate handcrafted platinum rings and floral bouquet.",
    featured: false,
    likes: 95
  },
  {
    id: 4,
    title: "The Joyful Dance",
    sinhalaTitle: "ප්‍රීතිමත් මංගල නර්ථනය",
    category: "weddings",
    categoryName: "Weddings",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "Kandy Grand Ballroom",
    gear: "Nikon Z9 • 50mm f/1.2 • 1/320s • ISO 800",
    description: "Pure laughter and spontaneous happiness as the newlyweds step onto the dance floor surrounded by friends.",
    featured: true,
    likes: 184
  },

  // --- PORTRAITS ---
  {
    id: 5,
    title: "Soulful Gaze",
    sinhalaTitle: "හැඟීම්බර බැල්ම",
    category: "portraits",
    categoryName: "Portraits",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "VNDS Studio A",
    gear: "Sony A7R V • 85mm f/1.4 GM • 1/250s • ISO 100",
    description: "Studio fine-art portrait emphasizing emotional depth, clean Rembrandt lighting, and authentic expressions.",
    featured: true,
    likes: 310
  },
  {
    id: 6,
    title: "Urban Neon Mood",
    sinhalaTitle: "නියොන් ආලෝකයේ රිද්මය",
    category: "portraits",
    categoryName: "Portraits",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "Colombo Night Strip",
    gear: "Sony A7S III • 35mm f/1.4 • 1/160s • ISO 1200",
    description: "Cyberpunk-inspired cinematic portrait with vivid teal and magenta reflections in an urban nightscape.",
    featured: true,
    likes: 175
  },
  {
    id: 7,
    title: "Sun-kissed Radiance",
    sinhalaTitle: "හිරු රැසින් නැහැවුනු සිනහව",
    category: "portraits",
    categoryName: "Portraits",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "Nuwara Eliya Tea Fields",
    gear: "Canon R6 • 85mm f/1.8 • 1/1000s • ISO 100",
    description: "Natural outdoor portrait bathed in golden morning light amidst the lush emerald tea trails.",
    featured: false,
    likes: 192
  },
  {
    id: 8,
    title: "Monochrome Intensity",
    sinhalaTitle: "කළු-සුදු තීව්‍රතාවය",
    category: "portraits",
    categoryName: "Portraits",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    aspect: "square",
    location: "Studio Minimalist",
    gear: "Fujifilm GFX 100S • 110mm f/2 • 1/200s • ISO 100",
    description: "High-contrast black and white editorial profile, accentuating texture, character, and sharp contours.",
    featured: false,
    likes: 145
  },

  // --- NATURE & WILDLIFE ---
  {
    id: 9,
    title: "Majesty of the Wild Leopard",
    sinhalaTitle: "විලෝපිකයාගේ ගාම්භීරත්වය",
    category: "nature",
    categoryName: "Nature & Wildlife",
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=600&q=80",
    aspect: "landscape",
    location: "Yala National Park, Sri Lanka",
    gear: "Sony A1 • 400mm f/2.8 GM • 1/2000s • ISO 400",
    description: "A rare and majestic Sri Lankan leopard resting upon granite rocks in Block 1 of Yala at dusk.",
    featured: true,
    likes: 420
  },
  {
    id: 10,
    title: "Misty Peaks of Ella",
    sinhalaTitle: "මීදුම් සළු පැළඳි ඇල්ල කඳුකරය",
    category: "nature",
    categoryName: "Nature & Wildlife",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    aspect: "landscape",
    location: "Ella Rock, Sri Lanka",
    gear: "Sony A7R IV • 24-70mm f/2.8 GM • 1/125s • ISO 100",
    description: "Early morning mountain panorama where cloud inversions roll silently through ancient emerald valleys.",
    featured: true,
    likes: 338
  },
  {
    id: 11,
    title: "Gentle Giant in Morning Mist",
    sinhalaTitle: "උදෑසන පින්න මැදින් ඇත් රජිඳුන්",
    category: "nature",
    categoryName: "Nature & Wildlife",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "Udawalawe National Park",
    gear: "Canon 1DX Mark III • 70-200mm f/2.8 • 1/1600s • ISO 320",
    description: "A solitary wild tusker walking calmly through the savannah grass as morning fog lifts into the sky.",
    featured: false,
    likes: 275
  },
  {
    id: 12,
    title: "Azure Waves & Coastal Drama",
    sinhalaTitle: "දකුණු වෙරළේ රළ පෙළ",
    category: "nature",
    categoryName: "Nature & Wildlife",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    aspect: "landscape",
    location: "Tangalle Coast, Sri Lanka",
    gear: "Sony A7R V • 16-35mm f/2.8 • 2.5s Long Exposure • ISO 50",
    description: "Silky smooth long exposure showcasing the untouched tropical sea spray against golden shores.",
    featured: false,
    likes: 188
  },

  // --- EVENTS & CONCERTS ---
  {
    id: 13,
    title: "Electric Pulse of the Stage",
    sinhalaTitle: "වේදිකාවේ රිද්මය හා ආලෝකය",
    category: "events",
    categoryName: "Events",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    aspect: "landscape",
    location: "Colombo Music Festival",
    gear: "Sony A7S III • 24-70mm f/2.8 • 1/250s • ISO 3200",
    description: "Unbridled crowd energy and spectacular pyrotechnics caught at the climax of an international music festival.",
    featured: true,
    likes: 312
  },
  {
    id: 14,
    title: "Esala Perahera Majesty",
    sinhalaTitle: "ඓතිහාසික පෙරහැර අසිරිය",
    category: "events",
    categoryName: "Events",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "Kandy, Sri Lanka",
    gear: "Canon EOS R5 • 50mm f/1.2 • 1/400s • ISO 1600",
    description: "Vibrant fire dancers spinning golden torches against the historic night backdrop of sacred temples.",
    featured: true,
    likes: 389
  },
  {
    id: 15,
    title: "Sparkler Celebration Night",
    sinhalaTitle: "ගිනිකෙළි මැදින් සාද සැඳෑව",
    category: "events",
    categoryName: "Events",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    aspect: "square",
    location: "Mount Lavinia Hotel",
    gear: "Sony A7 IV • 35mm f/1.4 • 1/125s • ISO 1000",
    description: "Magical night anniversary event illuminated by handheld golden sparklers and genuine smiles.",
    featured: false,
    likes: 167
  },

  // --- STREET & ARCHITECTURE ---
  {
    id: 16,
    title: "Nine Arches Viaduct",
    sinhalaTitle: "ආරුක්කු නමයේ දුම්රිය පාලම",
    category: "street",
    categoryName: "Street & Architecture",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80",
    aspect: "landscape",
    location: "Demodara, Ella",
    gear: "DJI Mavic 3 Pro • 24mm f/2.8 • 1/640s • ISO 100",
    description: "Iconic colonial engineering wonder nestled among lush tropical canopy as the morning blue train crosses.",
    featured: true,
    likes: 450
  },
  {
    id: 17,
    title: "Monsoon Streets of Pettah",
    sinhalaTitle: "පිටකොටුවේ වර්ෂාබර වීදි",
    category: "street",
    categoryName: "Street & Architecture",
    image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "Pettah Market, Colombo",
    gear: "Leica Q2 • 28mm f/1.7 Summilux • 1/500s • ISO 400",
    description: "Rain-drenched reflections, bustling tuk-tuks, and vibrant market vendors in the historical heart of Colombo.",
    featured: false,
    likes: 210
  },
  {
    id: 18,
    title: "Geometric Modernity",
    sinhalaTitle: "නූතන නාගරික ගෘහ නිර්මාණ",
    category: "street",
    categoryName: "Street & Architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    aspect: "landscape",
    location: "Colombo Port City",
    gear: "Sony A7R IV • 12-24mm f/4 G • 1/320s • ISO 100",
    description: "Striking architectural angles reflecting glass, steel, and symmetry under clear tropical skies.",
    featured: false,
    likes: 154
  },

  // --- COMMERCIAL & LIFESTYLE ---
  {
    id: 19,
    title: "Ceylon Artisan Brew",
    sinhalaTitle: "ශ්‍රී ලාංකීය තේ කලාව",
    category: "commercial",
    categoryName: "Commercial",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    aspect: "square",
    location: "Artisan Tea Lounge, Colombo",
    gear: "Canon EOS R5 • 100mm Macro f/2.8 • 1/200s • ISO 100",
    description: "Commercial editorial styling for artisanal beverage brand with organic steam and natural table accents.",
    featured: true,
    likes: 204
  },
  {
    id: 20,
    title: "Luxury Timepiece Elegance",
    sinhalaTitle: "විලාසිතා සහ සුඛෝපභෝගී නිර්මාණ",
    category: "commercial",
    categoryName: "Commercial",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    aspect: "portrait",
    location: "Studio Luxury Bay",
    gear: "Sony A7R IV • 90mm f/2.8 Macro • 1/160s • ISO 50",
    description: "Meticulous light control highlighting the brushed gold bevels and leather strap of high-end accessories.",
    featured: false,
    likes: 178
  }
];

// Category Definitions & Display Badges
const CATEGORIES = [
  { id: "all", name: "All Photos", sinhala: "සියලුම ඡායාරූප", icon: "camera" },
  { id: "weddings", name: "Weddings", sinhala: "මංගල & ප්‍රී-ෂූට්", icon: "heart" },
  { id: "portraits", name: "Portraits", sinhala: "පෝට්රේට් & විලාසිතා", icon: "user" },
  { id: "nature", name: "Nature & Wildlife", sinhala: "ස්වභාවධර්ම & සතුන්", icon: "compass" },
  { id: "events", name: "Events", sinhala: "උත්සව & ප්‍රසංග", icon: "calendar" },
  { id: "street", name: "Street & Architecture", sinhala: "වීදි & ගෘහ නිර්මාණ", icon: "map-pin" },
  { id: "commercial", name: "Commercial", sinhala: "වෙළඳ දැන්වීම්", icon: "shopping-bag" }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: "Kasun & Shenali Fernando",
    event: "Wedding Ceremony at Mount Lavinia",
    quote: "VNDS Photography captured the happiest day of our lives with such passion and elegance. The candid moments and lighting were beyond our dreams! Everyone who saw our wedding album was amazed.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    name: "Dr. Danushka Jayasinghe",
    event: "Corporate & Executive Portrait",
    quote: "Super professional demeanor, exceptional eye for framing, and very fast turnaround time. My corporate headshots and portfolio look world-class. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    name: "Nethmi Wickramasinghe",
    event: "Fashion & Model Portfolio Shoot",
    quote: "Working with VNDS was an absolute joy. They guided me through every pose effortlessly and created magic with natural light and mood. 10/10 experience!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5
  }
];

// Photography Packages
const PACKAGES = [
  {
    id: "portrait",
    title: "Portrait & Fashion",
    sinhalaTitle: "පෝට්රේට් පැකේජය",
    price: "Rs. 25,000",
    tagline: "Ideal for individual models, graduates & social media creators",
    popular: false,
    features: [
      "2 Hours Dedicated Studio or Outdoor Session",
      "Up to 2 Outfit / Look Changes",
      "25+ Professionally Retouched High-Res Photos",
      "Private Online Gallery with Instant Download",
      "High-Res & Web-Optimized Formats Included"
    ]
  },
  {
    id: "wedding",
    title: "Signature Wedding",
    sinhalaTitle: "සිග්නේචර් වෙඩින් පැකේජය",
    price: "Rs. 120,000",
    tagline: "Our most requested full-day wedding coverage package",
    popular: true,
    features: [
      "Full Day Coverage (Dressing, Ceremony & Reception)",
      "Lead Photographer + 1 Assistant Photographer",
      "Complimentary Pre-Shoot (Outdoor Location)",
      "Cinematic Drone Aerial Photography Included",
      "100+ Master Retouched Masterpieces + All Raw JPEGs",
      "Handcrafted Luxury 40-Page Magazine Album",
      "Express Delivery within 14 Working Days"
    ]
  },
  {
    id: "events",
    title: "Events & Commercial",
    sinhalaTitle: "උත්සව & වෙළඳ පැකේජය",
    price: "Rs. 45,000",
    tagline: "Concerts, birthday celebrations, corporate galas & brands",
    popular: false,
    features: [
      "Up to 5 Hours Continuous Event Coverage",
      "Full Party & Stage Lighting Flash Setup",
      "150+ Edited High-Resolution Photographs",
      "Next-Day Teaser Photos for Social Media",
      "Commercial Rights & Fast Online Delivery"
    ]
  }
];
