import { apiRequest } from "./queryClient";
import { ServiceType } from "@shared/schema";
import { ServiceTypeInfo } from "@shared/types";

// Fetch all facilities with optional filters
export async function fetchFacilities(filters: Record<string, any> = {}) {
  const queryParams = new URLSearchParams();
  
  // Add each filter parameter to the query string
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  });
  
  const queryString = queryParams.toString();
  const url = `/api/facilities${queryString ? `?${queryString}` : ""}`;
  
  const response = await apiRequest("GET", url);
  return response.json();
}

// Fetch featured facilities
export async function fetchFeaturedFacilities() {
  const response = await apiRequest("GET", "/api/facilities/featured");
  return response.json();
}

// Fetch a facility by ID
export async function fetchFacilityById(id: number) {
  const response = await apiRequest("GET", `/api/facilities/${id}`);
  return response.json();
}

// Fetch a facility by slug
export async function fetchFacilityBySlug(slug: string) {
  const response = await apiRequest("GET", `/api/facilities/slug/${slug}`);
  return response.json();
}

// Fetch facility reviews
export async function fetchFacilityReviews(facilityId: number) {
  const response = await apiRequest("GET", `/api/facilities/${facilityId}/reviews`);
  return response.json();
}

// Submit a facility review
export async function submitReview(reviewData: any) {
  const response = await apiRequest("POST", "/api/reviews", reviewData);
  return response.json();
}

// Fetch all cities
export async function fetchCities() {
  const response = await apiRequest("GET", "/api/cities");
  return response.json();
}

// Fetch a city by slug
export async function fetchCityBySlug(slug: string) {
  const response = await apiRequest("GET", `/api/cities/${slug}`);
  return response.json();
}

// Fetch facilities by city
export async function fetchCityFacilities(citySlug: string, serviceType?: ServiceType) {
  const url = serviceType
    ? `/api/cities/${citySlug}/facilities?type=${serviceType}`
    : `/api/cities/${citySlug}/facilities`;
  
  const response = await apiRequest("GET", url);
  return response.json();
}

// Fetch all service types
export async function fetchServiceTypes(): Promise<ServiceTypeInfo[]> {
  const response = await apiRequest("GET", "/api/service-types");
  return response.json();
}

// Fetch resources with optional category filter
export async function fetchResources(category?: string, citySlug?: string) {
  const queryParams = new URLSearchParams();
  
  if (category) {
    queryParams.append("category", category);
  }
  
  if (citySlug) {
    queryParams.append("citySlug", citySlug);
  }
  
  const queryString = queryParams.toString();
  const url = `/api/resources${queryString ? `?${queryString}` : ""}`;
  
  const response = await apiRequest("GET", url);
  return response.json();
}

// Fetch a resource by slug
export async function fetchResourceBySlug(slug: string) {
  const response = await apiRequest("GET", `/api/resources/${slug}`);
  return response.json();
}

// Create a new AI chat session
export async function createAIChatSession() {
  const response = await apiRequest("GET", "/api/ai/session");
  return response.json();
}

// Get an existing AI chat session
export async function getAIChatSession(sessionId: string) {
  const response = await apiRequest("GET", `/api/ai/session/${sessionId}`);
  return response.json();
}

// Send a message to the AI chat assistant
export async function sendAIChatMessage(sessionId: string, message: string) {
  const response = await apiRequest("POST", "/api/ai/chat", {
    sessionId,
    message,
  });
  return response.json();
}

// Submit quiz answers
export async function submitQuiz(quizData: any) {
  const response = await apiRequest("POST", "/api/quiz/submit", quizData);
  return response.json();
}
