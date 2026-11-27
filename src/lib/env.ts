import "server-only";

/**
 * Server-side configuration. Every value is optional at build time so the site
 * still builds and runs without a backend; features that need a value check
 * for it and degrade clearly (see `.env.example` for what each one does).
 */
export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  emailFrom: process.env.EMAIL_FROM ?? "Boost Turku <noreply@boostturku.com>",
  /** Where the board is notified about new members and messages. */
  notifyEmail: process.env.NOTIFY_EMAIL ?? "",
  /** Weekly member-register backup goes here (optional). */
  backupEmail: process.env.BACKUP_EMAIL ?? "",
  cronSecret: process.env.CRON_SECRET ?? "",
};

export const hasDatabase = () => Boolean(env.supabaseUrl && env.supabasePublishableKey && env.supabaseSecretKey);
export const hasEmail = () => Boolean(env.resendApiKey);
