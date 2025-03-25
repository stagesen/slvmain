import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { nanoid } from "nanoid";
import { 
  insertFacilitySchema, 
  insertCitySchema, 
  insertReviewSchema, 
  insertQuizLeadSchema,
  insertResourceSchema,
  ServiceType
} from "@shared/schema";
import { handleAiChat, createNewAiSession } from "./services/aiAssistant";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // API routes
  // -----------------
  
  // Facilities endpoints
  app.get("/api/facilities", async (req: Request, res: Response) => {
    try {
      const filters = {
        city: req.query.city as string,
        serviceType: req.query.type as ServiceType,
        search: req.query.search as string,
        amenities: req.query.amenities ? (req.query.amenities as string).split(',') : undefined,
        rating: req.query.rating ? parseInt(req.query.rating as string) : undefined,
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
        sort: req.query.sort as 'rating' | 'price_asc' | 'price_desc' | 'name',
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined
      };
      
      const facilities = await storage.getFacilities(filters);
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.get("/api/facilities/featured", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const facilities = await storage.getFeaturedFacilities(limit);
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching featured facilities:", error);
      res.status(500).json({ message: "Failed to fetch featured facilities" });
    }
  });

  app.get("/api/facilities/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const facility = await storage.getFacilityById(id);
      
      if (!facility) {
        return res.status(404).json({ message: "Facility not found" });
      }
      
      res.json(facility);
    } catch (error) {
      console.error("Error fetching facility by ID:", error);
      res.status(500).json({ message: "Failed to fetch facility" });
    }
  });

  app.get("/api/facilities/slug/:slug", async (req: Request, res: Response) => {
    try {
      const facility = await storage.getFacilityBySlug(req.params.slug);
      
      if (!facility) {
        return res.status(404).json({ message: "Facility not found" });
      }
      
      res.json(facility);
    } catch (error) {
      console.error("Error fetching facility by slug:", error);
      res.status(500).json({ message: "Failed to fetch facility" });
    }
  });

  app.post("/api/facilities", async (req: Request, res: Response) => {
    try {
      const facilityData = insertFacilitySchema.parse(req.body);
      const facility = await storage.createFacility(facilityData);
      res.status(201).json(facility);
    } catch (error) {
      console.error("Error creating facility:", error);
      res.status(400).json({ message: "Invalid facility data" });
    }
  });

  app.put("/api/facilities/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const facilityData = req.body;
      const facility = await storage.updateFacility(id, facilityData);
      
      if (!facility) {
        return res.status(404).json({ message: "Facility not found" });
      }
      
      res.json(facility);
    } catch (error) {
      console.error("Error updating facility:", error);
      res.status(400).json({ message: "Invalid facility data" });
    }
  });

  // Facility Reviews
  app.get("/api/facilities/:id/reviews", async (req: Request, res: Response) => {
    try {
      const facilityId = parseInt(req.params.id);
      const reviews = await storage.getReviewsByFacilityId(facilityId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching facility reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(400).json({ message: "Invalid review data" });
    }
  });
  
  // City endpoints
  app.get("/api/cities", async (req: Request, res: Response) => {
    try {
      const cities = await storage.getCities();
      res.json(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ message: "Failed to fetch cities" });
    }
  });

  app.get("/api/cities/:slug", async (req: Request, res: Response) => {
    try {
      const city = await storage.getCityBySlug(req.params.slug);
      
      if (!city) {
        return res.status(404).json({ message: "City not found" });
      }
      
      // Get facility counts by service type
      const facilities = await storage.getFacilitiesByCity(req.params.slug);
      const serviceCounts = {} as Record<ServiceType, number>;
      
      for (const serviceType of Object.values(ServiceType)) {
        serviceCounts[serviceType] = facilities.filter(f => f.serviceType === serviceType).length;
      }
      
      res.json({ ...city, serviceCounts });
    } catch (error) {
      console.error("Error fetching city by slug:", error);
      res.status(500).json({ message: "Failed to fetch city" });
    }
  });

  app.get("/api/cities/:slug/facilities", async (req: Request, res: Response) => {
    try {
      const serviceType = req.query.type as ServiceType | undefined;
      const facilities = await storage.getFacilitiesByCity(req.params.slug, serviceType);
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching city facilities:", error);
      res.status(500).json({ message: "Failed to fetch city facilities" });
    }
  });

  app.post("/api/cities", async (req: Request, res: Response) => {
    try {
      const cityData = insertCitySchema.parse(req.body);
      const city = await storage.createCity(cityData);
      res.status(201).json(city);
    } catch (error) {
      console.error("Error creating city:", error);
      res.status(400).json({ message: "Invalid city data" });
    }
  });
  
  // Resource endpoints
  app.get("/api/resources", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const citySlug = req.query.citySlug as string;
      const resources = await storage.getResources(category, citySlug);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:slug", async (req: Request, res: Response) => {
    try {
      const resource = await storage.getResourceBySlug(req.params.slug);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      console.error("Error fetching resource by slug:", error);
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  app.post("/api/resources", async (req: Request, res: Response) => {
    try {
      const resourceData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating resource:", error);
      res.status(400).json({ message: "Invalid resource data" });
    }
  });
  
  // AI Chat endpoints
  app.get("/api/ai/session", async (req: Request, res: Response) => {
    try {
      const sessionId = nanoid();
      const chat = await createNewAiSession(sessionId);
      res.json(chat);
    } catch (error) {
      console.error("Error creating AI chat session:", error);
      res.status(500).json({ message: "Failed to create AI chat session" });
    }
  });

  app.get("/api/ai/session/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const chat = await storage.getAiChatBySessionId(sessionId);
      
      if (!chat) {
        return res.status(404).json({ message: "Chat session not found" });
      }
      
      res.json(chat);
    } catch (error) {
      console.error("Error fetching AI chat session:", error);
      res.status(500).json({ message: "Failed to fetch AI chat session" });
    }
  });

  app.post("/api/ai/chat", async (req: Request, res: Response) => {
    try {
      const { sessionId, message } = req.body;
      
      if (!sessionId || !message) {
        return res.status(400).json({ message: "Session ID and message are required" });
      }
      
      const response = await handleAiChat(sessionId, message);
      res.json(response);
    } catch (error) {
      console.error("Error processing AI chat message:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });
  
  // Quiz Lead endpoint
  app.post("/api/quiz/submit", async (req: Request, res: Response) => {
    try {
      const leadData = insertQuizLeadSchema.parse(req.body);
      const lead = await storage.createQuizLead(leadData);
      
      // Find matching facilities based on quiz answers
      const matchedFacilities = await storage.getFacilities({
        city: leadData.locationPreference,
        serviceType: leadData.careType as ServiceType,
      });
      
      res.status(201).json({ lead, matchedFacilities });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(400).json({ message: "Invalid quiz data" });
    }
  });
  
  // Service Types endpoint
  app.get("/api/service-types", async (req: Request, res: Response) => {
    try {
      // Import and return service types
      const { serviceTypes } = await import("./data/serviceTypes");
      res.json(serviceTypes);
    } catch (error) {
      console.error("Error fetching service types:", error);
      res.status(500).json({ message: "Failed to fetch service types" });
    }
  });

  return httpServer;
}
