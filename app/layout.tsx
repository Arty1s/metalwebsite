import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.example.cz"),
  title: "METALCRAFT | Zakázková kovovýroba na míru",
  description: "Zakázková výroba kovových dílů, přípravků, svařovaných konstrukcí a technologických celků přesně podle vašich požadavků.",
  alternates: { canonical: "/" },
  openGraph: { title: "METALCRAFT | Kovová řešení na míru", description: "Přesná zakázková kovovýroba od návrhu po dodání.", locale: "cs_CZ", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="cs"><body>{children}</body></html>;
}
