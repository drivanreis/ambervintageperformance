import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Sample gallery images - these should be replaced with actual project images
const galleryImages = [
  {
    id: 1,
    src: "/images/CustomEngine.jpg",
    alt: "Motor AP customizado",
    caption: "Motor AP Turbo personalizado"
  },
  {
    id: 2,
    src: "/images/Restoration.jpg",
    alt: "Motor Opala restaurado",
    caption: "Motor 6 cilindros de Opala em restauração"
  },
  {
    id: 3,
    src: "/images/EngineDetails.jpg",
    alt: "Detalhes de motor",
    caption: "Detalhes de cromagem em motor preparado"
  },
  {
    id: 4,
    src: "/images/EngineBlock.jpg",
    alt: "Bloco de motor",
    caption: "Bloco de motor GM sendo preparado"
  },
  {
    id: 5,
    src: "/images/CustomEngine.jpg",
    alt: "Motor de Fusca customizado",
    caption: "Motor boxer do Fusca com preparação especial"
  },
  {
    id: 6,
    src: "/images/Workshop.jpg",
    alt: "Oficina de motores",
    caption: "Visão da oficina Amber Vintage Performance"
  }
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);
  
  const visibleImages = showMore ? galleryImages : galleryImages.slice(0, 4);
  
  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    } else {
      newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(galleryImages[newIndex].id);
  };

  const currentImage = selectedImage !== null 
    ? galleryImages.find(img => img.id === selectedImage)
    : null;

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="section-title amber-gradient">Galeria de Projetos</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Conheça alguns dos nossos trabalhos de restauração e customização de motores clássicos de alta performance.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleImages.map((image) => (
            <div 
              key={image.id}
              className="relative aspect-square overflow-hidden cursor-pointer rounded-lg group"
              onClick={() => openLightbox(image.id)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all z-10 flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {image.caption}
                  </p>
                </div>
              </div>
              <div 
                className="w-full h-full bg-muted group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          ))}
        </div>
        
        {!showMore && galleryImages.length > 4 && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => setShowMore(true)}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Carregar mais fotos
            </Button>
          </div>
        )}
        
        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={() => closeLightbox()}>
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
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              
              {/* Image */}
              <div className="w-full aspect-video md:aspect-auto md:h-[80vh] relative flex items-center justify-center">
                {currentImage && (
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
              
              {/* Caption */}
              {currentImage && (
                <div className="p-4 bg-black text-white">
                  <p className="text-center">{currentImage.caption}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}