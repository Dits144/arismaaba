import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Bergabung Bersama Kami
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Jadilah bagian dari ARISMA dan berkontribusi dalam membentuk generasi
            remaja muslim yang berkualitas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 w-full sm:w-auto font-semibold"
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
              className="border-white text-white hover:bg-white/10 rounded-full px-8 w-full sm:w-auto"
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
