import { useState } from "react";
import { FlowerDecor, SunDecor, SectionTitle } from "./IntroSections";
import { saveRSVP } from '../services/rsvpService'

// ─── RSVP ─────────────────────────────────────────────────────────────────────

export function RSVPSection() {
  const [form, setForm] = useState({ name: "", companions: "0", attending: "sim" });
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setErrorMessage("");

  try {
    await saveRSVP({
      name: form.name,
      attending: form.attending as 'sim' | 'nao',
      companions: Number(form.companions),
    });

    setSubmitted(true);
  } catch {
    setErrorMessage(
      'Não foi possível registrar sua confirmação. Tente novamente.'
    );
  } finally {
    setLoading(false);
  }
};


  const inputStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "1rem",
    color: "#54434c",
    border: "1.5px solid #e7d7df",
    borderRadius: 12,
    background: "#fff8f5",
    outline: "none",
    width: "100%",
    padding: "12px 16px",
    boxSizing: "border-box",
  };

  return (
    <section id="confirmar" style={{ background: "linear-gradient(135deg, #f2c3ce 0%, #f7ded5 100%)" }} className="py-20 px-5">
      <div className="max-w-lg mx-auto">
        <SectionTitle script="sua presença é o maior presente" heading="Você vem celebrar com a gente?" />

        {submitted ? (
          <div style={{ background: "white", borderRadius: "2rem", border: "1px solid #e2d0da", textAlign: "center", padding: "3rem 2rem", boxShadow: "0 8px 36px rgba(168,95,120,0.10)" }}>
            <div className="flex justify-center" style={{ marginBottom: "1rem" }}>
              {form.attending === "sim" ? <SunDecor size={52} opacity={0.85} /> : <FlowerDecor size={48} color="#bd7f93" opacity={0.8} />}
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#54434c", fontWeight: 600, marginBottom: "0.75rem" }}>
              {form.attending === "sim" ? "Presença confirmada!" : "Que saudade você vai fazer!"}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7d6873", lineHeight: 1.8, fontSize: "1rem" }}>
              {form.attending === "sim"
                ? "Estamos muito felizes em ter você nesse momento especial. Heloisa mal pode esperar para conhecer você!"
                : "Entendemos e ficamos felizes por você ter nos dito. Mesmo de longe, sinta-se abraçado(a) com muito carinho pela nossa família."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "2rem", border: "1px solid #eadde5", boxShadow: "0 8px 36px rgba(168,95,120,0.10)", padding: "2rem" }}>
            {errorMessage && (
              <p
                role="alert"
                style={{
                  color: "#a83250",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                }}
              >
                {errorMessage}
              </p>
            )}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#917b86", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Nome completo</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Seu nome" style={inputStyle} />
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#917b86", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Confirmação</label>
              <div className="flex gap-3">
                {[{ val: "sim", label: "✓ Sim, estarei presente!" }, { val: "nao", label: "✗ Não poderei comparecer" }].map(({ val, label }) => {
                  const active = form.attending === val;
                  return (
                    <button key={val} type="button" onClick={() => setForm({ ...form, attending: val })}
                      style={{ flex: 1, padding: "12px 8px", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", border: `1.5px solid ${active ? "#a85f78" : "#e7d7df"}`, background: active ? "linear-gradient(135deg, #f7ded5, #f2e8f0)" : "white", color: active ? "#a85f78" : "#917b86", cursor: "pointer", transition: "all 0.2s" }}>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            {form.attending === "sim" && (
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#917b86", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Acompanhantes</label>
                <select value={form.companions} onChange={(e) => setForm({ ...form, companions: e.target.value })} style={inputStyle}>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n === 0 ? "Somente eu" : `${n} acompanhante${n > 1 ? "s" : ""}`}</option>
                  ))}
                </select>
              </div>
            )}
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", width: "100%", fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(84,67,76,0.20)" }} className="py-4 mt-1 hover:opacity-90 transition-opacity active:scale-95">
              {loading ? "Enviando..." : "Confirmar presença"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
