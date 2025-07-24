import { supabase } from '../src/lib/supabase';

export async function getAllUsers() {
  const { data, error } = await supabase.from('User').select('*');
  if (error) throw error;
  return data;
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.from('User').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getUserProfileById(id: string) {
  const { data, error } = await supabase.from('UserProfile').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
} 