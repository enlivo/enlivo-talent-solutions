import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, isValidAdminSessionCookie } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const ALLOWED_STATUSES = ["new", "reviewed", "contacted", "rejected"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionCookie = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionCookie(sessionCookie)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const status = body?.status;

  if (typeof status !== "string" || !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
