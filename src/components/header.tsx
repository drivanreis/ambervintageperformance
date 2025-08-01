import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Phone, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { name: "Início", id: "home" },
    { name: "Nossos Motores", id: "engines" },
    { name: "Nossos Serviços", id: "services" },
    { name: "Galeria", id: "gallery" },
    { name: "Quem Somos", id: "about" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold amber-gradient">Amber Vintage Performance</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              className="text-foreground hover:text-primary"
              onClick={() => scrollToSection(section.id)}
            >
              {section.name}
            </Button>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20">
            <Phone className="h-4 w-4 text-primary" />
            <span className="sr-only">Telefone</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="sr-only">WhatsApp</span>
          </Button>
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="ml-2 rounded-full bg-background/80 backdrop-blur-sm border-primary/20">
                <Menu className="h-5 w-5 text-primary" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <div className="flex-1 flex flex-col justify-center space-y-4">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className="justify-start text-lg"
                    onClick={() => {
                      scrollToSection(section.id);
                      document.querySelector('[data-state="open"]')?.setAttribute('data-state', 'closed');
                    }}
                  >
                    {section.name}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between pt-6 border-t">
                <span className="text-sm text-muted-foreground">© Amber Vintage Performance</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}