import { Navbar, Footer } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Github } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:ailabmack@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 text-primary">Fale Conosco</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground">
              Estamos sempre abertos a novas colaborações e estudantes interessados em nossa pesquisa.
              Sinta-se à vontade para entrar em contato conosco usando as informações abaixo.
            </p>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Escola de Negócios Mackenzie / Centro de Ciências Sociais Aplicadas<br />
                      <a href="https://www.mackenzie.br/" target="_blank" rel="noreferrer" className="hover:underline">Universidade Presbiteriana Mackenzie</a><br />
                      Rua Maria Antônia, 163, Sala 13, Higienópolis<br />
                      São Paulo - SP, Brasil
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">ailabmack@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Telefone</h3>
                    <p className="text-muted-foreground">+55 (11) 2114-8597</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                  <Github className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">GitHub</h3>
                    <a href="https://github.com/ailabmack" target="_blank" rel="noreferrer" className="text-muted-foreground hover:underline hover:text-primary transition-colors">
                      github.com/ailabmack
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envie-nos uma mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome</label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Seu email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                  <Input 
                    id="subject" 
                    placeholder="Sobre o que gostaria de falar?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                  <Textarea 
                    id="message" 
                    placeholder="Sua mensagem aqui..." 
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">Enviar Mensagem</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
