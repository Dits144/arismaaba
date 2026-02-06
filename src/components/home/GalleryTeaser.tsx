import { Link } from "react-router-dom";
import { ArrowRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder gallery items
const placeholderPhotos = [
  { id: "1", gradient: "from-accent/30 to-primary/20" },
  { id: "2", gradient: "from-primary/30 to-accent/20" },
  { id: "3", gradient: "from-accent/20 to-primary/30" },
  { id: "4", gradient: "from-primary/20 to-accent/30" },
  { id: "5", gradient: "from-accent/25 to-primary/25" },
  { id: "6", gradient: "from-primary/25 to-accent/25" },
];

export function GalleryTeaser() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">Galeri Kegiatan</h2>
            <p className="section-subtitle">
              Dokumentasi momen-momen berharga dari berbagai kegiatan kami
            </p>
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent/80 group">
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
              className="relative aspect-square rounded-lg overflow-hidden group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}
              >
                <Image className="h-12 w-12 text-foreground/20" />
              </div>
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
