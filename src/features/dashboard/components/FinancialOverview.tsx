"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  formatWeekRange,
  getAvailableYears,
  getDayChartData,
  getMonthChartData,
  getNiceMax,
  getWeekChartData,
  getYearChartData,
} from "@/features/dashboard/hooks/financialChart";

import {
  CalendarDays,
  ChevronDown,
} from "lucide-react";

const chartConfig = {
  expense: {
    label: "Expenses",
    color: "#f87171",
  },
};

type Period =
  | "year"
  | "month"
  | "week"
  | "day";

export default function FinancialOverview() {
  const currentYear =
    new Date().getFullYear();

  const [period, setPeriod] =
    useState<Period>("month");

  const [selectedYear, setSelectedYear] =
    useState(currentYear);

  /*
   * Date used by:
   *
   * Week
   * Day
   */
  const [selectedDate, setSelectedDate] =
    useState<Date>(
      new Date()
    );

  /*
   * Available years:
   *
   * 2020 → current year
   */
  const availableYears =
    getAvailableYears();

  /*
   * Generate chart data
   * according to the period.
   */
  const chartData =
    period === "year"
      ? getYearChartData()
      : period === "month"
        ? getMonthChartData(
            selectedYear
          )
        : period === "week"
          ? getWeekChartData(
              selectedDate
            )
          : getDayChartData(
              selectedDate
            );

  /*
   * Find maximum value
   * from income and expense.
   */
  const maxValue = Math.max(
    ...chartData.flatMap(
      (item) => item.expense
    )
  );

  /*
   * Rounded Y-axis maximum.
   */
  const yAxisMax =
    getNiceMax(maxValue);

  /*
   * Exactly 5 Y-axis points.
   */
  const yAxisTicks = [
    0,
    yAxisMax / 4,
    yAxisMax / 2,
    (yAxisMax * 3) / 4,
    yAxisMax,
  ];

  /*
   * Convert date to the format
   * required by the HTML date input.
   */
  function getInputDate(
    date: Date
  ) {
    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  /*
   * Day date display.
   */
  const formattedDayDate =
    selectedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        weekday: "short",
      }
    );

  return (
    <Card className="border-.5 border-slate-200/70">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              Financial Overview
            </CardTitle>

            <CardDescription>
              Income and expenses over time
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {/* =========================
                PERIOD SELECTOR
            ========================= */}

            <Select
              value={period}
              onValueChange={(value) =>
                setPeriod(
                  value as Period
                )
              }
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="year">
                  Year
                </SelectItem>

                <SelectItem value="month">
                  Month
                </SelectItem>

                <SelectItem value="week">
                  Week
                </SelectItem>

                <SelectItem value="day">
                  Day
                </SelectItem>
              </SelectContent>
            </Select>

            {/* =========================
                YEAR SELECTOR
            ========================= */}

            {(period === "year" ||
              period === "month") && (
              <Select
                value={String(
                  selectedYear
                )}
                onValueChange={(value) =>
                  setSelectedYear(
                    Number(value)
                  )
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {availableYears
                    .slice()
                    .reverse()
                    .map((year) => (
                      <SelectItem
                        key={year}
                        value={String(
                          year
                        )}
                      >
                        {year}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}

            {/* =========================
                WEEK DATE SELECTOR
            ========================= */}

            {period === "week" && (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex h-9 min-w-[220px] items-center justify-between gap-3 rounded-md border bg-background px-3 text-sm font-medium transition hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-muted-foreground" />

                      {formatWeekRange(
                        selectedDate
                      )}
                    </span>

                    <ChevronDown className="size-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  className="w-auto p-0"
                >
                  <Calendar
                    mode="single"
                    selected={
                      selectedDate
                    }
                    onSelect={(
                      date
                    ) => {
                      if (!date) {
                        return;
                      }

                      setSelectedDate(
                        date
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}

            {/* =========================
                DAY DATE SELECTOR
            ========================= */}

            {period === "day" && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={getInputDate(
                    selectedDate
                  )}
                  onChange={(event) => {
                    const date =
                      new Date(
                        `${event.target.value}T00:00:00`
                      );

                    setSelectedDate(
                      date
                    );

                    setSelectedYear(
                      date.getFullYear()
                    );
                  }}
                  className="h-9 w-[155px] rounded-md border bg-background px-3 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* =========================
            WEEK DESCRIPTION
        ========================= */}

        {period === "week" && (
          <CardDescription className="pt-2">
            Showing transactions for the
            selected week
          </CardDescription>
        )}

        {/* =========================
            DAY DESCRIPTION
        ========================= */}

        {period === "day" && (
          <CardDescription className="pt-2">
            Showing transactions for{" "}
            <span className="font-medium">
              {formattedDayDate}
            </span>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              domain={[
                0,
                yAxisMax,
              ]}
              ticks={yAxisTicks}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                `₹${Number(
                  value
                ).toLocaleString(
                  "en-IN"
                )}`
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent />
              }
            />

            <ChartLegend
              content={<ChartLegendContent />}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--color-expense)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}