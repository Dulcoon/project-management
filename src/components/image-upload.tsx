"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { ImageUp, Trash2 } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  projectSlug?: string;
  label?: string;
  accept?: string;
};

export function ImageUpload({
  value,
  onChange,
  onRemove,
  projectSlug,
  label = "Upload Image",
  accept = "image/*",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    if (projectSlug) formData.append("projectSlug", projectSlug);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Upload failed");
        return;
      }

      const result = await res.json();
      onChange(result.data.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <>
      {value ? (
        <div className="relative w-full rounded-xl overflow-hidden border bg-card dark:bg-[#1C1F26] dark:border-[#2E323D] group">
          <img
            src={value}
            alt=""
            className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-surface-container p-3 rounded-full text-foreground hover:bg-primary-container hover:text-white transition-colors"
            >
              <ImageUp className="size-4" />
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="bg-surface-container p-3 rounded-full text-destructive hover:bg-destructive hover:text-white transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleSelect}
          />
        </div>
      ) : (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center gap-2 w-full aspect-video rounded-xl border-2 border-dashed border-border dark:border-outline-variant bg-muted/30 dark:bg-[#1C1F26]/50 cursor-pointer hover:border-primary hover:text-primary transition-colors"
        >
          {uploading ? (
            <div className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <>
              <ImageUp className="size-6" />
              <span className="text-xs font-semibold tracking-wider">
                {label}
              </span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleSelect}
            disabled={uploading}
          />
        </label>
      )}
    </>
  );
}
