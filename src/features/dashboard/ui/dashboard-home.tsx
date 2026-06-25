import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock,
  FilePenLine,
  Users,
  WalletCards,
} from "lucide-react";

import { dashboardPilotData } from "../data";
import {
  buildDashboardSnapshot,
  type CourseProgress,
  type DashboardPilotData,
  type DashboardSnapshot,
  type Student,
  type StudentCourseSummary,
  type TodayClassSummary,
  type Weekday,
} from "../domain";

const weekdayLabels: Record<Weekday, string> = {
  saturday: "شنبه",
  sunday: "یکشنبه",
  monday: "دوشنبه",
  tuesday: "سه شنبه",
  wednesday: "چهارشنبه",
  thursday: "پنجشنبه",
  friday: "جمعه",
};

const dateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const numberFormatter = new Intl.NumberFormat("fa-IR");
const currencyFormatter = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 0,
});

type DashboardHomeProps = {
  currentDate?: Date;
  pilotData?: DashboardPilotData;
  signOut?: React.ReactNode;
};

export function DashboardHome({
  currentDate = new Date(),
  pilotData = dashboardPilotData,
  signOut,
}: DashboardHomeProps) {
  const snapshot = buildDashboardSnapshot({
    classGroups: pilotData.classGroups,
    currentDate,
    students: pilotData.students,
  });
  const summariesByStudentId = new Map(
    snapshot.studentSummaries.map((summary) => [summary.student.id, summary]),
  );
  const pendingAttendanceStudents = uniqueStudents(
    snapshot.todayClasses.flatMap((classSummary) =>
      getPendingAttendanceStudents(
        classSummary,
        summariesByStudentId,
        snapshot.currentDateKey,
      ),
    ),
  );
  const completedStudents = snapshot.studentSummaries.filter(
    (summary) => summary.progress.isComplete,
  );

  return (
    <main
      dir="rtl"
      className="min-h-dvh bg-background px-4 py-6 text-right text-foreground sm:px-6 lg:px-8"
    >
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 border-border border-b pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-medium text-muted-foreground text-sm">
              YogaFlow
            </p>
            <h1 className="font-semibold text-3xl tracking-normal sm:text-4xl">
              پنل روزانه مربی
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              {dateFormatter.format(currentDate)}
            </p>
            <p className="mt-1 text-muted-foreground text-xs leading-6">
              آخرین به‌روزرسانی داده‌ها: {formatDateKey(pilotData.updatedAt)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-card-foreground">
                <CalendarDays className="size-4 text-primary" />
                {weekdayLabels[snapshot.currentWeekday]}
              </span>
              <span className="inline-flex items-center rounded-md border border-border bg-card px-3 py-2 text-card-foreground">
                {shortDateFormatter.format(currentDate)}
              </span>
            </div>
            {signOut}
          </div>
        </header>

        <section className="rounded-lg border border-border bg-card px-4 py-3 text-card-foreground shadow-xs">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <FilePenLine className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold text-base">نسخه پایلوت مربی</h2>
                <p className="mt-1 text-muted-foreground text-sm leading-6">
                  {pilotData.sourceNote}
                </p>
              </div>
            </div>
            <span className="rounded-md bg-secondary px-2.5 py-1 text-secondary-foreground text-xs">
              داده دستی
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionHeader
            icon={<CheckCircle2 className="size-5" />}
            label="کارهای امروز مربی"
            value={formatCount(
              snapshot.attendanceQueueCount + snapshot.renewalStudents.length,
              "اقدام",
            )}
          />
          <DailyActionGrid
            completedStudents={completedStudents}
            pendingAttendanceStudents={pendingAttendanceStudents}
            snapshot={snapshot}
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.8fr)]">
          <section className="flex flex-col gap-4">
            <SectionHeader
              icon={<CalendarDays className="size-5" />}
              label="کلاس‌های امروز"
              value={formatCount(snapshot.todayClasses.length, "کلاس")}
            />

            {snapshot.todayClasses.length > 0 ? (
              snapshot.todayClasses.map((classSummary) => (
                <TodayClassPanel
                  classSummary={classSummary}
                  currentDateKey={snapshot.currentDateKey}
                  key={classSummary.group.id}
                  summariesByStudentId={summariesByStudentId}
                />
              ))
            ) : (
              <EmptyState text="برای امروز کلاسی ثبت نشده است." />
            )}
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              icon={<AlertTriangle className="size-5" />}
              label="پیگیری تمدید و پرداخت"
              value={formatCount(snapshot.renewalStudents.length, "شاگرد")}
            />

            <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-xs">
              <div className="grid grid-cols-[1fr_auto] gap-3 border-border border-b px-4 py-3 font-medium text-muted-foreground text-sm">
                <span>شاگرد</span>
                <span>وضعیت</span>
              </div>
              {snapshot.renewalStudents.length > 0 ? (
                snapshot.renewalStudents.map((summary) => (
                  <RenewalRow key={summary.student.id} summary={summary} />
                ))
              ) : (
                <div className="px-4 py-6 text-muted-foreground text-sm">
                  فعلا شاگردی برای تمدید یا پرداخت فوری وجود ندارد.
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="flex flex-col gap-4">
          <SectionHeader
            icon={<Users className="size-5" />}
            label="وضعیت همه شاگردها"
            value={formatCount(snapshot.totalStudents, "شاگرد فعال")}
          />

          <div className="overflow-x-auto rounded-lg border border-border bg-card text-card-foreground shadow-xs">
            <table className="w-full min-w-[820px] border-collapse text-right text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <TableHeader>شاگرد</TableHeader>
                  <TableHeader>دوره</TableHeader>
                  <TableHeader>مصرف‌شده</TableHeader>
                  <TableHeader>ذخیره‌شده</TableHeader>
                  <TableHeader>سوخته</TableHeader>
                  <TableHeader>جبرانی</TableHeader>
                  <TableHeader>باقی‌مانده</TableHeader>
                  <TableHeader>وضعیت</TableHeader>
                </tr>
              </thead>
              <tbody>
                {snapshot.studentSummaries.map((summary) => (
                  <StudentSummaryRow
                    key={summary.student.id}
                    summary={summary}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function DailyActionGrid({
  completedStudents,
  pendingAttendanceStudents,
  snapshot,
}: {
  completedStudents: StudentCourseSummary[];
  pendingAttendanceStudents: Student[];
  snapshot: DashboardSnapshot;
}) {
  const actions = [
    {
      label: "ثبت حضور و غیاب",
      value: formatCount(snapshot.attendanceQueueCount, "مورد"),
      detail:
        pendingAttendanceStudents.length > 0
          ? `${formatStudentNames(pendingAttendanceStudents)} هنوز برای امروز ثبت نشده‌اند.`
          : "حضور و غیاب کلاس‌های امروز کامل است.",
      icon: CalendarDays,
      tone: snapshot.attendanceQueueCount > 0 ? "warning" : "ok",
    },
    {
      label: "پیگیری پرداخت یا تمدید",
      value: formatCount(snapshot.renewalStudents.length, "شاگرد"),
      detail:
        snapshot.renewalStudents.length > 0
          ? `${formatSummaryNames(snapshot.renewalStudents)} به پیگیری نیاز دارند.`
          : "فعلا شاگردی به مرز تمدید نرسیده است.",
      icon: AlertTriangle,
      tone: snapshot.renewalStudents.length > 0 ? "danger" : "ok",
    },
    {
      label: "دوره تمام‌شده",
      value: formatCount(completedStudents.length, "شاگرد"),
      detail:
        completedStudents.length > 0
          ? `${formatSummaryNames(completedStudents)} باید قبل از ادامه کلاس تمدید شوند.`
          : "هیچ دوره‌ای به صفر جلسه نرسیده است.",
      icon: WalletCards,
      tone: completedStudents.length > 0 ? "danger" : "ok",
    },
    {
      label: "کلاس‌های امروز",
      value: `${formatNumber(snapshot.todayClasses.length)} کلاس`,
      detail: `${formatCount(snapshot.attendanceQueueCount, "حضور و غیاب")} باز است`,
      icon: CalendarDays,
      tone: "ok",
    },
    {
      label: "جلسات ذخیره‌شده",
      value: formatCount(snapshot.followUpSavedSessionsCount, "جلسه"),
      detail:
        snapshot.followUpSavedSessionsCount > 0
          ? "برای شاگردهای دارای جلسه ذخیره، زمان جبرانی یا پیگیری مشخص شود."
          : "جلسه ذخیره‌شده بدون پیگیری وجود ندارد.",
      icon: FilePenLine,
      tone: snapshot.followUpSavedSessionsCount > 0 ? "warning" : "ok",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {actions.map(({ detail, icon: Icon, label, tone, value }) => (
        <article
          className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-xs"
          key={label}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-base">{label}</h3>
              <p className="mt-2 font-semibold text-2xl tracking-normal">
                {value}
              </p>
            </div>
            <Icon className={getActionIconClassName(tone)} />
          </div>
          <p className="mt-3 text-muted-foreground text-sm leading-6">
            {detail}
          </p>
        </article>
      ))}
    </div>
  );
}

function SectionHeader({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <h2 className="font-semibold text-xl tracking-normal">{label}</h2>
      </div>
      <span className="rounded-md border border-border px-2.5 py-1 text-muted-foreground text-sm">
        {value}
      </span>
    </div>
  );
}

function TodayClassPanel({
  classSummary,
  currentDateKey,
  summariesByStudentId,
}: {
  classSummary: TodayClassSummary;
  currentDateKey: string;
  summariesByStudentId: Map<string, StudentCourseSummary>;
}) {
  const weekdayList = classSummary.group.weekdays
    .map((weekday) => weekdayLabels[weekday])
    .join("، ");
  const pendingAttendanceStudents = getPendingAttendanceStudents(
    classSummary,
    summariesByStudentId,
    currentDateKey,
  );
  const renewalStudents = classSummary.enrolledStudents.filter((student) => {
    const summary = summariesByStudentId.get(student.id);

    return Boolean(summary?.progress.needsRenewal);
  });

  return (
    <article className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">{classSummary.group.name}</h3>
          <p className="mt-1 text-muted-foreground text-sm leading-6">
            {classSummary.group.sessionBrief}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm">
            <Clock className="size-4" />
            <span dir="ltr">
              {classSummary.group.startTime}-{classSummary.group.endTime}
            </span>
            <span>{weekdayList}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-muted-foreground">
            <Users className="size-4" />
            {formatCount(classSummary.enrolledStudents.length, "شاگرد")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1 font-medium text-accent-foreground">
            <CalendarDays className="size-4" />
            {formatCount(classSummary.pendingAttendanceCount, "ثبت‌نشده")}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-border bg-muted/55 px-3 py-3">
        <p className="font-medium text-sm">یادداشت مربی برای این جلسه</p>
        <p className="mt-1 text-muted-foreground text-sm leading-6">
          {classSummary.group.coachNote}
        </p>
      </div>

      <div className="mt-4 grid gap-3 border-border border-t pt-4 text-sm md:grid-cols-2">
        <ClassStudentList
          emptyText="همه شاگردهای این کلاس برای امروز تعیین تکلیف شده‌اند."
          label="کاری که قبل از پایان جلسه باید انجام شود"
          students={pendingAttendanceStudents}
        />
        <ClassStudentList
          emptyText="در این کلاس مورد تمدید فوری وجود ندارد."
          label="پیگیری پرداخت"
          students={renewalStudents}
        />
      </div>
    </article>
  );
}

function ClassStudentList({
  emptyText,
  label,
  students,
}: {
  emptyText: string;
  label: string;
  students: Student[];
}) {
  return (
    <div>
      <p className="font-medium">{label}</p>
      <p className="mt-1 text-muted-foreground leading-6">
        {students.length > 0 ? formatStudentNames(students, 4) : emptyText}
      </p>
    </div>
  );
}

function RenewalRow({ summary }: { summary: StudentCourseSummary }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-border border-b px-4 py-3 last:border-b-0">
      <div>
        <p className="font-medium">{summary.student.fullName}</p>
        <p className="text-muted-foreground text-sm">
          شروع {formatDateKey(summary.student.activeCourse.startDate)} ·{" "}
          {formatToman(summary.student.activeCourse.amountPaid)}
        </p>
      </div>
      <StatusPill progress={summary.progress} />
    </div>
  );
}

function StudentSummaryRow({ summary }: { summary: StudentCourseSummary }) {
  const { activeCourse } = summary.student;

  return (
    <tr className="border-border border-t">
      <TableCell>
        <div>
          <p className="font-medium">{summary.student.fullName}</p>
          <p className="text-muted-foreground" dir="ltr">
            {summary.student.phone}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <WalletCards className="size-4 text-primary" />
          <span>
            {activeCourse.title ??
              formatCount(activeCourse.sessionCount, "جلسه")}
          </span>
        </div>
      </TableCell>
      <TableCell>{formatNumber(summary.progress.consumedSessions)}</TableCell>
      <TableCell>{formatNumber(summary.progress.savedSessions)}</TableCell>
      <TableCell>{formatNumber(summary.progress.burnedSessions)}</TableCell>
      <TableCell>{formatNumber(summary.progress.makeupSessions)}</TableCell>
      <TableCell>{formatNumber(summary.progress.remainingSessions)}</TableCell>
      <TableCell>
        <StatusPill progress={summary.progress} />
      </TableCell>
    </tr>
  );
}

function StatusPill({ progress }: { progress: CourseProgress }) {
  if (progress.isComplete) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2 py-1 font-medium text-destructive text-xs">
        <AlertTriangle className="size-3.5" />
        تمدید فوری
      </span>
    );
  }

  if (progress.needsRenewal) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2 py-1 font-medium text-accent-foreground text-xs">
        <AlertTriangle className="size-3.5" />
        {formatCount(progress.remainingSessions, "جلسه")} مانده
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 font-medium text-secondary-foreground text-xs">
      <CheckCircle2 className="size-3.5" />
      فعال
    </span>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-middle">{children}</td>;
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-muted-foreground text-sm shadow-xs">
      {text}
    </div>
  );
}

function getPendingAttendanceStudents(
  classSummary: TodayClassSummary,
  summariesByStudentId: Map<string, StudentCourseSummary>,
  currentDateKey: string,
) {
  return classSummary.enrolledStudents.filter((student) => {
    const summary = summariesByStudentId.get(student.id);
    const hasAttendanceForToday = student.activeCourse.attendance.some(
      (record) =>
        record.date === currentDateKey &&
        record.classGroupId === classSummary.group.id,
    );

    return !summary?.progress.isComplete && !hasAttendanceForToday;
  });
}

function uniqueStudents(students: Student[]) {
  return Array.from(
    students
      .reduce(
        (studentsById, student) => studentsById.set(student.id, student),
        new Map<string, Student>(),
      )
      .values(),
  );
}

function formatStudentNames(students: Student[], visibleCount = 3) {
  const visibleStudents = students.slice(0, visibleCount);
  const remainingCount = students.length - visibleStudents.length;
  const names = visibleStudents.map((student) => student.fullName).join("، ");

  if (remainingCount <= 0) {
    return names;
  }

  return `${names} و ${formatCount(remainingCount, "نفر دیگر")}`;
}

function formatSummaryNames(
  summaries: StudentCourseSummary[],
  visibleCount = 3,
) {
  return formatStudentNames(
    summaries.map((summary) => summary.student),
    visibleCount,
  );
}

function formatCount(value: number, label: string) {
  return `${formatNumber(value)} ${label}`;
}

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatToman(amount: number) {
  return `${currencyFormatter.format(amount)} تومان`;
}

function formatDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return shortDateFormatter.format(new Date(year, month - 1, day));
}

function getActionIconClassName(tone: string) {
  if (tone === "danger") {
    return "size-5 text-destructive";
  }

  if (tone === "warning") {
    return "size-5 text-primary";
  }

  return "size-5 text-muted-foreground";
}
