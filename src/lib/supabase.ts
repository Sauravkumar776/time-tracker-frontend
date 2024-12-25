import { createClient } from '@supabase/supabase-js';

// Fallback to development values if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdHBrdmR4eWtxbWxic2ZqYWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwMDc2MDAsImV4cCI6MTk2MjU4MzYwMH0.SR_ZO_EJhpBE4_EXAMPLEKEY';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using development fallback values.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);