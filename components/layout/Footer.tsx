import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Executive Search", href: "/#services" },
      { label: "Permanent Staffing", href: "/#services" },
      { label: "Contract & Temp Staffing", href: "/#services" },
      { label: "RPO", href: "/#services" },
    ],
  },
  {
    heading: "Industries",
    links: [{ label: "Where We Work", href: "/industries" }],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal pt-20">
      <div className="container-px mx-auto max-w-content">
        <div className="grid gap-12 border-b border-line-on-teal pb-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/images/logo-large.png" alt="Enlivo Talent Solutions logo" width={56} height={56} />
              <span className="font-display text-lg font-medium text-on-teal">
                Enlivo Talent Solutions
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-on-teal/60">
              A product of Enlivo Global Tech Solutions Private Limited.
            </p>
            <div className="mt-8 space-y-1 text-sm text-on-teal/60">
              <p>akshay@enlivotalentsolutions.com</p>
              <p>contact@enlivotalentsolutions.com</p>
              <p className="mt-3">+91 78993 87578</p>
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Enlivo Talent Solutions on LinkedIn"
              className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-on-teal text-on-teal/70 transition-colors hover:border-on-teal hover:text-on-teal"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <Eyebrow tone="on-teal">{column.heading}</Eyebrow>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-teal/70 transition-colors hover:text-on-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 py-8 text-xs text-on-teal/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Enlivo Global Tech Solutions Private Limited. All rights reserved.</p>
          <p className="font-mono uppercase tracking-mono">Recruitment, Done Properly</p>
        </div>
      </div>
    </footer>
  );
}
