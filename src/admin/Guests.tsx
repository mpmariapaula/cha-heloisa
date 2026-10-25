import { useState } from "react";
import { A, StatusBadge, type Guest, type GuestStatus } from "./shared";
import { supabase } from "../lib/supabase";

export function Guests({ guests, setGuests }: { guests: Guest[]; setGuests: (g: Guest[]) => void }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | GuestStatus>("todos");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = guests.filter((g) => {
    const matchSearch = g.nome.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" || g.status === filter;
    return matchSearch && matchFilter;
  });

  const remove = async (id: string) => {
  console.log("Tentando excluir convidado:", id);

  const { data, error } = await supabase
    .from("rsvps")
    .delete()
    .eq("id", id)
    .select();

  console.log("Resultado da exclusão:", { data, error });

  if (error) {
    alert(`Erro ao excluir: ${error.message}`);
    return;
  }

  if (!data || data.length === 0) {
    alert("Nenhum registro foi excluído. Verifique as permissões do Supabase.");
    return;
  }

  setGuests((currentGuests) =>
    currentGuests.filter((guest) => guest.id !== id)
  );

  setDeleteId(null);
};

  const filters: { val: "todos" | GuestStatus; label: string }[] = [
    { val: "todos", label: "Todos" },
    { val: "confirmado", label: "Confirmados" },
    { val: "nao-confirmado", label: "Pendentes" },
    { val: "nao-comparecera", label: "Não virão" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#54434c", fontWeight: 600 }}>Convidados</h1>
        <button style={{ ...A.ghostBtn, display: "flex", alignItems: "center", gap: 6 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Exportar lista
        </button>
      </div>

      {/* Search + filter */}
      <div style={{ ...A.card, padding: "16px", marginBottom: "1.25rem" }} className="flex flex-col sm:flex-row gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar convidado..." style={{ ...A.inputStyle, flex: 1 }} />
        <div className="flex gap-2 flex-wrap">
          {filters.map(({ val, label }) => (
            <button key={val} onClick={() => setFilter(val)} style={{ padding: "8px 14px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", border: "1.5px solid", borderColor: filter === val ? "#a85f78" : "#eadde8", background: filter === val ? "#f7ded5" : "white", color: filter === val ? "#a85f78" : "#917b86", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block" style={{ ...A.card, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fff8f5", borderBottom: "1px solid #eadde5" }}>
              {["Nome", "Status", "Acompanhantes", "Presente", "Confirmação", "Ações"].map((h) => (
                <th key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: "#917b86", textTransform: "uppercase", letterSpacing: "0.07em", padding: "12px 16px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => (
              <tr key={g.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f8edef" : "none" }}>
                <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#54434c", fontSize: "0.875rem" }}>{g.nome}</td>
                <td style={{ padding: "14px 16px" }}><StatusBadge status={g.status} /></td>
                <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#7d6873" }}>{g.acompanhantes}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#7d6873" }}>{g.presenteEscolhido || "—"}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86" }}>{g.dataConfirmacao || "—"}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => setDeleteId(g.id)} style={A.dangerBtn} className="hover:bg-red-50 transition-colors">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#917b86", textAlign: "center", padding: "2rem" }}>Nenhum convidado encontrado.</p>}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((g) => (
          <div key={g.id} style={{ ...A.card, padding: "16px" }}>
            <div className="flex justify-between items-start mb-2">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#54434c" }}>{g.nome}</p>
              <StatusBadge status={g.status} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86" }}>Acompanhantes: {g.acompanhantes}</p>
            {g.presenteEscolhido && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86" }}>Presente: {g.presenteEscolhido}</p>}
            {g.dataConfirmacao && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86" }}>Confirmado em: {g.dataConfirmacao}</p>}
            <button onClick={() => setDeleteId(g.id)} style={{ ...A.dangerBtn, marginTop: "0.75rem" }}>Excluir</button>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#917b86", textAlign: "center", padding: "2rem" }}>Nenhum convidado encontrado.</p>}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(84,67,76,0.28)", backdropFilter: "blur(4px)" }}>
          <div style={{ ...A.card, padding: "2rem", maxWidth: 340, width: "100%", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#54434c", fontWeight: 600, marginBottom: "0.75rem" }}>Excluir convidado?</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#7d6873", marginBottom: "1.5rem" }}>Essa ação não pode ser desfeita.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} style={A.ghostBtn}>Cancelar</button>
              <button onClick={() => remove(deleteId)} style={{ ...A.dangerBtn, background: "#fee2e2" }}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
