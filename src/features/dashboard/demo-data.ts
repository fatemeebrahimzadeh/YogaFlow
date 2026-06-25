import type { DashboardData } from "./domain";

import { createAttendanceRecords, repeatStatus } from "./sample-data-helpers";

export const demoDashboardData = {
  badgeLabel: "دموی عمومی",
  updatedAt: "2026-06-24",
  sourceNote:
    "این صفحه با داده‌های ساختگی نمایش داده می‌شود تا بازدیدکننده‌ها بدون دیدن اطلاعات واقعی مربی، تجربه داشبورد YogaFlow را ببینند.",
  classGroups: [
    {
      id: "demo-morning-flow",
      name: "فلو صبحگاهی",
      sessionBrief: "نمونه کلاس صبح با تمرکز روی حضور و غیاب سریع.",
      coachNote:
        "این یادداشت نمونه است و نشان می‌دهد مربی برای هر سانس چه پیگیری‌هایی دارد.",
      weekdays: ["monday", "thursday"],
      startTime: "07:30",
      endTime: "08:30",
      studentIds: ["demo-niloofar", "demo-mahsa"],
    },
    {
      id: "demo-evening-foundations",
      name: "مبانی عصر",
      sessionBrief:
        "نمونه سانس عصر برای نمایش تمدید، پرداخت و جلسات باقی‌مانده.",
      coachNote:
        "یک شاگرد نزدیک تمدید است و یک جلسه ذخیره‌شده باید برای جبرانی پیگیری شود.",
      weekdays: ["saturday", "monday", "wednesday"],
      startTime: "18:00",
      endTime: "19:00",
      studentIds: ["demo-kiana", "demo-saba", "demo-hana"],
    },
  ],
  students: [
    {
      id: "demo-niloofar",
      fullName: "نیلوفر نمونه",
      phone: "+98 912 000 0101",
      note: "داده ساختگی برای نمایش عمومی.",
      activeCourse: {
        id: "demo-course-niloofar",
        studentId: "demo-niloofar",
        title: "دوره نمایشی ۱۲ جلسه‌ای",
        sessionCount: 12,
        startDate: "2026-05-25",
        amountPaid: 2_400_000,
        attendance: [
          ...createAttendanceRecords(
            "demo-niloofar-present",
            repeatStatus("present", 8),
          ),
          ...createAttendanceRecords(
            "demo-niloofar-saved",
            repeatStatus("savedAbsence", 1),
          ),
        ],
      },
    },
    {
      id: "demo-mahsa",
      fullName: "مهسا نمونه",
      phone: "+98 912 000 0202",
      activeCourse: {
        id: "demo-course-mahsa",
        studentId: "demo-mahsa",
        title: "دوره نمایشی ۸ جلسه‌ای",
        sessionCount: 8,
        startDate: "2026-06-01",
        amountPaid: 1_800_000,
        attendance: createAttendanceRecords(
          "demo-mahsa-present",
          repeatStatus("present", 8),
        ),
      },
    },
    {
      id: "demo-kiana",
      fullName: "کیانا نمونه",
      phone: "+98 912 000 0303",
      activeCourse: {
        id: "demo-course-kiana",
        studentId: "demo-kiana",
        title: "دوره نمایشی ۱۶ جلسه‌ای",
        sessionCount: 16,
        startDate: "2026-05-12",
        amountPaid: 3_200_000,
        attendance: [
          ...createAttendanceRecords(
            "demo-kiana-present",
            repeatStatus("present", 13),
          ),
          ...createAttendanceRecords(
            "demo-kiana-burned",
            repeatStatus("burnedAbsence", 1),
          ),
        ],
      },
    },
    {
      id: "demo-saba",
      fullName: "صبا نمونه",
      phone: "+98 912 000 0404",
      activeCourse: {
        id: "demo-course-saba",
        studentId: "demo-saba",
        title: "دوره نمایشی ۱۰ جلسه‌ای",
        sessionCount: 10,
        startDate: "2026-06-04",
        amountPaid: 2_100_000,
        attendance: [
          ...createAttendanceRecords(
            "demo-saba-present",
            repeatStatus("present", 6),
          ),
          ...createAttendanceRecords(
            "demo-saba-makeup",
            repeatStatus("makeup", 1),
          ),
        ],
      },
    },
    {
      id: "demo-hana",
      fullName: "هانا نمونه",
      phone: "+98 912 000 0505",
      activeCourse: {
        id: "demo-course-hana",
        studentId: "demo-hana",
        title: "دوره نمایشی ۲۴ جلسه‌ای",
        sessionCount: 24,
        startDate: "2026-06-08",
        amountPaid: 4_800_000,
        attendance: createAttendanceRecords(
          "demo-hana-present",
          repeatStatus("present", 5),
        ),
      },
    },
  ],
} satisfies DashboardData;
