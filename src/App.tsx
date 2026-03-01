import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VisiMisi from "./pages/organisasi/VisiMisi";
import Struktur from "./pages/organisasi/Struktur";
import Kegiatan from "./pages/Kegiatan";
import KegiatanDetail from "./pages/KegiatanDetail";
import Artikel from "./pages/Artikel";
import ArtikelDetail from "./pages/ArtikelDetail";
import Galeri from "./pages/Galeri";
import TentangKami from "./pages/TentangKami";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminKegiatan from "./pages/admin/AdminKegiatan";
import AdminArtikel from "./pages/admin/AdminArtikel";
import AdminGaleri from "./pages/admin/AdminGaleri";
import AdminStruktur from "./pages/admin/AdminStruktur";
import AdminPengaturan from "./pages/admin/AdminPengaturan";
import AdminNotFound from "./pages/admin/AdminNotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/organisasi/visi-misi" element={<VisiMisi />} />
            <Route path="/organisasi/struktur" element={<Struktur />} />
            <Route path="/kegiatan" element={<Kegiatan />} />
            <Route path="/kegiatan/:slug" element={<KegiatanDetail />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/:slug" element={<ArtikelDetail />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/kegiatan" element={<AdminKegiatan />} />
            <Route path="/admin/artikel" element={<AdminArtikel />} />
            <Route path="/admin/galeri" element={<AdminGaleri />} />
            <Route path="/admin/struktur" element={<AdminStruktur />} />
            <Route path="/admin/pengaturan" element={<AdminPengaturan />} />
            <Route path="/admin/*" element={<AdminNotFound />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
