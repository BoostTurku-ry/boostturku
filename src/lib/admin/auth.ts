import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { hasDatabase } from "@/lib/env";
import { createUserClient } from "@/lib/supabase/server";

export type Admin = { email: string; name: string | null };

/**
 * The signed-in board member, or null. Verifies the session token with Supabase
 * and checks the email against public.admins (which RLS only lets admins read).
 */
export async function getAdmin(): Promise<Admin | null> {
  // Always decided per request, never at build time (even when keys are missing).
  await connection();
  if (!hasDatabase()) return null;
  const supabase = await createUserClient();
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === "string" ? data.claims.email.toLowerCase() : null;
  if (!email) return null;
  const { data: row } = await supabase.from("admins").select("email, name").eq("email", email).maybeSingle<Admin>();
  return row ?? null;
}

/** Like getAdmin, but sends anyone who isn't a signed-in board member to the login page. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
