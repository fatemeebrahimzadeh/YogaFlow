import { connection } from "next/server";

import { DashboardHome, demoDashboardData } from "@/features/dashboard";

export default async function Page() {
  await connection();

  return (
    <DashboardHome currentDate={new Date()} dashboardData={demoDashboardData} />
  );
}
