import { Link } from "react-router-dom";
import { ArrowRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder gallery items
const placeholderPhotos = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
];

export function GalleryTeaser() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">
              Galeri Kegiatan
            </h2>
            <p className="section-subtitle">
              Dokumentasi momen-momen berharga dari berbagai kegiatan kami
            </p>
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 group">
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
              className="relative aspect-square rounded-xl overflow-hidden group animate-scale-in content-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-accent/50 flex items-center justify-center">
                <Image className="h-12 w-12 text-white/40" />
              </div>
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm bg-accent/90 px-4 py-2 rounded-full">Lihat Foto</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
