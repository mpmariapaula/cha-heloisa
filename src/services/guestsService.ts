
import { supabase } from '../lib/supabase'
import type { Guest, GuestStatus } from '../admin/shared'

interface RSVPRecord {
  id: string
  name: string
  attending: 'sim' | 'nao'
  companions: number
  created_at: string
}

function mapRSVPToGuest(record: RSVPRecord): Guest {
  const status: GuestStatus =
    record.attending === 'sim'
      ? 'confirmado'
      : 'nao-comparecera'

  return {
    id: record.id,
    nome: record.name,
    status,
    acompanhantes: record.companions,
    presenteEscolhido: null,
    dataConfirmacao: record.created_at,
  }
}

export async function getGuests(): Promise<Guest[]> {
  const { data, error } = await supabase
    .from('rsvps')
    .select('id, name, attending, companions, created_at')
    .order('created_at', { ascending: false })

 if (error) {
  console.error('Erro ao carregar convidados:', error)
  throw new Error('Não foi possível carregar os convidados.')
}

    return (data as RSVPRecord[]).map(mapRSVPToGuest)
}
