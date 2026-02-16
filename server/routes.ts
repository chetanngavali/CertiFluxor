
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertTemplateSchema, insertApiKeySchema } from "@shared/schema";
import { randomBytes } from "crypto";
import seed from "./seed";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed data on startup
  seed().catch(console.error);

  // --- Middleware for API Key Auth ---
  const authenticateApiKey = async (req: any, res: any, next: any) => {
    // Skip auth for internal API routes used by the frontend (for now)
    // In a real app, frontend would use session auth and external tools use API keys.
    // Here, we'll check headers. If 'x-api-key' is present, we validate it.
    // If not, we assume it's the frontend (which is open for this demo, or we could add session auth).
    
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    
    if (req.path.startsWith('/api/v1/certificates/generate') && apiKey) {
        const keyRecord = await storage.getApiKey(apiKey as string);
        if (!keyRecord || !keyRecord.isActive) {
            return res.status(401).json({ message: 'Invalid or inactive API Key' });
        }
        req.apiKey = keyRecord; // Attach key info to request
    }
    next();
  };

  app.use(authenticateApiKey);

  // --- Templates ---

  app.get(api.templates.list.path, async (req, res) => {
    const templates = await storage.getTemplates();
    res.json(templates);
  });

  app.get(api.templates.get.path, async (req, res) => {
    const template = await storage.getTemplate(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(template);
  });

  app.post(api.templates.create.path, async (req, res) => {
    try {
      const input = insertTemplateSchema.parse(req.body);
      // Ensure ID is unique or handle collision? storage.createTemplate will throw if ID exists.
      const template = await storage.createTemplate(input);
      res.status(201).json(template);
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(400).json({ message: 'Failed to create template (ID might verify exist)' });
    }
  });

  app.put(api.templates.update.path, async (req, res) => {
    try {
      const input = insertTemplateSchema.partial().parse(req.body);
      const template = await storage.updateTemplate(req.params.id, input);
      res.json(template);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
           message: err.errors[0].message,
        });
      }
      res.status(404).json({ message: 'Template not found' });
    }
  });

  app.delete(api.templates.delete.path, async (req, res) => {
    await storage.deleteTemplate(req.params.id);
    res.status(204).send();
  });

  // --- API Keys ---

  app.get(api.apiKeys.list.path, async (req, res) => {
    const keys = await storage.getApiKeys();
    res.json(keys);
  });

  app.post(api.apiKeys.create.path, async (req, res) => {
    try {
      // Auto-generate a key if not provided (though schema might require it, let's handle it)
      const rawBody = req.body;
      if (!rawBody.key) {
        rawBody.key = 'sk_' + randomBytes(16).toString('hex');
      }
      
      const input = insertApiKeySchema.parse(rawBody);
      const key = await storage.createApiKey(input);
      res.status(201).json(key);
    } catch (err) {
      res.status(400).json({ message: 'Invalid input' });
    }
  });

  app.post(api.apiKeys.validate.path, async (req, res) => {
    const { key } = req.body;
    const keyRecord = await storage.getApiKey(key);
    if (keyRecord && keyRecord.isActive) {
        res.json({ valid: true, owner: keyRecord.ownerName });
    } else {
        res.json({ valid: false });
    }
  });

  // --- Certificate Generation (The Core Logic) ---

  app.post(api.certificates.generate.path, async (req, res) => {
    // Check if we are authorized (middleware attached req.apiKey if header was present)
    // If called from frontend, we might not have apiKey, which is fine for demo purposes
    // But if strictly enforcing API-key-only for this endpoint:
    // if (!req.apiKey && !req.session?.user) ...
    
    try {
        const { templateId, rows, format } = req.body;
        
        const template = await storage.getTemplate(templateId);
        if (!template) {
            return res.status(404).json({ message: `Template '${templateId}' not found` });
        }

        // Mock Generation Process
        // In a real app, this would use Puppeteer/Playwright to render the React component to PDF
        // For this demo, we will just log it and return "fake" URLs
        
        console.log(`Generating ${rows.length} certificates for template: ${template.name} (${templateId})`);
        
        const urls: string[] = [];
        
        for (const row of rows) {
            // Log generation history
            await storage.createGeneration({
                templateId,
                apiKeyId: (req as any).apiKey?.id || null, // null if from frontend
                recipientName: row.name || row.Name || 'Unknown',
                status: 'completed',
                fileUrl: `https://fake-storage.com/cert_${templateId}_${Date.now()}_${Math.floor(Math.random()*1000)}.pdf`,
                metadata: row
            });
            urls.push(`https://fake-storage.com/cert_${templateId}_${Math.random().toString(36).substr(7)}.${format}`);
        }

        res.json({
            success: true,
            message: `Successfully generated ${rows.length} certificates`,
            urls: urls
        });

    } catch (err) {
        console.error("Generation error:", err);
        res.status(500).json({ message: "Internal server error during generation" });
    }
  });

  app.get(api.certificates.list.path, async (req, res) => {
      const history = await storage.getGenerations();
      res.json(history);
  });

  return httpServer;
}
