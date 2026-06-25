import { describe, expect, it } from "vitest";

import {
  buildDashboardSnapshot,
  type ClassGroup,
  type Course,
  calculateCourseProgress,
  getDateKey,
  getWeekday,
  type Student,
} from "./domain";

describe("dashboard domain rules", () => {
  it("counts consumed, saved, burned, and remaining course sessions", () => {
    const course: Course = {
      id: "course-1",
      studentId: "student-1",
      sessionCount: 6,
      startDate: "2026-06-01",
      amountPaid: 100,
      attendance: [
        { id: "1", date: "2026-06-01", status: "present" },
        { id: "2", date: "2026-06-03", status: "burnedAbsence" },
        { id: "3", date: "2026-06-05", status: "makeup" },
        { id: "4", date: "2026-06-07", status: "savedAbsence" },
        { id: "5", date: "2026-06-09", status: "instructorCancelled" },
        { id: "6", date: "2026-06-11", status: "officialHoliday" },
      ],
    };

    expect(calculateCourseProgress(course)).toEqual({
      consumedSessions: 3,
      savedSessions: 1,
      burnedSessions: 1,
      makeupSessions: 1,
      remainingSessions: 3,
      isComplete: false,
      needsRenewal: true,
    });
  });

  it("uses the local calendar date and weekday for class schedules", () => {
    const monday = new Date(2026, 5, 22);

    expect(getDateKey(monday)).toBe("2026-06-22");
    expect(getWeekday(monday)).toBe("monday");
  });

  it("builds today's classes, attendance queue, and renewal summaries", () => {
    const classGroups: ClassGroup[] = [
      {
        id: "monday-group",
        name: "Monday Group",
        sessionBrief: "Monday class brief",
        coachNote: "Follow up before class ends.",
        weekdays: ["monday"],
        startTime: "18:00",
        endTime: "19:00",
        studentIds: ["recorded", "pending", "complete"],
      },
      {
        id: "friday-group",
        name: "Friday Group",
        sessionBrief: "Friday class brief",
        coachNote: "No urgent action.",
        weekdays: ["friday"],
        startTime: "10:00",
        endTime: "11:00",
        studentIds: ["pending"],
      },
    ];
    const students: Student[] = [
      {
        id: "recorded",
        fullName: "Recorded Student",
        phone: "",
        activeCourse: {
          id: "recorded-course",
          studentId: "recorded",
          sessionCount: 4,
          startDate: "2026-06-01",
          amountPaid: 100,
          attendance: [
            {
              id: "recorded-today",
              date: "2026-06-22",
              status: "present",
              classGroupId: "monday-group",
            },
          ],
        },
      },
      {
        id: "pending",
        fullName: "Pending Student",
        phone: "",
        activeCourse: {
          id: "pending-course",
          studentId: "pending",
          sessionCount: 8,
          startDate: "2026-06-01",
          amountPaid: 100,
          attendance: [],
        },
      },
      {
        id: "complete",
        fullName: "Complete Student",
        phone: "",
        activeCourse: {
          id: "complete-course",
          studentId: "complete",
          sessionCount: 1,
          startDate: "2026-06-01",
          amountPaid: 100,
          attendance: [
            { id: "complete-1", date: "2026-06-01", status: "present" },
          ],
        },
      },
    ];

    const snapshot = buildDashboardSnapshot({
      classGroups,
      currentDate: new Date(2026, 5, 22),
      students,
    });

    expect(snapshot.todayClasses).toHaveLength(1);
    expect(snapshot.attendanceQueueCount).toBe(1);
    expect(snapshot.renewalStudents.map(({ student }) => student.id)).toEqual([
      "recorded",
      "complete",
    ]);
    expect(snapshot.makeupSessionsCount).toBe(0);
    expect(snapshot.followUpSavedSessionsCount).toBe(0);
  });
});
