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
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Pesquisador {i}</CardTitle>
                      <CardDescription>Investigador Principal</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Especialista em análise computacional e desenvolvimento de algoritmos com mais de 10 anos de experiência.
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
                  <CardHeader>
                    <CardTitle>Dr. Colaborador {i}</CardTitle>
                    <CardDescription>Universidade Tecnológica</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Pesquisa conjunta em sistemas distribuídos e arquiteturas de computação em nuvem.
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
