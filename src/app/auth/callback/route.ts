import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createUserClient } from "@/lib/supabase/server";

/**
 * Where the sign-in link in the board's email lands. Supports both Supabase
 * link styles: `?code=` (same browser, PKCE) and `?token_hash=&type=` (works
 * on any device once the email template uses {{ .TokenHash }}; see README).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const supabase = await createUserClient();
  let ok = false;
  if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  } else if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).error;
  }

  return NextResponse.redirect(new URL(ok ? "/admin" : "/admin/login?error=link", origin));
}
