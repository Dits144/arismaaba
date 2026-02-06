import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const navItems = [
  { label: "Beranda", href: "/" },
  {
    label: "Organisasi",
    children: [
      { label: "Visi & Misi", href: "/organisasi/visi-misi" },
      { label: "Struktur Organisasi", href: "/organisasi/struktur" },
    ],
  },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Artikel", href: "/artikel" },
  { label: "Galeri", href: "/galeri" },
  { label: "Tentang Kami", href: "/tentang-kami" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { resolvedTheme } = useTheme();

  const isActive = (href: string) => location.pathname === href;
  const currentLogo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={currentLogo} 
              alt="ARISMA" 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-display font-bold text-foreground">
                ARISMA
              </span>
              <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">
                Aktivitas Remaja Islam Masjid 'Amru Bin 'Ash
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="nav-link flex items-center gap-1 px-4 py-2 text-sm font-medium">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-card/95 backdrop-blur-md border-border">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link
                          to={child.href}
                          className={`w-full ${isActive(child.href) ? "text-accent font-medium" : ""}`}
                        >
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  to={item.href!}
                  className={`nav-link px-4 py-2 text-sm font-medium ${
                    isActive(item.href!) ? "text-accent font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              className="btn-primary rounded-full px-6"
            >
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                Gabung ARISMA
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-accent transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="space-y-1">
                    <span className="block px-4 py-2 text-sm font-medium text-muted-foreground">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-8 py-2 text-sm ${
                          isActive(child.href)
                            ? "text-accent font-medium"
                            : "text-foreground/80 hover:text-accent"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href!}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium ${
                      isActive(item.href!)
                        ? "text-accent"
                        : "text-foreground/80 hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="px-4 pt-4">
                <Button
                  asChild
                  className="w-full btn-primary rounded-full"
                >
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    Gabung ARISMA
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
