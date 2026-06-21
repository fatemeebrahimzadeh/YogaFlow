import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DashboardHome } from "./dashboard-home";

describe("DashboardHome", () => {
  it("renders the dashboard summary and primary actions", () => {
    render(<DashboardHome />);

    expect(
      screen.getByRole("heading", { name: "Studio dashboard" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /today/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /new student/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("Today classes")).toBeInTheDocument();
    expect(screen.getByText("Attendance queue")).toBeInTheDocument();
    expect(screen.getByText("Renewals soon")).toBeInTheDocument();
    expect(screen.getByText("Evening class")).toBeInTheDocument();
  });
});
