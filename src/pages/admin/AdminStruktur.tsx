import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Pencil, Trash2, Users, Loader2, User } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Member = Tables<"members">;
type Division = Tables<"divisions">;

const emptyForm = {
  name: "", position: "", photo_url: "", division_id: "" as string, parent_id: "" as string,
  order_index: 0, active: true,
};

const AdminStruktur = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const [membersRes, divisionsRes] = await Promise.all([
      supabase.from("members").select("*").order("order_index"),
      supabase.from("divisions").select("*").order("name"),
    ]);
    setMembers(membersRes.data || []);
    setDivisions(divisionsRes.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = members.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditId(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (m: Member) => {
    setEditId(m.id);
    setForm({
      name: m.name, position: m.position, photo_url: m.photo_url || "",
      division_id: m.division_id || "", parent_id: m.parent_id || "",
      order_index: m.order_index, active: m.active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.position) {
      toast({ title: "Nama dan jabatan wajib diisi", variant: "destructive" }); return;
    }
    setSaving(true);
    const payload = {
      name: form.name, position: form.position, photo_url: form.photo_url || null,
      division_id: form.division_id || null, parent_id: form.parent_id || null,
      order_index: form.order_index, active: form.active,
    };

    const { error } = editId
      ? await supabase.from("members").update(payload).eq("id", editId)
      : await supabase.from("members").insert(payload);

    if (error) toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
    else { toast({ title: editId ? "Anggota diperbarui" : "Anggota ditambahkan" }); setDialogOpen(false); fetchData(); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("members").delete().eq("id", deleteId);
    if (error) toast({ title: "Gagal menghapus", description: error.message, variant: "destructive" });
    else { toast({ title: "Anggota dihapus" }); fetchData(); }
    setDeleteId(null);
  };

  // Group by division for preview
  const grouped = divisions.map((div) => ({
    ...div,
    members: members.filter((m) => m.division_id === div.id && m.active).sort((a, b) => a.order_index - b.order_index),
  }));
  const unassigned = members.filter((m) => !m.division_id && m.active).sort((a, b) => a.order_index - b.order_index);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Struktur Organisasi</h1>
            <p className="text-muted-foreground">Kelola anggota dan struktur kepengurusan</p>
          </div>
          <Button onClick={openCreate} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari anggota..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {/* Preview Bagan */}
        <Card className="border-border">
          <CardHeader><CardTitle className="text-lg">Preview Bagan Struktur</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
            ) : (
              <div className="space-y-6">
                {unassigned.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Pengurus Inti</h3>
                    <div className="flex flex-wrap gap-3">
                      {unassigned.map((m) => (
                        <div key={m.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            {m.photo_url ? <img src={m.photo_url} className="w-8 h-8 rounded-full object-cover" /> : <User className="h-4 w-4 text-accent" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.position}</p>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEdit(m)}><Pencil className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setDeleteId(m.id)}><Trash2 className="h-3 w-3" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {grouped.filter((g) => g.members.length > 0).map((div) => (
                  <div key={div.id}>
                    <h3 className="text-sm font-semibold text-accent mb-3">Divisi {div.name}</h3>
                    <div className="flex flex-wrap gap-3">
                      {div.members.map((m) => (
                        <div key={m.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            {m.photo_url ? <img src={m.photo_url} className="w-8 h-8 rounded-full object-cover" /> : <User className="h-4 w-4 text-accent" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.position}</p>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEdit(m)}><Pencil className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setDeleteId(m.id)}><Trash2 className="h-3 w-3" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {unassigned.length === 0 && grouped.every((g) => g.members.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada anggota. Klik "Tambah Anggota" untuk memulai.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editId ? "Edit Anggota" : "Tambah Anggota"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nama *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Jabatan *</Label>
              <Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Contoh: Ketua Umum" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Divisi</Label>
                <Select value={form.division_id} onValueChange={(v) => setForm({ ...form, division_id: v === "none" ? "" : v })}>
                  <SelectTrigger><SelectValue placeholder="Tidak ada" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tidak ada (Pengurus Inti)</SelectItem>
                    {divisions.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input type="number" value={form.order_index} onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
              <Label>Aktif</Label>
            </div>
            <div className="space-y-2">
              <Label>Foto</Label>
              <ImageUpload bucket="members" value={form.photo_url || null} onChange={(url) => setForm({ ...form, photo_url: url || "" })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-accent text-accent-foreground">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editId ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
            <AlertDialogDescription>Data yang dihapus tidak dapat dikembalikan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminStruktur;
