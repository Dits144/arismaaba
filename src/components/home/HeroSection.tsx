import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoArismaWide from "@/assets/logo-arisma-wide.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-glow">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <img
              src={logoArismaWide}
              alt="ARISMA - Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash"
              className="h-24 md:h-32 lg:h-40 w-auto"
            />
          </div>

          {/* Tagline */}
          <p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Wadah pembinaan remaja muslim yang berakhlak mulia, berilmu, dan
            bermanfaat bagi umat di Masjid 'Amru Bin 'Ash
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold group"
            >
              <Link to="/kegiatan">
                <Calendar className="mr-2 h-5 w-5" />
                Lihat Kegiatan
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent"
            >
              <Link to="/galeri">
                <Image className="mr-2 h-5 w-5" />
                Lihat Galeri
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 pt-12 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { value: "50+", label: "Anggota Aktif" },
              { value: "20+", label: "Kegiatan/Tahun" },
              { value: "5+", label: "Program Rutin" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
    </section>
  );
}
