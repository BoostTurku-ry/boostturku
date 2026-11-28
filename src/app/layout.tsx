import type { Metadata } from "next";
import { site } from "@/content/site";
import { themeInitScript } from "@/lib/theme";
import { bricolage, instrumentSans } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Student entrepreneurship society`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://www.boostturku.com"),
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_FI",
    images: ["/images/community/team-red-hoodies.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the saved theme (light by default) before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
