import type { AttendanceRecord, AttendanceStatus } from "./domain";

export function repeatStatus(status: AttendanceStatus, count: number) {
  return Array.from({ length: count }, () => status);
}

export function createAttendanceRecords(
  prefix: string,
  statuses: AttendanceStatus[],
  overrides: Partial<AttendanceRecord>[] = [],
): AttendanceRecord[] {
  return statuses.map((status, index) => ({
    id: `${prefix}-${index + 1}`,
    date: `2026-05-${String(index + 1).padStart(2, "0")}`,
    status,
    ...overrides[index],
  }));
}
