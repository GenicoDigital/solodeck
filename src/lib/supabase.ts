import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the secret (service) key. This bypasses
 * RLS and can sign URLs for the private "toolkits" bucket, so it must NEVER be
 * imported into client components. Created lazily so a missing key doesn't
 * break `next build`.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL or SUPABASE_SECRET_KEY is not set");
    }
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}
