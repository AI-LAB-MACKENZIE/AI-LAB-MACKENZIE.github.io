import { Navbar, Footer } from "@/components/layout/Navbar";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import article1Image from "@assets/SCR-20260410-mu7_1775851046669.png";
import article2Image from "@assets/SCR-20260410-mud_1775851046670.png";

export default function NewsArticle2() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/news">
          <Button variant="ghost" className="mb-8 gap-2 -ml-4 hover:bg-transparent">
            <ArrowLeft className="w-4 h-4" /> Voltar para Notícias
          </Button>
        </Link>

        <article className="prose prose-slate max-w-none">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>10 de Abril de 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary leading-tight mb-6">
              Primeiros artigos do Laboratório aceitos na ANPAD
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <img 
              src={article1Image}
              alt="Declaração de Aceite 3Es 2026" 
              className="w-full rounded-lg shadow-md border object-contain bg-white"
            />
            <img 
              src={article2Image}
              alt="Declaração de Aceite EnATI 2026" 
              className="w-full rounded-lg shadow-md border object-contain bg-white"
            />
          </div>

          <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
            <p>
              Os primeiros artigos realizados com apoio do <span className="font-semibold text-foreground">Laboratório de IA + Estratégia</span> da <a href="https://www.mackenzie.br/universidade/unidades-academicas/ccsa" target="_blank" rel="noreferrer" className="hover:underline text-primary">Escola de Negócios Mackenzie</a> - <a href="https://www.mackenzie.br/" target="_blank" rel="noreferrer" className="hover:underline text-primary">Universidade Presbiteriana Mackenzie</a> foram aceitos nos eventos divisionais 3Es e EnATI da ANPAD - Associação Nacional de Pós-Graduação e Pesquisa em Administração.
            </p>
            <p>
              Esses artigos tratam da interação entre inteligência artificial e decisões estratégicas:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li className="font-medium text-foreground">
                "AI Reliance as Strategic Behavior: A Behavioral Strategy Framework for Managing Dependence and Capability Erosion"
              </li>
              <li className="font-medium text-foreground">
                "I don't know or I don't care: Epistemic and motivational drivers of frivolous use of generative AI"
              </li>
            </ul>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
