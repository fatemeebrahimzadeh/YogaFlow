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
    expect(screen.getAllByText("دموی عمومی")).not.toHaveLength(0);
    expect(
      screen.getByText(/داده‌های ساختگی نمایش داده می‌شود/),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "کارهای امروز مربی" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ثبت حضور و غیاب" }),
    ).toBeInTheDocument();
    expect(screen.getByText("پیگیری پرداخت یا تمدید")).toBeInTheDocument();
    expect(screen.getByText("دوره تمام‌شده")).toBeInTheDocument();
    expect(screen.getByText("جلسات ذخیره‌شده")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "کلاس‌های امروز" }),
    ).toBeInTheDocument();
    expect(screen.getByText("مبانی عصر")).toBeInTheDocument();
    expect(
      screen.getByText(
        "نمونه سانس عصر برای نمایش تمدید، پرداخت و جلسات باقی‌مانده.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "یک شاگرد نزدیک تمدید است و یک جلسه ذخیره‌شده باید برای جبرانی پیگیری شود.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("فلو صبحگاهی")).toBeInTheDocument();
    expect(screen.getAllByText("کیانا نمونه")).not.toHaveLength(0);

    expect(
      screen.getByRole("heading", { name: "پیگیری تمدید و پرداخت" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("تمدید فوری")).not.toHaveLength(0);
    expect(
      screen.getByRole("heading", { name: "وضعیت همه شاگردها" }),
    ).toBeInTheDocument();
  });
});
