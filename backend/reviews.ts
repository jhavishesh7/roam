import { supabase } from '../src/lib/supabase';

export async function getAllReviews() {
  const { data, error } = await supabase.from('Review').select('*');
  if (error) throw error;
  return data;
}

export async function createReview(review: any) {
  const { data, error } = await supabase.from('Review').insert([review]).select();
  if (error) throw error;
  return data;
} 