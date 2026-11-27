import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollBar } from "@/components/layout/ScrollBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import { themeInitScript } from "@/lib/theme";
import { axis, clashDisplay, switzer } from "@/styles/fonts";
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
      className={`${axis.variable} ${clashDisplay.variable} ${switzer.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the saved / system theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
        <ScrollBar />
      </body>
    </html>
  );
}
