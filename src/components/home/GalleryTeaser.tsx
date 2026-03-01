import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MosqueBackgroundPattern } from "@/components/decorative/MosqueBackground";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import defaultGalleryImg from "@/assets/default-gallery.jpg";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery_items">;

export function GalleryTeaser() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false }).limit(6);
      setItems(data || []);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const getImageUrl = (item: GalleryItem) => {
    if (item.image_url && item.image_url !== "/placeholder.svg") return item.image_url;
    return defaultGalleryImg;
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-background" />
      <MosqueBackgroundPattern className="text-primary" />

      <div className="container relative z-10 px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <ScrollReveal>
            <div className="relative">
              <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2"><Camera className="h-4 w-4" />Dokumentasi</div>
              <h2 className="section-title">Galeri Kegiatan</h2>
              <p className="section-subtitle mt-2">Dokumentasi momen-momen berharga dari berbagai kegiatan kami</p>
              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
            </div>
          </ScrollReveal>
          <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 group">
            <Link to="/galeri">Lihat Semua<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className={`rounded-2xl ${i === 1 || i === 4 ? 'md:col-span-2 md:row-span-2' : ''}`} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {items.map((item, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <ScrollReveal key={item.id} delay={index * 0.1} className={isLarge ? 'md:col-span-2 md:row-span-2' : ''}>
                  <Link to="/galeri" className="relative rounded-2xl overflow-hidden group block h-full">
                    <img src={getImageUrl(item)} alt={item.title || ""} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-medium text-sm bg-accent/90 px-5 py-2.5 rounded-full shadow-lg">Lihat Foto</span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
