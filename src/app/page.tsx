import { connection } from "next/server";

import { DashboardHome } from "@/features/dashboard";
import {
  hasPilotAccess,
  isPilotAccessConfigured,
  PilotAccessPanel,
  SignOutButton,
} from "@/features/pilot-access";

type PageProps = {
  searchParams: Promise<{
    access?: string | string[];
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  await connection();

  const [{ access }, canAccessPilot] = await Promise.all([
    searchParams,
    hasPilotAccess(),
  ]);

  if (!canAccessPilot) {
    return (
      <PilotAccessPanel
        isConfigured={isPilotAccessConfigured()}
        showError={access === "denied"}
      />
    );
  }

  return <DashboardHome currentDate={new Date()} signOut={<SignOutButton />} />;
}
