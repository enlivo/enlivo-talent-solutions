-- Enlivo Talent Solutions — careers application system
--
-- Run this entire file once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run).
--
-- Before running this, create the "resumes" Storage bucket via
-- Dashboard → Storage → New bucket → name it exactly "resumes", and leave
-- it PRIVATE (not public). Resumes contain PII, so they're never served via
-- a public URL: `applications.resume_url` stores the storage PATH, and the
-- password-gated admin dashboard turns that into a short-lived signed URL
-- server-side (using the service role key) only when a recruiter is
-- actually viewing the dashboard. A public bucket would defeat this.

-- 1. Applications table ------------------------------------------------

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_slug text not null,
  job_title text not null,
  applicant_name text not null,
  applicant_email text not null,
  applicant_phone text not null,
  resume_url text not null,
  cover_note text,
  submitted_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'contacted', 'rejected'))
);

create index if not exists applications_job_slug_idx on public.applications (job_slug);
create index if not exists applications_submitted_at_idx on public.applications (submitted_at desc);

alter table public.applications enable row level security;

-- Public applicants (using the anon key from the browser) may INSERT an
-- application, but may never read, update, or delete rows — that would let
-- anyone with the anon key (it's public, shipped in the browser bundle)
-- browse every applicant's name, email, and resume. The admin dashboard
-- reads/updates using the service role key instead, which bypasses RLS
-- entirely and is never exposed to the browser.
create policy "anon can submit applications"
  on public.applications
  for insert
  to anon
  with check (true);

-- 2. Storage policies for the "resumes" bucket -------------------------

-- Allow anyone (anon) to upload a resume file. Uploads only, not listing or
-- deleting other people's files.
create policy "anon can upload resumes"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'resumes');

-- Deliberately no SELECT policy for anon/public here. The admin dashboard
-- reads resumes (and generates signed URLs) via the service role key, which
-- bypasses RLS entirely — it doesn't need a policy. Anon should not be able
-- to list or read other applicants' resumes directly through the storage API.
--
-- If an earlier version of this schema was already run against this project
-- and created a "public can read resumes by exact path" SELECT policy, drop
-- it — it's not used by the app and is unnecessary residual access:
--   drop policy if exists "public can read resumes by exact path" on storage.objects;

-- 3. Candidate interest table (talent-pipeline signups) -----------------
--
-- This is deliberately a SEPARATE table from `applications`. Someone
-- applying to work AT Enlivo (a job application) and someone registering
-- general interest for future client placements (a candidate) are different
-- audiences with different intent — keeping them in separate tables means
-- they can never get mixed up in the admin dashboard or in a query.
--
-- Resumes reuse the same "resumes" Storage bucket as job applications, just
-- under a "candidate-interest/" path prefix instead of a job slug — no new
-- bucket, no new storage policies needed, the existing anon-insert policy
-- already covers any path inside the bucket.

create table if not exists public.candidate_interest (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  -- Named current_title, not current_role: CURRENT_ROLE is a reserved
  -- SQL keyword (same family as CURRENT_USER, CURRENT_DATE), so using it
  -- unquoted as a column name is a syntax error.
  current_title text,
  industry_interest text not null
    check (industry_interest in ('BFSI', 'Fintech', 'Technology', 'Healthcare', 'Other')),
  resume_url text not null,
  note text,
  submitted_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'contacted', 'rejected'))
);

create index if not exists candidate_interest_submitted_at_idx on public.candidate_interest (submitted_at desc);
create index if not exists candidate_interest_industry_idx on public.candidate_interest (industry_interest);

alter table public.candidate_interest enable row level security;

-- Same pattern as `applications`: anon can insert only, never read/update/delete.
create policy "anon can submit candidate interest"
  on public.candidate_interest
  for insert
  to anon
  with check (true);
