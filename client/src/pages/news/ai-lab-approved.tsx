import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, MapPin } from "lucide-react";
import { Link } from "wouter";
import newsImage from "@assets/image_1766065292952.png";

export default function NewsArticle() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Link href="/news">
          <Button variant="ghost" className="mb-6 gap-2 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4" /> Voltar para Notícias
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>18 de Dezembro de 2024</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary leading-tight mb-6">
              Laboratório de IA para Estratégia e Tomada de Decisão é aprovado para funcionamento com Fundo de fomento Mackpesquisa
            </h1>
          </div>

          <div className="aspect-video w-full mb-10 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={newsImage} 
              alt="AI Lab Mackenzie Team" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              A Universidade Presbiteriana Mackenzie aprovou o projeto de criação do AI Lab Mackenzie, com fomento integral do Fundo Mackenzie de Pesquisa, MACKPESQUISA.
            </p>
            
            <p className="mb-6">
              O laboratório encontra-se em fase de implementação e formalização e está vinculado à Escola de Negócios Mackenzie e ao Centro de Ciências Sociais Aplicadas.
            </p>

            <p className="mb-6">
              A iniciativa reúne uma equipe de pesquisadores formada por professores e estudantes da Universidade Presbiteriana Mackenzie, além de colaboradores de outras instituições, com foco em pesquisa aplicada em Inteligência Artificial no campo da gestão e da estratégia.
            </p>

            <div className="bg-muted/30 p-6 rounded-lg flex items-start gap-4 mt-8 border border-border">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground mb-2">Localização</h3>
                <p>
                  O AI Lab Mackenzie está localizado na Rua Maria Antônia, 163, Sala 13, Higienópolis, São Paulo, SP.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
