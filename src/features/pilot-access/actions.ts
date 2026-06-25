"use server";

import { redirect } from "next/navigation";

import {
  grantPilotAccess,
  revokePilotAccess,
  verifyPilotPassword,
} from "./auth";

export async function signInToPilot(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || !verifyPilotPassword(password)) {
    redirect("/coach?access=denied");
  }

  await grantPilotAccess();
  redirect("/coach");
}

export async function signOutOfPilot() {
  await revokePilotAccess();
  redirect("/coach");
}
