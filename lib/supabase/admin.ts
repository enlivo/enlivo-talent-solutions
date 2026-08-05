import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Lazy, memoized server-only client using the service role key. This bypasses
 * Row Level Security, so it must NEVER be imported into a "use client"
 * component or exposed to the browser — it's for the admin dashboard's server
 * components and route handlers only. The `server-only` import makes any
 * accidental client-side import fail at build time rather than silently
 * leaking the key. Returns null when env vars aren't configured so the admin
 * dashboard can show a clear message instead of crashing.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    client = null;
    return client;
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return client;
}
