
import { z } from 'zod';
import { insertTemplateSchema, insertApiKeySchema, templates, apiKeys, generations } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  templates: {
    list: {
      method: 'GET' as const,
      path: '/api/v1/templates' as const,
      responses: {
        200: z.array(z.custom<typeof templates.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/v1/templates/:id' as const,
      responses: {
        200: z.custom<typeof templates.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/v1/templates' as const,
      input: insertTemplateSchema,
      responses: {
        201: z.custom<typeof templates.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/v1/templates/:id' as const,
      input: insertTemplateSchema.partial(),
      responses: {
        200: z.custom<typeof templates.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/v1/templates/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  apiKeys: {
    list: {
      method: 'GET' as const,
      path: '/api/v1/apikeys' as const,
      responses: {
        200: z.array(z.custom<typeof apiKeys.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/v1/apikeys' as const,
      input: insertApiKeySchema,
      responses: {
        201: z.custom<typeof apiKeys.$inferSelect>(),
      },
    },
    validate: { // For demo purposes
      method: 'POST' as const,
      path: '/api/v1/apikeys/validate' as const,
      input: z.object({ key: z.string() }),
      responses: {
        200: z.object({ valid: z.boolean(), owner: z.string().optional() }),
      },
    }
  },
  certificates: {
    generate: {
      method: 'POST' as const,
      path: '/api/v1/certificates/generate' as const,
      input: z.object({
        templateId: z.string(),
        rows: z.array(z.record(z.any())),
        format: z.enum(['pdf', 'png']).optional().default('pdf'),
      }),
      responses: {
        200: z.object({
          success: z.boolean(),
          message: z.string(),
          urls: z.array(z.string()).optional(),
        }),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    list: {
        method: 'GET' as const,
        path: '/api/v1/certificates/history' as const,
        responses: {
            200: z.array(z.custom<typeof generations.$inferSelect>()),
        }
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
