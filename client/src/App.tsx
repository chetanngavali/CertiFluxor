import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import Home from "@/pages/Home";
import TemplateList from "@/pages/TemplateList";
import TemplateEditor from "@/pages/TemplateEditor";
import ApiKeys from "@/pages/ApiKeys";
import History from "@/pages/History";
import NotFound from "@/pages/not-found";
import Pricing from "@/pages/Pricing";
import Documentation from "@/pages/Documentation";
import Contact from "@/pages/Contact";
import Legal from "@/pages/Legal";

function ProtectedRoute({ component: Component, adminOnly = false }: { component: React.ComponentType<any>, adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect href="/auth" />;
  }

  if (adminOnly && user.role !== "admin") {
    // Optionally redirect to user dashboard or show forbidden
    return <Redirect href="/dashboard" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/auth" component={AuthPage} />

      {/* Protected Routes */}
      <Route path="/dashboard">
        <ProtectedRoute component={Home} />
      </Route>
      <Route path="/templates">
        <ProtectedRoute component={TemplateList} />
      </Route>
      <Route path="/templates/:id">
        <ProtectedRoute component={TemplateEditor} />
      </Route>
      <Route path="/api-keys">
        <ProtectedRoute component={ApiKeys} />
      </Route>
      <Route path="/history">
        <ProtectedRoute component={History} />
      </Route>

      {/* Public Pages */}
      <Route path="/pricing" component={Pricing} />
      <Route path="/docs" component={Documentation} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Legal} />
      <Route path="/privacy" component={Legal} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
          <SonnerToaster position="top-right" richColors />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
