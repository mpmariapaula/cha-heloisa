
import { supabase } from "../lib/supabase";
import type { DiapersConfig } from "../admin/shared";

interface DiaperRecord {
  tamanho: string;
  necessario: number;
  escolhido: number;
}

export async function getDiapers(): Promise<DiapersConfig[]> {
  const { data, error } = await supabase
    .from("diapers")
    .select("tamanho, necessario, escolhido")
    .order("tamanho");

  if (error) {
    throw new Error("Não foi possível carregar as fraldas.");
  }

  return (data ?? []) as DiaperRecord[];
}

export async function updateDiaper(
  tamanho: string,
  field: "necessario" | "escolhido",
  value: number
): Promise<void> {
  const { data: current, error: readError } = await supabase
    .from("diapers")
    .select("necessario, escolhido")
    .eq("tamanho", tamanho)
    .single();

  if (readError || !current) {
    throw new Error("Não foi possível localizar esse tamanho de fralda.");
  }

  const updates = {
    ...current,
    [field]: Math.max(0, Math.floor(value)),
  };

  if (updates.escolhido > updates.necessario) {
    throw new Error("A quantidade escolhida não pode superar a necessária.");
  }

  const { error } = await supabase
    .from("diapers")
    .update(updates)
    .eq("tamanho", tamanho);

  if (error) {
    throw new Error("Não foi possível salvar as alterações das fraldas.");
  }
}
