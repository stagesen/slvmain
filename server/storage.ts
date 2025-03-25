import { 
  users, type User, type InsertUser,
  facilities, type Facility, type InsertFacility,
  cities, type City, type InsertCity,
  reviews, type Review, type InsertReview,
  images, type Image, type InsertImage,
  aiChats, type AiChat, type InsertAiChat,
  quizLeads, type QuizLead, type InsertQuizLead,
  resources, type Resource, type InsertResource,
  ServiceType
} from "@shared/schema";
import { FacilityFilterParams, Message } from "@shared/types";
import { initialFacilities } from "./data/facilities";
import { initialCities } from "./data/cities";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Facility methods
  getFacilities(filter?: FacilityFilterParams): Promise<Facility[]>;
  getFacilityById(id: number): Promise<Facility | undefined>;
  getFacilityBySlug(slug: string): Promise<Facility | undefined>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  updateFacility(id: number, facility: Partial<InsertFacility>): Promise<Facility | undefined>;
  deleteFacility(id: number): Promise<boolean>;
  getFeaturedFacilities(limit?: number): Promise<Facility[]>;
  getFacilitiesByCity(citySlug: string, serviceType?: ServiceType): Promise<Facility[]>;
  
  // City methods
  getCities(): Promise<City[]>;
  getCityBySlug(slug: string): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;
  updateCity(id: number, city: Partial<InsertCity>): Promise<City | undefined>;

  // Review methods
  getReviewsByFacilityId(facilityId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Image methods
  getImagesByEntity(entityType: string, entityId: string): Promise<Image[]>;
  createImage(image: InsertImage): Promise<Image>;
  
  // AI Chat methods
  getAiChatBySessionId(sessionId: string): Promise<AiChat | undefined>;
  createAiChat(chat: InsertAiChat): Promise<AiChat>;
  updateAiChatMessages(sessionId: string, messages: Message[]): Promise<AiChat | undefined>;
  
  // Quiz Lead methods
  createQuizLead(lead: InsertQuizLead): Promise<QuizLead>;
  
  // Resource methods
  getResources(category?: string, citySlug?: string): Promise<Resource[]>;
  getResourceBySlug(slug: string): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private facilities: Map<number, Facility>;
  private cities: Map<number, City>;
  private reviews: Map<number, Review>;
  private images: Map<number, Image>;
  private aiChats: Map<number, AiChat>;
  private quizLeads: Map<number, QuizLead>;
  private resources: Map<number, Resource>;
  
  private currentUserId: number;
  private currentFacilityId: number;
  private currentCityId: number;
  private currentReviewId: number;
  private currentImageId: number;
  private currentAiChatId: number;
  private currentQuizLeadId: number;
  private currentResourceId: number;

  constructor() {
    this.users = new Map();
    this.facilities = new Map();
    this.cities = new Map();
    this.reviews = new Map();
    this.images = new Map();
    this.aiChats = new Map();
    this.quizLeads = new Map();
    this.resources = new Map();
    
    this.currentUserId = 1;
    this.currentFacilityId = 1;
    this.currentCityId = 1;
    this.currentReviewId = 1;
    this.currentImageId = 1;
    this.currentAiChatId = 1;
    this.currentQuizLeadId = 1;
    this.currentResourceId = 1;
    
    // Initialize with seed data
    this.initializeData();
  }

  private initializeData() {
    // Initialize cities
    initialCities.forEach(city => {
      this.createCity(city);
    });
    
    // Initialize facilities
    initialFacilities.forEach(facility => {
      this.createFacility(facility);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Facility methods
  async getFacilities(filter?: FacilityFilterParams): Promise<Facility[]> {
    let facilities = Array.from(this.facilities.values());
    
    if (filter) {
      if (filter.city) {
        const citySlug = filter.city.toLowerCase();
        facilities = facilities.filter(f => 
          f.city.toLowerCase() === filter.city || 
          this.getCityByName(filter.city)?.slug.toLowerCase() === citySlug
        );
      }
      
      if (filter.serviceType) {
        facilities = facilities.filter(f => f.serviceType === filter.serviceType);
      }
      
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        facilities = facilities.filter(f => 
          f.name.toLowerCase().includes(searchLower) || 
          f.description?.toLowerCase().includes(searchLower) ||
          f.shortDescription?.toLowerCase().includes(searchLower)
        );
      }
      
      if (filter.amenities && filter.amenities.length > 0) {
        facilities = facilities.filter(f => 
          filter.amenities?.every(amenity => f.amenities.includes(amenity))
        );
      }
      
      if (filter.rating) {
        facilities = facilities.filter(f => f.rating && f.rating >= filter.rating);
      }
      
      if (filter.minPrice || filter.maxPrice) {
        facilities = facilities.filter(f => {
          const pricing = f.pricing as any;
          if (!pricing || !pricing.baseMonthlyMin) return true;
          
          const min = filter.minPrice || 0;
          const max = filter.maxPrice || 100000;
          
          return pricing.baseMonthlyMin >= min && pricing.baseMonthlyMin <= max;
        });
      }
      
      // Sort
      if (filter.sort) {
        switch (filter.sort) {
          case 'rating':
            facilities.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case 'price_asc':
            facilities.sort((a, b) => {
              const aPrice = (a.pricing as any)?.baseMonthlyMin || 0;
              const bPrice = (b.pricing as any)?.baseMonthlyMin || 0;
              return aPrice - bPrice;
            });
            break;
          case 'price_desc':
            facilities.sort((a, b) => {
              const aPrice = (a.pricing as any)?.baseMonthlyMin || 0;
              const bPrice = (b.pricing as any)?.baseMonthlyMin || 0;
              return bPrice - aPrice;
            });
            break;
          case 'name':
            facilities.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
      }
      
      // Pagination
      if (filter.page !== undefined && filter.limit) {
        const start = (filter.page - 1) * filter.limit;
        facilities = facilities.slice(start, start + filter.limit);
      }
    }
    
    return facilities;
  }

  async getFacilityById(id: number): Promise<Facility | undefined> {
    return this.facilities.get(id);
  }

  async getFacilityBySlug(slug: string): Promise<Facility | undefined> {
    return Array.from(this.facilities.values()).find(
      (facility) => facility.slug === slug,
    );
  }

  async createFacility(insertFacility: InsertFacility): Promise<Facility> {
    const id = this.currentFacilityId++;
    const facility: Facility = { ...insertFacility, id };
    this.facilities.set(id, facility);
    
    // Update city facility count
    const city = Array.from(this.cities.values()).find(
      (city) => city.name === facility.city
    );
    
    if (city) {
      city.facilityCount++;
      this.cities.set(city.id, city);
    }
    
    return facility;
  }

  async updateFacility(id: number, facilityData: Partial<InsertFacility>): Promise<Facility | undefined> {
    const facility = this.facilities.get(id);
    if (!facility) return undefined;
    
    const updatedFacility = { ...facility, ...facilityData };
    this.facilities.set(id, updatedFacility);
    return updatedFacility;
  }

  async deleteFacility(id: number): Promise<boolean> {
    return this.facilities.delete(id);
  }

  async getFeaturedFacilities(limit?: number): Promise<Facility[]> {
    let featured = Array.from(this.facilities.values())
      .filter(facility => facility.isFeatured);
    
    if (limit) {
      featured = featured.slice(0, limit);
    }
    
    return featured;
  }

  async getFacilitiesByCity(citySlug: string, serviceType?: ServiceType): Promise<Facility[]> {
    const city = Array.from(this.cities.values()).find(
      (city) => city.slug === citySlug
    );
    
    if (!city) return [];
    
    let facilities = Array.from(this.facilities.values())
      .filter(facility => facility.city === city.name);
    
    if (serviceType) {
      facilities = facilities.filter(facility => facility.serviceType === serviceType);
    }
    
    return facilities;
  }
  
  // City methods
  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async getCityBySlug(slug: string): Promise<City | undefined> {
    return Array.from(this.cities.values()).find(
      (city) => city.slug === slug,
    );
  }
  
  private getCityByName(name: string): City | undefined {
    return Array.from(this.cities.values()).find(
      (city) => city.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createCity(insertCity: InsertCity): Promise<City> {
    const id = this.currentCityId++;
    const city: City = { ...insertCity, id };
    this.cities.set(id, city);
    return city;
  }

  async updateCity(id: number, cityData: Partial<InsertCity>): Promise<City | undefined> {
    const city = this.cities.get(id);
    if (!city) return undefined;
    
    const updatedCity = { ...city, ...cityData };
    this.cities.set(id, updatedCity);
    return updatedCity;
  }
  
  // Review methods
  async getReviewsByFacilityId(facilityId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.facilityId === facilityId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { ...insertReview, id };
    this.reviews.set(id, review);
    
    // Update facility rating
    const facility = this.facilities.get(review.facilityId);
    if (facility) {
      const facilityReviews = await this.getReviewsByFacilityId(review.facilityId);
      const totalRating = facilityReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = totalRating / facilityReviews.length;
      
      facility.rating = parseFloat(avgRating.toFixed(1));
      facility.reviewCount = facilityReviews.length;
      
      this.facilities.set(facility.id, facility);
    }
    
    return review;
  }
  
  // Image methods
  async getImagesByEntity(entityType: string, entityId: string): Promise<Image[]> {
    return Array.from(this.images.values())
      .filter(image => image.entityType === entityType && image.entityId === entityId);
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const id = this.currentImageId++;
    const image: Image = { ...insertImage, id };
    this.images.set(id, image);
    return image;
  }
  
  // AI Chat methods
  async getAiChatBySessionId(sessionId: string): Promise<AiChat | undefined> {
    return Array.from(this.aiChats.values()).find(
      (chat) => chat.sessionId === sessionId,
    );
  }

  async createAiChat(insertChat: InsertAiChat): Promise<AiChat> {
    const id = this.currentAiChatId++;
    const chat: AiChat = { ...insertChat, id };
    this.aiChats.set(id, chat);
    return chat;
  }

  async updateAiChatMessages(sessionId: string, messages: Message[]): Promise<AiChat | undefined> {
    const chat = Array.from(this.aiChats.values()).find(
      (chat) => chat.sessionId === sessionId,
    );
    
    if (!chat) return undefined;
    
    chat.messages = messages as any;
    this.aiChats.set(chat.id, chat);
    return chat;
  }
  
  // Quiz Lead methods
  async createQuizLead(insertLead: InsertQuizLead): Promise<QuizLead> {
    const id = this.currentQuizLeadId++;
    const lead: QuizLead = { ...insertLead, id };
    this.quizLeads.set(id, lead);
    return lead;
  }
  
  // Resource methods
  async getResources(category?: string, citySlug?: string): Promise<Resource[]> {
    let resources = Array.from(this.resources.values());
    
    if (category) {
      resources = resources.filter(resource => resource.category === category);
    }
    
    if (citySlug) {
      resources = resources.filter(resource => 
        !resource.citySlug || resource.citySlug === citySlug);
    }
    
    return resources;
  }

  async getResourceBySlug(slug: string): Promise<Resource | undefined> {
    return Array.from(this.resources.values()).find(
      (resource) => resource.slug === slug,
    );
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }
}

// Export storage instance
export const storage = new MemStorage();
