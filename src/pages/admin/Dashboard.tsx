import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Image, Users } from "lucide-react";

interface Stats {
  events: number;
  articles: number;
  gallery: number;
  members: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    events: 0,
    articles: 0,
    gallery: 0,
    members: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsRes, articlesRes, galleryRes, membersRes] = await Promise.all([
          supabase.from("events").select("id", { count: "exact", head: true }),
          supabase.from("articles").select("id", { count: "exact", head: true }),
          supabase.from("gallery_items").select("id", { count: "exact", head: true }),
          supabase.from("members").select("id", { count: "exact", head: true }).eq("active", true),
        ]);

        setStats({
          events: eventsRes.count || 0,
          articles: articlesRes.count || 0,
          gallery: galleryRes.count || 0,
          members: membersRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Kegiatan", value: stats.events, icon: Calendar, color: "text-blue-500" },
    { title: "Artikel", value: stats.articles, icon: FileText, color: "text-green-500" },
    { title: "Foto Galeri", value: stats.gallery, icon: Image, color: "text-purple-500" },
    { title: "Anggota Aktif", value: stats.members, icon: Users, color: "text-orange-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang di panel admin ARISMA</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Panduan Cepat</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert prose-sm max-w-none">
            <ul className="space-y-2 text-muted-foreground">
              <li>Gunakan menu <strong>Kegiatan</strong> untuk mengelola event dan acara ARISMA</li>
              <li>Kelola artikel dan berita melalui menu <strong>Artikel</strong></li>
              <li>Upload foto dokumentasi di menu <strong>Galeri</strong></li>
              <li>Atur struktur organisasi di menu <strong>Struktur</strong></li>
              <li>Konfigurasi pengaturan umum di menu <strong>Pengaturan</strong></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
