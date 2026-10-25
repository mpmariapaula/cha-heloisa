
import { supabase } from "../lib/supabase";
import type { GiftConfig } from "../admin/shared";

interface GiftRecord {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  imagemUrl: string;
  qtd_total: number;
  qtd_disponivel: number;
  link_produto: string;
  tipo_link: GiftConfig["tipoLink"];
  prioridade: boolean;
  ativo: boolean;
}

function mapGift(record: GiftRecord): GiftConfig {
  return {
    id: record.id,
    nome: record.nome,
    categoria: record.categoria,
    descricao: record.descricao,
    imagemUrl: record.imagem_url,
    qtdTotal: record.qtd_total,
    qtdDisponivel: record.qtd_disponivel,
    linkProduto: record.link_produto,
    tipoLink: record.tipo_link,
    prioridade: record.prioridade,
    ativo: record.ativo,
  };
}

export async function getGifts(): Promise<GiftConfig[]> {
  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Não foi possível carregar os presentes.");
  }

  return (data ?? []).map((record) => mapGift(record as GiftRecord));
}

export async function saveGift(gift: GiftConfig): Promise<void> {
  const record = {
    nome: gift.nome.trim(),
    categoria: gift.categoria.trim(),
    descricao: gift.descricao.trim(),
    imagem_url: gift.imagemUrl.trim(),
    qtd_total: Math.max(0, Math.floor(gift.qtdTotal)),
    qtd_disponivel: Math.max(0, Math.floor(gift.qtdDisponivel)),
    link_produto: gift.linkProduto.trim(),
    tipo_link: gift.tipoLink,
    prioridade: gift.prioridade,
    ativo: gift.ativo,
  };

  if (record.qtd_disponivel > record.qtd_total) {
    throw new Error("A quantidade disponível não pode superar a quantidade total.");
  }

  if (gift.id) {
    const { error } = await supabase
      .from("gifts")
      .update(record)
      .eq("id", gift.id);

    if (error) {
      throw new Error("Não foi possível atualizar o presente.");
    }

    return;
  }

  const { error } = await supabase.from("gifts").insert(record);

  if (error) {
    throw new Error("Não foi possível cadastrar o presente.");
  }
}

export async function deleteGift(id: string): Promise<void> {
  const { error } = await supabase
    .from("gifts")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Não foi possível excluir o presente.");
  }
}
