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
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">
              Artikel <span className="text-gradient-neon">Terbaru</span>
            </h2>
            <p className="section-subtitle">
              Baca artikel dan informasi seputar kegiatan keislaman
            </p>
          </div>
          <Button asChild variant="ghost" className="text-primary hover:text-primary/80 group hover:bg-primary/10">
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
              <Card className="bg-card h-full overflow-hidden group shadow-card rounded-xl">
                {/* Thumbnail Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-custom-deep/80 via-blue-custom-teal/60 to-blue-custom-dark/70 flex items-center justify-center relative overflow-hidden">
                  <Tag className="h-12 w-12 text-white/60" />
                </div>
                <CardContent className="p-5">
                  <Badge variant="outline" className="mb-3 border-blue-custom-teal text-blue-custom-teal">
                    {article.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-2 group-hover:text-blue-custom-teal transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-card-foreground/70 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-card-foreground/60">
                    <Clock className="h-4 w-4 text-blue-custom-teal" />
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
