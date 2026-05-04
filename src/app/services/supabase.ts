import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialized client
let supabaseClient: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabaseClient) {
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
      console.warn('Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment.');
      return null;
    }
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * Defaults to a bucket named 'website-assets'
 */
export async function uploadToSupabase(file: File, bucket = 'website-assets'): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Error uploading to Supabase:', uploadError);
    return null;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Saves website configuration to Supabase 'site_settings' table.
 */
export async function saveWebsiteConfig(config: unknown): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  // We'll update the first record or insert if it doesn't exist
  // Using 'upsert' with id 1 to maintain a single configuration record
  const { error } = await supabase
    .from('site_settings')
    .upsert({ id: 1, content: config, updated_at: new Date() }, { onConflict: 'id' });

  if (error) {
    console.error('Error saving config to Supabase:', error);
    return false;
  }
  return true;
}

/**
 * Fetches website configuration from Supabase 'site_settings' table.
 */
export async function getWebsiteConfig(): Promise<unknown | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_settings')
    .select('content')
    .eq('id', 1)
    .single();

  if (error) {
    console.warn('Error fetching config from Supabase (maybe table is empty):', error);
    return null;
  }
  return data?.content;
}
