import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Clock, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Placeholder article data
const articlesData: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  published_at: string;
  thumbnail_url: string | null;
}> = {
  "menyambut-ramadhan": {
    title: "Menyambut Bulan Ramadhan dengan Persiapan Terbaik",
    excerpt: "Tips dan panduan untuk mempersiapkan diri menjelang bulan suci Ramadhan.",
    content: `Bulan Ramadhan adalah bulan yang penuh berkah dan ampunan. Sebagai muslim, kita perlu mempersiapkan diri dengan baik agar dapat memaksimalkan ibadah di bulan suci ini.

## 1. Persiapan Spiritual

Mulailah dengan memperbanyak istighfar dan taubat kepada Allah SWT. Bersihkan hati dari dendam dan permusuhan. Perbaiki hubungan dengan sesama muslim.

## 2. Persiapan Fisik

Latih diri dengan puasa sunnah seperti puasa Senin-Kamis atau puasa Daud. Atur pola makan dan istirahat yang baik agar tubuh siap menghadapi puasa.

## 3. Persiapan Ilmu

Pelajari kembali fiqih puasa dan ibadah-ibadah sunnah di bulan Ramadhan. Siapkan target tilawah Al-Quran yang ingin dicapai.

## 4. Persiapan Sosial

Rencanakan kegiatan berbagi dengan sesama. Siapkan sedekah dan zakat fitrah. Perkuat silaturahim dengan keluarga dan tetangga.

Semoga kita semua dapat bertemu dengan Ramadhan dalam keadaan sehat dan iman yang kuat.`,
    category: "Ramadhan",
    published_at: "2026-02-01",
    thumbnail_url: null,
  },
  "keutamaan-memakmurkan-masjid": {
    title: "Keutamaan Memakmurkan Masjid bagi Remaja",
    excerpt: "Pahala dan keutamaan yang didapatkan remaja yang aktif dalam kegiatan masjid.",
    content: `Memakmurkan masjid adalah salah satu amalan yang sangat mulia dalam Islam. Allah SWT berfirman dalam Al-Quran surat At-Taubah ayat 18:

"Hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian..."

## Keutamaan Memakmurkan Masjid

1. **Dinaungi di Hari Kiamat** - Termasuk golongan yang dinaungi Allah di hari tidak ada naungan selain naungan-Nya.

2. **Mendapat Pahala Berlipat** - Shalat berjamaah di masjid mendapat pahala 27 kali lipat.

3. **Terjaga dari Kemaksiatan** - Lingkungan masjid membantu menjaga remaja dari pergaulan negatif.

4. **Mendapat Ilmu Bermanfaat** - Masjid adalah tempat menuntut ilmu agama.

## Peran Remaja di Masjid

- Aktif dalam kegiatan remaja masjid
- Membantu kebersihan dan perawatan masjid
- Mengikuti kajian dan pengajian rutin
- Menjadi panitia kegiatan-kegiatan masjid

Mari bersama-sama memakmurkan masjid sebagai bentuk cinta kita kepada rumah Allah.`,
    category: "Kajian",
    published_at: "2026-01-25",
    thumbnail_url: null,
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const ArtikelDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articlesData[slug] : null;

  if (!article) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <Button asChild>
              <Link to="/artikel">Kembali ke Daftar Artikel</Link>
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <article className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              to="/artikel"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Artikel
            </Link>

            {/* Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/30 rounded-xl flex items-center justify-center mb-8">
              <Tag className="h-20 w-20 text-accent/30" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <Badge variant="outline" className="border-accent/50 text-accent">
                {article.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {article.title}
              </h1>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-accent" />
                <span>{formatDate(article.published_at)}</span>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                {article.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-xl font-display font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="text-foreground/90">
                        {paragraph.replace("- ", "")}
                      </li>
                    );
                  }
                  if (paragraph.match(/^\d+\. \*\*/)) {
                    return (
                      <p key={index} className="text-foreground/90">
                        {paragraph}
                      </p>
                    );
                  }
                  return paragraph ? (
                    <p key={index} className="text-foreground/90">
                      {paragraph}
                    </p>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default ArtikelDetailPage;
