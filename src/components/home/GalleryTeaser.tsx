import { Link } from "react-router-dom";
import { ArrowRight, Image, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MosqueBackgroundPattern } from "@/components/decorative/MosqueBackground";

// Placeholder gallery items
const placeholderPhotos = [
  { id: "1", gradient: "from-primary/70 via-accent/50 to-primary/60" },
  { id: "2", gradient: "from-accent/70 via-primary/50 to-accent/60" },
  { id: "3", gradient: "from-primary/60 via-accent/60 to-primary/50" },
  { id: "4", gradient: "from-accent/60 via-primary/60 to-accent/50" },
  { id: "5", gradient: "from-primary/70 via-primary/50 to-accent/60" },
  { id: "6", gradient: "from-accent/70 via-accent/50 to-primary/60" },
];

export function GalleryTeaser() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-background" />
      
      {/* Mosque background pattern */}
      <MosqueBackgroundPattern className="text-primary" />
      
      {/* Decorative elements */}
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div className="relative">
            <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
              <Camera className="h-4 w-4" />
              Dokumentasi
            </div>
            <h2 className="section-title">
              Galeri Kegiatan
            </h2>
            <p className="section-subtitle mt-2">
              Dokumentasi momen-momen berharga dari berbagai kegiatan kami
            </p>
            <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 group">
            <Link to="/galeri">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid with varied sizes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {placeholderPhotos.map((photo, index) => {
            // Create varied grid spans for visual interest
            const isLarge = index === 0 || index === 3;
            
            return (
              <Link
                key={photo.id}
                to="/galeri"
                className={`relative rounded-2xl overflow-hidden group animate-scale-in ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`}>
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:30px_30px]" />
                  </div>
                </div>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image className={`${isLarge ? 'h-8 w-8' : 'h-6 w-6'} text-white/60`} />
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/30 transition-colors duration-300" />
                
                {/* Hover label */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-sm bg-accent/90 px-5 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    📸 Lihat Foto
                  </span>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
