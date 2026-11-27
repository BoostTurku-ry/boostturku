import "server-only";
import { env, hasEmail } from "@/lib/env";

type Attachment = { filename: string; content: string };

type Email = {
  to: string | string[];
  subject: string;
  /** Plain paragraphs; rendered as both text and simple HTML. */
  paragraphs: string[];
  replyTo?: string;
  attachments?: Attachment[];
};

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Sends an email through Resend's REST API. Without RESEND_API_KEY it logs and
 * returns false, so forms keep working (data is already saved) before email is set up.
 */
export async function sendEmail({ to, subject, paragraphs, replyTo, attachments }: Email): Promise<boolean> {
  if (!hasEmail()) {
    console.info(`[email] not configured, skipped: "${subject}"`);
    return false;
  }
  const text = paragraphs.join("\n\n");
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#25031a">${paragraphs
    .map((p) => `<p style="margin:0 0 14px">${escape(p).replace(/\n/g, "<br>")}</p>`)
    .join("")}</div>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.emailFrom,
        to,
        subject,
        text,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(attachments ? { attachments: attachments.map((a) => ({ filename: a.filename, content: Buffer.from(a.content).toString("base64") })) } : {}),
      }),
    });
    if (!res.ok) {
      console.error(`[email] Resend responded ${res.status}: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] failed", error);
    return false;
  }
}
