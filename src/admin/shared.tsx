import type React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminPage = "dashboard" | "guests" | "diapers" | "gifts" | "messages" | "gallery" | "settings";
export type GuestStatus = "confirmado" | "nao-confirmado" | "nao-comparecera";
export type MsgStatus = "aprovado" | "pendente" | "oculto";
export type GiftStatus = "disponivel" | "parcial" | "esgotado";

export interface Guest {
  id: string;
  nome: string;
  status: GuestStatus;
  acompanhantes: number;
  presenteEscolhido: string | null;
  dataConfirmacao: string | null;
}

export interface Message {
  id: number;
  nome: string;
  mensagem: string;
  status: MsgStatus;
  data: string;
}

export interface DiapersConfig {
  tamanho: string;
  necessario: number;
  escolhido: number;
}


export interface GiftConfig {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  qtdTotal: number;
  qtdDisponivel: number;
  linkProduto: string;
  tipoLink: "loja" | "marketplace" | "afiliado" | "outro";
  prioridade: boolean;
  ativo: boolean;
}


export interface EventSettings {
  nomeBebe: string;
  data: string;
  horario: string;
  local: string;
  endereco: string;
  linkMapa: string;
  mensagemWhatsApp: string;
  linkContribuicao: string;
  contribuicaoAtiva: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_GUESTS: Guest[] = [
  { id: 1, nome: "Maria Silva", status: "confirmado", acompanhantes: 2, presenteEscolhido: "Fraldas M (3 pcts)", dataConfirmacao: "2026-09-10" },
  { id: 2, nome: "João Santos", status: "confirmado", acompanhantes: 1, presenteEscolhido: "Kit Higiene", dataConfirmacao: "2026-09-11" },
  { id: 3, nome: "Ana Costa", status: "nao-confirmado", acompanhantes: 0, presenteEscolhido: null, dataConfirmacao: null },
  { id: 4, nome: "Pedro Lima", status: "nao-comparecera", acompanhantes: 0, presenteEscolhido: null, dataConfirmacao: "2026-09-12" },
  { id: 5, nome: "Carla Mendes", status: "confirmado", acompanhantes: 3, presenteEscolhido: "Fraldas G", dataConfirmacao: "2026-09-13" },
  { id: 6, nome: "Beatriz Torres", status: "confirmado", acompanhantes: 0, presenteEscolhido: "Lenços Umedecidos", dataConfirmacao: "2026-09-14" },
  { id: 7, nome: "Roberto Alves", status: "nao-confirmado", acompanhantes: 0, presenteEscolhido: null, dataConfirmacao: null },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 1, nome: "Família Oliveira", mensagem: "Que a sua chegada seja cercada de amor, saúde e muitos sorrisos!", status: "aprovado", data: "2026-09-10" },
  { id: 2, nome: "Vovó Maria", mensagem: "Minha neta querida, a vovó já está apaixonada por você!", status: "aprovado", data: "2026-09-11" },
  { id: 3, nome: "Tia Camila", mensagem: "Heloisa, você vai ter a família mais amorosa do mundo.", status: "aprovado", data: "2026-09-12" },
  { id: 4, nome: "Lucas Ferreira", mensagem: "Parabéns para os papais! Heloisa vai ser incrível!", status: "pendente", data: "2026-09-14" },
  { id: 5, nome: "Anônimo", mensagem: "Anúncio de produto!", status: "oculto", data: "2026-09-13" },
];

export const MOCK_DIAPERS: DiapersConfig[] = [
  { tamanho: "RN", necessario: 10, escolhido: 3 },
  { tamanho: "P", necessario: 20, escolhido: 8 },
  { tamanho: "M", necessario: 30, escolhido: 12 },
  { tamanho: "G", necessario: 25, escolhido: 5 },
  { tamanho: "XG", necessario: 15, escolhido: 0 },
];

export const MOCK_GIFTS: GiftConfig[] = [
  { id: 1, nome: "Lenços Umedecidos", categoria: "Higiene", descricao: "Lenços para bebê, sem álcool.", imagemUrl: "", qtdTotal: 5, qtdDisponivel: 3, linkProduto: "https://amazon.com.br", tipoLink: "loja", prioridade: false, ativo: true },
  { id: 2, nome: "Pomada para Assaduras", categoria: "Higiene", descricao: "Proteção para a pelinha da Heloisa.", imagemUrl: "", qtdTotal: 4, qtdDisponivel: 4, linkProduto: "", tipoLink: "loja", prioridade: false, ativo: true },
  { id: 3, nome: "Toalha Fralda", categoria: "Banho", descricao: "Toalha com capuz para o banho.", imagemUrl: "", qtdTotal: 3, qtdDisponivel: 3, linkProduto: "https://amazon.com.br", tipoLink: "afiliado", prioridade: true, ativo: true },
];

export const MOCK_SETTINGS: EventSettings = {
  nomeBebe: "Heloisa",
  data: "25 de Outubro de 2026",
  horario: "15h00 às 19h00",
  local: "Salão La Vie en Rose",
  endereco: "Rua das Flores, 123 — Jardim das Rosas, São Paulo",
  linkMapa: "https://maps.google.com/?q=Salão+La+Vie+en+Rose+São+Paulo",
  mensagemWhatsApp: "Você está convidado(a) para celebrar a chegada da Heloisa, nosso pequeno sol!",
  linkContribuicao: "https://picpay.me/heloisa",
  contribuicaoAtiva: true,
};

// ─── Shared admin styles ──────────────────────────────────────────────────────

export const A = {
  card: {
    background: "white",
    borderRadius: "1.25rem",
    border: "1px solid #ecdee6",
    boxShadow: "0 2px 12px rgba(84,67,76,0.07)",
  } as React.CSSProperties,
  inputStyle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "#54434c",
    border: "1.5px solid #eadde8",
    borderRadius: 10,
    background: "#fff8f5",
    outline: "none",
    width: "100%",
    padding: "10px 14px",
    boxSizing: "border-box",
  } as React.CSSProperties,
  label: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    fontSize: "0.72rem",
    color: "#917b86",
    display: "block",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: 6,
  } as React.CSSProperties,
  primaryBtn: {
    background: "linear-gradient(135deg, #a85f78, #bd7f93)",
    color: "white",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    padding: "10px 20px",
    fontSize: "0.875rem",
  } as React.CSSProperties,
  ghostBtn: {
    background: "white",
    color: "#bd7f93",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    borderRadius: "50px",
    border: "1.5px solid #d9c1cd",
    cursor: "pointer",
    padding: "8px 16px",
    fontSize: "0.8rem",
  } as React.CSSProperties,
  dangerBtn: {
    background: "white",
    color: "#c0404a",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    borderRadius: "50px",
    border: "1.5px solid #f0c0c4",
    cursor: "pointer",
    padding: "8px 16px",
    fontSize: "0.8rem",
  } as React.CSSProperties,
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS: { page: AdminPage; label: string; icon: string }[] = [
  { page: "dashboard", label: "Dashboard", icon: "◈" },
  { page: "guests", label: "Convidados", icon: "♡" },
  { page: "diapers", label: "Fraldas", icon: "◎" },
  { page: "gifts", label: "Presentes", icon: "✦" },
  { page: "messages", label: "Mensagens", icon: "✉" },
  { page: "gallery", label: "Galeria", icon: "◻" },
  { page: "settings", label: "Configurações", icon: "⚙" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: GuestStatus }) {
  const map: Record<GuestStatus, { label: string; color: string; bg: string }> = {
    confirmado: { label: "Confirmado", color: "#16a34a", bg: "#dcfce7" },
    "nao-confirmado": { label: "Pendente", color: "#9a7a00", bg: "#fef9c3" },
    "nao-comparecera": { label: "Não virá", color: "#c0404a", bg: "#fee2e2" },
  };
  const { label, color, bg } = map[status];
  return (
    <span style={{ background: bg, color, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.72rem", padding: "4px 10px", borderRadius: "50px", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}
