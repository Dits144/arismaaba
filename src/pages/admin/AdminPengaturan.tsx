import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings, Loader2, Save } from "lucide-react";

const settingKeys = [
  { key: "organization_name", label: "Nama Organisasi", placeholder: "ARISMA" },
  { key: "address", label: "Alamat", placeholder: "Jl. Contoh No. 123" },
  { key: "whatsapp", label: "WhatsApp", placeholder: "6281234567890" },
  { key: "instagram", label: "Instagram", placeholder: "@arisma_aba" },
  { key: "tiktok", label: "TikTok", placeholder: "@arisma_aba" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
  { key: "email", label: "Email", placeholder: "arismaaba19@gmail.com" },
];

const AdminPengaturan = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("organization_settings").select("*");
      if (error) toast({ title: "Gagal memuat pengaturan", description: error.message, variant: "destructive" });
      else {
        const map: Record<string, string> = {};
        data?.forEach((s) => { map[s.key] = s.value || ""; });
        setValues(map);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const { key } of settingKeys) {
        const val = values[key] || "";
        const { data: existing } = await supabase.from("organization_settings").select("id").eq("key", key).single();
        if (existing) {
          await supabase.from("organization_settings").update({ value: val }).eq("key", key);
        } else {
          await supabase.from("organization_settings").insert({ key, value: val });
        }
      }
      toast({ title: "Pengaturan disimpan" });
    } catch (err: any) {
      toast({ title: "Gagal menyimpan", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Pengaturan</h1>
          <p className="text-muted-foreground">Konfigurasi informasi organisasi</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-accent" />
              Informasi Organisasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">{[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
            ) : (
              <div className="space-y-4">
                {settingKeys.map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-2">
                    <Label>{label}</Label>
                    <Input
                      value={values[key] || ""}
                      onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
                <Button onClick={handleSave} disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Simpan Pengaturan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPengaturan;
