import { useState, useEffect } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import defaultGalleryImg from "@/assets/default-gallery.jpg";
import heroGaleri from "@/assets/hero-galeri.jpg";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery_items">;
type GalleryCategory = Tables<"gallery_categories">;

const GaleriPage = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [itemsRes, catsRes] = await Promise.all([
        supabase.from("gallery_items").select("*").order("created_at", { ascending: false }),
        supabase.from("gallery_categories").select("*").order("name"),
      ]);
      setItems(itemsRes.data || []);
      setCategories(catsRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = selectedCategory === "all" ? items : items.filter((i) => i.category_id === selectedCategory);

  const getImageUrl = (item: GalleryItem) => {
    if (item.image_url && item.image_url !== "/placeholder.svg") return item.image_url;
    return defaultGalleryImg;
  };

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroGaleri} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Galeri</h1>
            <p className="text-lg text-white/80">Dokumentasi momen-momen berharga dari berbagai kegiatan ARISMA</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="flex justify-center mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full max-w-xs bg-card border-border"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Semua</SelectItem>
                {categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="aspect-square rounded-lg" />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.05}>
                  <button
                    onClick={() => setSelectedIndex(index)}
                    className="relative aspect-square rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent w-full"
                  >
                    <img src={getImageUrl(item)} alt={item.title || ""} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end justify-center pb-4">
                      {item.title && (
                        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-primary/70 px-3 py-1 rounded-full">
                          {item.title}
                        </span>
                      )}
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">Tidak ada foto ditemukan.</p></div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl bg-background/95 border-border p-2 sm:p-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10 text-foreground hover:bg-accent/20" onClick={() => setSelectedIndex(null)}>
              <X className="h-5 w-5" />
            </Button>
            {selectedIndex !== null && filtered[selectedIndex] && (
              <img src={getImageUrl(filtered[selectedIndex])} alt={filtered[selectedIndex].title || ""} className="w-full aspect-video object-contain rounded-lg" />
            )}
            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" size="icon" onClick={() => setSelectedIndex((prev) => prev !== null && prev > 0 ? prev - 1 : prev)} disabled={selectedIndex === 0}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm text-muted-foreground">{selectedIndex !== null ? selectedIndex + 1 : 0} / {filtered.length}</span>
              <Button variant="outline" size="icon" onClick={() => setSelectedIndex((prev) => prev !== null && prev < filtered.length - 1 ? prev + 1 : prev)} disabled={selectedIndex === filtered.length - 1}>
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
