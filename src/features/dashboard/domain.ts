export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type AttendanceStatus =
  | "present"
  | "burnedAbsence"
  | "savedAbsence"
  | "instructorCancelled"
  | "officialHoliday"
  | "makeup";

export type AttendanceRecord = {
  id: string;
  date: string;
  status: AttendanceStatus;
  classGroupId?: string;
  note?: string;
};

export type Course = {
  id: string;
  studentId: string;
  title?: string;
  sessionCount: number;
  startDate: string;
  amountPaid: number;
  paymentDate?: string;
  paymentReference?: string;
  attendance: AttendanceRecord[];
};

export type Student = {
  id: string;
  fullName: string;
  phone: string;
  note?: string;
  activeCourse: Course;
};

export type ClassGroup = {
  id: string;
  name: string;
  sessionBrief: string;
  coachNote: string;
  weekdays: Weekday[];
  startTime: string;
  endTime: string;
  studentIds: string[];
};

export type DashboardData = {
  classGroups: ClassGroup[];
  students: Student[];
  badgeLabel: string;
  sourceNote: string;
  updatedAt: string;
};

export type CourseProgress = {
  consumedSessions: number;
  savedSessions: number;
  burnedSessions: number;
  makeupSessions: number;
  remainingSessions: number;
  isComplete: boolean;
  needsRenewal: boolean;
};

export type StudentCourseSummary = {
  student: Student;
  progress: CourseProgress;
};

export type TodayClassSummary = {
  group: ClassGroup;
  enrolledStudents: Student[];
  pendingAttendanceCount: number;
};

export type DashboardSnapshot = {
  currentDateKey: string;
  currentWeekday: Weekday;
  totalStudents: number;
  todayClasses: TodayClassSummary[];
  attendanceQueueCount: number;
  renewalStudents: StudentCourseSummary[];
  studentSummaries: StudentCourseSummary[];
  savedSessionsCount: number;
  burnedSessionsCount: number;
  makeupSessionsCount: number;
  followUpSavedSessionsCount: number;
};

export const RENEWAL_WARNING_THRESHOLD = 3;

const weekdaysByDateIndex: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const consumedStatuses = new Set<AttendanceStatus>([
  "present",
  "burnedAbsence",
  "makeup",
]);

export function isConsumedAttendanceStatus(status: AttendanceStatus) {
  return consumedStatuses.has(status);
}

export function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getWeekday(date: Date) {
  return weekdaysByDateIndex[date.getDay()];
}

export function calculateCourseProgress(
  course: Course,
  renewalThreshold = RENEWAL_WARNING_THRESHOLD,
): CourseProgress {
  const consumedSessions = course.attendance.filter((record) =>
    isConsumedAttendanceStatus(record.status),
  ).length;
  const savedSessions = course.attendance.filter(
    (record) => record.status === "savedAbsence",
  ).length;
  const burnedSessions = course.attendance.filter(
    (record) => record.status === "burnedAbsence",
  ).length;
  const makeupSessions = course.attendance.filter(
    (record) => record.status === "makeup",
  ).length;
  const remainingSessions = Math.max(course.sessionCount - consumedSessions, 0);

  return {
    consumedSessions,
    savedSessions,
    burnedSessions,
    makeupSessions,
    remainingSessions,
    isComplete: remainingSessions === 0,
    needsRenewal: remainingSessions <= renewalThreshold,
  };
}

export function isClassScheduledOnDate(group: ClassGroup, date: Date) {
  return group.weekdays.includes(getWeekday(date));
}

export function buildDashboardSnapshot({
  classGroups,
  currentDate,
  renewalThreshold = RENEWAL_WARNING_THRESHOLD,
  students,
}: {
  classGroups: ClassGroup[];
  currentDate: Date;
  renewalThreshold?: number;
  students: Student[];
}): DashboardSnapshot {
  const currentDateKey = getDateKey(currentDate);
  const currentWeekday = getWeekday(currentDate);
  const studentsById = new Map(
    students.map((student) => [student.id, student]),
  );
  const studentSummaries = students.map((student) => ({
    student,
    progress: calculateCourseProgress(student.activeCourse, renewalThreshold),
  }));
  const summariesByStudentId = new Map(
    studentSummaries.map((summary) => [summary.student.id, summary]),
  );

  const todayClasses = classGroups
    .filter((group) => isClassScheduledOnDate(group, currentDate))
    .map((group) => {
      const enrolledStudents = group.studentIds
        .map((studentId) => studentsById.get(studentId))
        .filter((student): student is Student => Boolean(student));
      const pendingAttendanceCount = enrolledStudents.filter((student) => {
        const summary = summariesByStudentId.get(student.id);
        const hasAttendanceForToday = student.activeCourse.attendance.some(
          (record) =>
            record.date === currentDateKey && record.classGroupId === group.id,
        );

        return !summary?.progress.isComplete && !hasAttendanceForToday;
      }).length;

      return {
        group,
        enrolledStudents,
        pendingAttendanceCount,
      };
    });

  return {
    currentDateKey,
    currentWeekday,
    totalStudents: students.length,
    todayClasses,
    attendanceQueueCount: todayClasses.reduce(
      (total, classSummary) => total + classSummary.pendingAttendanceCount,
      0,
    ),
    renewalStudents: studentSummaries.filter(
      (summary) => summary.progress.needsRenewal,
    ),
    studentSummaries,
    savedSessionsCount: studentSummaries.reduce(
      (total, summary) => total + summary.progress.savedSessions,
      0,
    ),
    burnedSessionsCount: studentSummaries.reduce(
      (total, summary) => total + summary.progress.burnedSessions,
      0,
    ),
    makeupSessionsCount: studentSummaries.reduce(
      (total, summary) => total + summary.progress.makeupSessions,
      0,
    ),
    followUpSavedSessionsCount: studentSummaries.reduce(
      (total, summary) => total + summary.progress.savedSessions,
      0,
    ),
  };
}
