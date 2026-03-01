import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MosqueBackgroundPattern } from "@/components/decorative/MosqueBackground";
import { ScrollReveal } from "@/hooks/useScrollReveal";
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

export function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("events").select("*").order("start_date", { ascending: false }).limit(3);
      setEvents(data || []);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
      <MosqueBackgroundPattern className="text-primary" />
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <ScrollReveal>
            <div className="relative">
              <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2"><Sparkles className="h-4 w-4" />Agenda Terbaru</div>
              <h2 className="section-title">Kegiatan Terdekat</h2>
              <p className="section-subtitle mt-2">Ikuti berbagai kegiatan menarik yang kami selenggarakan</p>
              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
            </div>
          </ScrollReveal>
          <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 group">
            <Link to="/kegiatan">Lihat Semua<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <ScrollReveal key={event.id} delay={index * 0.1}>
                <Link to={`/kegiatan/${event.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={event.poster_url || defaultEventImg} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <Badge className={isUpcoming(event.start_date) ? "bg-accent/15 text-accent border-0 shadow-sm" : "bg-muted text-muted-foreground border-0"}>
                        {isUpcoming(event.start_date) ? "Akan Datang" : "Selesai"}
                      </Badge>
                      <h3 className="font-display text-xl font-semibold text-card-foreground mt-3 mb-2 group-hover:text-accent transition-colors line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-card-foreground/70 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                      <div className="flex flex-col gap-2 text-sm text-card-foreground/60">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /><span>{formatDate(event.start_date)}</span></div>
                        {event.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /><span className="line-clamp-1">{event.location}</span></div>}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
