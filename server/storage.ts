
import { db } from "./db";
import {
  users,
  templates,
  apiKeys,
  generations,
  type User,
  type Template,
  type InsertTemplate,
  type ApiKey,
  type InsertApiKey,
  type Generation
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: any): Promise<User>;

  // Templates
  getTemplates(): Promise<Template[]>;
  getTemplate(id: string): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: string, template: Partial<InsertTemplate>): Promise<Template>;
  deleteTemplate(id: string): Promise<void>;

  // API Keys
  getApiKeys(): Promise<ApiKey[]>;
  getApiKey(key: string): Promise<ApiKey | undefined>;
  createApiKey(apiKey: InsertApiKey): Promise<ApiKey>;

  // History/Generations
  createGeneration(gen: any): Promise<Generation>;
  getGenerations(): Promise<Generation[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: any): Promise<User> {
    const [result] = await db.insert(users).values(user);
    const [newUser] = await db.select().from(users).where(eq(users.id, result.insertId));
    return newUser;
  }

  // Templates
  async getTemplates(): Promise<Template[]> {
    return await db.select().from(templates).orderBy(desc(templates.createdAt));
  }

  async getTemplate(id: string): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template;
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    await db.insert(templates).values(template);
    const [newTemplate] = await db.select().from(templates).where(eq(templates.id, template.id));
    return newTemplate;
  }

  async updateTemplate(id: string, updates: Partial<InsertTemplate>): Promise<Template> {
    await db.update(templates)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(templates.id, id));

    const [updated] = await db.select().from(templates).where(eq(templates.id, id));
    return updated;
  }

  async deleteTemplate(id: string): Promise<void> {
    await db.delete(templates).where(eq(templates.id, id));
  }

  // API Keys
  async getApiKeys(): Promise<ApiKey[]> {
    return await db.select().from(apiKeys).orderBy(desc(apiKeys.createdAt));
  }

  async getApiKey(key: string): Promise<ApiKey | undefined> {
    const [apiKey] = await db.select().from(apiKeys).where(eq(apiKeys.key, key));
    return apiKey;
  }

  async createApiKey(apiKey: InsertApiKey): Promise<ApiKey> {
    const [result] = await db.insert(apiKeys).values(apiKey);
    const [newKey] = await db.select().from(apiKeys).where(eq(apiKeys.id, result.insertId));
    return newKey;
  }

  // Generations
  async createGeneration(gen: any): Promise<Generation> {
    const [result] = await db.insert(generations).values(gen);
    const [newGen] = await db.select().from(generations).where(eq(generations.id, result.insertId));
    return newGen;
  }

  async getGenerations(): Promise<Generation[]> {
    return await db.select().from(generations).orderBy(desc(generations.createdAt));
  }
}

export const storage = new DatabaseStorage();
