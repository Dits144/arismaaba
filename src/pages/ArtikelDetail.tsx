import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import defaultArticleImg from "@/assets/default-article.jpg";
import type { Tables } from "@/integrations/supabase/types";

type Article = Tables<"articles">;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const ArtikelDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      const { data } = await supabase.from("articles").select("*").eq("slug", slug).single();
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="py-12 md:py-16 container px-4 max-w-3xl mx-auto">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="aspect-video rounded-xl mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-60 w-full" />
        </div>
      </PublicLayout>
    );
  }

  if (!article) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">Artikel Tidak Ditemukan</h1>
            <Button asChild><Link to="/artikel">Kembali ke Daftar Artikel</Link></Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <article className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/artikel" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Artikel
            </Link>

            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img src={article.thumbnail_url || defaultArticleImg} alt={article.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              {article.category && <Badge variant="outline" className="border-accent/50 text-accent">{article.category}</Badge>}
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{article.title}</h1>
              {article.published_at && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-accent" /><span>{formatDate(article.published_at)}</span>
                </div>
              )}
              {article.content && (
                <div className="prose prose-lg max-w-none">
                  {article.content.split("\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return <h2 key={index} className="text-xl font-display font-bold text-foreground mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
                    }
                    if (paragraph.startsWith("- ")) {
                      return <li key={index} className="text-foreground/90">{paragraph.replace("- ", "")}</li>;
                    }
                    return paragraph ? <p key={index} className="text-foreground/90">{paragraph}</p> : null;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default ArtikelDetailPage;
