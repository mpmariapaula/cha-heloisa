import { useState, useEffect } from "react";

// ─── Shared decorative atoms ─────────────────────────────────────────────────

export function FlowerDecor({
  size = 40,
  color = "#f2c3ce",
  opacity = 0.6,
}: {
  size?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ opacity }}>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i} cx="20" cy="10" rx="5" ry="9" fill={color} transform={`rotate(${deg} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5.5" fill="#f7ded5" />
      <circle cx="20" cy="20" r="3" fill={color} opacity="0.5" />
    </svg>
  );
}

export function StarDecor({ size = 20, color = "#d2b65e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <polygon points="10,1 12.9,7 19.5,7.6 14.8,12 16.5,18.5 10,15 3.5,18.5 5.2,12 0.5,7.6 7.1,7" />
    </svg>
  );
}

export function HeartDecor({ size = 16, color = "#d798aa" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <path d="M8 14.5s-6.5-4-6.5-8.5A4 4 0 0 1 8 3.5a4 4 0 0 1 6.5 2.5C14.5 10.5 8 14.5 8 14.5z" />
    </svg>
  );
}

export function SunDecor({ size = 48, color = "#d0aa48", opacity = 0.7 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ opacity }}>
      <circle cx="24" cy="24" r="8" fill={color} />
      <circle cx="24" cy="24" r="13" stroke={color} strokeWidth="1.5" opacity="0.45" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path key={deg} d="M24 2V8" stroke={color} strokeWidth="2" strokeLinecap="round" transform={`rotate(${deg} 24 24)`} />
      ))}
    </svg>
  );
}

export function Divider() {
  return (
    <div
      style={{
        width: 64,
        height: 2,
        background: "linear-gradient(90deg, #f2c3ce, #e6d8e8)",
        margin: "1rem auto",
        borderRadius: 2,
      }}
    />
  );
}

export function SectionTitle({
  script,
  heading,
}: {
  script: string;
  heading: string;
}) {
  return (
    <div className="text-center mb-12">
      <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "2rem", color: "#a85f78" }}>
        {script}
      </p>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
          color: "#54434c",
          fontWeight: 600,
        }}
      >
        {heading}
      </h2>
      <Divider />
    </div>
  );
}

// ─── Countdown ───────────────────────────────────────────────────────────────

const EVENT_DATE = new Date("2026-10-25T15:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      ended: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

export function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#inicio", label: "Início" },
    { href: "#heloisa", label: "Heloisa" },
    { href: "#evento", label: "O Chá" },
    { href: "#presentes", label: "Presentes" },
    { href: "#mensagens", label: "Mensagens" },
    { href: "#confirmar", label: "Confirmar" },
  ];

  return (
    <nav
      style={{
        background: "rgba(255,248,245,0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #eadde5",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
        <span style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.7rem", color: "#a85f78", lineHeight: 1 }}>
          Heloisa
        </span>

        <div className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#7d6873",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
              className="hover:text-pink-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" style={{ color: "#a85f78" }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid #eadde5" }} className="md:hidden pb-2 flex flex-col">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#7d6873",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
              className="text-center py-3 hover:bg-pink-50 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const { days, hours, minutes, seconds, ended } = useCountdown(EVENT_DATE);

  const scrollToRSVP = () => document.getElementById("confirmar")?.scrollIntoView({ behavior: "smooth" });

  const shareInvite = async () => {
    const text = "Você está convidado(a) para celebrar a chegada da Heloisa, nosso pequeno sol! Acesse o convite: " + window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Chá de Fraldas da Heloisa", text, url: window.location.href });
        return;
      } catch {
        /* fallthrough */
      }
    }
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const units = [
    { value: days, label: "dias" },
    { value: hours, label: "horas" },
    { value: minutes, label: "min" },
    { value: seconds, label: "seg" },
  ];

  return (
    <section
      id="inicio"
      style={{
        background: "radial-gradient(circle at 50% 22%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 26%), linear-gradient(160deg, #f7ded5 0%, #f2c3ce 54%, #e6d8e8 100%)",
        minHeight: "100svh",
        paddingTop: 80,
      }}
      className="relative overflow-hidden flex flex-col items-center justify-center px-5 py-16"
    >
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-24 left-3"><FlowerDecor size={70} color="#e6aebd" opacity={0.22} /></div>
        <div className="absolute top-36 right-5"><FlowerDecor size={52} color="#e6d8e8" opacity={0.18} /></div>
        <div className="absolute top-1/2 -left-4"><FlowerDecor size={90} color="#f2c3ce" opacity={0.1} /></div>
        <div className="absolute bottom-32 right-2"><FlowerDecor size={60} color="#e6d8e8" opacity={0.16} /></div>
        <div className="absolute bottom-20 left-8"><FlowerDecor size={44} color="#e6aebd" opacity={0.2} /></div>
        <div className="absolute top-44 left-1/4"><StarDecor size={14} color="#d2b65e" /></div>
        <div className="absolute top-28 right-1/3"><StarDecor size={10} color="#f2c3ce" /></div>
        <div className="absolute bottom-48 right-1/4"><StarDecor size={16} color="#eadde8" /></div>
        <div className="absolute top-1/3 left-14" style={{ opacity: 0.3 }}><HeartDecor size={22} color="#d798aa" /></div>
        <div className="absolute bottom-1/3 right-14" style={{ opacity: 0.25 }}><HeartDecor size={16} color="#eadde8" /></div>
        <div className="absolute top-24 left-1/2 -translate-x-1/2"><SunDecor size={76} opacity={0.2} /></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#7b626f", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Um jardim inteiro floresce para recebê-la
        </p>
        <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "clamp(2.6rem, 7vw, 4.2rem)", color: "#a85f78", lineHeight: 1.15 }}>
          Chá de Fraldas da
        </p>
        <h1 style={{ fontFamily: "'Parisienne', cursive", fontSize: "clamp(5rem, 16vw, 9.5rem)", color: "#914e68", lineHeight: 0.95 }} className="mb-6">
          Heloisa
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)", color: "#75616c", fontStyle: "italic", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 2.5rem" }}>
          "Heloisa chega como o sol: aquecendo nossos dias e fazendo o amor florescer."
        </p>

        {/* Countdown */}
        {ended ? (
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#a85f78", fontStyle: "italic", marginBottom: "2.5rem" }}>
            Hoje é o grande dia!
          </div>
        ) : (
          <div className="flex gap-3 justify-center mb-10">
            {units.map(({ value, label }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.72)", border: "1px solid #e2d0da", borderRadius: 18, backdropFilter: "blur(8px)", minWidth: 64 }} className="flex flex-col items-center py-3 px-3">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 5vw, 1.9rem)", color: "#a85f78", fontWeight: 600, lineHeight: 1 }}>
                  {String(value).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "#917b86", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", marginTop: 3 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={scrollToRSVP} style={{ background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 10px 30px rgba(168,95,120,0.25)" }} className="px-8 py-4 hover:opacity-90 transition-all active:scale-95 hover:-translate-y-0.5">
            Confirmar presença
          </button>
          <button onClick={shareInvite} style={{ background: "rgba(255,255,255,0.8)", color: "#a85f78", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", fontSize: "1rem", border: "2px solid #dda9b7", cursor: "pointer", backdropFilter: "blur(8px)" }} className="px-8 py-4 hover:bg-white transition-all active:scale-95 hover:-translate-y-0.5">
            Compartilhar convite
          </button>
        </div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 flex justify-center animate-bounce" style={{ color: "#d1b665", opacity: 0.5 }}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ─── About Heloisa ─────────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <section id="heloisa" style={{ background: "#fff8f5" }} className="py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <SectionTitle script="nosso pequeno sol" heading="Estamos esperando por você, Heloisa!" />
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative mx-auto" style={{ maxWidth: 380 }}>
            <div style={{ borderRadius: "62% 38% 54% 46% / 52% 46% 54% 48%", overflow: "hidden", border: "5px solid white", background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", aspectRatio: "4/5", boxShadow: "0 24px 64px rgba(168,95,120,0.16)" }}>
              <img src="https://images.unsplash.com/photo-1648971627285-f4d0478b7f47?w=760&h=940&fit=crop&auto=format" alt="Uma espera iluminada em meio à natureza" className="w-full h-full object-cover" style={{ opacity: 0.92 }} />
            </div>
            <div className="absolute -top-5 -right-5 opacity-40"><FlowerDecor size={58} color="#f2c3ce" /></div>
            <div className="absolute -bottom-4 -left-5 opacity-35"><FlowerDecor size={44} color="#e6d8e8" /></div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#62515a", lineHeight: 1.9 }} className="mb-5">
              Com o coração transbordando de amor e gratidão, esperamos por{" "}
              <strong style={{ color: "#a85f78" }}>Heloisa</strong> — nome que carrega luz, calor e a promessa de dias floridos.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#62515a", lineHeight: 1.9 }} className="mb-5">
              Cada detalhe dessa espera foi preenchido de carinho e sonhos. Ela chegará para completar nossa família e iluminar cada canto da casa com risadas e amor sem fim.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#62515a", lineHeight: 1.9 }}>
              Queremos compartilhar esse momento mágico com as pessoas que mais amamos. Venham florescer este dia com a gente.
            </p>
            <div className="mt-8 flex gap-2 flex-wrap">
              {["Luz que chega", "Amor que floresce", "Nosso pequeno sol"].map((tag) => (
                <span key={tag} style={{ background: "#f7ded5", color: "#a85f78", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem", borderRadius: "50px", border: "1px solid #ddc6d2" }} className="px-4 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Event Info ───────────────────────────────────────────────────────────────

export function EventSection() {
  const openMaps = () => window.open("https://maps.google.com/?q=Salão+La+Vie+en+Rose+São+Paulo", "_blank");
  return (
    <section id="evento" style={{ background: "linear-gradient(135deg, #f2c3ce 0%, #f7ded5 100%)" }} className="py-20 px-5">
      <div className="max-w-lg mx-auto">
        <SectionTitle script="o grande dia" heading="Vamos celebrar juntos?" />
        <div style={{ background: "white", borderRadius: "2rem", boxShadow: "0 20px 64px rgba(168,95,120,0.14)", border: "1px solid #ecdee6", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(90deg, #f7ded5, #f2e8f0, #f7ded5)", height: 8 }} />
          <div className="p-8 md:p-10">
            {[
              { icon: "25", label: "Data", value: "25 de Outubro de 2026", sub: "Domingo" },
              { icon: "15h", label: "Horário", value: "15h00 às 19h00", sub: "Pontualidade é um ato de carinho" },
              { icon: "↗", label: "Local", value: "Salão La Vie en Rose", sub: "Rua das Flores, 123 — Jardim das Rosas, São Paulo" },
            ].map(({ icon, label, value, sub }, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? "1px solid #f7eaed" : "none" }} className="flex gap-5 py-6">
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#917b86", textTransform: "uppercase", letterSpacing: "0.09em" }}>{label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#54434c", fontWeight: 500, marginTop: 2 }}>{value}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#917b86", marginTop: 1 }}>{sub}</p>
                </div>
              </div>
            ))}
            <button onClick={openMaps} style={{ background: "linear-gradient(135deg, #bd7f93, #9b6076)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", width: "100%", border: "none", cursor: "pointer", fontSize: "1rem" }} className="mt-4 py-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Como chegar
            </button>
          </div>
          <div style={{ background: "linear-gradient(90deg, #f2e8f0, #f7ded5, #f2e8f0)", height: 8 }} />
        </div>
      </div>
    </section>
  );
}
