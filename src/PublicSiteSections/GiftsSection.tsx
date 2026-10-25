import { useEffect, useState } from "react";
import { Divider, FlowerDecor, SunDecor, SectionTitle } from "./IntroSections";
import { supabase } from "../lib/supabase";
import { getDiapers } from "../services/diapersService";

// ─── Gifts & Diapers ─────────────────────────────────────────────────────────

type DiapersState = { tamanho: string; necessario: number; escolhido: number }[];

const INITIAL_DIAPERS: DiapersState = [
  { tamanho: "RN", necessario: 10, escolhido: 3 },
  { tamanho: "P", necessario: 20, escolhido: 8 },
  { tamanho: "M", necessario: 30, escolhido: 12 },
  { tamanho: "G", necessario: 25, escolhido: 5 },
  { tamanho: "XG", necessario: 15, escolhido: 0 },
];

interface GiftItem {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  img: string;
  qtdTotal: number;
  qtdDisponivel: number;
  linkProduto?: string;
  escolhidoPor: string[];
}

interface DiaperModalProps {
  size: string;
  disponivel: number;
  necessario: number;
  onConfirm: (nome: string, qtd: number) => void;
  onClose: () => void;
}

function DiaperModal({ size, disponivel, necessario, onConfirm, onClose }: DiaperModalProps) {
  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState(1);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    onConfirm(nome, qtd);
    setDone(true);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(84,67,76,0.34)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: "2rem", maxWidth: 400, width: "100%", overflow: "hidden", boxShadow: "0 24px 64px rgba(84,67,76,0.22)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", padding: "24px 28px 20px" }}>
          <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.6rem", color: "#a85f78" }}>Fraldas {size}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#7d6873", marginTop: 4 }}>
            {disponivel} disponíveis de {necessario} necessárias
          </p>
          <div style={{ height: 6, borderRadius: 3, background: "#eadde5", marginTop: 12, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, width: `${Math.min(100, ((necessario - disponivel) / necessario) * 100)}%`, background: "linear-gradient(90deg, #a85f78, #bd7f93)" }} />
          </div>
        </div>
        <div className="p-7">
          {done ? (
            <div className="text-center py-4">
              <div className="flex justify-center" style={{ marginBottom: "0.75rem" }}><SunDecor size={44} opacity={0.85} /></div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#54434c", fontWeight: 600, marginBottom: "0.5rem" }}>Que presente lindo!</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7d6873", lineHeight: 1.7 }}>
                Obrigada! A Heloisa vai ganhar fraldinhas {size} através de você.
              </p>
              <button onClick={onClose} style={{ background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", border: "none", cursor: "pointer", marginTop: "1.5rem", padding: "12px 32px" }}>
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#917b86", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Seu nome</label>
                <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como você se chama?" style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#917b86", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Quantidade</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setQtd(Math.max(1, qtd - 1))} style={{ width: 40, height: 40, borderRadius: "50%", background: "#f7ded5", border: "1px solid #e2d0da", color: "#a85f78", fontSize: "1.2rem", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#54434c", fontWeight: 600, minWidth: 30, textAlign: "center" }}>{qtd}</span>
                  <button type="button" onClick={() => setQtd(Math.min(disponivel, qtd + 1))} style={{ width: 40, height: 40, borderRadius: "50%", background: "#f7ded5", border: "1px solid #e2d0da", color: "#a85f78", fontSize: "1.2rem", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#917b86" }}>pacote{qtd !== 1 ? "s" : ""}</span>
                </div>
              </div>
              <button type="submit" style={{ background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", width: "100%", fontSize: "1rem", border: "none", cursor: "pointer", padding: "14px" }} className="hover:opacity-90 active:scale-95 transition-all">
                Confirmar escolha
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface GiftChoiceModalProps {
  gift: GiftItem;
  onConfirm: (nome: string) => void;
  onClose: () => void;
}

function GiftChoiceModal({ gift, onConfirm, onClose }: GiftChoiceModalProps) {
  const [nome, setNome] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    onConfirm(nome);
    setDone(true);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(84,67,76,0.34)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: "2rem", maxWidth: 400, width: "100%", overflow: "hidden", boxShadow: "0 24px 64px rgba(84,67,76,0.22)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", padding: "24px 28px 20px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#917b86", textTransform: "uppercase", letterSpacing: "0.08em" }}>{gift.categoria}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#54434c", fontWeight: 600, marginTop: 4 }}>{gift.nome}</p>
        </div>
        <div className="p-7">
          {done ? (
            <div className="text-center py-4">
              <div className="flex justify-center" style={{ marginBottom: "0.75rem" }}><FlowerDecor size={44} color="#f2c3ce" opacity={0.8} /></div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#54434c", fontWeight: 600, marginBottom: "0.5rem" }}>Presente registrado!</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7d6873", lineHeight: 1.7 }}>Que carinho! A Heloisa vai adorar receber este presente de você.</p>
              <button onClick={onClose} style={{ background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", border: "none", cursor: "pointer", marginTop: "1.5rem", padding: "12px 32px" }}>Fechar</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7d6873", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Que lindo! Informe seu nome para registrarmos sua escolha.
              </p>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#917b86", display: "block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Seu nome</label>
                <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como você se chama?" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#54434c", border: "1.5px solid #e7d7df", borderRadius: 12, background: "#fff8f5", outline: "none", width: "100%", padding: "12px 16px", boxSizing: "border-box" }} />
              </div>
              <button type="submit" style={{ background: "linear-gradient(135deg, #a85f78, #bd7f93)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", width: "100%", fontSize: "1rem", border: "none", cursor: "pointer", padding: "14px" }} className="hover:opacity-90 active:scale-95 transition-all">
                Confirmar presente
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function getGiftImage(categoria: string): string {
  const categoriaNormalizada = categoria.toLowerCase();

  if (categoriaNormalizada.includes("roupa")) {
    return "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=280&fit=crop&auto=format";
  }

  if (categoriaNormalizada.includes("fralda")) {
    return "https://images.unsplash.com/photo-1584839404042-8bc21d240e7b?w=400&h=280&fit=crop&auto=format";
  }

  if (
    categoriaNormalizada.includes("higiene") ||
    categoriaNormalizada.includes("banho")
  ) {
    return "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=280&fit=crop&auto=format";
  }

  if (categoriaNormalizada.includes("brinquedo")) {
    return "https://images.unsplash.com/photo-1599629954294-14df9ec9f2e5?w=400&h=280&fit=crop&auto=format";
  }

  return "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=280&fit=crop&auto=format";
}

export function GiftsSection() {
  const [diapers, setDiapers] = useState<DiapersState>(INITIAL_DIAPERS);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [giftsLoading, setGiftsLoading] = useState(true);
  const [diaperModal, setDiaperModal] = useState<string | null>(null);
  const [giftModal, setGiftModal] = useState<GiftItem | null>(null);
  const [chosenGift, setChosenGift] = useState<GiftItem | null>(null);



  useEffect(() => {
  async function loadGifts() {
    try {
      const { data, error } = await supabase
        .from("gifts")
        .select("*")
        .eq("ativo", true)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setGifts(
        (data ?? []).map((item) => ({
          id: item.id,
          nome: item.nome,
          categoria: item.categoria,
          descricao: item.descricao,
          img: item.imagem_url || "",
          img:"",
          qtdTotal: item.qtd_total,
          qtdDisponivel: item.qtd_disponivel,
          linkProduto: item.link_produto || undefined,
          escolhidoPor: [],
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar presentes:", error);
    } finally {
      setGiftsLoading(false);
    }
  }
  

  loadGifts();
  loadDiapers();


  async function loadDiapers() {
  try {
    const data = await getDiapers();

    setDiapers(
      data.map((item) => ({
        tamanho: item.tamanho,
        necessario: item.necessario,
        escolhido: item.escolhido,
      }))
    );
  } catch (error) {
    console.error("Erro ao carregar fraldas:", error);
  }
}
}, []);

  const confirmDiaper = (tamanho: string, nome: string, qtd: number) => {
    setDiapers((prev) => prev.map((d) => d.tamanho === tamanho ? { ...d, escolhido: Math.min(d.necessario, d.escolhido + qtd) } : d));
  };

  const confirmGift = (id: number, nome: string) => {
    setGifts((prev) => prev.map((g) => g.id === id ? { ...g, qtdDisponivel: Math.max(0, g.qtdDisponivel - 1), escolhidoPor: [...g.escolhidoPor, nome] } : g));
  };

  const getStatus = (g: GiftItem) => {
    if (g.qtdDisponivel === 0) return "esgotado";
    if (g.qtdDisponivel < g.qtdTotal) return "parcial";
    return "disponivel";
  };

  const statusLabel: Record<string, { label: string; color: string; bg: string }> = {
    disponivel: { label: "Disponível", color: "#16a34a", bg: "#dcfce7" },
    parcial: { label: "Parcialmente escolhido", color: "#9a7a00", bg: "#fef9c3" },
    esgotado: { label: "Esgotado", color: "#9a2a2a", bg: "#fee2e2" },
  };

  const activeDiaper = diapers.find((d) => d.tamanho === diaperModal);

  return (
    <section id="presentes" style={{ background: "#fff8f5" }} className="py-20 px-5">
      {diaperModal && activeDiaper && (
        <DiaperModal
          size={activeDiaper.tamanho}
          disponivel={activeDiaper.necessario - activeDiaper.escolhido}
          necessario={activeDiaper.necessario}
          onConfirm={(nome, qtd) => confirmDiaper(diaperModal, nome, qtd)}
          onClose={() => setDiaperModal(null)}
        />
      )}
      {giftModal && (
        <GiftChoiceModal
          gift={giftModal}
          onConfirm={(nome) => confirmGift(giftModal.id, nome)}
          onClose={() => { setGiftModal(null); setChosenGift(null); }}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* ── Diapers ── */}
        <SectionTitle script="com carinho" heading="A Heloisa vai precisar de muitas fraldinhas!" />
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7d6873", fontSize: "1rem", textAlign: "center", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          Se você quiser presentear a Heloisa, as fraldas serão sempre muito bem-vindas. Mas também preparamos outras sugestões para quem preferir.
        </p>

        {giftsLoading && (
          <p className="text-center mb-6" style={{ color: "#7d6873" }}>
            Carregando presentinhos...
          </p>
        )}

        {!giftsLoading && gifts.length === 0 && (
          <p className="text-center mb-6" style={{ color: "#7d6873" }}>
            Em breve, teremos sugestões de presentinhos por aqui!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {diapers.map((d) => {
            const disponivel = d.necessario - d.escolhido;
            const pct = (d.escolhido / d.necessario) * 100;
            const esgotado = disponivel === 0;
            return (
              <div key={d.tamanho} style={{ background: "white", borderRadius: "1.5rem", border: "1px solid #ecdee6", overflow: "hidden", opacity: esgotado ? 0.7 : 1 }}>
                <div style={{ background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", padding: "20px 22px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#917b86", textTransform: "uppercase", letterSpacing: "0.09em" }}>Tamanho</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#914e68", fontWeight: 600, lineHeight: 1 }}>{d.tamanho}</p>
                </div>
                <div style={{ padding: "18px 22px" }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#7d6873" }}>Necessário: <strong>{d.necessario}</strong></span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#a85f78" }}>Disponível: <strong>{disponivel}</strong></span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "#eadde5", overflow: "hidden", marginBottom: 16 }}>
                    <div style={{ height: "100%", borderRadius: 3, width: `${pct}%`, background: "linear-gradient(90deg, #a85f78, #bd7f93)", transition: "width 0.5s" }} />
                  </div>
                  <button
                    disabled={esgotado}
                    onClick={() => setDiaperModal(d.tamanho)}
                    style={{
                      width: "100%", padding: "11px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", border: "none",
                      background: esgotado ? "#f0f0f0" : "linear-gradient(135deg, #a85f78, #bd7f93)",
                      color: esgotado ? "#bbb" : "white",
                      cursor: esgotado ? "not-allowed" : "pointer",
                    }}
                    className={esgotado ? "" : "hover:opacity-90 active:scale-95 transition-all"}
                  >
                    {esgotado ? "✓ Esgotado" : `Quero presentear com fraldas ${d.tamanho}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Other Gifts ── */}
        <div className="text-center mb-10">
          <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "2rem", color: "#bd7f93" }}>também</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#54434c", fontWeight: 600 }}>Outros presentinhos</h3>
          <Divider />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {gifts.map((g) => {
            const st = getStatus(g);
            const info = statusLabel[st];
            return (
              <div key={g.id} style={{ background: "white", borderRadius: "1.5rem", border: "1px solid #ecdee6", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ background: "#f7ded5", height: 140, overflow: "hidden", position: "relative" }}>
                <img src={g.img || getGiftImage(g.categoria)} alt={g.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 10, right: 10, background: info.bg, color: info.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.68rem", padding: "4px 10px", borderRadius: "50px", letterSpacing: "0.04em" }}>
                    {info.label}
                  </div>
                </div>
                <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#917b86", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{g.categoria}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#54434c", fontWeight: 600, marginBottom: 6 }}>{g.nome}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#7d6873", lineHeight: 1.6, flex: 1, marginBottom: 14 }}>{g.descricao}</p>
                  <div className="flex flex-col gap-2">
                    {g.linkProduto && (
                      <a href={g.linkProduto} target="_blank" rel="noopener noreferrer"
                        style={{ background: "white", color: "#bd7f93", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", borderRadius: "50px", border: "1.5px solid #d9c1cd", textDecoration: "none", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                        className="hover:bg-purple-50 transition-colors"
                        onClick={() => setChosenGift(g)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Ver produto
                      </a>
                    )}
                    <button
                      disabled={st === "esgotado"}
                      onClick={() => setGiftModal(g)}
                      style={{ background: st === "esgotado" ? "#f0f0f0" : "linear-gradient(135deg, #a85f78, #bd7f93)", color: st === "esgotado" ? "#bbb" : "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", borderRadius: "50px", border: "none", cursor: st === "esgotado" ? "not-allowed" : "pointer", padding: "10px" }}
                      className={st !== "esgotado" ? "hover:opacity-90 active:scale-95 transition-all" : ""}
                    >
                      {st === "esgotado" ? "✓ Já escolhido" : g.linkProduto ? "Já escolhi este presente" : "Quero presentear"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Contribution ── */}
        <div style={{ background: "linear-gradient(135deg, #f2c3ce, #f7ded5)", borderRadius: "2rem", padding: "2.5rem 2rem", textAlign: "center", border: "1px solid #f0d0f0" }}>
          <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.8rem", color: "#bd7f93" }}>prefere contribuir de outra forma?</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#75616c", lineHeight: 1.8, maxWidth: 500, margin: "0.75rem auto 1.5rem" }}>
            Toda forma de carinho é bem-vinda. Se preferir, você também pode contribuir com qualquer valor para ajudar nos preparativos para a chegada da Heloisa.
          </p>
          <a
            href="https://picpay.me/heloisa"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "linear-gradient(135deg, #bd7f93, #9b6076)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: "50px", fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", boxShadow: "0 8px 24px rgba(84,67,76,0.20)" }}
            className="hover:opacity-90 active:scale-95 transition-all"
          >
            Quero contribuir
          </a>
        </div>
      </div>
    </section>
  );
}
