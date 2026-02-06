import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const currentLogo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mosque-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <img
              src={currentLogo}
              alt="ARISMA - Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash"
              className="h-32 md:h-40 lg:h-52 w-auto drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            ARISMA
          </h1>

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
              className="btn-primary rounded-full px-8 group"
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
              className="border-accent text-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-8 transition-all duration-300"
            >
              <Link to="/galeri">
                <Image className="mr-2 h-5 w-5" />
                Lihat Galeri
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 md:gap-8 pt-12 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { value: "50+", label: "Anggota Aktif" },
              { value: "20+", label: "Kegiatan/Tahun" },
              { value: "5+", label: "Program Rutin" },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="text-center p-4 md:p-6 rounded-2xl content-card"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-card-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
