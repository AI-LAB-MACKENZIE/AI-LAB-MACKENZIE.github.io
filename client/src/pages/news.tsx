import { Navbar, Footer } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary">Últimas Notícias</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="flex flex-col">
              <div className="aspect-video bg-muted w-full object-cover rounded-t-lg flex items-center justify-center text-muted-foreground">
                Imagem da Notícia
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{10 + i} de Dezembro de 2024</span>
                </div>
                <CardTitle className="line-clamp-2">Grupo de Pesquisa Ganha Prêmio Internacional de Inovação</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                  Nossa equipe foi reconhecida na Conferência Internacional de Ciência por nosso trabalho inovador em sistemas distribuídos...
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Ler Mais</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
