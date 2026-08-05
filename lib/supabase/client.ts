import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Lazy, memoized browser client using the public anon key. Returns null when
 * env vars aren't configured (e.g. this feature hasn't been wired up yet, or a
 * build/preview environment without secrets) so callers can degrade gracefully
 * instead of crashing. Never call createClient() at module scope — that runs
 * during the build/prerender step, before env vars are guaranteed to exist.
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    client = null;
    return client;
  }

  client = createClient(url, anonKey);
  return client;
}
