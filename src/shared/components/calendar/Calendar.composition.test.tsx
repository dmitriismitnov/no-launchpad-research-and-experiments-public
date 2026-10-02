import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Calendar, CalendarDay, } from "./calendar";

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

    test("highlights a range when both bounds are given", () => {
        const markup = renderToStaticMarkup(
            <Calendar
                month={march}
                today={today}
                weekStartsOn={1}
                rangeStart={new Date(2025, 2, 10)}
                rangeEnd={new Date(2025, 2, 14)}
            />,
        );

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

describe("CalendarDay composition", () => {
    test("renders a labelled day button", () => {
        const markup = renderToStaticMarkup(<CalendarDay date={selected} />);

        expect(markup).toContain('type="button"');
        expect(markup).toContain('data-date="2025-03-16"');
        expect(markup).toContain('aria-label="March 16, 2025"');
        expect(markup).toContain(">16<");
    });

    test("marks selected, today, in-range and disabled states", () => {
        const markup = renderToStaticMarkup(
            <CalendarDay date={selected} selected today inRange disabled />,
        );

        expect(markup).toContain('aria-selected="true"');
        expect(markup).toContain('aria-current="date"');
        expect(markup).toContain('aria-disabled="true"');
        expect(markup).toContain("disabled");
        expect(markup).toContain("calendar__day--inRange_true");
    });
});
