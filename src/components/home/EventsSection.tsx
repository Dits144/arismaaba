import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder events for initial display
const placeholderEvents = [
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
    start_date: "2025-02-10",
    location: "Aula Masjid 'Amru Bin 'Ash",
    description: "Kajian rutin setiap minggu membahas fiqih remaja dan akhlak mulia.",
    poster_url: null,
  },
  {
    id: "3",
    title: "Buka Puasa Bersama",
    slug: "buka-puasa-bersama-2026",
    start_date: "2026-03-01",
    location: "Halaman Masjid",
    description: "Kegiatan buka puasa bersama seluruh jamaah dan warga sekitar.",
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

export function EventsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/10">
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">
              Kegiatan Terdekat
            </h2>
            <p className="section-subtitle">
              Ikuti berbagai kegiatan menarik yang kami selenggarakan
            </p>
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent/80 group hover:bg-accent/10">
            <Link to="/kegiatan">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderEvents.map((event, index) => (
            <Link
              key={event.id}
              to={`/kegiatan/${event.slug}`}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="content-card h-full overflow-hidden group">
                {/* Poster Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-white/60" />
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
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-card-foreground/70 mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-card-foreground/60">
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
      </div>
    </section>
  );
}
