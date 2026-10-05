import { ServiceItem, Testimonial } from '../types';

export const COMPANY_INFO = {
  name: 'LINCS Sparkling Cleaning Services Ltd',
  shortName: 'LINCS Sparkling Cleaning',
  logoUrl: 'https://photos.fife.usercontent.google.com/pw/AP1GczMhqapbu5qN8JIZ5KzKlChxqip_NRnQmtp5PXvRuOxEJTiq-Zexkj2d=w1683-h1026-s-no-gm?authuser=0',
  phone: '+0749-070-5078',
  phoneDisplay: '+0749-070-5078',
  phoneTel: '+447490705078',
  email: 'info@lincscsltd.com',
  address: 'Clay Corner, Chertsey, Surrey KT16 8PW',
  fullAddress: 'Clay Corner, Chertsey, Surrey, KT16 8PW, United Kingdom',
  postcode: 'KT16 8PW',
  town: 'Chertsey, Surrey',
  hours: 'Mon - Sat: 07:00 - 19:00 (24/7 Commercial Night Shifts Available)',
  instagram: '@LINCSSCSLTD',
  instagramUrl: 'https://www.instagram.com/LINCSSCSLTD/',
  tiktok: '@LINCSSCSLTD',
  tiktokUrl: 'https://www.tiktok.com/@LINCSSCSLTD',
  insurance: '£5,000,000 Public Liability',
  registration: 'Registered in England & Wales',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'office-cleaning',
    title: 'Office Cleaning',
    category: 'commercial',
    shortDesc: 'Comprehensive corporate office sanitation, desk sanitizing, floor maintenance, and meeting room turnaround.',
    fullDesc: 'Tailored daily, weekly, or custom commercial cleaning contracts for busy professional offices across Surrey and London. Our vetted crew keeps your workstations, kitchenettes, washrooms, and conference suites impeccably clean and virus-free.',
    flyerMatch: true,
    idealFor: ['Corporate HQs', 'Law & Accountancy Firms', 'Tech Hubs', 'Co-working Spaces'],
    checklist: [
      'High-touch point sanitization (desks, door handles, lift buttons)',
      'Vacuuming commercial carpets & buffing hard floors',
      'Restroom deep sanitization, replenishing washroom supplies',
      'Kitchenette & breakroom descaling, microwave & fridge wiping',
      'Confidential waste handling & recycling disposal',
      'Streak-free internal glass partitions & boardrooms'
    ],
    estimatedStartingPrice: '£65',
    frequency: 'Daily, Bi-Weekly, or Weekly',
    iconName: 'Building2',
    bgGradient: 'from-emerald-950/80 to-neutral-900',
  },
  {
    id: 'restaurant-cleaning',
    title: 'Restaurant Cleaning',
    category: 'hospitality',
    shortDesc: 'Commercial kitchen degreasing, dining hall floor scrubbing, extraction hoods, and food hygiene compliance.',
    fullDesc: 'Stringent sanitation meeting UK Food Standards Agency and EHO hygiene regulations. We work during overnight or early morning off-hours so your kitchen, bar, and guest dining areas open every shift spotless and welcoming.',
    flyerMatch: true,
    idealFor: ['Fine Dining', 'Gastropubs', 'Cafés & Bakeries', 'Fast-Casual Chains', 'Cloud Kitchens'],
    checklist: [
      'Deep chemical degreasing of cooker ranges, fryers & flat-tops',
      'Slip-resistant machine floor scrubbing & sanitizing',
      'Dining room chair, upholstery, and booth stain treatment',
      'Food preparation stainless steel surfaces sanitization',
      'Grease extraction filters & hood canopy wipe down',
      'Customer washroom sparkling disinfection'
    ],
    estimatedStartingPrice: '£95',
    frequency: 'Nightly or Weekly Deep Clean',
    iconName: 'Utensils',
    bgGradient: 'from-amber-950/80 to-neutral-900',
  },
  {
    id: 'carpet-rug-cleaning',
    title: 'Carpet/Rug Cleaning',
    category: 'specialist',
    shortDesc: 'Industrial hot water steam extraction, stubborn stain removal, deodorizing, and anti-allergen care.',
    fullDesc: 'Revitalize dull, tired carpets and luxury oriental rugs with our high-pressure hot water extraction system. Eliminates embedded dirt, coffee spills, foot traffic marks, and bacteria with fast drying times under 2 hours.',
    flyerMatch: true,
    idealFor: ['Commercial Offices', 'Hotels & Lounges', 'Private Residences', 'Tenancy Checkouts'],
    checklist: [
      'Pre-inspection fiber testing & pre-vacuuming',
      'Targeted stain pre-treatment for wine, coffee, oil & ink',
      'Hot water extraction lifting grit from carpet pile base',
      'Eco-friendly neutralising rinse preventing sticky residue',
      'WoolSafe & pet-safe non-toxic shampoo formulas',
      'Quick-dry turbo fan setup for rapid room re-entry'
    ],
    estimatedStartingPrice: '£45',
    frequency: 'Quarterly, Bi-Annual, or One-off',
    iconName: 'Sparkles',
    bgGradient: 'from-cyan-950/80 to-neutral-900',
  },
  {
    id: 'factory-cleaning',
    title: 'Factory Cleaning',
    category: 'industrial',
    shortDesc: 'Heavy-duty industrial facility scrubbing, machinery wipe-down, warehouse high-dusting, and safety lines.',
    fullDesc: 'Trained in COSHH regulations and industrial safety protocols. We handle manufacturing floors, logistics depots, craft production facilities, and plant rooms using heavy-duty scrubber-dryers and high-level vacuuming systems.',
    flyerMatch: true,
    idealFor: ['Manufacturing Plants', 'Logistics Warehouses', 'Workshops & Automotive Garages', 'Packaging Units'],
    checklist: [
      'Heavy industrial floor degreasing & ride-on scrubbing',
      'Overhead pipework, girder & light bay high dusting',
      'Machinery exterior degreasing and safety clear zones',
      'Staff locker rooms, canteen & shower facility sanitation',
      'Hazardous dust extraction & waste disposal compliance',
      'Site risk assessments & method statements (RAMS) provided'
    ],
    estimatedStartingPrice: '£140',
    frequency: 'Scheduled Shifts or Planned Shutdowns',
    iconName: 'Factory',
    bgGradient: 'from-slate-900 to-neutral-950',
  },
  {
    id: 'end-of-tenancy',
    title: 'End of Tenancy Cleaning',
    category: 'specialist',
    shortDesc: 'Guaranteed deposit return cleaning compliant with Surrey letting agent & landlord inventories.',
    fullDesc: 'Moving out or preparing a property for new tenants? Our comprehensive top-to-bottom sparkle clean follows inventory agency checklists, including oven detailing, descaling, and inside window cleaning.',
    flyerMatch: false,
    idealFor: ['Tenants Moving Out', 'Landlords & Letting Agents', 'Estate Agents', 'Property Managers'],
    checklist: [
      'Full deep oven, hob & extractor fan descaling',
      'Internal window panes, sills, and window tracks',
      'Bathroom descaling, tile regrouting care, limescale removal',
      'All kitchen cupboards cleaned inside and out',
      'Skirting boards, switches, sockets, and doors wiped',
      '48-Hour re-clean guarantee if inventory flags any issue'
    ],
    estimatedStartingPrice: '£120',
    frequency: 'One-off checkout service',
    iconName: 'CheckCircle2',
    bgGradient: 'from-teal-950/80 to-neutral-900',
  },
  {
    id: 'window-cleaning',
    title: 'Commercial Window Cleaning',
    category: 'commercial',
    shortDesc: 'Pure water-fed pole reach up to 4 storeys and streak-free interior glass partition cleaning.',
    fullDesc: 'Crystal-clear glass creates an instant positive impression. Using 100% demineralised pure water, we leave office windows, shopfronts, and showroom facades gleaming without streaks or chemical residue.',
    flyerMatch: false,
    idealFor: ['Retail Storefronts', 'Office Complexes', 'Schools & Clinics', 'Car Showrooms'],
    checklist: [
      'Pure reverse-osmosis deionised water system',
      'Frame, sill, and mullion washing included',
      'Ground level up to 45ft pole reach without scaffolding',
      'Interior partition glass & decorative glazing',
      'Solar panel washing & canopy glass cleaning'
    ],
    estimatedStartingPrice: '£40',
    frequency: 'Monthly, Fortnightly, or As-needed',
    iconName: 'Layers',
    bgGradient: 'from-sky-950/80 to-neutral-900',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Sterling',
    role: 'Operations Director',
    company: 'Chertsey Business Park',
    location: 'Chertsey, Surrey',
    quote: 'LINCS has transformed our 3-storey office building. Their team is punctual, unobtrusive, and the sparkle they leave behind on Monday mornings sets the standard for our whole team.',
    rating: 5,
    serviceType: 'Office Cleaning Contract',
    date: 'February 2026'
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'General Manager',
    company: 'The Olive Branch Bistro',
    location: 'Weybridge, Surrey',
    quote: 'We had an upcoming 5-star EHO food hygiene audit and called LINCS for an overnight restaurant deep scrub. They degreased our cookline and scrubbed the dining floors like new. We passed with flying colours!',
    rating: 5,
    serviceType: 'Restaurant Deep Clean',
    date: 'January 2026'
  },
  {
    id: '3',
    name: 'David Pemberton',
    role: 'Warehouse & Logistics Lead',
    company: 'Surrey Freight & Storage',
    location: 'Staines-upon-Thames',
    quote: 'Finding reliable cleaners for a 20,000 sq ft distribution facility was tough until LINCS stepped in. Their ride-on scrubbers and high-level vacuuming team keep our floor hazards at zero.',
    rating: 5,
    serviceType: 'Factory & Warehouse Cleaning',
    date: 'March 2026'
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    role: 'Private Tenant',
    company: 'Residential Move',
    location: 'Addlestone, Surrey',
    quote: 'Needed carpet steam cleaning after two years with pets before handing keys back to our landlord. LINCS had the carpets looking and smelling brand new within 90 minutes. Full deposit refunded!',
    rating: 5,
    serviceType: 'Carpet Steam Cleaning',
    date: 'December 2025'
  }
];

export const SERVICE_AREAS = [
  { town: 'Chertsey (HQ)', postcode: 'KT16', distance: 'Local Hub' },
  { town: 'Weybridge', postcode: 'KT13', distance: '3 miles' },
  { town: 'Addlestone', postcode: 'KT15', distance: '2 miles' },
  { town: 'Woking', postcode: 'GU21 / GU22', distance: '6 miles' },
  { town: 'Staines-upon-Thames', postcode: 'TW18', distance: '4 miles' },
  { town: 'Egham & Englefield Green', postcode: 'TW20', distance: '5 miles' },
  { town: 'Shepperton & Sunbury', postcode: 'TW17', distance: '4 miles' },
  { town: 'Walton-on-Thames', postcode: 'KT12', distance: '5 miles' },
  { town: 'Cobham & Oxshott', postcode: 'KT11', distance: '7 miles' },
  { town: 'Guildford', postcode: 'GU1 / GU2', distance: '12 miles' },
  { town: 'Greater London & M25 corridor', postcode: 'SW / West London', distance: 'Coverage on request' },
];

export const SOCIAL_POSTS = {
  instagram: [
    {
      id: 'ig-1',
      title: 'Restaurant Kitchen Transformation',
      views: '14.2K views',
      likes: '1.2K',
      description: 'Satisfying deep scrub on greasy commercial range cooker hoods in Weybridge! ✨',
      tag: '#SparklingClean #CommercialCleaning #Surrey',
      badge: 'Trending Reel'
    },
    {
      id: 'ig-2',
      title: 'Luxury Carpet Steam Extraction',
      views: '8.7K views',
      likes: '890',
      description: 'Watch 3 years of foot traffic lift away in one pass. Hot water extraction magic in Chertsey.',
      tag: '#CarpetCleaning #BeforeAndAfter #LINCS',
      badge: 'Before & After'
    },
    {
      id: 'ig-3',
      title: 'Corporate Office Turnaround at Dawn',
      views: '6.4K views',
      likes: '540',
      description: 'Ready for 200 staff by 7:30 AM. Fresh desks, streak-free glass, sanitized breakroom.',
      tag: '#OfficeCleaning #SurreyBusiness',
      badge: 'Behind The Scenes'
    }
  ],
  tiktok: [
    {
      id: 'tt-1',
      title: 'Most Satisfying Factory Floor Scrubber',
      views: '45.1K plays',
      likes: '4.8K',
      description: 'Watch the industrial scrubber strip years of forklift tire grime in seconds 🧼✨',
      sound: 'Original Sound - LINCS Cleaning Crew',
      badge: 'Viral Video'
    },
    {
      id: 'tt-2',
      title: 'How we turn a messy bistro into a sterile kitchen',
      views: '28.3K plays',
      likes: '2.9K',
      description: 'Night shift cleaning in Chertsey Surrey. The steam power is unreal! 💨',
      sound: 'Clean Vibes Sound',
      badge: 'Night Shift'
    },
    {
      id: 'tt-3',
      title: 'Carpet extraction dirty water reveal 🤢➡️✨',
      views: '72.4K plays',
      likes: '7.1K',
      description: 'You will never look at your office carpets the same way again... #cleanwithme',
      sound: 'Satisfying Sounds ASMR',
      badge: 'ASMR Cleaning'
    }
  ]
};
