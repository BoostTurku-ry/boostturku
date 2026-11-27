import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { memberNotice, privacyPolicy } from "@/content/privacy";

export const metadata: Metadata = {
  title: memberNotice.title,
  description: "What Boost Turku ry stores in its member register, why, and for how long.",
};

export default function MemberNoticePage() {
  return <LegalPage doc={memberNotice} related={{ href: "/privacy", label: privacyPolicy.title }} />;
}
