import type { Metadata } from "next";

// The admin dashboard is a password-gated internal tool, not public content —
// keep it out of search results and off crawlers entirely.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
