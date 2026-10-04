import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/home";
import Team from "@/pages/team";
import News from "@/pages/news";
import NewsArticle from "@/pages/news/ai-lab-approved";
import NewsArticle2 from "@/pages/news-article-2";
import Results from "@/pages/results";
import Contact from "@/pages/contact";
import Repos from "@/pages/repos";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/team" component={Team} />
        <Route path="/news" component={News} />
        <Route path="/news/ai-lab-approved" component={NewsArticle} />
        <Route path="/news/anpad-articles" component={NewsArticle2} />
        <Route path="/results" component={Results} />
        <Route path="/contact" component={Contact} />
        <Route path="/repos" component={Repos} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
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
