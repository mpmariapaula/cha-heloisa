import { useState } from "react";
import { A, type Message, type MsgStatus } from "./shared";

export function MessagesAdmin({ messages, setMessages }: { messages: Message[]; setMessages: (m: Message[]) => void }) {
  const [filter, setFilter] = useState<"todos" | MsgStatus>("todos");

  const filtered = messages.filter((m) => filter === "todos" || m.status === filter);
  const update = (id: number, status: MsgStatus) => setMessages(messages.map((m) => m.id === id ? { ...m, status } : m));
  const remove = (id: number) => setMessages(messages.filter((m) => m.id !== id));

  const stInfo: Record<MsgStatus, { label: string; color: string; bg: string }> = {
    aprovado: { label: "Aprovado", color: "#16a34a", bg: "#dcfce7" },
    pendente: { label: "Pendente", color: "#9a7a00", bg: "#fef9c3" },
    oculto: { label: "Oculto", color: "#c0404a", bg: "#fee2e2" },
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#54434c", fontWeight: 600, marginBottom: "1.5rem" }}>Mensagens para Heloisa</h1>

      <div className="flex gap-2 mb-5 flex-wrap">
        {([["todos", "Todas"], ["aprovado", "Aprovadas"], ["pendente", "Pendentes"], ["oculto", "Ocultas"]] as const).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{ padding: "8px 14px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", border: "1.5px solid", borderColor: filter === val ? "#a85f78" : "#eadde8", background: filter === val ? "#f7ded5" : "white", color: filter === val ? "#a85f78" : "#917b86", cursor: "pointer" }}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((m) => {
          const st = stInfo[m.status];
          return (
            <div key={m.id} style={{ ...A.card, padding: "20px 24px" }}>
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#54434c" }}>{m.nome}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#917b86" }}>{m.data}</p>
                </div>
                <span style={{ background: st.bg, color: st.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.72rem", padding: "4px 10px", borderRadius: "50px" }}>{st.label}</span>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#62515a", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1rem" }}>"{m.mensagem}"</p>
              <div className="flex gap-2 flex-wrap">
                {m.status !== "aprovado" && <button onClick={() => update(m.id, "aprovado")} style={{ ...A.primaryBtn, padding: "8px 16px", fontSize: "0.8rem" }} className="hover:opacity-90">✓ Aprovar</button>}
                {m.status !== "oculto" && <button onClick={() => update(m.id, "oculto")} style={A.ghostBtn} className="hover:bg-purple-50">Ocultar</button>}
                <button onClick={() => remove(m.id)} style={A.dangerBtn} className="hover:bg-red-50">Excluir</button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#917b86", textAlign: "center", padding: "3rem" }}>Nenhuma mensagem.</p>}
      </div>
    </div>
  );
}
