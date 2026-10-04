import { Navbar, Footer } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";

// Para publicar um repositório, adicione um objeto à lista. Exemplo:
// { name: "AI-LAB-MACKENZIE/nome-do-repo", description: "...",
//   languages: ["Python"], url: "https://github.com/AI-LAB-MACKENZIE/nome-do-repo", isPublic: true }
type Repo = { name: string; description: string; languages: string[]; url: string; isPublic: boolean };
const repos: Repo[] = [];

export default function Repos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary flex items-center gap-4">
          <Github className="w-10 h-10" />
          Repositórios GitHub
        </h1>
        
        {repos.length === 0 ? (
          <div className="border border-dashed rounded-lg py-16 text-center text-muted-foreground">
            Repositórios em breve. Acompanhe em{" "}
            <a href="https://github.com/AI-LAB-MACKENZIE" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              github.com/AI-LAB-MACKENZIE
            </a>
            .
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {repos.map((repo) => (
              <Card key={repo.name} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-primary font-mono">{repo.name}</CardTitle>
                    <Badge variant="outline">{repo.isPublic ? "Público" : "Privado"}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{repo.description}</p>
                  <div className="flex gap-2">
                    {repo.languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <a href={repo.url} target="_blank" rel="noreferrer" className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      <Github className="w-4 h-4" /> Ver Código
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
