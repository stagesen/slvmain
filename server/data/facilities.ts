import { InsertFacility, ServiceType } from "@shared/schema";

// Helper function to generate a slug from a name
const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Sample data for facilities
export const initialFacilities: InsertFacility[] = [
  {
    name: "Mountain View Senior Living",
    slug: "mountain-view-senior-living",
    description: "Mountain View Senior Living is a premier assisted living community in Denver, Colorado, offering personalized care services in a comfortable, home-like environment. Our dedicated staff provides 24-hour support to help residents with daily activities while maintaining their independence and dignity. We offer beautiful living spaces, chef-prepared meals, and a full calendar of engaging activities and outings.",
    shortDescription: "Beautiful community offering personalized care services, chef-prepared meals, and a vibrant social calendar for active seniors.",
    address: "1234 Mountain View Drive",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    phone: "(303) 555-1234",
    website: "https://www.mountainviewseniorliving.com",
    email: "info@mountainviewseniorliving.com",
    serviceType: ServiceType.ASSISTED_LIVING,
    rating: 4.8,
    reviewCount: 45,
    pricing: {
      baseMonthlyMin: 3750,
      baseMonthlyMax: 5500,
      entryFee: 2000,
      additionalFees: [
        {
          description: "Medication Management",
          cost: 350,
          frequency: "monthly"
        },
        {
          description: "Enhanced Care",
          cost: 500,
          frequency: "monthly"
        }
      ]
    },
    amenities: [
      "Pet Friendly",
      "Fitness Center",
      "Garden",
      "Beauty Salon",
      "Library",
      "Transportation Services",
      "Housekeeping",
      "Laundry Services"
    ],
    services: [
      "Assistance with Daily Activities",
      "Medication Management",
      "Health Monitoring",
      "Chef-Prepared Meals",
      "Scheduled Transportation",
      "Social Activities"
    ],
    imageUrl: "https://images.unsplash.com/photo-1580247817119-c6ed8035d619?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1580247817119-c6ed8035d619?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595217416698-8a47d5c32b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    latitude: 39.7392,
    longitude: -104.9903,
    isFeatured: true,
    isRelevant: true,
    relevanceAnalysis: null
  },
  {
    name: "Sunrise Memory Care",
    slug: "sunrise-memory-care",
    description: "Sunrise Memory Care provides specialized care for individuals living with Alzheimer's disease, dementia, and other memory impairments. Our Boulder community features secure neighborhoods designed to keep residents safe while encouraging independence and social engagement. Our Reminiscence programming focuses on each resident's strengths and abilities to promote a sense of achievement and purpose every day.",
    shortDescription: "Specialized memory care community with secure environments, enriching activities, and highly trained staff for Alzheimer's and dementia care.",
    address: "567 Sunrise Lane",
    city: "Boulder",
    state: "CO",
    zipCode: "80301",
    phone: "(303) 555-7890",
    website: "https://www.sunrisememorycare.com",
    email: "info@sunrisememorycare.com",
    serviceType: ServiceType.MEMORY_CARE,
    rating: 4.7,
    reviewCount: 32,
    pricing: {
      baseMonthlyMin: 5850,
      baseMonthlyMax: 7200,
      entryFee: 3000,
      additionalFees: [
        {
          description: "Enhanced Memory Care",
          cost: 600,
          frequency: "monthly"
        }
      ]
    },
    amenities: [
      "24/7 Staff",
      "Secured Access",
      "Therapy Programs",
      "Memory-Focused Activities",
      "Indoor and Outdoor Walking Paths",
      "Custom Dining Program",
      "Family Support Programs"
    ],
    services: [
      "Specialized Memory Care",
      "Reminiscence Therapy",
      "Medication Management",
      "Personal Care Assistance",
      "Life Enrichment Activities",
      "Family Support and Education"
    ],
    imageUrl: "https://images.unsplash.com/photo-1584462967434-3a3f428b7ac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1584462967434-3a3f428b7ac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584710464669-5bcd184c9f18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616092542462-c9576a9b8ff6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    latitude: 40.0150,
    longitude: -105.2705,
    isFeatured: false,
    isRelevant: true,
    relevanceAnalysis: null
  },
  {
    name: "Pinecrest Independent Living",
    slug: "pinecrest-independent-living",
    description: "Pinecrest Independent Living offers luxury retirement living in the heart of Fort Collins. Our community is designed for active seniors who want to enjoy their retirement years without the hassles of home maintenance. Featuring spacious apartments, resort-style amenities, and a full calendar of social activities, Pinecrest provides the perfect blend of independence and community.",
    shortDescription: "Modern retirement community with luxury apartments, resort-style amenities, and a vibrant social calendar for active seniors.",
    address: "789 Pinecrest Avenue",
    city: "Fort Collins",
    state: "CO",
    zipCode: "80525",
    phone: "(970) 555-4321",
    website: "https://www.pinecrestliving.com",
    email: "info@pinecrestliving.com",
    serviceType: ServiceType.INDEPENDENT_LIVING,
    rating: 4.9,
    reviewCount: 58,
    pricing: {
      baseMonthlyMin: 2850,
      baseMonthlyMax: 4500,
      entryFee: 1500,
      additionalFees: [
        {
          description: "Second Occupant",
          cost: 800,
          frequency: "monthly"
        }
      ]
    },
    amenities: [
      "Swimming Pool",
      "Full Kitchen",
      "Transportation",
      "Fitness Center",
      "Game Room",
      "Arts Studio",
      "Theater Room",
      "Library",
      "Computer Center",
      "Outdoor Patio and Gardens"
    ],
    services: [
      "Full Apartment Maintenance",
      "Weekly Housekeeping",
      "Social and Recreational Activities",
      "Scheduled Transportation",
      "24-Hour Emergency Response",
      "Utilities Included"
    ],
    imageUrl: "https://images.unsplash.com/photo-1574288618192-b6fad73a3f79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1574288618192-b6fad73a3f79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567200202742-669ea35c5813?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561716604-3ce4adab8e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    latitude: 40.5853,
    longitude: -105.0844,
    isFeatured: true,
    isRelevant: true,
    relevanceAnalysis: null
  },
  {
    name: "Golden Heights Nursing Center",
    slug: "golden-heights-nursing-center",
    description: "Golden Heights Nursing Center provides comprehensive skilled nursing care and rehabilitation services in a compassionate environment. Our interdisciplinary team of healthcare professionals delivers personalized care plans to address each resident's unique needs. From short-term rehabilitation to long-term care, we are committed to enhancing quality of life and promoting recovery.",
    shortDescription: "Skilled nursing facility offering 24/7 medical care, rehabilitation services, and compassionate long-term care for seniors with complex medical needs.",
    address: "456 Golden Road",
    city: "Colorado Springs",
    state: "CO",
    zipCode: "80903",
    phone: "(719) 555-9876",
    website: "https://www.goldenheightsnursing.com",
    email: "info@goldenheightsnursing.com",
    serviceType: ServiceType.NURSING_HOME,
    rating: 4.6,
    reviewCount: 41,
    pricing: {
      baseMonthlyMin: 8200,
      baseMonthlyMax: 10500,
      entryFee: null,
      additionalFees: [
        {
          description: "Specialized Treatments",
          cost: 900,
          frequency: "monthly"
        }
      ]
    },
    amenities: [
      "24/7 Nursing Care",
      "Rehabilitation Gym",
      "Private and Semi-Private Rooms",
      "Dining Room",
      "Activity Room",
      "Garden Courtyard",
      "Chapel",
      "Beauty Salon"
    ],
    services: [
      "Skilled Nursing Care",
      "Physical Therapy",
      "Occupational Therapy",
      "Speech Therapy",
      "Wound Care",
      "IV Therapy",
      "Pain Management",
      "Respiratory Care"
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559131538-e0279b870ff1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    latitude: 38.8339,
    longitude: -104.8214,
    isFeatured: false,
    isRelevant: true,
    relevanceAnalysis: null
  },
  {
    name: "Aurora Gardens CCRC",
    slug: "aurora-gardens-ccrc",
    description: "Aurora Gardens is a Continuing Care Retirement Community (CCRC) offering a full spectrum of senior living options on one beautiful campus. From independent living to assisted living, memory care, and skilled nursing, residents can transition seamlessly between levels of care as their needs change. Our life care contracts provide residents with long-term security and peace of mind.",
    shortDescription: "Comprehensive retirement community with multiple levels of care allowing residents to age in place with access to services as needs change.",
    address: "321 Aurora Parkway",
    city: "Aurora",
    state: "CO",
    zipCode: "80014",
    phone: "(303) 555-6543",
    website: "https://www.auroragardensccrc.com",
    email: "info@auroragardensccrc.com",
    serviceType: ServiceType.CCRC,
    rating: 4.8,
    reviewCount: 63,
    pricing: {
      baseMonthlyMin: 3500,
      baseMonthlyMax: 6000,
      entryFee: 250000,
      additionalFees: [
        {
          description: "Assisted Living Services",
          cost: 1200,
          frequency: "monthly"
        },
        {
          description: "Memory Care Services",
          cost: 1800,
          frequency: "monthly"
        }
      ]
    },
    amenities: [
      "Multiple Dining Venues",
      "Swimming Pool",
      "Fitness Center",
      "Library",
      "Arts Studio",
      "Theater",
      "Gardens and Walking Paths",
      "Tennis Courts",
      "Medical Clinic",
      "Pharmacy"
    ],
    services: [
      "Independent Living",
      "Assisted Living",
      "Memory Care",
      "Skilled Nursing",
      "Rehabilitation Services",
      "Wellness Programs",
      "Concierge Services",
      "Transportation"
    ],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593853959867-bf4940fcad62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    latitude: 39.7084,
    longitude: -104.7274,
    isFeatured: true,
    isRelevant: true,
    relevanceAnalysis: null
  },
  {
    name: "Lakewood Respite Care Center",
    slug: "lakewood-respite-care-center",
    description: "Lakewood Respite Care Center provides short-term relief for primary caregivers by offering temporary care for elderly or disabled individuals. Our program allows caregivers to take a break while their loved ones receive professional care in a warm, welcoming environment. Stays can range from a few hours to several weeks, with flexible scheduling options to meet caregivers' needs.",
    shortDescription: "Short-term relief care service offering temporary support for seniors while providing caregivers a much-needed break.",
    address: "987 Lakewood Boulevard",
    city: "Lakewood",
    state: "CO",
    zipCode: "80215",
    phone: "(303) 555-2109",
    website: "https://www.lakewoodrespite.com",
    email: "info@lakewoodrespite.com",
    serviceType: ServiceType.RESPITE_CARE,
    rating: 4.7,
    reviewCount: 29,
    pricing: {
      baseMonthlyMin: null,
      baseMonthlyMax: null,
      entryFee: null,
      respiteDailyMin: 175,
      respiteDailyMax: 250
    },
    amenities: [
      "Private Rooms",
      "Community Dining",
      "Activity Programs",
      "Outdoor Spaces",
      "Television and Wi-Fi",
      "Transportation for Local Appointments"
    ],
    services: [
      "24-Hour Supervision",
      "Medication Management",
      "Personal Care Assistance",
      "Nutritious Meals",
      "Social Activities",
      "Medical Monitoring"
    ],
    imageUrl: "https://images.unsplash.com/photo-1585241920473-b472eb9ffbae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1585241920473-b472eb9ffbae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    latitude: 39.7392,
    longitude: -105.0813,
    isFeatured: false,
    isRelevant: true,
    relevanceAnalysis: null
  }
];
