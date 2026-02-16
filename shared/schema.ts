
import { mysqlTable, text, serial, int, boolean, timestamp, datetime, json, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// === TABLE DEFINITIONS ===

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // "admin" | "user"
});

export const templates = mysqlTable("templates", {
  id: varchar("id", { length: 255 }).primaryKey(), // Using text ID for friendly IDs like "course-101" or UUIDs
  name: text("name").notNull(),
  width: int("width").notNull().default(794), // A4 at 96 DPI (approx)
  height: int("height").notNull().default(1123),
  orientation: text("orientation").notNull().default("landscape"), // "portrait" | "landscape"
  elements: json("elements").notNull().$type<TemplateElement[]>(), // Storing elements as JSON
  backgroundImage: text("background_image"),
  backgroundOpacity: int("background_opacity").default(100),
  baseThemeId: text("base_theme_id"),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const apiKeys = mysqlTable("api_keys", {
  id: int("id").primaryKey().autoincrement(),
  key: varchar("key", { length: 255 }).notNull().unique(), // The actual secret key
  ownerName: text("owner_name").notNull(),
  permissions: json("permissions").$type<string[]>().default(["generate"]), // e.g. ["generate", "manage_templates"]
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  lastUsedAt: datetime("last_used_at"),
});

export const generations = mysqlTable("generations", {
  id: int("id").primaryKey().autoincrement(),
  templateId: varchar("template_id", { length: 255 }).references(() => templates.id),
  apiKeyId: int("api_key_id").references(() => apiKeys.id),
  recipientName: text("recipient_name"),
  status: text("status").notNull().default("pending"), // "pending" | "completed" | "failed"
  fileUrl: text("file_url"),
  metadata: json("metadata"), // Store extra fields from the row
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
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

  // Transform properties
  scaleX?: number; // For horizontal flip
  scaleY?: number; // For vertical flip
  locked?: boolean; // Lock element from editing
  cropMode?: boolean; // Enable crop mode for images

  // Text properties
  text?: string;
  bindingField?: string; // For dynamicText, matches Excel header
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline" | "line-through";
  color?: string;
  textAlign?: "left" | "center" | "right";

  // Shape/Image properties
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  src?: string; // For images

  // Shape specific
  shapeType?: "rectangle" | "circle" | "star";
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
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

export const insertTemplateSchema = createInsertSchema(templates, {
  elements: z.array(z.any()),
});
export const insertApiKeySchema = createInsertSchema(apiKeys, {
  permissions: z.array(z.string()),
}).omit({ id: true, createdAt: true, lastUsedAt: true });
export const insertGenerationSchema = createInsertSchema(generations).omit({ id: true, createdAt: true });

// === API CONTRACT TYPES ===

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = typeof templates.$inferInsert;

export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = typeof apiKeys.$inferInsert;

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
