import { useState } from "react";
import { A } from "./shared";

const GALLERY_MOCK = [
  { id: "photo-1752151729479-76ee7bc09a0d", legenda: "Flores iluminadas pelo sol" },
  { id: "photo-1518621736915-f3b1c41bfd00", legenda: "Preparando o ninho" },
  { id: "photo-1601728054577-7611a87fe3d1", legenda: "Jardim de flores silvestres" },
  { id: "photo-1555252333-9f8e92e65df9", legenda: "Detalhes com amor" },
];

export function GalleryAdmin() {
  const [photos, setPhotos] = useState(GALLERY_MOCK);
  const remove = (id: string) => setPhotos(photos.filter((p) => p.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#54434c", fontWeight: 600 }}>Galeria</h1>
        <button style={{ ...A.primaryBtn, opacity: 0.6, cursor: "not-allowed" }} title="Integração com Supabase Storage em breve">+ Adicionar foto</button>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#917b86", marginBottom: "1.5rem", background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 14px" }}>
        Upload de fotos será habilitado após integração com o Supabase Storage.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((p) => (
          <div key={p.id} style={{ ...A.card, overflow: "hidden" }}>
            <img src={`https://images.unsplash.com/${p.id}?w=300&h=240&fit=crop&auto=format`} alt={p.legenda} className="w-full block" style={{ height: 140, objectFit: "cover" }} />
            <div style={{ padding: "10px 12px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#7d6873", marginBottom: 8 }}>{p.legenda}</p>
              <button onClick={() => remove(p.id)} style={A.dangerBtn} className="hover:bg-red-50 w-full">Remover</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
