import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Image, Sparkles, Users, CalendarDays, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { MosqueSilhouette } from "@/components/decorative/MosqueSilhouette";
import { FloatingParticles } from "@/components/decorative/FloatingParticles";
import { GeometricPattern } from "@/components/decorative/GeometricPattern";
import { MosqueBackgroundPattern, FloatingMosques } from "@/components/decorative/MosqueBackground";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const currentLogo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/50" />
      
      {/* Mosque background pattern */}
      <MosqueBackgroundPattern className="text-foreground" />
      <FloatingMosques />
      
      {/* Geometric pattern overlay */}
      <GeometricPattern className="absolute inset-0 text-accent opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      
      {/* Floating particles */}
      <FloatingParticles count={25} />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Decorative badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium animate-fade-in"
          >
            <Sparkles className="h-4 w-4" />
            Selamat Datang di Website Resmi
          </div>

          {/* Logo with glow effect */}
          <div className="flex justify-center mb-8 animate-fade-in relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-accent/20 blur-3xl" />
            </div>
            <img
              src={currentLogo}
              alt="ARISMA - Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash"
              className="h-44 md:h-56 lg:h-72 w-auto drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Tagline with gradient text */}
          <p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Wadah pembinaan remaja muslim yang{" "}
            <span className="text-accent font-semibold">berakhlak mulia</span>,{" "}
            <span className="text-accent font-semibold">berilmu</span>, dan{" "}
            <span className="text-accent font-semibold">bermanfaat</span> bagi umat 
            di Masjid 'Amru Bin 'Ash
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              asChild
              size="lg"
              className="btn-primary rounded-full px-8 group shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
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
              className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground rounded-full px-8 transition-all duration-300 backdrop-blur-sm"
            >
              <Link to="/galeri">
                <Image className="mr-2 h-5 w-5" />
                Lihat Galeri
              </Link>
            </Button>
          </div>

          {/* Stats with glassmorphism */}
          <div
            className="grid grid-cols-3 gap-4 md:gap-6 pt-16 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { value: "50+", label: "Anggota Aktif", Icon: Users },
              { value: "20+", label: "Kegiatan/Tahun", Icon: CalendarDays },
              { value: "5+", label: "Program Rutin", Icon: Star },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="relative group text-center p-4 md:p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-center mb-2">
                  <stat.Icon className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-accent relative">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-card-foreground/70 mt-1 relative">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mosque silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 text-muted/30 dark:text-foreground/10">
        <MosqueSilhouette className="w-full h-full" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-accent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
