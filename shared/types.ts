import { ServiceType } from "./schema";

// PricingInfo type
export interface PricingInfo {
  baseMonthlyRate: number | null;
  baseMonthlyMin: number | null;
  baseMonthlyMax: number | null;
  entryFee: number | null;
  respiteRate: number | null;
  respiteDailyMin: number | null;
  respiteDailyMax: number | null;
  levels: {
    level: string;
    description: string;
    monthlyCost: number | null;
  }[] | null;
  additionalFees: {
    description: string;
    cost: number;
    frequency: string;
  }[] | null;
}

// Message type for AI Chat
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Service Type Info
export interface ServiceTypeInfo {
  id: ServiceType;
  name: string;
  description: string;
  icon: string;
  priceRange: string;
  slug: string;
}

// Filter params for facilities
export interface FacilityFilterParams {
  city?: string;
  serviceType?: ServiceType;
  search?: string;
  amenities?: string[];
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'rating' | 'price_asc' | 'price_desc' | 'name';
  page?: number;
  limit?: number;
}

// City with facilities count by service type
export interface CityWithServiceCounts extends City {
  serviceCounts: Record<ServiceType, number>;
}

// Testimonial type
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  imageUrl: string;
}

// Filter values type for UI
export interface FilterValues {
  search: string;
  city: string | 'all';
  serviceType: ServiceType | 'all';
  amenities: string[];
  rating: number;
  minPrice: number;
  maxPrice: number;
  sort: string;
}

// Quiz form data
export interface QuizFormData {
  name: string;
  email: string;
  phone: string;
  careType: string;
  budget: string;
  timeframe: string;
  locationPreference: string;
  additionalNotes: string;
}

// Import from schema for convenience
import {
  Facility,
  City,
  Review,
  Resource,
  User,
  InsertFacility,
  InsertCity,
  InsertReview,
  InsertResource,
  QuizLead,
  InsertQuizLead,
  AiChat,
  InsertAiChat,
  Image,
  InsertImage
} from "./schema";

export {
  Facility,
  City,
  Review,
  Resource,
  User,
  InsertFacility,
  InsertCity,
  InsertReview,
  InsertResource,
  QuizLead,
  InsertQuizLead,
  AiChat,
  InsertAiChat,
  Image,
  InsertImage
};
