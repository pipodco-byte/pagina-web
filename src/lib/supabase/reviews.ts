import { supabase } from './client';

export const getBusinessStats = async () => {
  const { data, error } = await supabase
    .from('business_stats')
    .select('rating, user_ratings_total')
    .eq('id', 1)
    .single();

  if (error) throw error;
  return data;
};
