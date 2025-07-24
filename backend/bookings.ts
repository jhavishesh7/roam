import { supabase } from '../src/lib/supabase';

export async function getAllBookings() {
  const { data, error } = await supabase.from('Booking').select('*');
  if (error) throw error;
  return data;
}

export async function createBooking(booking: any) {
  const { data, error } = await supabase.from('Booking').insert([booking]).select();
  if (error) throw error;
  return data;
} 