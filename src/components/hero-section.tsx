import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToEngines = () => {
    const enginesSection = document.getElementById("engines");
    if (enginesSection) {
      enginesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/HeroBackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="mx-auto w-40 h-40 mb-6">
            {/* Placeholder for logo - to be replaced with actual logo */}
            <div className="w-full h-full rounded-full border-4 border-primary bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">AVP</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block">Amber Vintage</span>
            <span className="text-primary">Performance</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-medium italic mt-4">
            "Não somos mecânicos, somos <span className="text-primary">CraftsMengine</span>!"
          </p>
          
          <Button 
            onClick={scrollToEngines}
            variant="default" 
            size="lg" 
            className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Saiba Mais
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}