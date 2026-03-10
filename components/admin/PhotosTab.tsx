"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

interface PhotoGroup {
  title: string;
  prefix: string;
  photos: string[];
}

const PHOTO_GROUPS: PhotoGroup[] = [
  {
    title: "Hero & Bannières",
    prefix: "hero",
    photos: ["hero-principal.jpg", "hero-services.jpg", "hero-realisations.jpg", "hero-contact.jpg"],
  },
  {
    title: "Sections",
    prefix: "sections",
    photos: ["apropos.jpg", "processus.jpg", "reassurance.jpg", "cta-banner.jpg"],
  },
  {
    title: "Équipe",
    prefix: "about",
    photos: ["equipe.jpg", "dirigeant.jpg", "chantier-equipe.jpg"],
  },
  {
    title: "Pages services",
    prefix: "services",
    photos: ["construction-neuve.jpg", "renovation.jpg", "extension.jpg", "ravalement.jpg", "terrasse.jpg"],
  },
  {
    title: "Réalisations Avant",
    prefix: "portfolio",
    photos: ["maison-plainpied-avant.jpg", "facade-avant.jpg", "extension-avant.jpg", "garage-avant.jpg", "mur-porteur-avant.jpg", "surelevation-avant.jpg"],
  },
  {
    title: "Réalisations Après",
    prefix: "portfolio",
    photos: ["maison-plainpied-apres.jpg", "facade-apres.jpg", "extension-apres.jpg", "garage-apres.jpg", "mur-porteur-apres.jpg", "surelevation-apres.jpg"],
  },
];

export default function PhotosTab() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;
    setUploading(uploadTarget);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("path", uploadTarget);
      await fetch("/api/admin/upload", { method: "POST", body: form });
    } catch {
      alert("Erreur lors de l'upload.");
    } finally {
      setUploading(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function triggerUpload(path: string) {
    setUploadTarget(path);
    setTimeout(() => fileRef.current?.click(), 50);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Gestion des photos</h1>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

      {PHOTO_GROUPS.map((group) => (
        <div key={group.title} className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{group.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.photos.map((photo) => {
              const path = `/images/${group.prefix}/${photo}`;
              const fullPath = `images/${group.prefix}/${photo}`;
              const isUploading = uploading === fullPath;
              return (
                <div key={photo} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <div className="aspect-[4/3] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={path}
                      alt={photo}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setPreview(path)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center text-gray-300">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                  </div>
                  <div className="p-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 truncate">{photo}</span>
                    <button
                      onClick={() => triggerUpload(fullPath)}
                      disabled={isUploading}
                      className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setPreview(null)}>
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
