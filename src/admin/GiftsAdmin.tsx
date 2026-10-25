import { useState } from "react";
import { A, type GiftConfig, type GiftStatus } from "./shared";
import {
  deleteGift,
  getGifts,
  saveGift,
} from "../services/giftsService";

export function GiftsAdmin({ gifts, setGifts }: { gifts: GiftConfig[]; setGifts: (g: GiftConfig[]) => void }) {
  const [editing, setEditing] = useState<GiftConfig | null>(null);
  const [showForm, setShowForm] = useState(false);

  const blank: GiftConfig = { id: "", nome: "", categoria: "", descricao: "", qtdTotal: 1, qtdDisponivel: 1, linkProduto: "", tipoLink: "loja", prioridade: false, ativo: true };
  const [form, setForm] = useState<GiftConfig>(blank);

  const openEdit = (g: GiftConfig) => { setEditing(g); setForm(g); setShowForm(true); };
const openNew = () => {
  setEditing(null);
  setForm({ ...blank });
  setShowForm(true);
};
  const save = async () => {
  try {
    await saveGift(form);

    const atualizados = await getGifts();
    setGifts(atualizados);
    setShowForm(false);
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Não foi possível salvar o presente."
    );
  }
};

  
const remove = async (id: string) => {
  try {
    await deleteGift(id);

    setGifts((currentGifts) =>
      currentGifts.filter((gift) => gift.id !== id)
    );
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Não foi possível excluir o presente."
    );
  }
};


  const statusOf = (g: GiftConfig): GiftStatus => g.qtdDisponivel === 0 ? "esgotado" : g.qtdDisponivel < g.qtdTotal ? "parcial" : "disponivel";
  const stInfo: Record<GiftStatus, { label: string; color: string; bg: string }> = {
    disponivel: { label: "Disponível", color: "#16a34a", bg: "#dcfce7" },
    parcial: { label: "Parcial", color: "#9a7a00", bg: "#fef9c3" },
    esgotado: { label: "Esgotado", color: "#c0404a", bg: "#fee2e2" },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#54434c", fontWeight: 600 }}>Presentes</h1>
        <button onClick={openNew} style={A.primaryBtn} className="hover:opacity-90 active:scale-95 transition-all">+ Adicionar presente</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gifts.map((g) => {
          const st = statusOf(g);
          const { label, color, bg } = stInfo[st];
          return (
            <div key={g.id} style={{ ...A.card, overflow: "hidden", opacity: g.ativo ? 1 : 0.6 }}>
              <div style={{ background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#917b86", textTransform: "uppercase", letterSpacing: "0.07em" }}>{g.categoria}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#54434c", fontWeight: 600, marginTop: 2 }}>{g.nome}</p>
                </div>
                <span style={{ background: bg, color, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.68rem", padding: "3px 9px", borderRadius: "50px" }}>{label}</span>
              </div>
              <div style={{ padding: "14px 18px" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#7d6873", marginBottom: 10, lineHeight: 1.5 }}>{g.descricao}</p>
                <div className="flex gap-3 text-sm mb-3">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86" }}>Qtd: {g.qtdDisponivel}/{g.qtdTotal}</span>
                  {g.prioridade && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#a85f78", fontWeight: 700 }}>★ Prioridade</span>}
                </div>
                {g.linkProduto && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#e6d8e8", marginBottom: 12, wordBreak: "break-all" }}>🔗 {g.tipoLink} · {g.linkProduto.slice(0, 30)}…</p>}
                <div className="flex gap-2">
                  <button onClick={() => openEdit(g)} style={A.ghostBtn} className="hover:bg-purple-50 transition-colors flex-1">Editar</button>
                  <button onClick={() => remove(g.id)} style={A.dangerBtn} className="hover:bg-red-50 transition-colors">Excluir</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-8" style={{ background: "rgba(84,67,76,0.28)", backdropFilter: "blur(4px)" }}>
          <div style={{ ...A.card, width: "100%", maxWidth: 520 }}>
            <div style={{ background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", padding: "20px 24px", borderRadius: "1.25rem 1.25rem 0 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#54434c", fontWeight: 600 }}>{editing ? "Editar presente" : "Novo presente"}</p>
            </div>
            <div style={{ padding: "1.5rem" }} className="flex flex-col gap-4">
              {[
                { label: "Nome do produto", field: "nome", type: "text" },
                { label: "Categoria", field: "categoria", type: "text" },
                { label: "Descrição", field: "descricao", type: "text" },
                { label: "URL da imagem", field: "imagemUrl", type: "url" },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label style={A.label}>{label}</label>
                  <input type={type} value={(form as any)[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} style={A.inputStyle} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={A.label}>Qtd total</label>
                  <input type="number" min={0} value={form.qtdTotal} onChange={(e) => setForm({ ...form, qtdTotal: +e.target.value })} style={A.inputStyle} />
                </div>
                <div>
                  <label style={A.label}>Qtd disponível</label>
                  <input type="number" min={0} value={form.qtdDisponivel} onChange={(e) => setForm({ ...form, qtdDisponivel: +e.target.value })} style={A.inputStyle} />
                </div>
              </div>
              <div>
                <label style={A.label}>Link do produto</label>
                <input type="url" value={form.linkProduto} onChange={(e) => setForm({ ...form, linkProduto: e.target.value })} placeholder="https://" style={A.inputStyle} />
              </div>
              <div>
                <label style={A.label}>Tipo de link</label>
                <select value={form.tipoLink} onChange={(e) => setForm({ ...form, tipoLink: e.target.value as GiftConfig["tipoLink"] })} style={A.inputStyle}>
                  {["loja", "marketplace", "afiliado", "outro"].map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#75616c", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.prioridade} onChange={(e) => setForm({ ...form, prioridade: e.target.checked })} />
                  Prioridade
                </label>
                <label className="flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#75616c", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} />
                  Ativo
                </label>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowForm(false)} style={A.ghostBtn}>Cancelar</button>
                <button onClick={save} style={A.primaryBtn} className="hover:opacity-90 transition-opacity">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
