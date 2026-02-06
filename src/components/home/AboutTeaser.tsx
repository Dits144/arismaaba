import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const features = [
  {
    icon: BookOpen,
    title: "Pendidikan",
    description: "Kajian rutin dan pembelajaran Al-Quran",
  },
  {
    icon: Users,
    title: "Ukhuwah",
    description: "Membangun persaudaraan sesama remaja muslim",
  },
  {
    icon: Heart,
    title: "Sosial",
    description: "Kegiatan bakti sosial untuk masyarakat",
  },
  {
    icon: Star,
    title: "Kreativitas",
    description: "Mengembangkan bakat dan potensi remaja",
  },
];

export function AboutTeaser() {
  const { resolvedTheme } = useTheme();
  const currentLogo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="section-title mb-4">
              Tentang ARISMA
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ARISMA (Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash) adalah wadah
              pembinaan remaja muslim yang bertujuan untuk membentuk generasi muda
              yang berakhlak mulia, berilmu, dan bermanfaat bagi umat.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Melalui berbagai kegiatan keislaman, sosial, dan pengembangan diri,
              kami berkomitmen untuk menjadi rumah kedua bagi remaja muslim di
              lingkungan Masjid 'Amru Bin 'Ash.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl content-card"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-card-foreground/70 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="btn-primary rounded-full px-8 group">
              <Link to="/tentang-kami">
                Selengkapnya
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src={currentLogo}
              alt="ARISMA"
              className="w-64 md:w-80 lg:w-96 h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
