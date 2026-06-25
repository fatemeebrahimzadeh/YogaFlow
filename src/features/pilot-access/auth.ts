import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const PILOT_ACCESS_COOKIE_NAME = "yogaflow_pilot_access";

const oneWeekInSeconds = 60 * 60 * 24 * 7;

export function isPilotAccessConfigured() {
  return Boolean(getPilotPassword());
}

export async function hasPilotAccess() {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(PILOT_ACCESS_COOKIE_NAME)?.value;
  const expectedToken = getPilotAccessToken();

  if (!expectedToken || !cookieToken) {
    return false;
  }

  return timingSafeEqualText(cookieToken, expectedToken);
}

export async function grantPilotAccess() {
  const token = getPilotAccessToken();

  if (!token) {
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set(PILOT_ACCESS_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: oneWeekInSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function revokePilotAccess() {
  const cookieStore = await cookies();

  cookieStore.set(PILOT_ACCESS_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function verifyPilotPassword(password: string) {
  const pilotPassword = getPilotPassword();

  if (!pilotPassword) {
    return false;
  }

  return timingSafeEqualText(password, pilotPassword);
}

function getPilotPassword() {
  return process.env.YOGAFLOW_PILOT_PASSWORD?.trim();
}

function getPilotAccessToken() {
  const pilotPassword = getPilotPassword();

  if (!pilotPassword) {
    return undefined;
  }

  return createHash("sha256")
    .update(`yogaflow-pilot-access:${pilotPassword}`)
    .digest("hex");
}

function timingSafeEqualText(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}
