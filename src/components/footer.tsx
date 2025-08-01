import { Button } from "./ui/button";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background pt-12 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          <div>
            <h3 className="font-bold text-lg mb-4 amber-gradient">Amber Vintage Performance</h3>
            <p className="text-muted-foreground mb-6">
              Restauração, customização e manutenção de motores clássicos de alta performance para entusiastas que valorizam tradição e inovação.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {["Início", "Nossos Motores", "Nossos Serviços", "Galeria", "Quem Somos"].map((item, index) => (
                <li key={index}>
                  <Button 
                    variant="link" 
                    className="p-0 text-muted-foreground hover:text-primary h-auto"
                    onClick={() => {
                      const id = ["home", "engines", "services", "gallery", "about"][index];
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">(11) 99999-8888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">contato@ambervintage.com.br</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-bold mb-2">Horário de Funcionamento</h4>
              <p className="text-muted-foreground text-sm">Segunda a Sexta: 8h às 18h</p>
              <p className="text-muted-foreground text-sm">Sábados: 9h às 14h</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-4 border-t border-border">
        <div className="container-custom text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Amber Vintage Performance. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}