import { Navbar, Footer } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, FileText, Code } from "lucide-react";

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary">Research Results</h1>
        
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="software">Software & Apps</TabsTrigger>
            <TabsTrigger value="papers">Papers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
             <div className="grid gap-6">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">Project Alpha: Advanced Data Analysis</CardTitle>
                        <CardDescription>Funded by National Science Foundation</CardDescription>
                      </div>
                      <Badge variant="secondary">Ongoing</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      This project aims to develop new methodologies for analyzing large-scale datasets in real-time environments.
                      We are investigating novel algorithms that reduce computational complexity while maintaining accuracy.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Big Data</Badge>
                      <Badge variant="outline">Machine Learning</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" /> View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="software">
             <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-primary" />
                      AnalysisTool v2.0
                    </CardTitle>
                    <CardDescription>Open Source Data Visualization Library</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A comprehensive library for visualizing complex network structures. Built with React and D3.
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button size="sm" className="gap-2">
                      <Download className="w-4 h-4" /> Download
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" /> Documentation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="papers">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">
                          Optimizing Distributed Consensus Algorithms for High-Latency Networks
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Authors: J. Doe, M. Smith, A. Johnson
                        </p>
                        <p className="text-sm text-muted-foreground italic mb-3">
                          Published in IEEE Transactions on Parallel and Distributed Systems, 2024
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8">PDF</Button>
                          <Button variant="ghost" size="sm" className="h-8">Cite</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
