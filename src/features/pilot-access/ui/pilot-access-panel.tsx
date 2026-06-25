import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";

import { signInToPilot } from "../actions";

type PilotAccessPanelProps = {
  isConfigured: boolean;
  showError?: boolean;
};

export function PilotAccessPanel({
  isConfigured,
  showError = false,
}: PilotAccessPanelProps) {
  return (
    <main
      dir="rtl"
      className="flex min-h-dvh items-center justify-center bg-background px-4 py-8 text-right text-foreground sm:px-6"
    >
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-5 text-card-foreground shadow-xs">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <LockKeyhole className="size-5" />
          </span>
          <div>
            <p className="font-medium text-muted-foreground text-sm">
              YogaFlow
            </p>
            <h1 className="mt-1 font-semibold text-2xl tracking-normal">
              ورود به داشبورد مربی
            </h1>
            <p className="mt-2 text-muted-foreground text-sm leading-6">
              صفحه عمومی پروژه فقط داده ساختگی نشان می‌دهد. این آدرس برای مشاهده
              داده عملیاتی مربی محافظت شده است.
            </p>
          </div>
        </div>

        {isConfigured ? (
          <form action={signInToPilot} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm" htmlFor="pilot-password">
                رمز عبور
              </label>
              <input
                autoComplete="current-password"
                className="h-10 rounded-md border border-input bg-background px-3 text-right text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                id="pilot-password"
                name="password"
                required
                type="password"
              />
              {showError ? (
                <p className="text-destructive text-sm">
                  رمز عبور درست نیست. دوباره تلاش کنید.
                </p>
              ) : null}
            </div>
            <Button type="submit">ورود</Button>
          </form>
        ) : (
          <div className="mt-6 rounded-md border border-destructive/25 bg-destructive/10 px-3 py-3 text-destructive text-sm leading-6">
            متغیر محیطی YOGAFLOW_PILOT_PASSWORD تنظیم نشده است. قبل از
            اشتراک‌گذاری آدرس خصوصی مربی، برای آن یک رمز قوی تنظیم کنید.
          </div>
        )}
      </section>
    </main>
  );
}
