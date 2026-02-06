import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Calendar, MapPin, ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Placeholder event data
const eventsData: Record<string, {
  title: string;
  start_date: string;
  end_date?: string;
  location: string;
  description: string;
  poster_url: string | null;
  registration_url?: string;
}> = {
  "muharram-cup-2025": {
    title: "Muharram Cup 2025",
    start_date: "2025-07-15",
    end_date: "2025-07-20",
    location: "Lapangan Masjid 'Amru Bin 'Ash",
    description: `Turnamen futsal antar remaja masjid dalam rangka menyambut tahun baru hijriyah 1447 H.

Kegiatan ini bertujuan untuk:
- Mempererat ukhuwah islamiyah antar remaja masjid
- Mengembangkan bakat olahraga remaja muslim
- Menyemarakkan peringatan tahun baru hijriyah

**Pendaftaran:**
- Biaya: Rp 150.000/tim
- Kuota: 16 tim
- Deadline: 10 Juli 2025

**Hadiah:**
- Juara 1: Rp 2.000.000 + Trophy
- Juara 2: Rp 1.000.000 + Trophy
- Juara 3: Rp 500.000 + Trophy`,
    poster_url: null,
    registration_url: "https://wa.me/6281234567890",
  },
  "kajian-remaja-mingguan": {
    title: "Kajian Remaja Mingguan",
    start_date: "2026-02-10",
    location: "Aula Masjid 'Amru Bin 'Ash",
    description: `Kajian rutin setiap minggu membahas fiqih remaja dan akhlak mulia.

**Waktu:** Setiap Ahad, Ba'da Isya
**Tema Bulan Ini:** Adab Pergaulan dalam Islam

Kajian dipandu oleh Ustadz Ahmad Fauzi dengan metode diskusi interaktif.`,
    poster_url: null,
  },
};

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

const KegiatanDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? eventsData[slug] : null;

  if (!event) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              Kegiatan Tidak Ditemukan
            </h1>
            <Button asChild>
              <Link to="/kegiatan">Kembali ke Daftar Kegiatan</Link>
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <article className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              to="/kegiatan"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Kegiatan
            </Link>

            {/* Poster */}
            <div className="aspect-video bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl flex items-center justify-center mb-8">
              <Calendar className="h-20 w-20 text-accent/30" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`${
                    isUpcoming(event.start_date)
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isUpcoming(event.start_date) ? "Akan Datang" : "Selesai"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {event.title}
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>
                    {formatDate(event.start_date)}
                    {event.end_date && ` - ${formatDate(event.end_date)}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                {event.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-foreground/90 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CTA */}
              {isUpcoming(event.start_date) && (
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                  {event.registration_url && (
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Daftar Sekarang
                      </a>
                    </Button>
                  )}
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-accent/50 hover:bg-accent/10"
                  >
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Hubungi Panitia
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default KegiatanDetailPage;
