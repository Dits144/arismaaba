import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Search, Pencil, Trash2, ExternalLink, Calendar, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Event = Tables<"events">;

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

const emptyForm = {
  title: "", slug: "", start_date: "", end_date: "", location: "", description: "", poster_url: "", registration_url: "",
};

const AdminKegiatan = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("events").select("*").order("start_date", { ascending: false });
    if (error) toast({ title: "Gagal memuat data", description: error.message, variant: "destructive" });
    else setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const filtered = events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditId(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (ev: Event) => {
    setEditId(ev.id);
    setForm({
      title: ev.title, slug: ev.slug, start_date: ev.start_date?.slice(0, 16) || "",
      end_date: ev.end_date?.slice(0, 16) || "", location: ev.location || "",
      description: ev.description || "", poster_url: ev.poster_url || "", registration_url: ev.registration_url || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.start_date) {
      toast({ title: "Judul dan tanggal mulai wajib diisi", variant: "destructive" }); return;
    }
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug || slugify(form.title), start_date: form.start_date,
      end_date: form.end_date || null, location: form.location || null,
      description: form.description || null, poster_url: form.poster_url || null, registration_url: form.registration_url || null,
    };

    const { error } = editId
      ? await supabase.from("events").update(payload).eq("id", editId)
      : await supabase.from("events").insert(payload);

    if (error) toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
    else { toast({ title: editId ? "Kegiatan diperbarui" : "Kegiatan ditambahkan" }); setDialogOpen(false); fetchEvents(); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("events").delete().eq("id", deleteId);
    if (error) toast({ title: "Gagal menghapus", description: error.message, variant: "destructive" });
    else { toast({ title: "Kegiatan dihapus" }); fetchEvents(); }
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Kegiatan</h1>
            <p className="text-muted-foreground">Kelola event dan acara ARISMA</p>
          </div>
          <Button onClick={openCreate} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" /> Tambah Kegiatan
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari kegiatan..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <Card className="border-border">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada kegiatan.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((ev) => (
                      <TableRow key={ev.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">{ev.title}</TableCell>
                        <TableCell className="whitespace-nowrap">{formatDate(ev.start_date)}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{ev.location || "-"}</TableCell>
                        <TableCell>
                          <Badge className={new Date(ev.start_date) > new Date() ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}>
                            {new Date(ev.start_date) > new Date() ? "Akan Datang" : "Selesai"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <a href={`/kegiatan/${ev.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></a>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => openEdit(ev)}><Pencil className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteId(ev.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Kegiatan" : "Tambah Kegiatan"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Judul *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tanggal Mulai *</Label>
                <Input type="datetime-local" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tanggal Selesai</Label>
                <Input type="datetime-local" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Lokasi</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Link Pendaftaran</Label>
              <Input value={form.registration_url} onChange={(e) => setForm({ ...form, registration_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Poster</Label>
              <ImageUpload bucket="posters" value={form.poster_url || null} onChange={(url) => setForm({ ...form, poster_url: url || "" })} />
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

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kegiatan?</AlertDialogTitle>
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

export default AdminKegiatan;
