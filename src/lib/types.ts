export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  room_number?: string;
  check_in_date?: Date;
  check_out_date?: Date;
  preferences?: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  duration: string;
  price: number;
  image_url?: string;
  available_times: string[];
  max_guests: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Booking {
  id: string;
  user_id: string;
  activity_id: string;
  booking_date: Date;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  created_at?: Date;
  updated_at?: Date;
  activity?: Activity;
}