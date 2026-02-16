import { Sidebar, MobileSidebar } from "./Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      <MobileSidebar />
      <main className="flex-1 lg:pl-64">
        <ScrollArea className="h-screen">
          <div className="container max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-20 pt-20 lg:pt-8">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
