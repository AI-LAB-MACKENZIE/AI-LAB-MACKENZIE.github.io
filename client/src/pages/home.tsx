import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Beaker, Users, FileText } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/abstract_red_and_white_geometric_background.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Research Visualization" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-primary mb-6">
              Advancing Knowledge Through Innovation
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We are a dedicated research group focused on pushing the boundaries of science and technology. 
              Our mission is to develop cutting-edge solutions for real-world problems.
            </p>
            <div className="flex gap-4">
              <Link href="/results">
                <Button size="lg" className="gap-2">
                  View Our Research <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Our Focus Areas</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <Beaker className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Scientific Research</h3>
                <p className="text-muted-foreground">
                  Conducting rigorous studies to uncover new principles and methodologies in our field.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Publications</h3>
                <p className="text-muted-foreground">
                  Disseminating our findings through high-impact journals and international conferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Partnering with industry leaders and academic institutions worldwide.
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
