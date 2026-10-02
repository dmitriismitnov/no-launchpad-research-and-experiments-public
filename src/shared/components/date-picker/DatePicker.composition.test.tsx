import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { DatePicker, } from "./date-picker";

const march = new Date(2025, 2, 16);
const today = new Date(2025, 2, 10);

describe("DatePicker composition", () => {
    test("renders a closed trigger with the placeholder", () => {
        const markup = renderToStaticMarkup(<DatePicker placeholder="Select date" />);

        expect(markup).toContain("datePicker__field");
        expect(markup).toContain("datePicker__value");
        expect(markup).toContain("Select date");
        expect(markup).toContain('aria-haspopup="dialog"');
        expect(markup).toContain('aria-expanded="false"');
        expect(markup).not.toContain("popover__surface");
        expect(markup).not.toContain('role="grid"');
    });

    test("shows the selected date in the trigger", () => {
        const markup = renderToStaticMarkup(<DatePicker defaultValue={march} />);

        expect(markup).toContain("2025-03-16");
    });

    test("renders the calendar inside the popover when open", () => {
        const markup = renderToStaticMarkup(
            <DatePicker defaultValue={march} today={today} defaultOpen calendarLabel="Выбор даты" />,
        );

        expect(markup).toContain("popover__surface");
        expect(markup).toContain('role="dialog"');
        expect(markup).toContain('role="grid"');
        expect(markup).toContain("March 2025");
        expect(markup).toContain('aria-expanded="true"');
    });

    test("invalid field shows the error and the invalid class", () => {
        const markup = renderToStaticMarkup(<DatePicker invalid error="Нужна дата" />);

        expect(markup).toContain("datePicker__field--invalid_true");
        expect(markup).toContain("Нужна дата");
    });

    test("hint is hidden while the error is shown", () => {
        const withHint = renderToStaticMarkup(<DatePicker hint="Формат ISO." />);
        const withError = renderToStaticMarkup(
            <DatePicker invalid hint="Формат ISO." error="Нужна дата" />,
        );

        expect(withHint).toContain("Формат ISO.");
        expect(withError).not.toContain("Формат ISO.");
    });

    test("disabled marks the field", () => {
        const markup = renderToStaticMarkup(<DatePicker disabled defaultValue={march} />);

        expect(markup).toContain("datePicker__field--disabled_true");
    });

    test("merges className with the root class, not replacing it", () => {
        const markup = renderToStaticMarkup(<DatePicker className="my-picker" />);

        expect(markup).toContain("my-picker");
        expect(markup).toContain("datePicker__root");
    });

    test("renders the trigger as the field button itself, not a wrapped span", () => {
        const markup = renderToStaticMarkup(<DatePicker defaultValue={march} />);

        expect(markup).toMatch(/<button[^>]*datePicker__field/);
        expect(markup).not.toContain("popover__trigger");
    });

    test("forwards disabled to the trigger button", () => {
        const markup = renderToStaticMarkup(<DatePicker disabled defaultValue={march} />);

        expect(markup).toMatch(/<button[^>]*disabled/);
    });
});
