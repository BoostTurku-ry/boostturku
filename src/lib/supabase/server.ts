import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

/**
 * Supabase client acting as the signed-in board member (reads the auth cookie).
 * Row level security applies, so it can only see what an admin may see.
 * Call only inside a Suspense boundary, a Server Action or a Route Handler.
 */
export async function createUserClient() {
  const cookieStore = await cookies();
  return createServerClient(env.supabaseUrl, env.supabasePublishableKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Called from a Server Component, where cookies are read-only. The proxy refreshes the session instead.
        }
      },
    },
  });
}

/**
 * Supabase client with the secret key. Bypasses row level security: use only in
 * server code for trusted writes (form submissions, scheduled maintenance).
 */
export function createServiceClient() {
  return createSupabaseClient(env.supabaseUrl, env.supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
