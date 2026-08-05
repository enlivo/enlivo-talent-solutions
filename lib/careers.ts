// TODO: replace with Enlivo's real, current internal openings before launch.
export const departments = [
  "All",
  "Sourcing",
  "Client Success",
  "Operations",
  "Leadership",
] as const;

export type Department = (typeof departments)[number];

export const openRoles = [
  {
    slug: "talent-researcher",
    title: "Talent Researcher",
    department: "Sourcing" as Department,
    location: "Remote (India)",
    type: "Full-time",
    summary: "Find and engage exceptional candidates before they're actively looking.",
    description:
      "You'll build and maintain talent maps across the regulated industries we serve, mapping who does what at which firm long before a role opens. Day to day means market research, cold outreach that doesn't read like a template, and keeping our internal talent pool current so consultants can move fast when a client brief lands. You'll work closely with the consultants running each search, and with clients directly when a role needs first-hand context on what \"good\" looks like for their team.",
  },
  {
    slug: "client-success-manager",
    title: "Client Success Manager",
    department: "Client Success" as Department,
    location: "Bengaluru, India",
    type: "Full-time",
    summary: "Own the relationship after the shortlist lands, from kickoff to 90-day check-in.",
    description:
      "You'll be the day-to-day point of contact for a portfolio of BFSI, NBFC, and insurance clients, from the moment a search kicks off through the 90-day check-in after a hire starts. That means running intake calls that actually surface what a client needs (not just a job description), keeping candidates and hiring managers aligned on where things stand, and flagging risk early rather than after a search stalls. You'll work closely with sourcing and delivery, and you'll be the person clients trust to tell them the truth about their own hiring bar.",
  },
  {
    slug: "recruitment-consultant-tech",
    title: "Tech Recruitment Consultant",
    department: "Sourcing" as Department,
    location: "Bengaluru, India / Remote",
    type: "Full-time",
    summary: "Run full-cycle technical hiring for a portfolio of Enlivo's clients.",
    description:
      "You'll own full-cycle recruitment for technology roles at regulated clients, from initial brief through offer and onboarding support. That includes writing role scorecards with hiring managers, sourcing and screening candidates against both skill and compliance requirements, and managing the shortlist-to-offer process end to end. You'll need enough technical fluency to have a real conversation with a candidate about their work, and enough process discipline to keep background verification and confidential search requirements airtight throughout.",
  },
  {
    slug: "operations-associate",
    title: "Operations Associate",
    department: "Operations" as Department,
    location: "Bengaluru, India",
    type: "Full-time",
    summary: "Keep the engine room running: scheduling, data hygiene, reporting.",
    description:
      "You'll keep the operational backbone of Enlivo's search process running: interview scheduling across candidates, hiring managers, and time zones, keeping candidate and client data clean and current in our systems, and building the reporting that tells consultants and clients where every search actually stands. It's a role for someone who finds a well-run process satisfying in its own right, and who can spot when a process is quietly breaking before it becomes a client-facing problem.",
  },
  {
    slug: "head-of-talent-delivery",
    title: "Head of Talent Delivery",
    department: "Leadership" as Department,
    location: "Bengaluru, India",
    type: "Full-time",
    summary: "Own delivery quality and SLAs across Enlivo's entire client portfolio.",
    description:
      "You'll own delivery quality and hiring SLAs across Enlivo's full client portfolio, setting the bar for what a shortlist has to clear before it reaches a client and building the team and process that gets us there consistently. This is a leadership role: you'll manage consultants and client success managers, own the escalation path when a search is at risk, and be the person ultimately accountable for whether our compliance-first promise to clients holds up in practice, search after search.",
  },
] as const;

export type OpenRole = (typeof openRoles)[number];
