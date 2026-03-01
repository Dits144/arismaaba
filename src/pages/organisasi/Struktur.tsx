import { useState, useEffect } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import type { Tables } from "@/integrations/supabase/types";

type Member = Tables<"members">;
type Division = Tables<"divisions">;

function MemberCard({ name, position, photo_url }: { name: string; position: string; photo_url?: string | null }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl border border-border/50 card-hover">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 overflow-hidden">
        {photo_url ? (
          <img src={photo_url} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-accent font-bold text-lg">{initials}</span>
        )}
      </div>
      <h4 className="font-semibold text-foreground text-center">{name}</h4>
      <p className="text-sm text-muted-foreground text-center">{position}</p>
    </div>
  );
}

const StrukturPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [membersRes, divisionsRes] = await Promise.all([
        supabase.from("members").select("*").eq("active", true).order("order_index"),
        supabase.from("divisions").select("*").order("name"),
      ]);
      setMembers(membersRes.data || []);
      setDivisions(divisionsRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const pembina = members.filter(m => !m.division_id && m.position === "Pembina");
  const pengurusInti = members.filter(m => !m.division_id && m.position !== "Pembina");
  const grouped = divisions.map(div => ({
    ...div,
    members: members.filter(m => m.division_id === div.id).sort((a, b) => a.order_index - b.order_index),
  })).filter(g => g.members.length > 0);

  if (loading) {
    return (
      <PublicLayout>
        <section className="py-16 md:py-24"><div className="container px-4"><Skeleton className="h-12 w-64 mx-auto mb-8" /><div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div></div></section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Struktur Organisasi</h1>
            <p className="text-lg text-muted-foreground">Susunan kepengurusan ARISMA periode 2024/2025</p>
          </div>
        </div>
      </section>

      {pembina.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container px-4">
            <ScrollReveal><h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Dewan Pembina</h2></ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
              {pembina.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 0.1}><MemberCard name={m.name} position={m.position} photo_url={m.photo_url} /></ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {pengurusInti.length > 0 && (
        <section className="py-12 md:py-16 bg-card">
          <div className="container px-4">
            <ScrollReveal><h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Pengurus Inti</h2></ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
              {pengurusInti.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 0.1}><MemberCard name={m.name} position={m.position} photo_url={m.photo_url} /></ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {grouped.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container px-4">
            <ScrollReveal><h2 className="text-2xl font-display font-bold text-foreground text-center mb-12">Divisi-Divisi</h2></ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {grouped.map((div, i) => (
                <ScrollReveal key={div.id} delay={i * 0.15}>
                  <div className="p-6 bg-card rounded-xl border border-border/50">
                    <h3 className="text-xl font-display font-bold text-accent mb-6 text-center">Divisi {div.name}</h3>
                    <div className="space-y-4">
                      {div.members.filter(m => m.position === "Kepala Divisi").map(m => (
                        <div key={m.id} className="flex flex-col items-center">
                          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-2 overflow-hidden">
                            {m.photo_url ? <img src={m.photo_url} className="w-full h-full object-cover" /> : <span className="text-accent font-bold">{m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>}
                          </div>
                          <h4 className="font-semibold text-foreground">{m.name}</h4>
                          <p className="text-sm text-muted-foreground">Kepala Divisi</p>
                        </div>
                      ))}
                      <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-border/50">
                        {div.members.filter(m => m.position !== "Kepala Divisi").map(m => (
                          <div key={m.id} className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-1 overflow-hidden">
                              {m.photo_url ? <img src={m.photo_url} className="w-full h-full object-cover" /> : <span className="text-muted-foreground text-xs font-bold">{m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>}
                            </div>
                            <span className="text-sm text-foreground">{m.name}</span>
                            <span className="text-xs text-muted-foreground">Anggota</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {members.length === 0 && (
        <section className="py-20"><div className="container px-4 text-center text-muted-foreground"><p>Belum ada data struktur organisasi.</p></div></section>
      )}
    </PublicLayout>
  );
};

export default StrukturPage;
