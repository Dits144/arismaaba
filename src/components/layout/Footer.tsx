import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import logoArisma from "@/assets/logo-arisma.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoArisma} alt="ARISMA" className="h-12 w-auto" />
              <div>
                <span className="block text-xl font-display font-bold text-accent">
                  ARISMA
                </span>
                <span className="block text-xs text-muted-foreground">
                  Aktivitas Remaja Islam
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wadah pembinaan remaja muslim di Masjid 'Amru Bin 'Ash untuk
              mewujudkan generasi yang berakhlak mulia dan bermanfaat bagi umat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Menu
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Beranda", href: "/" },
                { label: "Visi & Misi", href: "/organisasi/visi-misi" },
                { label: "Kegiatan", href: "/kegiatan" },
                { label: "Artikel", href: "/artikel" },
                { label: "Galeri", href: "/galeri" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>
                  Masjid 'Amru Bin 'Ash
                  <br />
                  Jl. Contoh Alamat No. 123, Jakarta
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:+6281234567890" className="hover:text-accent transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a
                  href="mailto:arismaaba19@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  arismaaba19@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Ikuti Kami
            </h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/arisma_aba"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Ikuti media sosial kami untuk informasi kegiatan terbaru.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} ARISMA - Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash.
            <br className="sm:hidden" />
            <span className="sm:ml-1">Hak Cipta Dilindungi.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
