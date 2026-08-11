import { transactions } from "@/dummy_db/transaction.mock";

export type ChartData = {
  label: string;
  income: number;
  expense: number;
};

export type Year = number;

export function parseTransactionDate(date: string) {
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

function getTransactionTotals(
  filteredTransactions: typeof transactions
) {
  const income = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === "credited"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const expense = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === "debited"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  return {
    income,
    expense,
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
      const yearTransactions =
        transactions.filter(
          (transaction) => {
            const date =
              parseTransactionDate(
                transaction.date
              );

            return (
              date.getFullYear() ===
                year &&
              transaction.status ===
                "completed"
            );
          }
        );

      const totals =
        getTransactionTotals(
          yearTransactions
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
      const monthTransactions =
        transactions.filter(
          (transaction) => {
            const date =
              parseTransactionDate(
                transaction.date
              );

            return (
              date.getFullYear() ===
                selectedYear &&
              date.getMonth() ===
                index &&
              transaction.status ===
                "completed"
            );
          }
        );

      const totals =
        getTransactionTotals(
          monthTransactions
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

      const dayTransactions =
        transactions.filter(
          (transaction) => {
            const date =
              parseTransactionDate(
                transaction.date
              );

            return (
              date.getFullYear() ===
                currentDate.getFullYear() &&
              date.getMonth() ===
                currentDate.getMonth() &&
              date.getDate() ===
                currentDate.getDate() &&
              transaction.status ===
                "completed"
            );
          }
        );

      const totals =
        getTransactionTotals(
          dayTransactions
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
       * the transaction date.
       *
       * If your transaction data
       * contains time, this can
       * later be extended to
       * group transactions by hour.
       */
      const dayTransactions =
        transactions.filter(
          (transaction) => {
            const date =
              parseTransactionDate(
                transaction.date
              );

            return (
              date.getFullYear() ===
                selectedDate.getFullYear() &&
              date.getMonth() ===
                selectedDate.getMonth() &&
              date.getDate() ===
                selectedDate.getDate() &&
              transaction.status ===
                "completed"
            );
          }
        );

      const totals =
        getTransactionTotals(
          hour === 0
            ? dayTransactions
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