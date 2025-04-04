import { supabase } from './supabase';
import type { Activity } from './types';

export async function getActivities() {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }

  return data.map(activity => ({
    ...activity,
    created_at: new Date(activity.created_at),
    updated_at: new Date(activity.updated_at)
  }));
}

export async function getActivityById(id: string): Promise<Activity> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }

  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
}