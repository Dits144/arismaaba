import { useState, useEffect, useRef, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Trash2, Upload, ImageIcon, Loader2, X } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery_items">;
type GalleryCategory = Tables<"gallery_categories">;

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const AdminGaleri = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string[] | null>(null);
  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [savingCat, setSavingCat] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const [itemsRes, catsRes] = await Promise.all([
      supabase.from("gallery_items").select("*").order("created_at", { ascending: false }),
      supabase.from("gallery_categories").select("*").order("name"),
    ]);
    setItems(itemsRes.data || []);
    setCategories(catsRes.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = selectedCategory === "all" ? items : items.filter((i) => i.category_id === selectedCategory);

  const handleUpload = async (files: FileList) => {
    if (files.length === 0) return;
    setUploading(true);
    let uploaded = 0;

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) continue;
      if (!file.type.match(/image\/(jpeg|png|webp)/)) continue;

      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("gallery").upload(fileName, file);
      if (uploadErr) continue;

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
      const { error: insertErr } = await supabase.from("gallery_items").insert({
        image_url: urlData.publicUrl,
        title: file.name.replace(/\.[^.]+$/, ""),
        category_id: selectedCategory !== "all" ? selectedCategory : null,
      });
      if (!insertErr) uploaded++;
    }

    toast({ title: `${uploaded} foto berhasil diupload` });
    fetchData();
    setUploading(false);
  };

  const handleBulkDelete = async () => {
    if (!deleteIds) return;
    const { error } = await supabase.from("gallery_items").delete().in("id", deleteIds);
    if (error) toast({ title: "Gagal menghapus", description: error.message, variant: "destructive" });
    else { toast({ title: `${deleteIds.length} foto dihapus` }); setSelectedItems(new Set()); fetchData(); }
    setDeleteIds(null);
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    setSavingCat(true);
    const { error } = await supabase.from("gallery_categories").insert({ name: newCatName, slug: slugify(newCatName) });
    if (error) toast({ title: "Gagal menambah kategori", description: error.message, variant: "destructive" });
    else { toast({ title: "Kategori ditambahkan" }); setNewCatName(""); setCatDialogOpen(false); fetchData(); }
    setSavingCat(false);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedItems);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedItems(next);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Galeri</h1>
            <p className="text-muted-foreground">Kelola dokumentasi foto ARISMA</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCatDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Kategori
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={uploading}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload Foto
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden"
          onChange={(e) => { if (e.target.files) handleUpload(e.target.files); e.target.value = ""; }}
        />

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Semua Kategori" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          {selectedItems.size > 0 && (
            <Button variant="destructive" size="sm" onClick={() => setDeleteIds(Array.from(selectedItems))}>
              <Trash2 className="mr-2 h-4 w-4" /> Hapus {selectedItems.size} foto
            </Button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="aspect-square rounded-lg" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada foto. Klik "Upload Foto" untuk menambahkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                <img src={item.image_url} alt={item.title || ""} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors" />
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                    className="bg-background/80 border-border"
                  />
                </div>
                <button
                  onClick={() => setDeleteIds([item.id])}
                  className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={catDialogOpen} onOpenChange={setCatDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Tambah Kategori</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label>Nama Kategori</Label>
            <Input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="Contoh: Muharram Cup" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCatDialogOpen(false)}>Batal</Button>
            <Button onClick={handleAddCategory} disabled={savingCat} className="bg-accent text-accent-foreground">
              {savingCat && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Tambah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteIds} onOpenChange={() => setDeleteIds(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus {deleteIds?.length} Foto?</AlertDialogTitle>
            <AlertDialogDescription>Data yang dihapus tidak dapat dikembalikan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminGaleri;
