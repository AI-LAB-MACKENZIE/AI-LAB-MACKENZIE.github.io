import { Navbar, Footer } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                { name: "Fellipe Silva Martins", role: "Pesquisador Principal", university: "Universidade Presbiteriana Mackenzie", initials: "FM", lattes: "#" },
                { name: "Manuel Anibal Silva Portugal Vasconcelos Ferreira", role: "Pesquisador Associado", university: "Instituto Politécnico de Leiria, Portugal", initials: "MF", lattes: "#" },
                { name: "Alan Souza Lima", role: "Doutorando", university: "Universidade Presbiteriana Mackenzie", initials: "AL", lattes: "#" },
                { name: "Pablo Turbuk Garrán", role: "Doutorando", university: "Universidade Presbiteriana Mackenzie", initials: "PG", lattes: "#" },
                { name: "Rachel Horta", role: "Doutorada", university: "Universidade Presbiteriana Mackenzie", initials: "RH", lattes: "#" },
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
          
          <TabsContent value="collaborators">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${i+10}`} />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Dr. Colaborador {i}</CardTitle>
                      <CardDescription>Pesquisador Associado</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-semibold">
                      Universidade Tecnológica
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
