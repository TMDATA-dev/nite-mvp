import { supabase } from './supabase';
import type { Booking } from './types';

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to create bookings');
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      ...booking,
      user_id: user.id,
      booking_date: booking.booking_date.toISOString()
    }])
    .select('*, activity:activities(*)')
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }

  return {
    ...data,
    booking_date: new Date(data.booking_date),
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
}

export async function getBookings() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to get bookings');
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*, activity:activities(*)')
    .eq('user_id', user.id)
    .order('booking_date', { ascending: true });

  if (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }

  return data.map(booking => ({
    ...booking,
    booking_date: new Date(booking.booking_date),
    created_at: new Date(booking.created_at),
    updated_at: new Date(booking.updated_at)
  }));
}

export async function updateBooking(
  id: string,
  updates: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to update bookings');
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({
      ...updates,
      booking_date: updates.booking_date?.toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select('*, activity:activities(*)')
    .single();

  if (error) {
    console.error('Error updating booking:', error);
    throw error;
  }

  return {
    ...data,
    booking_date: new Date(data.booking_date),
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
}

export async function cancelBooking(id: string) {
  return updateBooking(id, { status: 'cancelled' });
}