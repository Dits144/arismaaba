import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder articles
const placeholderArticles = [
  {
    id: "1",
    title: "Menyambut Bulan Ramadhan dengan Persiapan Terbaik",
    slug: "menyambut-ramadhan",
    excerpt: "Tips dan panduan untuk mempersiapkan diri menjelang bulan suci Ramadhan agar ibadah lebih maksimal.",
    category: "Ramadhan",
    published_at: "2026-02-01",
    thumbnail_url: null,
  },
  {
    id: "2",
    title: "Keutamaan Memakmurkan Masjid bagi Remaja",
    slug: "keutamaan-memakmurkan-masjid",
    excerpt: "Pahala dan keutamaan yang didapatkan remaja yang aktif dalam kegiatan masjid.",
    category: "Kajian",
    published_at: "2026-01-25",
    thumbnail_url: null,
  },
  {
    id: "3",
    title: "Kegiatan Sosial ARISMA: Berbagi untuk Sesama",
    slug: "kegiatan-sosial-arisma",
    excerpt: "Dokumentasi kegiatan bakti sosial yang dilakukan oleh anggota ARISMA di bulan Ramadhan.",
    category: "Sosial",
    published_at: "2026-01-20",
    thumbnail_url: null,
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticlesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">Artikel Terbaru</h2>
            <p className="section-subtitle">
              Baca artikel dan informasi seputar kegiatan keislaman
            </p>
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent/80 group">
            <Link to="/artikel">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/artikel/${article.slug}`}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="card-hover h-full bg-card border-border/50 overflow-hidden group">
                {/* Thumbnail Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/30 flex items-center justify-center">
                  <Tag className="h-12 w-12 text-accent/50" />
                </div>
                <CardContent className="p-5">
                  <Badge variant="outline" className="mb-3 border-accent/50 text-accent">
                    {article.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
