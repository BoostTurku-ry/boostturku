"use server";

export type FormState = { status: "idle" | "success" | "error"; message?: string; errors?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: FormData, name: string) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * TODO(boost): deliver submissions somewhere real (e.g. email via Resend, or a
 * Google Sheet) before launch. Until then they are only written to the server log.
 */
async function deliver(kind: "membership" | "contact", payload: Record<string, unknown>) {
  console.info(`[form:${kind}]`, JSON.stringify(payload));
}

export async function submitMembership(_prev: FormState, data: FormData): Promise<FormState> {
  const name = field(data, "name");
  const email = field(data, "email");
  const school = field(data, "school");
  const interests = data.getAll("interests").map(String);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (!school) errors.school = "Please choose one.";
  if (data.get("consent") !== "on") errors.consent = "We need your OK to store these details.";
  if (Object.keys(errors).length) return { status: "error", errors };

  await deliver("membership", { name, email, school, interests });
  return { status: "success", message: `Welcome to Boost, ${name.split(" ")[0]}! We'll be in touch at ${email}.` };
}

export async function submitContact(_prev: FormState, data: FormData): Promise<FormState> {
  const name = field(data, "name");
  const email = field(data, "email");
  const topic = field(data, "topic");
  const message = field(data, "message");

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "error", errors };

  await deliver("contact", { name, email, topic, message });
  return { status: "success", message: "Thanks, your message is on its way. We usually reply within a few days." };
}
