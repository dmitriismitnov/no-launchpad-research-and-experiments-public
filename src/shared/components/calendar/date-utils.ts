/**
 * Date helpers for Calendar and Date Picker.
 *
 * Pure, dependency-free and local-time based: a calendar day is a `Date` whose
 * time component is ignored. Nothing here pulls a date library or touches the
 * timezone, so a month grid is stable across machines.
 */

/** English short weekday labels, indexed by `Date.getDay()` (Sunday = 0). */
export const WEEKDAY_LABELS = [ "S", "M", "T", "W", "T", "F", "S", ] as const;

/** English long weekday names, indexed by `Date.getDay()`. */
export const WEEKDAY_LONG_LABELS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

const MONTH_LONG_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

/** Strips the time component, leaving a local midnight date. */
export const toDateOnly = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** First day of the month that contains `date`. */
export const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);

/** First day of the week that contains `date`, rotated by `weekStartsOn`. */
export const startOfWeek = (date: Date, weekStartsOn: number): Date => {
    const day = date.getDay();
    const offset = ( day - normalizeWeekStart(weekStartsOn) + 7 ) % 7;

    return addDays(toDateOnly(date), -offset);
};

/** Adds a whole number of days. */
export const addDays = (date: Date, amount: number): Date =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

/** Adds a whole number of months, clamping the day to the target month. */
export const addMonths = (date: Date, amount: number): Date => {
    const year = date.getFullYear();
    const month = date.getMonth() + amount;
    const daysInTarget = getDaysInMonth(new Date(year, month, 1));
    const day = Math.min(date.getDate(), daysInTarget);

    return new Date(year, month, day);
};

/** Number of days in the month that contains `date`. */
export const getDaysInMonth = (date: Date): number => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

/** True when both dates fall on the same local day. */
export const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();

/** True when both dates fall in the same local month. */
export const isSameMonth = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth();

/** ISO calendar date (`YYYY-MM-DD`) from the local day. */
export const formatIso = (date: Date): string =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** Human month and year, e.g. `March 2025`. */
export const formatMonthLabel = (date: Date): string => `${MONTH_LONG_LABELS[date.getMonth()]} ${date.getFullYear()}`;

/** Human full date, e.g. `March 16, 2025`. */
export const formatDateLabel = (date: Date): string =>
    `${MONTH_LONG_LABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

/** Clamps a week-start index into `0..6`. */
export const normalizeWeekStart = (weekStartsOn: number): number => {
    if ( !Number.isFinite(weekStartsOn) ) {
        return 0;
    }

    return ( ( Math.trunc(weekStartsOn) % 7 ) + 7 ) % 7;
};
