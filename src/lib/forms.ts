"use server";

import { sendEmail } from "@/lib/email";
import { env, hasDatabase } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/server";
import { interests as interestOptions, schools } from "@/content/membership";
import { site } from "@/content/site";

export type FormState = { status: "idle" | "success" | "error"; message?: string; errors?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNAVAILABLE: FormState = {
  status: "error",
  message: `Sorry, the form isn't working right now. Please email us at ${site.email} instead.`,
};

function field(data: FormData, name: string, max = 500) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Bots fill every field; people never see the hidden "company" field. */
const isBot = (data: FormData) => field(data, "company") !== "";

export async function submitMembership(_prev: FormState, data: FormData): Promise<FormState> {
  const name = field(data, "name", 120);
  const email = field(data, "email", 254).toLowerCase();
  const school = field(data, "school", 120);
  const interests = data
    .getAll("interests")
    .map(String)
    .filter((i): i is (typeof interestOptions)[number] => (interestOptions as readonly string[]).includes(i));

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (!(schools as readonly string[]).includes(school)) errors.school = "Please choose one.";
  if (data.get("consent") !== "on") errors.consent = "We need your OK to store these details.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const firstName = name.split(" ")[0];
  const welcome: FormState = { status: "success", message: `Welcome to Boost, ${firstName}! We'll be in touch at ${email}.` };
  if (isBot(data)) return welcome;
  if (!hasDatabase()) return UNAVAILABLE;

  const db = createServiceClient();
  const { data: existing } = await db.from("members").select("id, left_at").eq("email", email).maybeSingle();

  if (existing && !existing.left_at) {
    return { status: "success", message: `Good news, ${firstName}: you're already a Boost member.` };
  }

  const now = new Date().toISOString();
  const row = { name, email, school, interests, consent_at: now };
  const { error } = existing
    ? await db.from("members").update({ ...row, left_at: null, joined_at: now }).eq("id", existing.id)
    : await db.from("members").insert(row);
  if (error) {
    console.error("[forms] membership insert failed", error.message);
    return UNAVAILABLE;
  }

  await Promise.all([
    sendEmail({
      to: email,
      subject: "Welcome to Boost Turku",
      paragraphs: [
        `Hi ${firstName},`,
        "Welcome to Boost! You're now a member of Boost Turku ry. Membership is free, and you can leave at any time by replying to this email.",
        `Our events are all on lu.ma: ${site.links.luma}. Subscribe there to hear about new ones first, and join our Telegram for news: ${site.community.telegram.href}`,
        "See you at the next event,\nThe Boost Turku board",
        `How we handle member data: ${env.siteUrl}/privacy/members`,
      ],
    }),
    env.notifyEmail &&
      sendEmail({
        to: env.notifyEmail,
        subject: `New member: ${name}`,
        replyTo: email,
        paragraphs: [
          `${name} (${email}) joined Boost through the website.`,
          `Studies at: ${school}`,
          `Interested in: ${interests.length ? interests.join(", ") : "nothing selected"}`,
          `Member register: ${env.siteUrl}/admin/members`,
        ],
      }),
  ]);

  return welcome;
}

export async function submitContact(_prev: FormState, data: FormData): Promise<FormState> {
  const name = field(data, "name", 120);
  const email = field(data, "email", 254);
  const topic = field(data, "topic", 120) || "A general question";
  const message = field(data, "message", 5000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "error", errors };

  const sent: FormState = { status: "success", message: "Thanks, your message is on its way. We usually reply within a few days." };
  if (isBot(data)) return sent;
  if (!hasDatabase()) return UNAVAILABLE;

  const db = createServiceClient();
  // Light rate limit: at most three messages from one address per ten minutes.
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await db
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", since);
  if ((count ?? 0) >= 3) {
    return { status: "error", message: "You've sent a few messages in a row. Please wait a few minutes and try again." };
  }

  const { error } = await db.from("contact_messages").insert({ name, email, topic, message });
  if (error) {
    console.error("[forms] contact insert failed", error.message);
    return UNAVAILABLE;
  }

  if (env.notifyEmail) {
    await sendEmail({
      to: env.notifyEmail,
      subject: `Contact form: ${topic}`,
      replyTo: email,
      paragraphs: [`From ${name} (${email})`, `Topic: ${topic}`, message, `Reply to this email to answer ${name.split(" ")[0]}. Inbox: ${env.siteUrl}/admin/messages`],
    });
  }

  return sent;
}
