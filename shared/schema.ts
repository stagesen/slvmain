import { pgTable, text, serial, integer, boolean, jsonb, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Service type enum
export enum ServiceType {
  ASSISTED_LIVING = "ASSISTED_LIVING",
  MEMORY_CARE = "MEMORY_CARE",
  NURSING_HOME = "NURSING_HOME",
  INDEPENDENT_LIVING = "INDEPENDENT_LIVING",
  CCRC = "CCRC",
  ADULT_DAY_CARE = "ADULT_DAY_CARE",
  HOME_CARE = "HOME_CARE",
  RESPITE_CARE = "RESPITE_CARE",
  HOSPICE = "HOSPICE",
  REHABILITATION = "REHABILITATION"
}

// Users table (keeping the original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Facility table
export const facilities = pgTable("facilities", {
  id: serial("id").primaryKey(),
  placeId: text("placeId"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  shortDescription: text("shortDescription"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zipCode").notNull(),
  phone: text("phone"),
  website: text("website"),
  email: text("email"),
  serviceType: text("serviceType").notNull(),
  rating: real("rating"),
  reviewCount: integer("reviewCount"),
  pricing: jsonb("pricing"),
  amenities: text("amenities").array(),
  services: text("services").array(),
  imageUrl: text("imageUrl"),
  imageUrls: text("imageUrls").array(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  isFeatured: boolean("isFeatured").default(false),
  isRelevant: boolean("isRelevant"),
  relevanceAnalysis: text("relevanceAnalysis"),
});

export const insertFacilitySchema = createInsertSchema(facilities).omit({
  id: true,
});

// City table
export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  state: text("state").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl"),
  facilityCount: integer("facilityCount").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
});

export const insertCitySchema = createInsertSchema(cities).omit({
  id: true,
});

// Review table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  facilityId: integer("facilityId").notNull(),
  reviewerId: text("reviewerId"),
  reviewerName: text("reviewerName"),
  rating: integer("rating").notNull(),
  text: text("text"),
  publishedAt: timestamp("publishedAt"),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

// Image table
export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  entityType: text("entityType").notNull(), // 'facility' or 'city'
  entityId: text("entityId").notNull(),
  url: text("url").notNull(),
  caption: text("caption"),
  sortOrder: integer("sortOrder").default(0),
  isDefault: boolean("isDefault").default(false),
});

export const insertImageSchema = createInsertSchema(images).omit({
  id: true,
});

// AI Chat table
export const aiChats = pgTable("aiChats", {
  id: serial("id").primaryKey(),
  sessionId: text("sessionId").notNull().unique(),
  userId: text("userId"),
  messages: jsonb("messages").notNull(),
});

export const insertAiChatSchema = createInsertSchema(aiChats).omit({
  id: true,
});

// Quiz Lead table
export const quizLeads = pgTable("quizLeads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  careType: text("careType").notNull(),
  budget: text("budget"),
  timeframe: text("timeframe"),
  locationPreference: text("locationPreference"),
  additionalNotes: text("additionalNotes"),
  contacted: boolean("contacted").default(false),
});

export const insertQuizLeadSchema = createInsertSchema(quizLeads).omit({
  id: true,
});

// Resource table
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("imageUrl"),
  content: text("content").notNull(),
  citySlug: text("citySlug"),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Facility = typeof facilities.$inferSelect;
export type InsertFacility = z.infer<typeof insertFacilitySchema>;

export type City = typeof cities.$inferSelect;
export type InsertCity = z.infer<typeof insertCitySchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Image = typeof images.$inferSelect;
export type InsertImage = z.infer<typeof insertImageSchema>;

export type AiChat = typeof aiChats.$inferSelect;
export type InsertAiChat = z.infer<typeof insertAiChatSchema>;

export type QuizLead = typeof quizLeads.$inferSelect;
export type InsertQuizLead = z.infer<typeof insertQuizLeadSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
