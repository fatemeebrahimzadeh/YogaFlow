import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PilotAccessPanel } from "./pilot-access-panel";

describe("PilotAccessPanel", () => {
  it("renders the protected coach sign-in form", () => {
    render(<PilotAccessPanel isConfigured />);

    expect(
      screen.getByRole("heading", { name: "ورود به داشبورد مربی" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("رمز عبور")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ورود" })).toBeInTheDocument();
  });

  it("shows a setup warning when the pilot password is missing", () => {
    render(<PilotAccessPanel isConfigured={false} />);

    expect(screen.getByText(/YOGAFLOW_PILOT_PASSWORD/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "ورود" }),
    ).not.toBeInTheDocument();
  });

  it("shows a password error after a denied sign-in", () => {
    render(<PilotAccessPanel isConfigured showError />);

    expect(
      screen.getByText("رمز عبور درست نیست. دوباره تلاش کنید."),
    ).toBeInTheDocument();
  });
});
