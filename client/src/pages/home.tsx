import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Beaker, Users, FileText } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/abstract_red_and_white_geometric_background_with_no_text.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Visualização de Pesquisa" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl md:text-4xl font-bold font-serif text-primary mb-6 leading-tight">
              Avançando o conhecimento de estratégia e tomada de decisão por meio de inteligência artificial
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              O AI Lab Mackenzie é um laboratório dedicado à pesquisa em Inteligência Artificial aplicada à estratégia, à tomada de decisão, à inovação, à transformação digital e ao comportamento organizacional. Vinculado à Escola de Negócios Mackenzie e ao Centro de Ciências Sociais Aplicadas da Universidade Presbiteriana Mackenzie, reune docentes, pesquisadores e estudantes para investigar os impactos da IA em organizações que operam em contextos complexos.
            </p>
            <div className="flex gap-4">
              <Link href="/results">
                <Button size="lg" className="gap-2">
                  Ver Pesquisas <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Nossas Áreas de Foco</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <Beaker className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pesquisa Científica</h3>
                <p className="text-muted-foreground">
                  Conduzindo estudos rigorosos para descobrir novos princípios e metodologias em nossa área.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Publicações</h3>
                <p className="text-muted-foreground">
                  Disseminando nossas descobertas através de periódicos de alto impacto e conferências internacionais.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Colaboração</h3>
                <p className="text-muted-foreground">
                  Parcerias com líderes da indústria e instituições acadêmicas em todo o mundo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
