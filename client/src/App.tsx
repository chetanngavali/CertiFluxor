import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import Home from "@/pages/Home";
import TemplateList from "@/pages/TemplateList";
import TemplateEditor from "@/pages/TemplateEditor";
import ApiKeys from "@/pages/ApiKeys";
import History from "@/pages/History";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/dashboard" component={Home} />
      <Route path="/templates" component={TemplateList} />
      <Route path="/templates/:id" component={TemplateEditor} />
      <Route path="/api-keys" component={ApiKeys} />
      <Route path="/history" component={History} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
