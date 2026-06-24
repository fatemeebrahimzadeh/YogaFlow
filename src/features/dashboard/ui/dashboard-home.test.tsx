import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DashboardHome } from "./dashboard-home";

describe("DashboardHome", () => {
  it("renders the Persian coach daily action panel", () => {
    render(<DashboardHome currentDate={new Date(2026, 5, 22)} />);

    expect(
      screen.getByRole("heading", { name: "پنل روزانه مربی" }),
    ).toBeInTheDocument();
    expect(screen.getByText("دوشنبه")).toBeInTheDocument();
    expect(screen.getByText("۱ تیر ۱۴۰۵")).toBeInTheDocument();
    expect(screen.queryByText("2026-06-22")).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "کارهای امروز مربی" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ثبت حضور و غیاب" }),
    ).toBeInTheDocument();
    expect(screen.getByText("پیگیری پرداخت یا تمدید")).toBeInTheDocument();
    expect(screen.getByText("دوره تمام‌شده")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "کلاس‌های امروز" }),
    ).toBeInTheDocument();
    expect(screen.getByText("فلو عصر")).toBeInTheDocument();
    expect(
      screen.getByText("جلسه پرظرفیت عصر با تمرکز روی فلو و پیگیری تمدیدها."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "سارا و ندا نزدیک تمدید هستند؛ لیلا قبل از ادامه کلاس باید تمدید شود.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("یوگای صبحگاهی")).toBeInTheDocument();
    expect(screen.getAllByText("سارا احمدی")).not.toHaveLength(0);

    expect(
      screen.getByRole("heading", { name: "پیگیری تمدید و پرداخت" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("تمدید فوری")).not.toHaveLength(0);
    expect(
      screen.getByRole("heading", { name: "وضعیت همه شاگردها" }),
    ).toBeInTheDocument();
  });
});
