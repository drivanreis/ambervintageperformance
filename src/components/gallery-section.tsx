"use client";

import { useState } from "react";
import { Button } from "./ui/button"; // Usando caminho relativo para os componentes da UI
import { Dialog, DialogContent } from "./ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryData } from "@/data/gallery-data"; // Usando alias para o arquivo de dados
import { Card, CardContent } from "./ui/card";

export function GallerySection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  
  // Limita o número de projetos visíveis para 3 por padrão, se houver dados
  const visibleProjects = showMoreProjects ? galleryData : galleryData.slice(0, 3);
  
  const openLightbox = (projectId: string, mediaIndex: number) => {
    setSelectedProjectId(projectId);
    setSelectedMediaIndex(mediaIndex);
  };
  
  const closeLightbox = () => {
    setSelectedProjectId(null);
    setSelectedMediaIndex(null);
  };
  
  const navigateMedia = (direction: 'prev' | 'next') => {
    if (selectedProjectId === null || selectedMediaIndex === null) return;
    
    const currentProject = galleryData.find(p => p.id === selectedProjectId);
    if (!currentProject || !currentProject.medias.length) return;
    
    let newIndex;
    if (direction === 'prev') {
      // Navegação circular
      newIndex = (selectedMediaIndex - 1 + currentProject.medias.length) % currentProject.medias.length;
    } else {
      // Navegação circular
      newIndex = (selectedMediaIndex + 1) % currentProject.medias.length;
    }
    
    setSelectedMediaIndex(newIndex);
  };

  const currentProject = selectedProjectId 
    ? galleryData.find(p => p.id === selectedProjectId)
    : null;
  const currentMedia = currentProject && selectedMediaIndex !== null
    ? currentProject.medias[selectedMediaIndex]
    : null;

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="section-title amber-gradient">Galeria de Projetos</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Conheça alguns dos nossos trabalhos de restauração e customização de motores clássicos de alta performance.
        </p>
        
        {/* Adiciona um fallback se não houver projetos */}
        {galleryData.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhum projeto de galeria encontrado.</p>
        ) : (
          <div className="flex flex-col gap-12">
            {visibleProjects.map((project) => (
              <div key={project.id} className="w-full">
                <h3 className="text-2xl font-semibold capitalize mb-4 text-center">
                  {project.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.medias.map((media, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div 
                          className="relative aspect-video overflow-hidden cursor-pointer rounded-lg group"
                          onClick={() => openLightbox(project.id, index)}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all z-10"></div>
                          {media.type === "image" ? (
                            <img
                              src={media.src}
                              alt={`${project.title} - ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  console.error(`Falha ao carregar a imagem: ${target.src}`);
                                  target.src = "https://placehold.co/400x225/FF0000/FFFFFF?text=Erro";
                              }}
                            />
                          ) : (
                            <video
                              src={media.src}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              controls={false}
                              autoPlay={false}
                              onError={(e) => {
                                  const target = e.target as HTMLVideoElement;
                                  console.error(`Falha ao carregar o vídeo: ${target.src}`);
                                  // Substitua o vídeo por uma imagem de erro
                                  const parent = target.parentElement;
                                  if (parent) {
                                      const errorImg = document.createElement('img');
                                      errorImg.src = "https://placehold.co/400x225/FF0000/FFFFFF?text=Erro";
                                      errorImg.alt = "Erro ao carregar o vídeo";
                                      errorImg.className = "w-full h-full object-cover";
                                      parent.innerHTML = '';
                                      parent.appendChild(errorImg);
                                  }
                              }}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!showMoreProjects && galleryData.length > 3 && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => setShowMoreProjects(true)}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Carregar mais projetos
            </Button>
          </div>
        )}
        
        {/* Lightbox Dialog */}
        <Dialog open={selectedProjectId !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
                onClick={closeLightbox}
              >
                <X className="h-5 w-5" />
              </Button>
              
              {/* Navigation buttons */}
              {currentProject && currentProject.medias.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateMedia('prev')}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateMedia('next')}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
              
              {/* Image / Video */}
              <div className="w-full aspect-video md:aspect-auto md:h-[80vh] relative flex items-center justify-center">
                {currentMedia && (
                  currentMedia.type === "image" ? (
                    <img
                      src={currentMedia.src}
                      alt={`${currentProject?.title} - ${selectedMediaIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error(`Falha no lightbox: ${target.src}`);
                          target.src = "https://placehold.co/800x600/FF0000/FFFFFF?text=Erro";
                      }}
                    />
                  ) : (
                    <video
                      src={currentMedia.src}
                      controls
                      autoPlay
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          console.error(`Falha no lightbox: ${target.src}`);
                          // Substitua o vídeo por uma imagem de erro no lightbox
                          const parent = target.parentElement;
                          if (parent) {
                              const errorImg = document.createElement('img');
                              errorImg.src = "https://placehold.co/800x600/FF0000/FFFFFF?text=Erro";
                              errorImg.alt = "Erro ao carregar o vídeo";
                              errorImg.className = "max-h-full max-w-full object-contain";
                              parent.innerHTML = '';
                              parent.appendChild(errorImg);
                          }
                      }}
                    />
                  )
                )}
              </div>
              
              {/* Caption */}
              {currentProject && (
                <div className="p-4 bg-black text-white">
                  <p className="text-center">{currentProject.title}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
