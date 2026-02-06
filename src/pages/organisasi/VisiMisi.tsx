import { PublicLayout } from "@/components/layout/PublicLayout";
import { Target, Lightbulb, Heart, Users, BookOpen, Award } from "lucide-react";

const visi = "Mewujudkan remaja muslim yang berakhlak mulia, berilmu, dan bermanfaat bagi umat.";

const misi = [
  "Menyelenggarakan kegiatan keislaman untuk remaja",
  "Membangun ukhuwah islamiyah antar remaja masjid",
  "Mengembangkan potensi dan kreativitas remaja",
  "Berkontribusi dalam kegiatan sosial kemasyarakatan",
];

const nilai = [
  { icon: BookOpen, title: "Ilmu", description: "Menuntut ilmu adalah kewajiban setiap muslim" },
  { icon: Heart, title: "Akhlak", description: "Menjunjung tinggi akhlakul karimah" },
  { icon: Users, title: "Ukhuwah", description: "Mempererat persaudaraan sesama muslim" },
  { icon: Award, title: "Amanah", description: "Bertanggung jawab dalam setiap tugas" },
];

const VisiMisiPage = () => {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Visi & Misi
            </h1>
            <p className="text-lg text-muted-foreground">
              Landasan dan arah tujuan organisasi ARISMA
            </p>
          </div>
        </div>
      </section>

      {/* Visi */}
      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-card border border-border/50 rounded-2xl p-8 md:p-12 text-center">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <Target className="h-6 w-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-accent mb-4 mt-4">
                Visi
              </h2>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-display">
                "{visi}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misi */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Lightbulb className="h-8 w-8 text-accent" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Misi
              </h2>
            </div>
            <div className="grid gap-4">
              {misi.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border/50 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground text-lg leading-relaxed pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nilai */}
      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-12">
              Nilai-Nilai Kami
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {nilai.map((item, index) => (
                <div
                  key={item.title}
                  className="p-6 bg-card rounded-xl border border-border/50 text-center card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default VisiMisiPage;
