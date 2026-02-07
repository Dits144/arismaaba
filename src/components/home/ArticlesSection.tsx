import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag, BookOpen } from "lucide-react";
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

const categoryIcons: Record<string, string> = {
  Ramadhan: "🌙",
  Kajian: "📖",
  Sosial: "💝",
};

export function ArticlesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div className="relative">
            <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
              <BookOpen className="h-4 w-4" />
              Bacaan Islami
            </div>
            <h2 className="section-title">
              Artikel Terbaru
            </h2>
            <p className="section-subtitle mt-2">
              Baca artikel dan informasi seputar kegiatan keislaman
            </p>
            <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 group">
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
              className="animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Thumbnail with animated gradient */}
                <div className="relative aspect-video bg-gradient-to-br from-accent via-accent/80 to-primary/60 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
                  </div>
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {categoryIcons[article.category] || "📝"}
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 border-accent/30 text-accent bg-accent/10 shadow-sm">
                    {categoryIcons[article.category]} {article.category}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-card-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-card-foreground/60">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-accent" />
                    </div>
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
