import { supabase } from '../src/lib/supabase';

export async function getAllHomestays() {
  const { data, error } = await supabase.from('Homestay').select('*');
  if (error) throw error;
  return data;
}

export async function getHomestayById(id: string) {
  const { data, error } = await supabase.from('Homestay').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
} 