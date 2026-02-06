import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-card to-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-4">Bergabung Bersama Kami</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Jadilah bagian dari ARISMA dan berkontribusi dalam membentuk generasi
            remaja muslim yang berkualitas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold w-full sm:w-auto"
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
              className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent w-full sm:w-auto"
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
