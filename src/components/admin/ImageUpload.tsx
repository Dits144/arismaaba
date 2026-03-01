import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  bucket: string;
  folder?: string;
  value?: string | null;
  onChange: (url: string | null) => void;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export function ImageUpload({
  bucket,
  folder = "",
  value,
  onChange,
  className,
  accept = "image/jpeg,image/png,image/webp",
  maxSize = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadFile = useCallback(
    async (file: File) => {
      if (!accept.split(",").some((t) => file.type.match(t.trim()))) {
        toast({ title: "Format tidak didukung", description: "Gunakan JPG, PNG, atau WebP.", variant: "destructive" });
        return;
      }
      if (file.size > maxSize * 1024 * 1024) {
        toast({ title: "File terlalu besar", description: `Maksimum ${maxSize}MB.`, variant: "destructive" });
        return;
      }

      setUploading(true);
      try {
        const ext = file.name.split(".").pop();
        const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
        if (error) throw error;

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
        onChange(urlData.publicUrl);
        toast({ title: "Upload berhasil" });
      } catch (err: any) {
        toast({ title: "Upload gagal", description: err.message, variant: "destructive" });
      } finally {
        setUploading(false);
      }
    },
    [bucket, folder, accept, maxSize, onChange, toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-border">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors",
            dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50 hover:bg-muted/50"
          )}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-accent" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Drag & drop atau klik untuk upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WebP • Maks {maxSize}MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
