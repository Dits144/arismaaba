import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Calendar, MapPin, ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import defaultEventImg from "@/assets/default-event.jpg";
import type { Tables } from "@/integrations/supabase/types";

type Event = Tables<"events">;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function isUpcoming(dateString: string) {
  return new Date(dateString) > new Date();
}

const KegiatanDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!slug) return;
      const { data } = await supabase.from("events").select("*").eq("slug", slug).single();
      setEvent(data);
      setLoading(false);
    };
    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="py-12 md:py-16 container px-4 max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="aspect-video rounded-xl mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </PublicLayout>
    );
  }

  if (!event) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">Kegiatan Tidak Ditemukan</h1>
            <Button asChild><Link to="/kegiatan">Kembali ke Daftar Kegiatan</Link></Button>
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
            <Link to="/kegiatan" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Kegiatan
            </Link>

            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img src={event.poster_url || defaultEventImg} alt={event.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              <Badge className={isUpcoming(event.start_date) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}>
                {isUpcoming(event.start_date) ? "Akan Datang" : "Selesai"}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{event.title}</h1>

              <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>{formatDate(event.start_date)}{event.end_date && ` - ${formatDate(event.end_date)}`}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="prose prose-lg max-w-none">
                  {event.description.split("\n").map((p, i) => p ? <p key={i} className="text-foreground/90">{p}</p> : null)}
                </div>
              )}

              {isUpcoming(event.start_date) && (
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                  {event.registration_url && (
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" /> Daftar Sekarang
                      </a>
                    </Button>
                  )}
                  <Button asChild size="lg" variant="outline" className="border-accent/50 hover:bg-accent/10">
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" /> Hubungi Panitia
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
