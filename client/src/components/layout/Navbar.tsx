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
            <span className="bg-primary text-primary-foreground p-1 rounded-md">RG</span>
            Research Group
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-1 list-none">
              <NavigationMenuItem>
                <Link href="/" className={cn(navigationMenuTriggerStyle(), isActive("/") && "bg-accent text-accent-foreground")}>
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/team" className={cn(navigationMenuTriggerStyle(), isActive("/team") && "bg-accent text-accent-foreground")}>
                  Team
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/news" className={cn(navigationMenuTriggerStyle(), isActive("/news") && "bg-accent text-accent-foreground")}>
                  News
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/results" className={cn(navigationMenuTriggerStyle(), isActive("/results") && "bg-accent text-accent-foreground")}>
                  Results
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" className={cn(navigationMenuTriggerStyle(), isActive("/contact") && "bg-accent text-accent-foreground")}>
                  Contact
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/repos" className={cn(navigationMenuTriggerStyle(), isActive("/repos") && "bg-accent text-accent-foreground")}>
                  <Github className="w-4 h-4 mr-2" />
                  Repos
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
          <Link href="/" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/team" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Team</Link>
          <Link href="/news" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>News</Link>
          <Link href="/results" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Results</Link>
          <Link href="/contact" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/repos" className="p-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Github Repos</Link>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/30">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Research Group. All rights reserved.</p>
      </div>
    </footer>
  );
}
