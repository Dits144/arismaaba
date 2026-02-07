import { MessageCircle, Mail, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MosqueSilhouette } from "@/components/decorative/MosqueSilhouette";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      
      {/* Mosque silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 text-white/10">
        <MosqueSilhouette className="w-full h-full" />
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
            Bergabung Bersama Kami
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Jadilah bagian dari ARISMA dan berkontribusi dalam membentuk generasi
            remaja muslim yang berkualitas.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 w-full sm:w-auto font-semibold shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 group"
            >
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Hubungi via WhatsApp
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 w-full sm:w-auto backdrop-blur-sm transition-all duration-300"
            >
              <a href="mailto:arismaaba19@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Kirim Email
              </a>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm mb-4">Dipercaya oleh</p>
            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs text-white/60">Anggota</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-xs text-white/60">Tahun</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-xs text-white/60">Kegiatan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
