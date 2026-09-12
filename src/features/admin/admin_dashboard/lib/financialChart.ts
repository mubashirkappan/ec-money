import { walletCredits } from "@/dummy_db/walletcredits.mock";

export type ChartData = {
  label: string;
  walletCredits: number;
};

export type Year = number;

export function parseWalletCreditDate(date: string) {
  const [day, month, year] = date.split(" ");

  const monthIndex = new Date(
    `${month} 1, ${year}`
  ).getMonth();

  return new Date(
    Number(year),
    monthIndex,
    Number(day)
  );
}

function getWalletCreditTotals(
  filteredWalletCredits: typeof walletCredits
) {
  const walletCredits = filteredWalletCredits
    .filter(
      (credit) =>
        credit.status === "Completed"
    )
    .reduce(
      (total, credit) =>
        total + credit.amount,
      0
    );

  return {
    walletCredits,
  };
}

/*
 * Returns years from 2020
 * up to the current year.
 */
export function getAvailableYears(): Year[] {
  const currentYear =
    new Date().getFullYear();

  const startYear = 2020;

  return Array.from(
    {
      length:
        currentYear -
        startYear +
        1,
    },
    (_, index) =>
      startYear + index
  );
}

/*
 * YEAR VIEW
 */
export function getYearChartData(): ChartData[] {
  const years =
    getAvailableYears();

  return years.map(
    (year: Year) => {
      const yearWalletCredits =
        walletCredits.filter(
          (credit) => {
            const date =
              parseWalletCreditDate(
                credit.date
              );

            return (
              date.getFullYear() ===
                year &&
              credit.status ===
                "Completed"
            );
          }
        );

      const totals =
        getWalletCreditTotals(
          yearWalletCredits
        );

      return {
        label: String(year),
        ...totals,
      };
    }
  );
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/*
 * MONTH VIEW
 */
export function getMonthChartData(
  selectedYear: Year
): ChartData[] {
  return months.map(
    (month, index) => {
      const monthWalletCredits =
        walletCredits.filter(
          (credit) => {
            const date =
              parseWalletCreditDate(
                credit.date
              );

            return (
              date.getFullYear() ===
                selectedYear &&
              date.getMonth() ===
                index &&
              credit.status ===
                "Completed"
            );
          }
        );

      const totals =
        getWalletCreditTotals(
          monthWalletCredits
        );

      return {
        label: month,
        ...totals,
      };
    }
  );
}

/*
 * Returns Monday of the
 * selected week.
 *
 * Week:
 *
 * Monday → Sunday
 */
export function getStartOfWeek(
  date: Date
): Date {
  const result = new Date(date);

  const day =
    result.getDay();

  /*
   * Sunday = 0
   * Monday = 1
   */
  const difference =
    day === 0
      ? -6
      : 1 - day;

  result.setDate(
    result.getDate() +
      difference
  );

  result.setHours(
    0,
    0,
    0,
    0
  );

  return result;
}

/*
 * Returns the complete
 * Monday → Sunday range.
 */
export function getWeekRange(
  selectedDate: Date
): {
  start: Date;
  end: Date;
} {
  const start =
    getStartOfWeek(
      selectedDate
    );

  const end = new Date(
    start
  );

  end.setDate(
    start.getDate() + 6
  );

  return {
    start,
    end,
  };
}

/*
 * Format the selected week.
 *
 * Same year:
 *
 * 27 Jul – 02 Aug 2026
 *
 * Different years:
 *
 * 29 Dec 2025 – 04 Jan 2026
 */
export function formatWeekRange(
  selectedDate: Date
): string {
  const { start, end } =
    getWeekRange(
      selectedDate
    );

  const startText =
    start.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const endText =
    end.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  if (
    start.getFullYear() ===
    end.getFullYear()
  ) {
    const startWithoutYear =
      start.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

    return `${startWithoutYear} – ${endText}`;
  }

  return `${startText} – ${endText}`;
}

/*
 * WEEK VIEW
 *
 * Example:
 *
 * Mon 27
 * Tue 28
 * Wed 29
 * Thu 30
 * Fri 31
 * Sat 01
 * Sun 02
 */
export function getWeekChartData(
  selectedDate: Date
): ChartData[] {
  const startOfWeek =
    getStartOfWeek(
      selectedDate
    );

  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  return days.map(
    (
      dayLabel,
      index
    ): ChartData => {
      const currentDate =
        new Date(
          startOfWeek
        );

      currentDate.setDate(
        startOfWeek.getDate() +
          index
      );

      const dayWalletCredits =
        walletCredits.filter(
          (credit) => {
            const date =
              parseWalletCreditDate(
                credit.date
              );

            return (
              date.getFullYear() ===
                currentDate.getFullYear() &&
              date.getMonth() ===
                currentDate.getMonth() &&
              date.getDate() ===
                currentDate.getDate() &&
              credit.status ===
                "Completed"
            );
          }
        );

      const totals =
        getWalletCreditTotals(
          dayWalletCredits
        );

      return {
        label: `${dayLabel} ${String(
          currentDate.getDate()
        ).padStart(2, "0")}`,
        ...totals,
      };
    }
  );
}

/*
 * DAY VIEW
 *
 * 12 AM → 11 PM
 */
export function getDayChartData(
  selectedDate: Date
): ChartData[] {
  const hours = Array.from(
    {
      length: 24,
    },
    (_, index) =>
      index
  );

  return hours.map(
    (hour): ChartData => {
      /*
       * Currently this uses
       * the wallet credit date.
       *
       * If your wallet credit data
       * contains time, this can
       * later be extended to
       * group wallet credits by hour.
       */
      const dayWalletCredits =
        walletCredits.filter(
          (credit) => {
            const date =
              parseWalletCreditDate(
                credit.date
              );

            return (
              date.getFullYear() ===
                selectedDate.getFullYear() &&
              date.getMonth() ===
                selectedDate.getMonth() &&
              date.getDate() ===
                selectedDate.getDate() &&
              credit.status ===
                "Completed"
            );
          }
        );

      const totals =
        getWalletCreditTotals(
          hour === 0
            ? dayWalletCredits
            : []
        );

      const hourLabel =
        new Date(
          2000,
          0,
          1,
          hour
        ).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            hour12: true,
          }
        );

      return {
        label: hourLabel,
        ...totals,
      };
    }
  );
}

/*
 * Returns a rounded maximum
 * for the Y-axis.
 *
 * Examples:
 *
 * 98,256  → 100,000
 * 126,450 → 150,000
 * 186,500 → 200,000
 * 243,000 → 250,000
 * 378,000 → 500,000
 */
export function getNiceMax(
  value: number
) {
  if (value <= 0) {
    return 100;
  }

  const magnitude =
    Math.pow(
      10,
      Math.floor(
        Math.log10(value)
      )
    );

  const normalized =
    value / magnitude;

  let niceNumber: number;

  if (normalized <= 1) {
    niceNumber = 1;
  } else if (
    normalized <= 1.5
  ) {
    niceNumber = 1.5;
  } else if (
    normalized <= 2
  ) {
    niceNumber = 2;
  } else if (
    normalized <= 2.5
  ) {
    niceNumber = 2.5;
  } else if (
    normalized <= 5
  ) {
    niceNumber = 5;
  } else {
    niceNumber = 10;
  }

  return (
    niceNumber * magnitude
  );
}