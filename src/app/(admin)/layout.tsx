import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Boost admin" },
  robots: { index: false, follow: false },
};

/** Board-only area. No public header or footer. */
export default function AdminRootLayout({ children }: LayoutProps<"/">) {
  return <div className="flex min-h-svh flex-1 flex-col bg-paper">{children}</div>;
}
