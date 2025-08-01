import { Card, CardContent, CardHeader } from "./ui/card";
import { WrenchIcon, Flame, Package } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ServicesSection() {
  const services: ServiceItem[] = [
    {
      title: "Restauração",
      description: "Trazemos motores históricos de volta à vida, respeitando o legado do passado. Nossa restauração é meticulosa, utilizando técnicas tradicionais e modernos equipamentos de diagnóstico para garantir um desempenho autêntico.",
      icon: <WrenchIcon className="h-8 w-8 text-primary" />
    },
    {
      title: "Customização",
      description: "Inovamos na performance sem comprometer a essência do motor. Utilizamos turbos, blowers e outras tecnologias para extrair o máximo potencial dos motores clássicos, equilibrando potência e durabilidade.",
      icon: <Flame className="h-8 w-8 text-primary" />
    },
    {
      title: "Fornecimento de Peças",
      description: "Oferecemos acesso a um nicho seleto e exclusivo de fornecedores nacionais e internacionais. Trabalhamos com peças originais e de alta performance para garantir a autenticidade e qualidade em cada projeto.",
      icon: <Package className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container-custom">
        <h2 className="section-title amber-gradient">Nossos Serviços</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="service-card bg-card hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold amber-gradient">{service.title}</h3>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}