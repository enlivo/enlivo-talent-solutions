import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Loader } from "@/components/layout/Loader";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const SITE_URL = "https://enlivotalentsolutions.com";
const SITE_NAME = "Enlivo Talent Solutions";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Enlivo Talent Solutions | BFSI Recruitment & Executive Search India",
    template: "%s | Enlivo Talent Solutions",
  },
  description:
    "Enlivo Talent Solutions places background-verified talent for BFSI, NBFC, and insurance clients across India. Executive search, permanent staffing, contract staffing, and RPO, built around your compliance requirements.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Enlivo Talent Solutions | BFSI Recruitment & Executive Search India",
    description:
      "Background-verified talent for BFSI, NBFC, and insurance clients across India. Executive search, permanent staffing, contract staffing, and RPO.",
    images: ["/images/logo-large.png"],
  },
  twitter: {
    card: "summary",
    title: "Enlivo Talent Solutions | BFSI Recruitment & Executive Search India",
    description:
      "Background-verified talent for BFSI, NBFC, and insurance clients across India. Executive search, permanent staffing, contract staffing, and RPO.",
    images: ["/images/logo-large.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        {/* reducedMotion="user" makes every Framer Motion animation in the tree
            respect the OS-level prefers-reduced-motion setting automatically,
            in addition to the explicit checks in individual components */}
        <MotionConfig reducedMotion="user">
          <LenisProvider>
            <Loader>
              <GrainOverlay />
              <Nav />
              {children}
              <Footer />
            </Loader>
          </LenisProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
