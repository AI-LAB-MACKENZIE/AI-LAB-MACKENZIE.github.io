import { Navbar, Footer } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import fellipeImg from "@assets/fellipe_1766064493446.png";
import gilbertoImg from "@assets/gilberto_1766064493446.png";
import larieiraImg from "@assets/larieira_1766064493446.png";
import manuelImg from "@assets/manuel_1766064493445.jpeg";
import pabloImg from "@assets/pablo_1766064493446.jpeg";
import rachelImg from "@assets/rachel_1766064493446.jpeg";

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary">Nossa Equipe</h1>
        
        <Tabs defaultValue="project-team" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="project-team">Equipe do Projeto</TabsTrigger>
            <TabsTrigger value="collaborators">Colaboradores</TabsTrigger>
            <TabsTrigger value="partnerships">Parcerias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="project-team" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Fellipe Silva Martins", role: "Pesquisador Principal", university: "Universidade Presbiteriana Mackenzie", initials: "FM", lattes: "http://lattes.cnpq.br/7912881403948084", image: fellipeImg },
                { name: "Gilberto Perez", role: "Pesquisador Associado", university: "Universidade Presbiteriana Mackenzie", initials: "GP", lattes: "http://lattes.cnpq.br/8699394703578756", image: gilbertoImg },
                { name: "Claudio Luis Carvalho Larieira", role: "Pesquisador Associado", university: "Universidade Presbiteriana Mackenzie", initials: "CL", lattes: "http://lattes.cnpq.br/4633583409151790", image: larieiraImg },
                { name: "Manuel Anibal Silva Portugal Vasconcelos Ferreira", role: "Pesquisador Associado", university: "Instituto Politécnico de Leiria, Portugal", initials: "MF", lattes: "http://lattes.cnpq.br/7033780505958439", image: manuelImg },
                { name: "Alan Souza Lima", role: "Doutorando", university: "Universidade Presbiteriana Mackenzie", initials: "AL", lattes: "http://lattes.cnpq.br/1875943076455424", image: null },
                { name: "Pablo Turbuk Garrán", role: "Doutorando", university: "Universidade Presbiteriana Mackenzie", initials: "PG", lattes: "http://lattes.cnpq.br/2078426148354358", image: pabloImg },
                { name: "Rachel Horta", role: "Doutorada", university: "Universidade Presbiteriana Mackenzie", initials: "RH", lattes: "http://lattes.cnpq.br/5403073777315194", image: rachelImg },
              ].map((member, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.image || ""} className="object-cover" />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>
                        {member.role}
                        <br />
                        <a href={member.lattes} className="text-primary hover:underline text-xs" target="_blank" rel="noreferrer">
                          Currículo Lattes
                        </a>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-semibold">
                      {member.university}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="collaborators">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { name: "Colaborador Exemplo 1", role: "Pesquisador Associado", university: "Universidade Tecnológica", initials: "C1", lattes: "#" },
                 { name: "Colaborador Exemplo 2", role: "Pesquisador Associado", university: "Universidade Tecnológica", initials: "C2", lattes: "#" },
                 { name: "Colaborador Exemplo 3", role: "Pesquisador Associado", university: "Universidade Tecnológica", initials: "C3", lattes: "#" },
               ].map((member, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${member.name}`} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>
                        {member.role}
                        <br />
                        <a href={member.lattes} className="text-primary hover:underline text-xs" target="_blank" rel="noreferrer">
                          Currículo Lattes
                        </a>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-semibold">
                      {member.university}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="partnerships">
            <div className="grid md:grid-cols-2 gap-6">
               {[1, 2].map((i) => (
                <Card key={i} className="flex flex-col items-center p-6 text-center">
                   <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                     <span className="text-2xl font-bold text-muted-foreground">Logo</span>
                   </div>
                   <CardTitle className="mb-2">Parceiro Tecnológico {i}</CardTitle>
                   <p className="text-muted-foreground">
                     Parceria estratégica focada na aplicação industrial de nossas descobertas de pesquisa.
                   </p>
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
