import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Search, Clock, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import defaultArticleImg from "@/assets/default-article.jpg";
import heroArtikel from "@/assets/hero-artikel.jpg";
import type { Tables } from "@/integrations/supabase/types";

type Article = Tables<"articles">;

const categories = ["Semua", "Ramadhan", "Kajian", "Sosial", "Info Masjid"];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const ArtikelPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from("articles").select("*").eq("status", "published").order("published_at", { ascending: false });
      setArticles(data || []);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const filtered = articles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Semua" || a.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroArtikel} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Artikel</h1>
            <p className="text-lg text-white/80">Baca artikel dan informasi seputar kegiatan keislaman</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari artikel..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border" />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-card border-border"><SelectValue placeholder="Kategori" /></SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 0.1}>
                  <Link to={`/artikel/${article.slug}`}>
                    <Card className="card-hover h-full bg-card border-border/50 overflow-hidden group">
                      <div className="aspect-video overflow-hidden">
                        <img src={article.thumbnail_url || defaultArticleImg} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <CardContent className="p-5">
                        {article.category && <Badge variant="outline" className="mb-3 border-accent/50 text-accent">{article.category}</Badge>}
                        <h3 className="font-display text-lg font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                        {article.published_at && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 text-accent" />
                            <span>{formatDate(article.published_at)}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">Tidak ada artikel ditemukan.</p></div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default ArtikelPage;
