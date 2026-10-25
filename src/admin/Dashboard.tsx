import { A, StatusBadge, type Guest, type Message, type DiapersConfig } from "./shared";

export function Dashboard({ guests, messages, diapers }: { guests: Guest[]; messages: Message[]; diapers: DiapersConfig[] }) {
  const confirmados = guests.filter((g) => g.status === "confirmado");
  const naoPodem = guests.filter((g) => g.status === "nao-comparecera");
  const pendentes = guests.filter((g) => g.status === "nao-confirmado");
  const totalAcomp = confirmados.reduce((s, g) => s + g.acompanhantes, 0);
  const presentesEscolhidos = guests.filter((g) => g.presenteEscolhido).length;
  const fralhasEscolhidas = diapers.reduce((s, d) => s + d.escolhido, 0);
  const msgPendentes = messages.filter((m) => m.status === "pendente").length;

  const stats = [
    { label: "Total de convidados", value: guests.length, color: "#a85f78", bg: "#f7ded5" },
    { label: "Confirmados", value: confirmados.length, color: "#16a34a", bg: "#dcfce7" },
    { label: "Não confirmados", value: pendentes.length, color: "#9a7a00", bg: "#fef9c3" },
    { label: "Não poderão comparecer", value: naoPodem.length, color: "#c0404a", bg: "#fee2e2" },
    { label: "Total de acompanhantes", value: totalAcomp, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Presentes escolhidos", value: presentesEscolhidos, color: "#0369a1", bg: "#e0f2fe" },
    { label: "Fraldas escolhidas", value: fralhasEscolhidas, color: "#bd7f93", bg: "#f2c3ce" },
    { label: "Mensagens pendentes", value: msgPendentes, color: "#9a7a00", bg: "#fef9c3" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#54434c", fontWeight: 600, marginBottom: "1.5rem" }}>
        Chá de Fraldas da Heloisa
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map(({ label, value, color, bg }) => (
          <div key={label} style={{ ...A.card, padding: "18px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#917b86", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{label}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", color, fontWeight: 600, lineHeight: 1 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Diapers progress */}
      <div style={{ ...A.card, padding: "24px", marginBottom: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#54434c", fontWeight: 600, marginBottom: "1.25rem" }}>Fraldas por Tamanho</h2>
        <div className="flex flex-col gap-4">
          {diapers.map((d) => {
            const pct = (d.escolhido / d.necessario) * 100;
            return (
              <div key={d.tamanho}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#54434c" }}>Tamanho {d.tamanho}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#7d6873" }}>{d.escolhido} / {d.necessario}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "#eadde5", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 4, width: `${pct}%`, background: "linear-gradient(90deg, #a85f78, #bd7f93)", transition: "width 0.5s" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent guests */}
      <div style={{ ...A.card, padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#54434c", fontWeight: 600, marginBottom: "1.25rem" }}>Últimas Confirmações</h2>
        <div className="flex flex-col gap-2">
          {guests.filter((g) => g.dataConfirmacao).sort((a, b) => (b.dataConfirmacao || "").localeCompare(a.dataConfirmacao || "")).slice(0, 5).map((g) => (
            <div key={g.id} className="flex items-center justify-between" style={{ padding: "10px 12px", borderRadius: 10, background: "#fff8f5" }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#54434c" }}>{g.nome}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.77rem", color: "#917b86" }}>{g.dataConfirmacao}</p>
              </div>
              <StatusBadge status={g.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
