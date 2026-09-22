import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL = 'https://vqehwywibgnqvkkdpcuz.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_8BtMr3Hm24nwuMdUnWpSIQ_vOTKF41y';
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);