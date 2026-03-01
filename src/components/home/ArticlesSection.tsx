import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MosqueBackgroundPattern } from "@/components/decorative/MosqueBackground";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import defaultArticleImg from "@/assets/default-article.jpg";
import type { Tables } from "@/integrations/supabase/types";

type Article = Tables<"articles">;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from("articles").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(3);
      setArticles(data || []);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      <MosqueBackgroundPattern className="text-accent" />

      <div className="container relative z-10 px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <ScrollReveal>
            <div className="relative">
              <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2"><BookOpen className="h-4 w-4" />Bacaan Islami</div>
              <h2 className="section-title">Artikel Terbaru</h2>
              <p className="section-subtitle mt-2">Baca artikel dan informasi seputar kegiatan keislaman</p>
              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
            </div>
          </ScrollReveal>
          <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 group">
            <Link to="/artikel">Lihat Semua<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.1}>
                <Link to={`/artikel/${article.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={article.thumbnail_url || defaultArticleImg} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-6">
                      {article.category && <Badge variant="outline" className="mb-3 border-accent/30 text-accent bg-accent/10 shadow-sm">{article.category}</Badge>}
                      <h3 className="font-display text-xl font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-card-foreground/70 mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                      {article.published_at && (
                        <div className="flex items-center gap-2 text-sm text-card-foreground/60">
                          <Clock className="h-4 w-4 text-accent" /><span>{formatDate(article.published_at)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
