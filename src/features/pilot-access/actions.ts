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
    redirect("/?access=denied");
  }

  await grantPilotAccess();
  redirect("/");
}

export async function signOutOfPilot() {
  await revokePilotAccess();
  redirect("/");
}
