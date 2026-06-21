import { CalendarDays, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DashboardHome() {
  return (
    <main className="min-h-dvh bg-background px-6 py-8 text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-border border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted-foreground text-sm">YogaFlow</p>
            <h1 className="font-semibold text-3xl tracking-normal">
              Studio dashboard
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <CalendarDays />
              Today
            </Button>
            <Button>
              <Plus />
              New student
            </Button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Today classes", "3"],
            ["Attendance queue", "18"],
            ["Renewals soon", "5"],
          ].map(([label, value]) => (
            <div
              className="rounded-lg border border-border bg-card p-5 text-card-foreground shadow-xs"
              key={label}
            >
              <p className="text-muted-foreground text-sm">{label}</p>
              <p className="mt-3 font-semibold text-3xl">{value}</p>
            </div>
          ))}
        </div>

        <section className="rounded-lg border border-border bg-card p-5 text-card-foreground shadow-xs">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-medium text-lg">Evening class</h2>
              <p className="text-muted-foreground text-sm">
                Saturday, Monday, Wednesday · 18:00-19:00
              </p>
            </div>
            <Users className="size-5 text-primary" />
          </div>
        </section>
      </section>
    </main>
  );
}
