import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

export function AboutSection() {
  const teamMembers = [
    {
      name: "Roberto Gomes",
      role: "Especialista em Motores AP",
      image: "/images/RobertoGomes.jpg",
    },
    {
      name: "Carlos Silva",
      role: "Mestre em Restauração",
      image: "/images/Mestre.jpg",
    },
    {
      name: "Ana Paula",
      role: "Especialista em Carburação",
      image: "/images/Expertise.jpg",
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <h2 className="section-title amber-gradient">Quem Somos</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Nossa História</h3>
            <p className="text-muted-foreground mb-4">
              A Amber Vintage Performance nasceu da paixão por motores clássicos e da busca pela excelência em restauração e customização. 
              Com mais de 15 anos de experiência, nossa equipe combina técnicas tradicionais com tecnologia moderna para trazer o melhor 
              desempenho aos motores clássicos.
            </p>
            <p className="text-muted-foreground mb-6">
              Nossa oficina é um espaço onde o passado e o presente se encontram, onde respeitamos a história de cada motor 
              enquanto implementamos melhorias que os mantêm relevantes no mundo contemporâneo.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Av. dos Motores Clássicos, 1500 - São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>(11) 99999-8888</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>Segunda a Sexta: 8h às 18h | Sábados: 9h às 14h</span>
              </div>
            </div>
            
            <Button className="mt-6 bg-primary hover:bg-primary/90">
              Entre em Contato
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Nossa Equipe</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <div 
                      className="w-full h-full bg-muted"
                      style={{
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-bold">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}