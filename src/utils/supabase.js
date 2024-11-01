import { createClient } from '@supabase/supabase-js'

// Debug environment variables (redacting sensitive parts)
const debugSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.slice(0, 8)}...` 
  : 'NOT_SET';

const debugAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
  ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 5)}...` 
  : 'NOT_SET';

console.log('Supabase Configuration:', {
  url: debugSupabaseUrl,
  keyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
});

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Test connection with correct table name
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('CampaignData')  // Updated table name
      .select('count');

    if (error) {
      console.error('Supabase connection error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return false;
    }

    console.log('Supabase connection successful, data:', data);
    return true;
  } catch (err) {
    console.error('Unexpected Supabase error:', err);
    return false;
  }
};

testConnection();