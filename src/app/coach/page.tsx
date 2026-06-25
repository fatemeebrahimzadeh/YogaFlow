import { connection } from "next/server";

import { coachDashboardData, DashboardHome } from "@/features/dashboard";
import {
  hasPilotAccess,
  isPilotAccessConfigured,
  PilotAccessPanel,
  SignOutButton,
} from "@/features/pilot-access";

type CoachPageProps = {
  searchParams: Promise<{
    access?: string | string[];
  }>;
};

export default async function CoachPage({ searchParams }: CoachPageProps) {
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

  return (
    <DashboardHome
      currentDate={new Date()}
      dashboardData={coachDashboardData}
      signOut={<SignOutButton />}
    />
  );
}
