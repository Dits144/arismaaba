import { PublicLayout } from "@/components/layout/PublicLayout";
import { User } from "lucide-react";

// Placeholder structure - will be fetched from database
const struktur = {
  pembina: [
    { name: "Ustadz Ahmad Fauzi", position: "Pembina" },
    { name: "Ustadz Muhammad Rizki", position: "Pembina" },
  ],
  pengurus: {
    ketua: { name: "Muhammad Farhan", position: "Ketua Umum" },
    wakil: { name: "Ahmad Zaki", position: "Wakil Ketua" },
    sekretaris: { name: "Aisyah Putri", position: "Sekretaris" },
    bendahara: { name: "Fatimah Zahra", position: "Bendahara" },
  },
  divisi: [
    {
      name: "Pendidikan",
      kepala: "Umar Abdullah",
      anggota: ["Bilal Ibrahim", "Yusuf Hakim"],
    },
    {
      name: "Humas",
      kepala: "Sarah Amelia",
      anggota: ["Khadijah Nur", "Maryam Salsabila"],
    },
    {
      name: "PDD",
      kepala: "Rafif Hakim",
      anggota: ["Ali Imran", "Hamza Firdaus"],
    },
    {
      name: "Logistik",
      kepala: "Hasan Basri",
      anggota: ["Khalid Walid", "Zaid Anwar"],
    },
  ],
};

function MemberCard({ name, position }: { name: string; position: string }) {
  return (
    <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl border border-border/50 card-hover">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
        <User className="h-8 w-8 text-accent" />
      </div>
      <h4 className="font-semibold text-foreground text-center">{name}</h4>
      <p className="text-sm text-muted-foreground text-center">{position}</p>
    </div>
  );
}

const StrukturPage = () => {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Struktur Organisasi
            </h1>
            <p className="text-lg text-muted-foreground">
              Susunan kepengurusan ARISMA periode 2024/2025
            </p>
          </div>
        </div>
      </section>

      {/* Pembina */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            Dewan Pembina
          </h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {struktur.pembina.map((pembina) => (
              <MemberCard key={pembina.name} name={pembina.name} position={pembina.position} />
            ))}
          </div>
        </div>
      </section>

      {/* Pengurus Inti */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container px-4">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            Pengurus Inti
          </h2>
          
          {/* Ketua & Wakil */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 max-w-xl mx-auto">
            <MemberCard
              name={struktur.pengurus.ketua.name}
              position={struktur.pengurus.ketua.position}
            />
            <MemberCard
              name={struktur.pengurus.wakil.name}
              position={struktur.pengurus.wakil.position}
            />
          </div>

          {/* Sekretaris & Bendahara */}
          <div className="flex flex-wrap justify-center gap-6 max-w-xl mx-auto">
            <MemberCard
              name={struktur.pengurus.sekretaris.name}
              position={struktur.pengurus.sekretaris.position}
            />
            <MemberCard
              name={struktur.pengurus.bendahara.name}
              position={struktur.pengurus.bendahara.position}
            />
          </div>
        </div>
      </section>

      {/* Divisi */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-12">
            Divisi-Divisi
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {struktur.divisi.map((divisi) => (
              <div
                key={divisi.name}
                className="p-6 bg-card rounded-xl border border-border/50"
              >
                <h3 className="text-xl font-display font-bold text-accent mb-6 text-center">
                  Divisi {divisi.name}
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                      <User className="h-7 w-7 text-accent" />
                    </div>
                    <h4 className="font-semibold text-foreground">{divisi.kepala}</h4>
                    <p className="text-sm text-muted-foreground">Kepala Divisi</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-border/50">
                    {divisi.anggota.map((anggota) => (
                      <div key={anggota} className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-1">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="text-sm text-foreground">{anggota}</span>
                        <span className="text-xs text-muted-foreground">Anggota</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default StrukturPage;
