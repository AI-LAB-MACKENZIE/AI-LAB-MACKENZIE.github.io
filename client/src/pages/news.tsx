import { Navbar, Footer } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "wouter";
import newsImage from "@assets/image_1766065292952.png";

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary">Últimas Notícias</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col hover:border-primary/50 transition-colors">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img 
                src={newsImage} 
                alt="AI Lab Mackenzie" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span>18 de Dezembro de 2024</span>
              </div>
              <CardTitle className="line-clamp-3 text-lg">
                Laboratório de IA para Estratégia e Tomada de Decisão é aprovado para funcionamento com Fundo de fomento Mackpesquisa
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3 text-sm">
                A Universidade Presbiteriana Mackenzie aprovou o projeto de criação do AI Lab Mackenzie, com fomento integral do Fundo Mackenzie de Pesquisa, MACKPESQUISA.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/news/ai-lab-approved" className="w-full">
                <Button variant="outline" className="w-full">Ler Mais</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
