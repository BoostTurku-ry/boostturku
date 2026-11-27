import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { memberNotice, privacyPolicy } from "@/content/privacy";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: "How Boost Turku ry handles personal data on its website, in messages and at events.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} related={{ href: "/privacy/members", label: memberNotice.title }} />;
}
