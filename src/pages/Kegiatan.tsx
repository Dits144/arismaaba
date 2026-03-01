import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Calendar, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import defaultEventImg from "@/assets/default-event.jpg";
import heroKegiatan from "@/assets/hero-kegiatan.jpg";
import type { Tables } from "@/integrations/supabase/types";

type Event = Tables<"events">;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function isUpcoming(dateString: string) {
  return new Date(dateString) > new Date();
}

const KegiatanPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("events").select("*").order("start_date", { ascending: false });
      setEvents(data || []);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = tab === "upcoming" ? isUpcoming(event.start_date) : !isUpcoming(event.start_date);
    return matchesSearch && matchesTab;
  });

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroKegiatan} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Kegiatan</h1>
            <p className="text-lg text-white/80">Daftar kegiatan yang diselenggarakan oleh ARISMA</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari kegiatan..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border" />
            </div>
          </div>

          <Tabs value={tab} onValueChange={setTab} className="mb-8">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Akan Datang</TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Sudah Lewat</TabsTrigger>
            </TabsList>
          </Tabs>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.1}>
                  <Link to={`/kegiatan/${event.slug}`}>
                    <Card className="card-hover h-full bg-card border-border/50 overflow-hidden group">
                      <div className="aspect-video overflow-hidden">
                        <img src={event.poster_url || defaultEventImg} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <CardContent className="p-5">
                        <Badge className={isUpcoming(event.start_date) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}>
                          {isUpcoming(event.start_date) ? "Akan Datang" : "Selesai"}
                        </Badge>
                        <h3 className="font-display text-lg font-semibold text-card-foreground mt-3 mb-2 group-hover:text-accent transition-colors line-clamp-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /><span>{formatDate(event.start_date)}</span></div>
                          {event.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /><span className="line-clamp-1">{event.location}</span></div>}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-muted-foreground">Tidak ada kegiatan ditemukan.</p></div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default KegiatanPage;
