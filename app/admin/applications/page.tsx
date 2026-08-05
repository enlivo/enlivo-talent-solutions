import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  isAdminAuthConfigured,
  isValidAdminSessionCookie,
} from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

type JobApplication = {
  id: string;
  job_slug: string;
  job_title: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  cover_note: string | null;
  submitted_at: string;
  status: string;
};

type CandidateInterest = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  current_title: string | null;
  industry_interest: string;
  resume_url: string;
  note: string | null;
  submitted_at: string;
  status: string;
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-paper px-6 py-28">
      <div className="max-w-md rounded-2xl border border-line bg-card p-8 text-center">
        {children}
      </div>
    </main>
  );
}

function ViewTabs({ view }: { view: "jobs" | "candidates" }) {
  return (
    <div className="mt-8 flex gap-2 border-b border-line">
      <Link
        href="/admin/applications?view=jobs"
        className={`px-4 py-3 text-sm font-medium transition-colors ${
          view === "jobs"
            ? "border-b-2 border-gold text-ink"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        Job Applications
      </Link>
      <Link
        href="/admin/applications?view=candidates"
        className={`px-4 py-3 text-sm font-medium transition-colors ${
          view === "candidates"
            ? "border-b-2 border-gold text-ink"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        Candidate Interest
      </Link>
    </div>
  );
}

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: { job?: string; industry?: string; view?: string };
}) {
  if (!isAdminAuthConfigured()) {
    return (
      <Wrapper>
        <p className="font-display text-xl font-medium text-ink">
          Admin login is not configured
        </p>
        <p className="mt-2 text-ink-soft">
          Set an <code className="font-mono text-sm">ADMIN_PASSWORD</code>{" "}
          environment variable to enable the applications dashboard.
        </p>
      </Wrapper>
    );
  }

  const sessionCookie = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionCookie(sessionCookie)) {
    redirect("/admin/login");
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <Wrapper>
        <p className="font-display text-xl font-medium text-ink">
          Supabase is not configured
        </p>
        <p className="mt-2 text-ink-soft">
          Add <code className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          and <code className="font-mono text-sm">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          to this project&rsquo;s environment to load applications.
        </p>
      </Wrapper>
    );
  }

  const view = searchParams.view === "candidates" ? "candidates" : "jobs";

  return (
    <main className="min-h-screen bg-paper px-6 py-16 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mono-label text-ink-soft">Admin</p>
            <h1 className="mt-2 font-display text-3xl font-medium text-ink">
              Applications
            </h1>
          </div>
          <LogoutButton />
        </div>

        <ViewTabs view={view} />

        {view === "jobs" ? (
          <JobApplicationsList supabase={supabase} jobFilter={searchParams.job} />
        ) : (
          <CandidateInterestList
            supabase={supabase}
            industryFilter={searchParams.industry}
          />
        )}
      </div>
    </main>
  );
}

async function JobApplicationsList({
  supabase,
  jobFilter,
}: {
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>;
  jobFilter?: string;
}) {
  let query = supabase
    .from("applications")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (jobFilter) {
    query = query.eq("job_slug", jobFilter);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <p className="mt-8 text-ink-soft">Couldn&rsquo;t load applications: {error.message}</p>
    );
  }

  const applications = (data ?? []) as JobApplication[];
  const jobSlugs = Array.from(new Set(applications.map((a) => a.job_slug)));

  const signedUrlEntries = await Promise.all(
    applications.map(async (app) => {
      const { data: signed } = await supabase.storage
        .from("resumes")
        .createSignedUrl(app.resume_url, 60 * 60);
      return [app.id, signed?.signedUrl ?? null] as const;
    })
  );
  const signedUrls = Object.fromEntries(signedUrlEntries);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3 border-b border-line pb-6">
        <Link
          href="/admin/applications?view=jobs"
          className={`mono-label rounded-full border px-4 py-2 transition-colors ${
            !jobFilter
              ? "border-gold bg-gold text-ink"
              : "border-line text-ink-soft hover:border-ink/30"
          }`}
        >
          All roles
        </Link>
        {jobSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/admin/applications?view=jobs&job=${slug}`}
            className={`mono-label rounded-full border px-4 py-2 transition-colors ${
              jobFilter === slug
                ? "border-gold bg-gold text-ink"
                : "border-line text-ink-soft hover:border-ink/30"
            }`}
          >
            {slug}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-col divide-y divide-line">
        {applications.length === 0 && (
          <p className="py-10 text-ink-soft">No applications yet.</p>
        )}
        {applications.map((app) => (
          <div
            key={app.id}
            className="flex flex-col gap-4 py-6 lg:flex-row lg:items-start lg:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-lg font-medium text-ink">
                  {app.applicant_name}
                </p>
                <span className="mono-label rounded-full border border-line px-2.5 py-1 text-[10px] text-ink-soft">
                  {app.job_title}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                {app.applicant_email} · {app.applicant_phone}
              </p>
              <p className="mono-label mt-2 text-ink-soft/70">
                Submitted {new Date(app.submitted_at).toLocaleString()}
              </p>
              {app.cover_note && (
                <p className="mt-2 max-w-xl text-sm text-ink-soft">{app.cover_note}</p>
              )}
              {signedUrls[app.id] ? (
                <a
                  href={signedUrls[app.id] as string}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono-label mt-2 inline-block text-gold-deep underline"
                >
                  Download resume
                </a>
              ) : (
                <p className="mono-label mt-2 text-red-600">Resume link unavailable</p>
              )}
            </div>
            <StatusSelect id={app.id} status={app.status} endpoint="/api/admin/applications" />
          </div>
        ))}
      </div>
    </>
  );
}

async function CandidateInterestList({
  supabase,
  industryFilter,
}: {
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>;
  industryFilter?: string;
}) {
  let query = supabase
    .from("candidate_interest")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (industryFilter) {
    query = query.eq("industry_interest", industryFilter);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <p className="mt-8 text-ink-soft">
        Couldn&rsquo;t load candidate interest: {error.message}
      </p>
    );
  }

  const candidates = (data ?? []) as CandidateInterest[];
  const industries = Array.from(new Set(candidates.map((c) => c.industry_interest)));

  const signedUrlEntries = await Promise.all(
    candidates.map(async (c) => {
      const { data: signed } = await supabase.storage
        .from("resumes")
        .createSignedUrl(c.resume_url, 60 * 60);
      return [c.id, signed?.signedUrl ?? null] as const;
    })
  );
  const signedUrls = Object.fromEntries(signedUrlEntries);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3 border-b border-line pb-6">
        <Link
          href="/admin/applications?view=candidates"
          className={`mono-label rounded-full border px-4 py-2 transition-colors ${
            !industryFilter
              ? "border-gold bg-gold text-ink"
              : "border-line text-ink-soft hover:border-ink/30"
          }`}
        >
          All industries
        </Link>
        {industries.map((industry) => (
          <Link
            key={industry}
            href={`/admin/applications?view=candidates&industry=${industry}`}
            className={`mono-label rounded-full border px-4 py-2 transition-colors ${
              industryFilter === industry
                ? "border-gold bg-gold text-ink"
                : "border-line text-ink-soft hover:border-ink/30"
            }`}
          >
            {industry}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-col divide-y divide-line">
        {candidates.length === 0 && (
          <p className="py-10 text-ink-soft">No candidate interest submissions yet.</p>
        )}
        {candidates.map((c) => (
          <div
            key={c.id}
            className="flex flex-col gap-4 py-6 lg:flex-row lg:items-start lg:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-lg font-medium text-ink">{c.full_name}</p>
                <span className="mono-label rounded-full border border-gold/50 px-2.5 py-1 text-[10px] text-gold-deep">
                  {c.industry_interest}
                </span>
                {c.current_title && (
                  <span className="mono-label rounded-full border border-line px-2.5 py-1 text-[10px] text-ink-soft">
                    {c.current_title}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                {c.email} · {c.phone}
              </p>
              <p className="mono-label mt-2 text-ink-soft/70">
                Submitted {new Date(c.submitted_at).toLocaleString()}
              </p>
              {c.note && <p className="mt-2 max-w-xl text-sm text-ink-soft">{c.note}</p>}
              {signedUrls[c.id] ? (
                <a
                  href={signedUrls[c.id] as string}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono-label mt-2 inline-block text-gold-deep underline"
                >
                  Download resume
                </a>
              ) : (
                <p className="mono-label mt-2 text-red-600">Resume link unavailable</p>
              )}
            </div>
            <StatusSelect
              id={c.id}
              status={c.status}
              endpoint="/api/admin/candidate-interest"
            />
          </div>
        ))}
      </div>
    </>
  );
}
