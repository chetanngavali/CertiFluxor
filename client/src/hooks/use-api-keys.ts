import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertApiKey } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useApiKeys() {
  return useQuery({
    queryKey: [api.apiKeys.list.path],
    queryFn: async () => {
      const res = await fetch(api.apiKeys.list.path);
      if (!res.ok) throw new Error("Failed to fetch API keys");
      return api.apiKeys.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertApiKey) => {
      const res = await fetch(api.apiKeys.create.path, {
        method: api.apiKeys.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to create API key");
      return api.apiKeys.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.apiKeys.list.path] });
      toast({ title: "Success", description: "API Key created successfully" });
    },
  });
}
