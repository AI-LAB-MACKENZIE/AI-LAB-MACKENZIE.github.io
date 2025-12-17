import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-bold text-primary flex items-center gap-2">
            <span className="bg-primary text-primary-foreground p-1 rounded-md">GP</span>
            Grupo de Pesquisa
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-1 list-none">
              <NavigationMenuItem>
                <Link href="/" className={cn(navigationMenuTriggerStyle(), isActive("/") && "bg-accent text-accent-foreground")}>
                  Início
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/team" className={cn(navigationMenuTriggerStyle(), isActive("/team") && "bg-accent text-accent-foreground")}>
                  Equipe
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/news" className={cn(navigationMenuTriggerStyle(), isActive("/news") && "bg-accent text-accent-foreground")}>
                  Notícias
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/results" className={cn(navigationMenuTriggerStyle(), isActive("/results") && "bg-accent text-accent-foreground")}>
                  Resultados
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" className={cn(navigationMenuTriggerStyle(), isActive("/contact") && "bg-accent text-accent-foreground")}>
                  Contato
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/repos" className={cn(navigationMenuTriggerStyle(), isActive("/repos") && "bg-accent text-accent-foreground")}>
                  <Github className="w-4 h-4 mr-2" />
                  Repositórios
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-background p-4 flex flex-col gap-2">
          <Link href="/" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Início</Link>
          <Link href="/team" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Equipe</Link>
          <Link href="/news" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Notícias</Link>
          <Link href="/results" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Resultados</Link>
          <Link href="/contact" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Contato</Link>
          <Link href="/repos" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Repositórios</Link>
        </div>
      )}
    </nav>
  );
}

import mackenzieLogo from "@assets/image_1766007305157.png";

export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/30">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8 text-muted-foreground">
        <img src={mackenzieLogo} alt="Universidade Presbiteriana Mackenzie" className="h-[4.5rem] object-contain" />
        <p>&copy; {new Date().getFullYear()} Grupo de Pesquisa. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
