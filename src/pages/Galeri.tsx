import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Placeholder gallery data
const categories = [
  { id: "all", name: "Semua" },
  { id: "muharram-cup-2025", name: "Muharram Cup 2025" },
  { id: "ramadhan", name: "Ramadhan" },
  { id: "kajian", name: "Kajian" },
  { id: "baksos", name: "Baksos" },
  { id: "lainnya", name: "Lainnya" },
];

const galleryItems = [
  { id: "1", category: "muharram-cup-2025", gradient: "from-accent/30 to-primary/20" },
  { id: "2", category: "muharram-cup-2025", gradient: "from-primary/30 to-accent/20" },
  { id: "3", category: "ramadhan", gradient: "from-accent/20 to-primary/30" },
  { id: "4", category: "ramadhan", gradient: "from-primary/20 to-accent/30" },
  { id: "5", category: "kajian", gradient: "from-accent/25 to-primary/25" },
  { id: "6", category: "kajian", gradient: "from-primary/25 to-accent/25" },
  { id: "7", category: "baksos", gradient: "from-accent/30 to-primary/20" },
  { id: "8", category: "baksos", gradient: "from-primary/30 to-accent/20" },
  { id: "9", category: "lainnya", gradient: "from-accent/20 to-primary/30" },
];

const GaleriPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const currentIndex = selectedImage
    ? filteredItems.findIndex((item) => item.id === selectedImage)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1].id);
    }
  };

  const currentItem = filteredItems.find((item) => item.id === selectedImage);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Galeri
            </h1>
            <p className="text-lg text-muted-foreground">
              Dokumentasi momen-momen berharga dari berbagai kegiatan ARISMA
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          {/* Filter */}
          <div className="flex justify-center mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full max-w-xs bg-card border-border">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gallery Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedImage(item.id)}
                  className="relative aspect-square rounded-lg overflow-hidden group animate-scale-in focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                  >
                    <Image className="h-12 w-12 text-foreground/20" />
                  </div>
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-foreground font-medium transition-opacity">
                      Lihat
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada foto ditemukan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-background/95 border-border p-2 sm:p-4">
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 text-foreground hover:bg-accent/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/30 rounded-lg flex items-center justify-center">
              {currentItem && (
                <div className={`w-full h-full bg-gradient-to-br ${currentItem.gradient} flex items-center justify-center rounded-lg`}>
                  <Image className="h-20 w-20 text-foreground/30" />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={currentIndex <= 0}
                className="border-border"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {filteredItems.length}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex >= filteredItems.length - 1}
                className="border-border"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
};

export default GaleriPage;
