import { ServiceType } from "@shared/schema";
import { ServiceTypeInfo } from "@shared/types";

// Service types with detailed information
export const serviceTypes: ServiceTypeInfo[] = [
  {
    id: ServiceType.ASSISTED_LIVING,
    name: "Assisted Living",
    description: "Support with daily activities while maintaining independence.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    priceRange: "$3,500-$6,500/mo",
    slug: "assisted-living"
  },
  {
    id: ServiceType.MEMORY_CARE,
    name: "Memory Care",
    description: "Specialized care for Alzheimer's and dementia conditions.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    priceRange: "$5,500-$8,500/mo",
    slug: "memory-care"
  },
  {
    id: ServiceType.NURSING_HOME,
    name: "Nursing Home",
    description: "24/7 medical supervision and skilled nursing care.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    priceRange: "$7,500-$11,000/mo",
    slug: "nursing-home"
  },
  {
    id: ServiceType.INDEPENDENT_LIVING,
    name: "Independent Living",
    description: "Active communities with amenities and social activities.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    priceRange: "$2,500-$5,000/mo",
    slug: "independent-living"
  },
  {
    id: ServiceType.CCRC,
    name: "Continuing Care Retirement Community",
    description: "Multiple levels of care allowing residents to transition as needs change.",
    icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
    priceRange: "$3,000-$6,000/mo + Entrance Fee",
    slug: "ccrc"
  },
  {
    id: ServiceType.ADULT_DAY_CARE,
    name: "Adult Day Care",
    description: "Daytime supervision and activities for seniors who live with family.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    priceRange: "$60-$120/day",
    slug: "adult-day-care"
  },
  {
    id: ServiceType.HOME_CARE,
    name: "In-Home Care",
    description: "Services provided in the senior's own home.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    priceRange: "$25-$40/hour",
    slug: "home-care"
  },
  {
    id: ServiceType.RESPITE_CARE,
    name: "Respite Care",
    description: "Short-term care to give primary caregivers a break.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    priceRange: "$150-$300/day",
    slug: "respite-care"
  },
  {
    id: ServiceType.HOSPICE,
    name: "Hospice Care",
    description: "End-of-life care focused on comfort and quality of life.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    priceRange: "Often covered by Medicare",
    slug: "hospice"
  },
  {
    id: ServiceType.REHABILITATION,
    name: "Rehabilitation Centers",
    description: "Short-term intensive therapy following surgery, injury, or illness.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    priceRange: "$300-$600/day",
    slug: "rehabilitation"
  }
];
