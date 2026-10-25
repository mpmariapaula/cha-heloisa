import { useState } from "react";
import { FlowerDecor, StarDecor, HeartDecor, SunDecor, SectionTitle } from "./IntroSections";

// ─── Messages ────────────────────────────────────────────────────────────────

const SEED_MESSAGES = [
  { nome: "Família Oliveira", mensagem: "Que a sua chegada seja cercada de amor, saúde e muitos sorrisos. Já somos apaixonados por você, Heloisa!" },
  { nome: "Vovó Maria", mensagem: "Minha neta mais linda, a vovó está com o coração cheio de alegria esperando por você. Que Deus te abençoe sempre!" },
  { nome: "Tia Camila", mensagem: "Heloisa, você vai ter a família mais amorosa do mundo. Já te amo tanto antes mesmo de te conhecer!" },
];

export function MessagesSection() {
  const [messages] = useState(SEED_MESSAGES);
  const [form, setForm] = useState({ nome: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.mensagem.trim()) return;
    setSent(true);
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
    <section id="mensagens" style={{ background: "linear-gradient(160deg, #f7ded5 0%, #f2e8f0 100%)" }} className="py-20 px-5">
      <div className="max-w-2xl mx-auto">
        <SectionTitle script="com amor" heading="Deixe uma mensagem para a Heloisa" />

        <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "2rem", border: "1px solid #eadde5", boxShadow: "0 8px 36px rgba(168,95,120,0.09)", padding: "1.75rem", marginBottom: "2.5rem" }}>
          {sent ? (
            <div className="text-center py-6">
              <div className="flex justify-center" style={{ marginBottom: "0.75rem" }}><SunDecor size={42} opacity={0.8} /></div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#54434c", fontWeight: 600, marginBottom: "0.5rem" }}>Sua mensagem foi enviada com muito carinho.</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7d6873", lineHeight: 1.7, fontSize: "0.95rem" }}>
                Ela passará por uma aprovação e logo aparecerá no mural da Heloisa.
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "1rem" }}>
                <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome" required style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <textarea value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} placeholder="Escreva sua mensagem de carinho para a Heloisa..." required rows={4} style={{ ...inputStyle, resize: "none" }} />
              </div>
              <button type="submit" style={{ background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", width: "100%", fontSize: "1rem", border: "none", cursor: "pointer" }} className="py-4 hover:opacity-90 transition-opacity active:scale-95">
                Enviar mensagem
              </button>
            </>
          )}
        </form>

        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} style={{ background: "white", borderRadius: "1.5rem", border: "1px solid #ecdee6", padding: "20px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -12, right: -12, opacity: 0.1, pointerEvents: "none" }}>
                <FlowerDecor size={64} color="#f2c3ce" />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#62515a", lineHeight: 1.75, fontSize: "1rem", marginBottom: "0.75rem" }}>
                "{msg.mensagem}"
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#a85f78" }}>
                — {msg.nome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

const GALLERY = [
  { id: "photo-1752151729479-76ee7bc09a0d", alt: "Flores iluminadas pelo sol", tall: true },
  { id: "photo-1518621736915-f3b1c41bfd00", alt: "Preparando o ninho", tall: false },
  { id: "photo-1601728054577-7611a87fe3d1", alt: "Jardim de flores silvestres", tall: true },
  { id: "photo-1555252333-9f8e92e65df9", alt: "Detalhes com amor", tall: false },
  { id: "photo-1752151730411-54367cf8c85f", alt: "Jardim banhado de luz", tall: true },
  { id: "photo-1597393922738-085ea914b3e5", alt: "Momentos especiais", tall: false },
];

export function GallerySection() {
  return (
    <section id="galeria" style={{ background: "#fff8f5" }} className="py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <SectionTitle script="memórias" heading="Esperando por Heloisa" />
        <div style={{ columns: 2, gap: "1rem" }} className="md:columns-3">
          {GALLERY.map((img, i) => (
            <div key={i} style={{ borderRadius: "1.25rem", overflow: "hidden", border: "3px solid white", boxShadow: "0 8px 24px rgba(84,67,76,0.11)", breakInside: "avoid", marginBottom: "1rem", background: "#f7ded5" }}>
              <img src={`https://images.unsplash.com/${img.id}?w=400&h=${img.tall ? 520 : 380}&fit=crop&auto=format`} alt={img.alt} className="w-full block" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Share Section ────────────────────────────────────────────────────────────

export function ShareSection() {
  const [copied, setCopied] = useState(false);

  const shareWA = () => {
    const text = encodeURIComponent("Você está convidado(a) para celebrar a chegada da Heloisa, nosso pequeno sol! Acesse o convite digital: " + window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section style={{ background: "linear-gradient(135deg, #f2c3ce 0%, #f7ded5 100%)" }} className="py-16 px-5">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-4"><FlowerDecor size={52} color="#f2c3ce" opacity={0.4} /></div>
        <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "2.6rem", color: "#a85f78" }} className="mb-1">Compartilhe</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#54434c", fontWeight: 500, fontStyle: "italic" }} className="mb-8">Compartilhe esse momento especial</p>

        {/* Invite card preview */}
        <div style={{ background: "linear-gradient(160deg, #f7ded5, #f2e8f0)", border: "2px solid #e2d0da", borderRadius: "1.5rem", padding: "2rem 1.5rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -10, left: -10, opacity: 0.15 }}><FlowerDecor size={80} color="#f2c3ce" /></div>
          <div style={{ position: "absolute", bottom: -10, right: -10, opacity: 0.15 }}><FlowerDecor size={80} color="#e6d8e8" /></div>
          <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.4rem", color: "#a85f78" }}>Chá de Fraldas da</p>
          <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "3rem", color: "#914e68", lineHeight: 1 }}>Heloisa</p>
          <div style={{ width: 40, height: 1.5, background: "linear-gradient(90deg, #f2c3ce, #e6d8e8)", margin: "0.75rem auto" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#75616c", fontWeight: 600 }}>25 de Outubro de 2026 · 15h00</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#75616c", fontWeight: 600 }}>Salão La Vie en Rose</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#917b86", marginTop: "1rem" }}>
            "Confirme sua presença pelo nosso convite digital."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={shareWA} style={{ background: "#25D366", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", fontSize: "0.95rem", border: "none", cursor: "pointer" }} className="flex-1 py-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
          <button onClick={copyLink} style={{ background: "white", color: "#a85f78", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", fontSize: "0.95rem", border: "2px solid #dda9b7", cursor: "pointer" }} className="flex-1 py-4 flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors active:scale-95">
            {copied ? "✓ Link copiado!" : (
              <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copiar link</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer style={{ background: "linear-gradient(160deg, #f7ded5 0%, #f2e8f0 100%)", borderTop: "1px solid #eadde5" }} className="py-14 px-5 text-center">
      <div className="flex justify-center items-center gap-3 mb-6" style={{ opacity: 0.5 }}>
        <FlowerDecor size={30} color="#f2c3ce" />
        <SunDecor size={38} color="#d0aa48" />
        <FlowerDecor size={42} color="#c78398" />
        <StarDecor size={14} color="#f2c3ce" />
        <FlowerDecor size={26} color="#e6d8e8" />
      </div>
      <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "2.2rem", color: "#a85f78" }} className="mb-2">Heloisa,</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#6c5a64", maxWidth: 380, margin: "0 auto 1.25rem", lineHeight: 1.75 }}>
        "já é muito amada antes mesmo de chegar."
      </p>
      <div className="flex justify-center gap-3" style={{ opacity: 0.35 }}>
        <HeartDecor size={16} color="#f2c3ce" />
        <StarDecor size={12} color="#dec8df" />
        <HeartDecor size={12} color="#c78398" />
        <StarDecor size={10} color="#cfb360" />
        <HeartDecor size={14} color="#f2c3ce" />
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#917b86", marginTop: "1.75rem", opacity: 0.6 }}>
        Feito com amor para a Heloisa
      </p>
    </footer>
  );
}

// ─── Floating CTA ─────────────────────────────────────────────────────────────

export function FloatingCTA() {
  return (
    <button
      onClick={() => document.getElementById("confirmar")?.scrollIntoView({ behavior: "smooth" })}
      style={{ position: "fixed", bottom: 24, right: 20, zIndex: 40, background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", borderRadius: "50px", padding: "13px 20px", boxShadow: "0 8px 28px rgba(84,67,76,0.28)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
      className="hover:opacity-90 active:scale-95 transition-all"
    >
      <SunDecor size={20} color="#fff8f5" opacity={1} /> <span className="hidden sm:inline">Confirmar presença</span><span className="sm:hidden">RSVP</span>
    </button>
  );
}
