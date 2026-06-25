import type { ClassGroup, DashboardData, Student } from "./domain";

import { createAttendanceRecords, repeatStatus } from "./sample-data-helpers";

// Private pilot source of truth until CRUD and database persistence exist.
// Replace these records with the coach's real students, classes, payments,
// and attendance history before sharing the protected coach URL.
const dashboardClassGroups: ClassGroup[] = [
  {
    id: "morning-foundations",
    name: "یوگای صبحگاهی",
    sessionBrief: "کلاس آرام صبحگاهی با تمرکز روی شروع نرم بدن.",
    coachNote: "آوا دو جلسه ذخیره دارد؛ برای برنامه جبرانی با او هماهنگ شود.",
    weekdays: ["monday", "thursday"],
    startTime: "07:30",
    endTime: "08:30",
    studentIds: ["ava", "roya"],
  },
  {
    id: "evening-flow",
    name: "فلو عصر",
    sessionBrief: "جلسه پرظرفیت عصر با تمرکز روی فلو و پیگیری تمدیدها.",
    coachNote:
      "سارا و ندا نزدیک تمدید هستند؛ لیلا قبل از ادامه کلاس باید تمدید شود.",
    weekdays: ["saturday", "monday", "wednesday"],
    startTime: "18:00",
    endTime: "19:00",
    studentIds: ["mina", "sara", "neda", "leila"],
  },
  {
    id: "weekend-restore",
    name: "ریکاوری آخر هفته",
    sessionBrief: "جلسه ریکاوری سبک برای پایان هفته.",
    coachNote: "برای شاگردهای دارای جلسه ذخیره، زمان جبرانی پیشنهاد شود.",
    weekdays: ["friday"],
    startTime: "10:00",
    endTime: "11:15",
    studentIds: ["mina", "ava"],
  },
];

const dashboardStudents: Student[] = [
  {
    id: "mina",
    fullName: "مینا رحیمی",
    phone: "+98 912 100 1100",
    note: "نمونه داده پایلوت؛ شماره و مبلغ را با اطلاعات واقعی جایگزین کنید.",
    activeCourse: {
      id: "course-mina-24",
      studentId: "mina",
      title: "دوره ۲۴ جلسه‌ای تابستان",
      sessionCount: 24,
      startDate: "2026-05-01",
      amountPaid: 4_800_000,
      paymentDate: "2026-05-01",
      paymentReference: "رسید دستی 1001",
      attendance: [
        ...createAttendanceRecords("mina-present", repeatStatus("present", 17)),
        ...createAttendanceRecords(
          "mina-burned",
          repeatStatus("burnedAbsence", 2),
        ),
        ...createAttendanceRecords(
          "mina-saved",
          repeatStatus("savedAbsence", 1),
        ),
        {
          id: "mina-2026-06-22",
          date: "2026-06-22",
          status: "present",
          classGroupId: "evening-flow",
        },
      ],
    },
  },
  {
    id: "sara",
    fullName: "سارا احمدی",
    phone: "+98 912 200 2200",
    activeCourse: {
      id: "course-sara-12",
      studentId: "sara",
      title: "دوره ۱۲ جلسه‌ای عصر",
      sessionCount: 12,
      startDate: "2026-05-20",
      amountPaid: 2_700_000,
      paymentDate: "2026-05-20",
      paymentReference: "کارت به کارت",
      attendance: [
        ...createAttendanceRecords("sara-present", repeatStatus("present", 9)),
        ...createAttendanceRecords(
          "sara-saved",
          repeatStatus("savedAbsence", 1),
        ),
      ],
    },
  },
  {
    id: "neda",
    fullName: "ندا کریمی",
    phone: "+98 912 300 3300",
    activeCourse: {
      id: "course-neda-16",
      studentId: "neda",
      title: "دوره ۱۶ جلسه‌ای فلو",
      sessionCount: 16,
      startDate: "2026-04-18",
      amountPaid: 3_400_000,
      paymentDate: "2026-04-18",
      paymentReference: "رسید دستی 1002",
      attendance: [
        ...createAttendanceRecords("neda-present", repeatStatus("present", 14)),
        ...createAttendanceRecords(
          "neda-burned",
          repeatStatus("burnedAbsence", 1),
        ),
      ],
    },
  },
  {
    id: "leila",
    fullName: "لیلا فرزان",
    phone: "+98 912 400 4400",
    note: "قبل از ادامه حضور در کلاس، تمدید دوره ثبت شود.",
    activeCourse: {
      id: "course-leila-8",
      studentId: "leila",
      title: "دوره آزمایشی ۸ جلسه‌ای",
      sessionCount: 8,
      startDate: "2026-06-01",
      amountPaid: 1_900_000,
      paymentDate: "2026-06-01",
      paymentReference: "نقدی",
      attendance: createAttendanceRecords(
        "leila-present",
        repeatStatus("present", 8),
      ),
    },
  },
  {
    id: "ava",
    fullName: "آوا شمس",
    phone: "+98 912 500 5500",
    note: "دو جلسه ذخیره دارد؛ برای جبرانی هماهنگ شود.",
    activeCourse: {
      id: "course-ava-24",
      studentId: "ava",
      title: "دوره ۲۴ جلسه‌ای صبح",
      sessionCount: 24,
      startDate: "2026-06-05",
      amountPaid: 4_800_000,
      paymentDate: "2026-06-05",
      paymentReference: "رسید دستی 1003",
      attendance: [
        ...createAttendanceRecords("ava-present", repeatStatus("present", 6)),
        ...createAttendanceRecords(
          "ava-saved",
          repeatStatus("savedAbsence", 2),
        ),
      ],
    },
  },
  {
    id: "roya",
    fullName: "رویا مهر",
    phone: "+98 912 600 6600",
    activeCourse: {
      id: "course-roya-10",
      studentId: "roya",
      title: "دوره ۱۰ جلسه‌ای صبح",
      sessionCount: 10,
      startDate: "2026-05-28",
      amountPaid: 2_200_000,
      paymentDate: "2026-05-28",
      paymentReference: "کارت به کارت",
      attendance: [
        ...createAttendanceRecords("roya-present", repeatStatus("present", 7)),
        ...createAttendanceRecords("roya-makeup", repeatStatus("makeup", 1)),
        ...createAttendanceRecords(
          "roya-burned",
          repeatStatus("burnedAbsence", 1),
        ),
      ],
    },
  },
];

export const coachDashboardData = {
  badgeLabel: "داشبورد خصوصی مربی",
  classGroups: dashboardClassGroups,
  students: dashboardStudents,
  updatedAt: "2026-06-24",
  sourceNote:
    "این نمای خصوصی از فایل src/features/dashboard/data.ts خوانده می‌شود و تا زمان ساخت فرم‌ها و دیتابیس باید دستی به‌روزرسانی شود.",
} satisfies DashboardData;

export { dashboardClassGroups, dashboardStudents };
