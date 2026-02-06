import { Link } from "react-router-dom";
import { ArrowRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder gallery items with neon gradients
const placeholderPhotos = [
  { id: "1", gradient: "from-accent/40 via-secondary/30 to-accent/20" },
  { id: "2", gradient: "from-secondary/40 via-accent/30 to-secondary/20" },
  { id: "3", gradient: "from-accent/30 via-primary/20 to-secondary/30" },
  { id: "4", gradient: "from-primary/30 via-accent/30 to-secondary/20" },
  { id: "5", gradient: "from-secondary/30 via-accent/40 to-primary/20" },
  { id: "6", gradient: "from-accent/20 via-secondary/40 to-accent/30" },
];

export function GalleryTeaser() {
  return (
    <section className="py-16 md:py-24 bg-card/50 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">
              Galeri <span className="text-gradient-neon">Kegiatan</span>
            </h2>
            <p className="section-subtitle">
              Dokumentasi momen-momen berharga dari berbagai kegiatan kami
            </p>
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent/80 group hover:bg-accent/10">
            <Link to="/galeri">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholderPhotos.map((photo, index) => (
            <Link
              key={photo.id}
              to="/galeri"
              className="relative aspect-square rounded-xl overflow-hidden group animate-scale-in border border-border/50 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_hsla(160,100%,50%,0.2)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}
              >
                <Image className="h-12 w-12 text-foreground/30" />
              </div>
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-accent font-medium text-sm">Lihat Foto</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
