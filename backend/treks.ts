import { supabase } from '../src/lib/supabase';

export type Trek = {
  id: string;
  name: string;
  location: string;
  description: string;
  duration: string;
  difficulty: string;
  price: number;
  image: string;
  max_group_size: number;
  start_dates: string[];
  created_at: string;
  rating: number;
  features: string[];
  marketplace?: string; // new column
};

export async function getAllTreks() {
  const { data, error } = await supabase.from('Trek').select('*');
  if (error) throw error;
  return data;
}

export async function getTrekById(id: string) {
  const { data, error } = await supabase.from('Trek').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function updateMarketplace(id: string, value: string) {
  const { data, error } = await supabase.from('Trek').update({ marketplace: value }).eq('id', id).select();
  if (error) throw error;
  return data;
}

// Utility to add the 'marketplace' column (run only once, not automatically)
export async function addMarketplaceColumn() {
  // This is a raw SQL query. Only run this if the column does not exist.
  return await supabase.rpc('add_marketplace_column');
} 