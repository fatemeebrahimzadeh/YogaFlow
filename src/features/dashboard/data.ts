import type {
  AttendanceRecord,
  AttendanceStatus,
  ClassGroup,
  Student,
} from "./domain";

function repeatStatus(status: AttendanceStatus, count: number) {
  return Array.from({ length: count }, () => status);
}

function createAttendanceRecords(
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

export const dashboardClassGroups: ClassGroup[] = [
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

export const dashboardStudents: Student[] = [
  {
    id: "mina",
    fullName: "مینا رحیمی",
    phone: "+98 912 100 1100",
    activeCourse: {
      id: "course-mina-24",
      studentId: "mina",
      sessionCount: 24,
      startDate: "2026-05-01",
      amountPaid: 4_800_000,
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
      sessionCount: 12,
      startDate: "2026-05-20",
      amountPaid: 2_700_000,
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
      sessionCount: 16,
      startDate: "2026-04-18",
      amountPaid: 3_400_000,
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
    activeCourse: {
      id: "course-leila-8",
      studentId: "leila",
      sessionCount: 8,
      startDate: "2026-06-01",
      amountPaid: 1_900_000,
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
    activeCourse: {
      id: "course-ava-24",
      studentId: "ava",
      sessionCount: 24,
      startDate: "2026-06-05",
      amountPaid: 4_800_000,
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
      sessionCount: 10,
      startDate: "2026-05-28",
      amountPaid: 2_200_000,
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
