import { useState } from "react";
import { A, type EventSettings } from "./shared";

export function SettingsAdmin({ settings, setSettings }: { settings: EventSettings; setSettings: (s: EventSettings) => void }) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields: { label: string; field: keyof EventSettings; type?: string; placeholder?: string }[] = [
    { label: "Nome da bebê", field: "nomeBebe" },
    { label: "Data do evento", field: "data" },
    { label: "Horário", field: "horario" },
    { label: "Local", field: "local" },
    { label: "Endereço completo", field: "endereco" },
    { label: "Link do mapa (Google Maps)", field: "linkMapa", type: "url" },
    { label: "Mensagem padrão do WhatsApp", field: "mensagemWhatsApp" },
    { label: "Link de contribuição (PIX / PicPay)", field: "linkContribuicao", type: "url" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#54434c", fontWeight: 600, marginBottom: "1.5rem" }}>Configurações do Evento</h1>
      <form onSubmit={save} style={{ ...A.card, padding: "2rem", maxWidth: 580 }}>
        <div className="flex flex-col gap-5">
          {fields.map(({ label, field, type = "text" }) => (
            <div key={field}>
              <label style={A.label}>{label}</label>
              <input type={type} value={form[field] as string} onChange={(e) => setForm({ ...form, [field]: e.target.value })} style={A.inputStyle} />
            </div>
          ))}

          {/* Contribution toggle */}
          <div style={{ padding: "16px", borderRadius: 12, background: "#fff8f5", border: "1.5px solid #eadde5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#54434c" }}>Contribuição financeira</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86", marginTop: 2 }}>Exibir opção de contribuição no convite</p>
            </div>
            <button type="button" onClick={() => setForm({ ...form, contribuicaoAtiva: !form.contribuicaoAtiva })}
              style={{ width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer", background: form.contribuicaoAtiva ? "linear-gradient(135deg, #a85f78, #bd7f93)" : "#ddd", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: form.contribuicaoAtiva ? 25 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
            </button>
          </div>

          <button type="submit" style={{ ...A.primaryBtn, padding: "13px", fontSize: "1rem", width: "100%", background: saved ? "linear-gradient(135deg, #7ab870, #50a068)" : "linear-gradient(135deg, #a85f78, #bd7f93)", transition: "background 0.3s" }} className="hover:opacity-90 active:scale-95 transition-all">
            {saved ? "✓ Configurações salvas!" : "Salvar configurações"}
          </button>
        </div>
      </form>
    </div>
  );
}
