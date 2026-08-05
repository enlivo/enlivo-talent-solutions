import "server-only";
import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "enlivo_admin_session";

/** True once ADMIN_PASSWORD is set in the environment. */
export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/**
 * Deterministic session token derived from the admin password, so the login
 * route and any page checking the cookie can both verify it independently
 * without a session store. Never derivable without knowing ADMIN_PASSWORD.
 */
function getExpectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function checkAdminPassword(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function getAdminSessionCookieValue(): string | null {
  return getExpectedToken();
}

export function isValidAdminSessionCookie(value: string | undefined): boolean {
  const expected = getExpectedToken();
  if (!expected || !value) return false;

  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
