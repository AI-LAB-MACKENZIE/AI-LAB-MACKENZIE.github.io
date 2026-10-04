import { Navbar, Footer } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "wouter";
import newsImage from "@assets/image_1766065292952.png";
import article1Image from "@assets/SCR-20260410-mu7_1775851046669.png";
import article2Image from "@assets/SCR-20260410-mud_1775851046670.png";

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary">Últimas Notícias</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col hover:border-primary/50 transition-colors">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
              <img 
                src={article1Image} 
                alt="Aceite ANPAD" 
                className="w-full h-full object-contain bg-white transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span>10 de Abril de 2026</span>
              </div>
              <CardTitle className="line-clamp-3 text-lg">
                Primeiros artigos do Laboratório de IA + Estratégia aceitos na ANPAD
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3 text-sm">
                Os primeiros artigos realizados com apoio do Laboratório de IA + Estratégia foram aceitos nos eventos divisionais 3Es e EnATI da ANPAD.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/news/anpad-articles" className="w-full">
                <Button variant="outline" className="w-full">Ler Mais</Button>
              </Link>
            </CardFooter>
          </Card>

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
                <span>18 de Junho de 2024</span>
              </div>
              <CardTitle className="line-clamp-3 text-lg">
                Laboratório de IA para Estratégia e Tomada de Decisão é aprovado para funcionamento com Fundo de fomento Mackpesquisa
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3 text-sm">
                A <a href="https://www.mackenzie.br/" target="_blank" rel="noreferrer" className="hover:underline text-primary">Universidade Presbiteriana Mackenzie</a> aprovou o projeto de criação do AI Lab Mackenzie, com fomento integral do <a href="https://www.mackenzie.br/mackpesquisa" target="_blank" rel="noreferrer" className="hover:underline text-primary">Fundo Mackenzie de Pesquisa, MACKPESQUISA</a>.
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
