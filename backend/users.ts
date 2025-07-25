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
  const { data, error } = await supabase.from('UserProfile').select('*').eq('id', id);
  if (error) throw error;
  if (!data || data.length === 0) return null; // No profile found
  if (data.length > 1) {
    // Optionally log a warning here
    return data[0]; // Return the first profile if duplicates exist
  }
  return data[0];
} 