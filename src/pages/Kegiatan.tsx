import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Calendar, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder events
const allEvents = [
  {
    id: "1",
    title: "Muharram Cup 2025",
    slug: "muharram-cup-2025",
    start_date: "2025-07-15",
    location: "Lapangan Masjid 'Amru Bin 'Ash",
    description: "Turnamen futsal antar remaja masjid dalam rangka menyambut tahun baru hijriyah.",
    poster_url: null,
  },
  {
    id: "2",
    title: "Kajian Remaja Mingguan",
    slug: "kajian-remaja-mingguan",
    start_date: "2026-02-10",
    location: "Aula Masjid 'Amru Bin 'Ash",
    description: "Kajian rutin setiap minggu membahas fiqih remaja dan akhlak mulia.",
    poster_url: null,
  },
  {
    id: "3",
    title: "Buka Puasa Bersama 2026",
    slug: "buka-puasa-bersama-2026",
    start_date: "2026-03-15",
    location: "Halaman Masjid",
    description: "Kegiatan buka puasa bersama seluruh jamaah dan warga sekitar.",
    poster_url: null,
  },
  {
    id: "4",
    title: "Bakti Sosial Ramadhan",
    slug: "bakti-sosial-ramadhan",
    start_date: "2025-03-20",
    location: "Sekitar Masjid",
    description: "Pembagian sembako dan santunan kepada masyarakat kurang mampu.",
    poster_url: null,
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

function isUpcoming(dateString: string) {
  return new Date(dateString) > new Date();
}

const KegiatanPage = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("upcoming");

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = tab === "upcoming" ? isUpcoming(event.start_date) : !isUpcoming(event.start_date);
    return matchesSearch && matchesTab;
  });

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Kegiatan
            </h1>
            <p className="text-lg text-muted-foreground">
              Daftar kegiatan yang diselenggarakan oleh ARISMA
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
                placeholder="Cari kegiatan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={tab} onValueChange={setTab} className="mb-8">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Akan Datang
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Sudah Lewat
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <Link
                  key={event.id}
                  to={`/kegiatan/${event.slug}`}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="card-hover h-full bg-card border-border/50 overflow-hidden group">
                    <div className="aspect-video bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-accent/50" />
                    </div>
                    <CardContent className="p-5">
                      <Badge
                        className={`mb-3 ${
                          isUpcoming(event.start_date)
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isUpcoming(event.start_date) ? "Akan Datang" : "Selesai"}
                      </Badge>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{formatDate(event.start_date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada kegiatan ditemukan.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default KegiatanPage;
