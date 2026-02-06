import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Search, Clock, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Placeholder articles
const allArticles = [
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
  {
    id: "4",
    title: "Tips Menjaga Semangat Ibadah di Bulan Ramadhan",
    slug: "tips-semangat-ramadhan",
    excerpt: "Cara agar tetap istiqomah dalam beribadah selama bulan Ramadhan hingga akhir.",
    category: "Ramadhan",
    published_at: "2026-01-15",
    thumbnail_url: null,
  },
  {
    id: "5",
    title: "Mengenal Sejarah Masjid 'Amru Bin 'Ash",
    slug: "sejarah-masjid",
    excerpt: "Sejarah singkat pendirian dan perkembangan Masjid 'Amru Bin 'Ash.",
    category: "Info Masjid",
    published_at: "2026-01-10",
    thumbnail_url: null,
  },
];

const categories = ["Semua", "Ramadhan", "Kajian", "Sosial", "Info Masjid"];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const ArtikelPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Semua" || article.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Artikel
            </h1>
            <p className="text-lg text-muted-foreground">
              Baca artikel dan informasi seputar kegiatan keislaman
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-card border-border">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/artikel/${article.slug}`}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="card-hover h-full bg-card border-border/50 overflow-hidden group">
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada artikel ditemukan.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default ArtikelPage;
