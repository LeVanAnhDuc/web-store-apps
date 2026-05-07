"use client";

// libs
import {
  Compass,
  Calendar,
  Timer,
  Zap,
  LayoutGrid,
  Trophy
} from "lucide-react";
import { useTranslations } from "next-intl";
// components
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/CustomButton";
import StatCard from "../../components/StatCard";

const WEEKLY_DATA = [
  { day: "M", value: 40 },
  { day: "T", value: 65 },
  { day: "W", value: 30, active: true },
  { day: "T", value: 80 },
  { day: "F", value: 50 },
  { day: "S", value: 20 },
  { day: "S", value: 10 }
];

const MAX_BAR = 80;

const GreetingSection = () => {
  const t = useTranslations("home");
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12
      ? t("greeting.morning")
      : hour < 18
        ? t("greeting.afternoon")
        : t("greeting.evening");

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex items-center justify-between gap-6 rounded-2xl border bg-gradient-to-b from-white to-indigo-50 p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-foreground text-3xl font-bold">
            {greeting}, Anh Duc <span aria-hidden="true">👋</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            {t("greeting.date")}
          </p>
          <p className="text-foreground/70 text-base">
            {t("greeting.subtitle", { count: 3 })}
          </p>
        </div>
        <div
          className="hidden size-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-indigo-600 lg:flex"
          aria-hidden="true"
        >
          <LayoutGrid className="size-10 text-white" />
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={
            <Compass className="size-6 text-indigo-600" aria-hidden="true" />
          }
          iconBg="bg-indigo-50"
          value="47"
          label={t("stats.totalApps")}
          badge={t("stats.allTime")}
          badgeBg="bg-indigo-50"
          badgeText="text-indigo-600"
        />
        <StatCard
          icon={
            <Calendar className="size-6 text-blue-600" aria-hidden="true" />
          }
          iconBg="bg-blue-50"
          value="12"
          label={t("stats.appsThisMonth")}
          badge={t("stats.fromLastMonth")}
          badgeBg="bg-blue-50"
          badgeText="text-blue-600"
        />
        <StatCard
          icon={
            <Timer className="size-6 text-emerald-600" aria-hidden="true" />
          }
          iconBg="bg-emerald-50"
          value="38 hrs"
          label={t("stats.timeSaved")}
          badge={t("stats.hoursThisMonth")}
          badgeBg="bg-emerald-50"
          badgeText="text-emerald-600"
        />
        <StatCard
          icon={<Zap className="size-6 text-orange-600" aria-hidden="true" />}
          iconBg="bg-orange-50"
          value="14 days"
          label={t("stats.currentStreak")}
          badge={t("stats.personalBest")}
          badgeBg="bg-orange-50"
          badgeText="text-orange-600"
        />
      </div>
      <Card
        className="rounded-2xl border p-7"
        aria-labelledby="weekly-activity-title"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h2
              id="weekly-activity-title"
              className="text-foreground text-lg font-semibold"
            >
              {t("weeklyActivity.title")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("weeklyActivity.subtitle")}
            </p>
          </div>
          <div className="bg-muted flex items-center gap-1.5 rounded-lg px-2.5 py-2">
            <div
              className="size-2 rounded-sm bg-indigo-600"
              aria-hidden="true"
            />
            <span className="text-muted-foreground text-xs">
              {t("weeklyActivity.legend")}
            </span>
          </div>
        </div>
        <ul className="flex items-end gap-3">
          {WEEKLY_DATA.map((d, i) => (
            <li
              key={i}
              className="flex flex-1 flex-col items-center gap-1.5"
              aria-label={`${d.day}: ${d.value} opens`}
            >
              <div
                className="flex w-full flex-col items-center justify-end"
                style={{ height: 120 }}
                aria-hidden="true"
              >
                <div
                  className={
                    d.active
                      ? "w-full rounded-lg bg-indigo-600"
                      : "w-full rounded-lg bg-indigo-100"
                  }
                  style={{ height: `${(d.value / MAX_BAR) * 120}px` }}
                />
              </div>
              <span
                className="text-muted-foreground text-xs font-medium"
                aria-hidden="true"
              >
                {d.day}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="flex items-center justify-between gap-4 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 to-amber-50/50 p-4">
        <div className="flex items-center gap-3.5">
          <div
            className="flex size-11 items-center justify-center rounded-xl bg-amber-500/15"
            aria-hidden="true"
          >
            <Zap className="size-6 text-amber-500" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold text-amber-900">
              <span aria-hidden="true">🔥 </span>
              {t("achievement.title")}
            </p>
            <p className="text-xs text-amber-700">
              {t("achievement.subtitle")}
            </p>
          </div>
        </div>
        <CustomButton
          size="sm"
          className="shrink-0 bg-amber-500 text-white hover:bg-amber-600"
          iconLeft={<Trophy className="size-3.5" aria-hidden="true" />}
        >
          {t("achievement.cta")}
        </CustomButton>
      </Card>
    </div>
  );
};

export default GreetingSection;
