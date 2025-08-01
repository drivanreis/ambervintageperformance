import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";

interface Engine {
  id: string;
  name: string;
  history: string;
  image: string;
  applications: string[];
}

export function EnginesSection() {
  const [selectedTab, setSelectedTab] = useState<string>("ap-vw");

  const engines: Engine[] = [
    {
      id: "ap-vw",
      name: "AP da VW",
      history: "O motor AP (Alta Performance) da Volkswagen é um dos motores mais versáteis e duráveis já produzidos. Fabricado de 1984 a 2015, foi instalado em diversos modelos como Gol, Parati, Saveiro e Golf. Conhecido por sua robustez e fácil preparação, o AP tornou-se uma escolha popular entre entusiastas de carros modificados e competições.",
      image: "/images/APEngine.jpg",
      applications: ["Gol GTI", "Golf", "Saveiro", "Parati", "Santana", "Adaptações em Fuscas", "Ultraleves"]
    },
    {
      id: "gm-family",
      name: "GM Family",
      history: "A família de motores GM Family II foi desenvolvida pela Opel e utilizada em diversos modelos da General Motors. Produzida a partir de 1979, esta linha incluiu motores de 4 cilindros que variavam entre 1.4L e 2.4L. No Brasil, equipou carros icônicos como o Vectra, Astra, Zafira, e Kadett, sendo reconhecida por sua confiabilidade e desempenho equilibrado.",
      image: "/images/GMEngines.jpg",
      applications: ["Vectra", "Astra", "Zafira", "Kadett", "Monza", "S10", "Omega"]
    },
    {
      id: "fusca",
      name: "Motor de Fusca",
      history: "O motor boxer refrigerado a ar do Volkswagen Fusca é um dos mais icônicos da história automotiva. Projetado na década de 1930 por Ferdinand Porsche, este motor de configuração oposta, com cilindros horizontalmente opostos, tornou-se símbolo de simplicidade e durabilidade. Com cilindradas que variavam de 1.1L a 1.6L, equipou milhões de Fuscas e derivados por mais de 70 anos.",
      image: "/images/BeetleEngine.jpg",
      applications: ["Fusca", "Kombi", "Karmann Ghia", "Variant", "TL", "Buggy", "Puma"]
    },
    {
      id: "opala",
      name: "Motor de Opala",
      history: "O motor do Chevrolet Opala é uma lenda nas ruas brasileiras. Produzido de 1968 a 1992, este propulsor estava disponível em versões 4 e 6 cilindros, com destaque para o famoso '6 cilindros' de 4.1L (250 polegadas cúbicas). Conhecidos pela robustez e pelo som característico, os motores Opala tornaram-se preferidos entre customizadores e entusiastas de arrancadas e drift.",
      image: "/images/OpalaEngine.jpg",
      applications: ["Opala", "Caravan", "Diplomata", "Comodoro", "D10", "C10", "Veraneio"]
    }
  ];

  const currentEngine = engines.find(engine => engine.id === selectedTab) || engines[0];

  return (
    <section id="engines" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="section-title amber-gradient">Nossos Motores</h2>
        
        <Tabs defaultValue="ap-vw" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {engines.map((engine) => (
              <TabsTrigger 
                key={engine.id} 
                value={engine.id}
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                {engine.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {engines.map((engine) => (
            <TabsContent key={engine.id} value={engine.id}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Card className="engine-card">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 flex items-end p-6">
                      <h3 className="text-white text-2xl font-bold">{engine.name}</h3>
                    </div>
                    <div 
                      className="w-full h-full bg-muted" 
                      style={{
                        backgroundImage: `url(${engine.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                  </div>
                </Card>
                
                <div className="space-y-6">
                  <motion.div
                    key={engine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="section-subtitle amber-gradient">História</h3>
                    <p className="text-foreground/80">{engine.history}</p>
                    
                    <h3 className="section-subtitle mt-6 amber-gradient">Aplicações</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {engine.applications.map((app, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}