
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const templates = pgTable("templates", {
  id: text("id").primaryKey(), // Using text ID for friendly IDs like "course-101" or UUIDs
  name: text("name").notNull(),
  width: integer("width").notNull().default(794), // A4 at 96 DPI (approx)
  height: integer("height").notNull().default(1123),
  orientation: text("orientation").notNull().default("landscape"), // "portrait" | "landscape"
  elements: jsonb("elements").notNull().$type<TemplateElement[]>(), // Storing elements as JSON
  baseThemeId: text("base_theme_id"),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(), // The actual secret key
  ownerName: text("owner_name").notNull(),
  permissions: jsonb("permissions").$type<string[]>().default(["generate"]), // e.g. ["generate", "manage_templates"]
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  lastUsedAt: timestamp("last_used_at"),
});

export const generations = pgTable("generations", {
  id: serial("id").primaryKey(),
  templateId: text("template_id").references(() => templates.id),
  apiKeyId: integer("api_key_id").references(() => apiKeys.id),
  recipientName: text("recipient_name"),
  status: text("status").notNull().default("pending"), // "pending" | "completed" | "failed"
  fileUrl: text("file_url"),
  metadata: jsonb("metadata"), // Store extra fields from the row
  createdAt: timestamp("created_at").defaultNow(),
});

// === TYPES ===

export interface TemplateElement {
  id: string;
  type: "dynamicText" | "staticText" | "image" | "shape";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
  opacity?: number;
  
  // Text properties
  text?: string;
  bindingField?: string; // For dynamicText, matches Excel header
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  color?: string;
  textAlign?: "left" | "center" | "right";
  
  // Shape/Image properties
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  src?: string; // For images
}

export interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

// === SCHEMAS ===

export const insertTemplateSchema = createInsertSchema(templates);
export const insertApiKeySchema = createInsertSchema(apiKeys).omit({ id: true, createdAt: true, lastUsedAt: true });
export const insertGenerationSchema = createInsertSchema(generations).omit({ id: true, createdAt: true });

// === API CONTRACT TYPES ===

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;

export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;

export type Generation = typeof generations.$inferSelect;

// Request/Response types

export interface GenerateCertificateRequest {
  templateId: string;
  rows: Record<string, any>[]; // Array of data rows (from Excel or API)
  format?: "pdf" | "png";
}

export interface GenerateCertificateResponse {
  success: boolean;
  message: string;
  jobId?: string; // If async
  urls?: string[]; // If sync
}

export interface ValidateApiKeyResponse {
  valid: boolean;
  owner?: string;
}
