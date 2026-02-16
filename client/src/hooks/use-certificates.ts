import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useGenerateCertificate() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { templateId: string; rows: any[]; format?: 'pdf' | 'png' }) => {
      const res = await fetch(api.certificates.generate.path, {
        method: api.certificates.generate.method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to generate certificate");
      }

      return api.certificates.generate.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Certificate generation started" });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    },
  });
}

export function useCertificateHistory() {
  return useQuery({
    queryKey: [api.certificates.list.path],
    queryFn: async () => {
      const res = await fetch(api.certificates.list.path, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.certificates.list.responses[200].parse(await res.json());
    },
  });
}
