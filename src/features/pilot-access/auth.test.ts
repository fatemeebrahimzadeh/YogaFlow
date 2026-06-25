import { describe, expect, it, vi } from "vitest";

import { verifyPilotPassword } from "./auth";

describe("pilot access auth", () => {
  it("verifies the configured pilot password", () => {
    vi.stubEnv("YOGAFLOW_PILOT_PASSWORD", "studio-secret");

    expect(verifyPilotPassword("studio-secret")).toBe(true);
    expect(verifyPilotPassword("wrong-secret")).toBe(false);

    vi.unstubAllEnvs();
  });

  it("rejects all passwords when the pilot password is not configured", () => {
    vi.stubEnv("YOGAFLOW_PILOT_PASSWORD", "");

    expect(verifyPilotPassword("studio-secret")).toBe(false);

    vi.unstubAllEnvs();
  });
});
