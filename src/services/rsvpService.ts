
import { supabase } from '../lib/supabase'

export interface RSVPData {
  name: string
  attending: 'sim' | 'nao'
  companions: number
}

export async function saveRSVP(data: RSVPData) {
  const { error } = await supabase
    .from('rsvps')
    .insert({
      name: data.name.trim(),
      attending: data.attending,
      companions: data.attending === 'sim' ? data.companions : 0,
    })

  if (error) {
    throw new Error('Não foi possível salvar sua confirmação.')
  }
}
