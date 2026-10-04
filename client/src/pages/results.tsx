import { Navbar, Footer } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, FileText, Code } from "lucide-react";

// Para publicar um item, adicione um objeto à lista correspondente.
// Exemplo de projeto:
// { title: "Projeto Alpha", funding: "Financiado por ...", status: "Em Andamento",
//   description: "...", tags: ["Big Data"], url: "https://..." }
type Project = { title: string; funding: string; status: string; description: string; tags: string[]; url?: string };
const projects: Project[] = [];

// Exemplo de software:
// { name: "FerramentaDeAnalise v2.0", subtitle: "...", description: "...", downloadUrl: "https://...", docsUrl: "https://..." }
type Software = { name: string; subtitle: string; description: string; downloadUrl?: string; docsUrl?: string };
const software: Software[] = [];

// Exemplo de publicação:
// { title: "...", authors: "F. Martins, ...", venue: "Publicado em ..., 2026", pdfUrl: "https://..." }
type Paper = { title: string; authors: string; venue: string; pdfUrl?: string };
const papers: Paper[] = [];

function EmptyState({ text }: { text: string }) {
  return (
    <div className="border border-dashed rounded-lg py-16 text-center text-muted-foreground">
      {text}
    </div>
  );
}

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary">Resultados da Pesquisa</h1>
        
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="software">Software & Apps</TabsTrigger>
            <TabsTrigger value="papers">Publicações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            {projects.length === 0 ? (
              <EmptyState text="Projetos em breve." />
            ) : (
              <div className="grid gap-6">
                {projects.map((project, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                          <CardDescription>{project.funding}</CardDescription>
                        </div>
                        <Badge variant="secondary">{project.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    {project.url && (
                      <CardFooter>
                        <a href={project.url} target="_blank" rel="noreferrer">
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" /> Ver Detalhes
                          </Button>
                        </a>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="software">
            {software.length === 0 ? (
              <EmptyState text="Software e aplicativos em breve." />
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {software.map((item, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-primary" />
                        {item.name}
                      </CardTitle>
                      <CardDescription>{item.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {item.downloadUrl && (
                        <a href={item.downloadUrl} target="_blank" rel="noreferrer">
                          <Button size="sm" className="gap-2">
                            <Download className="w-4 h-4" /> Baixar
                          </Button>
                        </a>
                      )}
                      {item.docsUrl && (
                        <a href={item.docsUrl} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="outline" className="gap-2">
                            <ExternalLink className="w-4 h-4" /> Documentação
                          </Button>
                        </a>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="papers">
            {papers.length === 0 ? (
              <EmptyState text="Publicações em breve." />
            ) : (
              <div className="space-y-4">
                {papers.map((paper, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4 items-start">
                        <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{paper.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">Autores: {paper.authors}</p>
                          <p className="text-sm text-muted-foreground italic mb-3">{paper.venue}</p>
                          {paper.pdfUrl && (
                            <a href={paper.pdfUrl} target="_blank" rel="noreferrer">
                              <Button variant="outline" size="sm" className="h-8">PDF</Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
