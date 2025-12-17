import { Navbar, Footer } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork } from "lucide-react";

export default function Repos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary flex items-center gap-4">
          <Github className="w-10 h-10" />
          Github Repositories
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-primary font-mono">research-group/project-{i}</CardTitle>
                  <Badge variant="outline">Public</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A high-performance implementation of the proposed algorithm for data clustering in distributed networks.
                </p>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">Python</Badge>
                  <Badge variant="secondary" className="text-xs">TensorFlow</Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{12 * i}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{3 * i}</span>
                  </div>
                  <div className="text-xs">Updated 2 days ago</div>
                </div>
              </CardContent>
              <CardFooter>
                 <Button variant="outline" className="w-full gap-2">
                   <Github className="w-4 h-4" /> View Code
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
