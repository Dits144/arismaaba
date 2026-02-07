import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Heart, Star, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const features = [
  {
    icon: BookOpen,
    title: "Pendidikan",
    description: "Kajian rutin dan pembelajaran Al-Quran",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Users,
    title: "Ukhuwah",
    description: "Membangun persaudaraan sesama remaja muslim",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    icon: Heart,
    title: "Sosial",
    description: "Kegiatan bakti sosial untuk masyarakat",
    color: "from-rose-500/20 to-rose-600/10",
  },
  {
    icon: Star,
    title: "Kreativitas",
    description: "Mengembangkan bakat dan potensi remaja",
    color: "from-amber-500/20 to-amber-600/10",
  },
];

export function AboutTeaser() {
  const { resolvedTheme } = useTheme();
  const currentLogo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="relative mb-6">
              <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
                <Target className="h-4 w-4" />
                Kenali Kami
              </div>
              <h2 className="section-title">
                Tentang ARISMA
              </h2>
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
            </div>
            
            <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
              ARISMA (Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash) adalah wadah
              pembinaan remaja muslim yang bertujuan untuk membentuk generasi muda
              yang <span className="text-accent font-medium">berakhlak mulia</span>, 
              <span className="text-accent font-medium"> berilmu</span>, dan 
              <span className="text-accent font-medium"> bermanfaat</span> bagi umat.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Melalui berbagai kegiatan keislaman, sosial, dan pengembangan diri,
              kami berkomitmen untuk menjadi rumah kedua bagi remaja muslim di
              lingkungan Masjid 'Amru Bin 'Ash.
            </p>

            {/* Features Grid with enhanced styling */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="relative group flex items-start gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="relative">
                    <h4 className="font-semibold text-card-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-card-foreground/70 mt-0.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="btn-primary rounded-full px-8 group shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
              <Link to="/tentang-kami">
                Selengkapnya
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Image with decorative frame */}
          <div className="order-1 lg:order-2 flex justify-center relative">
            {/* Decorative circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-2 border-dashed border-accent/20 animate-spin-slow" style={{ animationDuration: '30s' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full border-2 border-dashed border-primary/10 animate-spin-slow" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-accent/20 blur-3xl" />
            </div>
            
            <img
              src={currentLogo}
              alt="ARISMA"
              className="relative w-52 md:w-72 lg:w-80 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
      
      {/* Inline keyframes for spin animation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </section>
  );
}
