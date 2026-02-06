import { PublicLayout } from "@/components/layout/PublicLayout";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock, Users, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoArisma from "@/assets/logo-arisma.png";

const programs = [
  {
    icon: BookOpen,
    title: "Kajian Rutin",
    description: "Kajian mingguan membahas fiqih dan akhlak bagi remaja",
  },
  {
    icon: Users,
    title: "Kegiatan Tahunan",
    description: "Muharram Cup, Buka Bersama, Pesantren Kilat",
  },
  {
    icon: Heart,
    title: "Bakti Sosial",
    description: "Pembagian sembako dan santunan kepada masyarakat",
  },
  {
    icon: Clock,
    title: "Pelatihan",
    description: "Workshop keterampilan dan pengembangan diri",
  },
];

const TentangKamiPage = () => {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Tentang Kami
            </h1>
            <p className="text-lg text-muted-foreground">
              Mengenal lebih dekat ARISMA dan kegiatan kami
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl" />
                <img
                  src={logoArisma}
                  alt="ARISMA"
                  className="relative w-48 md:w-64 lg:w-72 h-auto"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                ARISMA - Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ARISMA adalah wadah pembinaan remaja muslim yang bernaung di bawah
                Dewan Kemakmuran Masjid (DKM) 'Amru Bin 'Ash. Didirikan dengan tujuan
                untuk membentuk generasi muda yang berakhlak mulia, berilmu, dan
                bermanfaat bagi umat.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Melalui berbagai kegiatan keislaman, sosial, dan pengembangan diri,
                kami berkomitmen untuk menjadi rumah kedua bagi remaja muslim di
                lingkungan sekitar masjid. Kami percaya bahwa remaja adalah harapan
                umat dan masa depan agama.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Bergabunglah bersama kami dalam perjalanan menuntut ilmu, membangun
                ukhuwah, dan berkontribusi untuk masyarakat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-12">
              Program Kami
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program, index) => (
                <div
                  key={program.title}
                  className="p-6 bg-background rounded-xl border border-border/50 text-center card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <program.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {program.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-12">
              Lokasi & Kontak
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Map Placeholder */}
              <div className="bg-card rounded-xl border border-border/50 p-6 flex flex-col">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Lokasi Masjid
                </h3>
                <div className="flex-1 bg-secondary/50 rounded-lg flex items-center justify-center min-h-[200px]">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-accent/50" />
                    <p className="text-sm">Masjid 'Amru Bin 'Ash</p>
                    <p className="text-xs mt-1">Jl. Contoh Alamat No. 123, Jakarta</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-display font-semibold text-foreground mb-6">
                  Hubungi Kami
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Alamat</h4>
                      <p className="text-sm text-muted-foreground">
                        Masjid 'Amru Bin 'Ash
                        <br />
                        Jl. Contoh Alamat No. 123, Jakarta
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Telepon</h4>
                      <a
                        href="tel:+6281234567890"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        +62 812-3456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Email</h4>
                      <a
                        href="mailto:arismaaba19@gmail.com"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        arismaaba19@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Instagram className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Instagram</h4>
                      <a
                        href="https://instagram.com/arisma_aba"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        @arisma_aba
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TentangKamiPage;
