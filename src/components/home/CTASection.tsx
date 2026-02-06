import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Neon background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-4">
            Bergabung <span className="text-gradient-neon">Bersama Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Jadilah bagian dari ARISMA dan berkontribusi dalam membentuk generasi
            remaja muslim yang berkualitas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="btn-neon rounded-full px-8 w-full sm:w-auto"
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent rounded-full px-8 w-full sm:w-auto transition-all duration-300 hover:shadow-[0_0_20px_hsla(160,100%,50%,0.3)]"
            >
              <a href="mailto:arismaaba19@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Kirim Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
