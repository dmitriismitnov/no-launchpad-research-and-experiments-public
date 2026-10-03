import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Calendar, } from "./calendar";
import * as calendarEntry from "./index";

const march = new Date(2025, 2, 1);
const selected = new Date(2025, 2, 16);
const today = new Date(2025, 2, 10);

describe("Calendar composition", () => {
    test("renders a month grid with weekday headers and day cells", () => {
        const markup = renderToStaticMarkup(
            <Calendar month={march} value={selected} today={today} weekStartsOn={1} />,
        );

        expect(markup).toContain('role="grid"');
        expect(markup).toContain("March 2025");
        expect(markup).toContain('role="columnheader"');
        expect(markup.match(/data-date=/g)?.length).toBe(42);
        expect(markup).toContain("calendar__day");
    });

    test("marks the selected day and today", () => {
        const markup = renderToStaticMarkup(
            <Calendar month={march} value={selected} today={today} weekStartsOn={1} />,
        );

        expect(markup).toContain('data-date="2025-03-16"');
        expect(markup).toContain('aria-selected="true"');
        expect(markup).toContain("calendar__day--selected_true");
        expect(markup).toContain('aria-current="date"');
        expect(markup).toContain("calendar__day--today_true");
    });

    test("disables days before min and after max", () => {
        const markup = renderToStaticMarkup(
            <Calendar
                month={march}
                today={today}
                weekStartsOn={1}
                min={new Date(2025, 2, 15)}
                max={new Date(2025, 2, 20)}
            />,
        );

        expect(markup).toContain("calendar__day--disabled_true");
        expect(markup).toContain('disabled=""');
    });

    test("highlights a controlled range between its endpoints", () => {
        const markup = renderToStaticMarkup(
            <Calendar
                selectionMode="range"
                month={march}
                today={today}
                weekStartsOn={1}
                value={{ start: new Date(2025, 2, 10), end: new Date(2025, 2, 14), }}
            />,
        );

        expect(markup).toContain("calendar__day--inRange_true");
        expect(markup.match(/aria-selected="true"/g)?.length).toBe(2);
    });

    test("normalizes a backwards controlled range", () => {
        const markup = renderToStaticMarkup(
            <Calendar
                selectionMode="range"
                month={march}
                today={today}
                weekStartsOn={1}
                value={{ start: new Date(2025, 2, 14), end: new Date(2025, 2, 10), }}
            />,
        );

        expect(markup.match(/aria-selected="true"/g)?.length).toBe(2);
        expect(markup).toContain("calendar__day--inRange_true");
    });

    test("navigates months with labelled controls", () => {
        const markup = renderToStaticMarkup(<Calendar month={march} today={today} />);

        expect(markup).toContain('aria-label="Previous month"');
        expect(markup).toContain('aria-label="Next month"');
    });

    test("uses an accessible grid name", () => {
        const markup = renderToStaticMarkup(
            <Calendar month={march} today={today} aria-label="Выбор даты" />,
        );

        expect(markup).toContain('aria-label="Выбор даты"');
    });

    test("surfaces an outside-month day for adjacent weeks", () => {
        const markup = renderToStaticMarkup(
            <Calendar month={march} today={today} weekStartsOn={1} />,
        );

        expect(markup).toContain('data-date="2025-02-24"');
        expect(markup).toContain("calendar__day--outsideMonth_true");
    });
});

describe("Calendar public surface", () => {
    test("keeps CalendarDay internal to the owner", () => {
        const entry = calendarEntry as unknown as Record<string, unknown>;

        expect(entry["Calendar"]).toBeDefined();
        expect(entry["CalendarDay"]).toBeUndefined();
        expect(entry["CalendarDayProps"]).toBeUndefined();
    });
});
