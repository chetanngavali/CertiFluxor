import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertTemplate, type Template } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useTemplates() {
  return useQuery({
    queryKey: [api.templates.list.path],
    queryFn: async () => {
      const res = await fetch(api.templates.list.path, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Failed to fetch templates");
      return api.templates.list.responses[200].parse(await res.json());
    },
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: [api.templates.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.templates.get.path, { id });
      const res = await fetch(url, {
        credentials: 'include'
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch template");
      return api.templates.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertTemplate) => {
      const res = await fetch(api.templates.create.path, {
        method: api.templates.create.method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create template");
      }
      return api.templates.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.templates.list.path] });
      toast({ title: "Success", description: "Template created successfully" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<InsertTemplate>) => {
      const url = buildUrl(api.templates.update.path, { id });
      const res = await fetch(url, {
        method: api.templates.update.method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update template");
      return api.templates.update.responses[200].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.templates.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.templates.get.path, variables.id] });
      toast({ title: "Saved", description: "Template updated successfully" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const url = buildUrl(api.templates.delete.path, { id });
      const res = await fetch(url, {
        method: api.templates.delete.method,
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Failed to delete template");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.templates.list.path] });
      toast({ title: "Deleted", description: "Template removed successfully" });
    },
  });
}
