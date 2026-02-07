import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
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
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container relative z-10 px-4">
        {/* Header with decorative line */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div className="relative">
            <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
              <Sparkles className="h-4 w-4" />
              Agenda Terbaru
            </div>
            <h2 className="section-title">
              Kegiatan Terdekat
            </h2>
            <p className="section-subtitle mt-2">
              Ikuti berbagai kegiatan menarik yang kami selenggarakan
            </p>
            {/* Decorative underline */}
            <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 group">
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
              className="animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Poster with gradient overlay */}
                <div className="relative aspect-video bg-gradient-to-br from-primary via-primary/80 to-accent/60 flex items-center justify-center overflow-hidden">
                  {/* Animated pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
                  </div>
                  <Calendar className="h-16 w-16 text-white/50 group-hover:scale-110 transition-transform duration-300" />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
                <CardContent className="p-6">
                  <Badge
                    className={`mb-3 ${
                      isUpcoming(event.start_date)
                        ? "bg-accent/15 text-accent border-0 shadow-sm"
                        : "bg-muted text-muted-foreground border-0"
                    }`}
                  >
                    {isUpcoming(event.start_date) ? "🔥 Akan Datang" : "✓ Selesai"}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-card-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-card-foreground/60">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-accent" />
                      </div>
                      <span>{formatDate(event.start_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
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
