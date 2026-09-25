import { describe, expect, test, } from "bun:test";

import { isValidIconName, normalizeSvg, validateSvg, } from "./svg";

const RAW = `<svg
  data-pencil-name="Glyph"
  data-icon-name="arrow-right"
  data-icon-set="lucide"
  viewBox="0 0 13.99993896484375 14"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  style="box-sizing: border-box; flex-shrink: 0; height: 24px; width: 24px"
 >
  <path
    d="M1 2 3 4z"
    fill="#000000"
  ></path>
</svg>`;

const CANONICAL =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.99993896484375 14"><path d="M1 2 3 4z" fill="currentColor"/></svg>`;

describe("normalizeSvg", () => {
    test("produces the canonical form from a raw export", () => {
        expect(normalizeSvg(RAW)).toBe(CANONICAL);
    });

    test("is idempotent", () => {
        expect(normalizeSvg(CANONICAL)).toBe(CANONICAL);
    });

    test('keeps fill="none" and drops title/desc', () => {
        const source = `<svg viewBox="0 0 1 1"><title>label</title><path d="M0 0" fill="none"/></svg>`;

        expect(normalizeSvg(source)).toBe(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><path d="M0 0" fill="none"/></svg>`,
        );
    });

    test("adds a missing namespace", () => {
        expect(normalizeSvg(`<svg viewBox="0 0 1 1"><path d="M0 0"/></svg>`)).toBe(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><path d="M0 0"/></svg>`,
        );
    });

    test("normalizes named and rgb colours to currentColor", () => {
        const source = `<svg viewBox="0 0 1 1"><path d="M0 0" fill="black"/><path d="M1 1" fill="rgb(1,2,3)"/></svg>`;

        expect(normalizeSvg(source)).toBe(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><path d="M0 0" fill="currentColor"/><path d="M1 1" fill="currentColor"/></svg>`,
        );
    });
});

describe("validateSvg", () => {
    test("accepts a canonical svg", () => {
        expect(validateSvg(CANONICAL)).toEqual([]);
    });

    test("rejects a missing namespace", () => {
        expect(validateSvg(`<svg viewBox="0 0 1 1"><path d="M0 0"/></svg>`)).toContain(
            "root <svg> must declare xmlns",
        );
    });

    test("rejects a foreign namespace", () => {
        expect(
            validateSvg(`<svg xmlns="http://example.com" viewBox="0 0 1 1"><path d="M0 0"/></svg>`),
        ).toContain(`root <svg> xmlns must be "http://www.w3.org/2000/svg"`);
    });

    test("rejects a missing viewBox", () => {
        expect(validateSvg(`<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>`)).toContain(
            "root <svg> must declare a viewBox",
        );
    });

    test("rejects a malformed viewBox", () => {
        expect(validateSvg(`<svg viewBox="0 0 1"><path d="M0 0"/></svg>`)).toContain(
            `root viewBox must be four finite numbers, got "0 0 1"`,
        );
    });

    test("rejects multiple roots", () => {
        const issues = validateSvg(`<svg viewBox="0 0 1 1"><path d="M0 0"/></svg><svg viewBox="0 0 1 1"/>`);

        expect(issues).toContain("expected exactly one root <svg>, found 2");
    });

    test("rejects forbidden elements", () => {
        const issues = validateSvg(
            `<svg viewBox="0 0 1 1"><path d="M0 0"/><script>alert(1)</script><image href="x.png"/></svg>`,
        );

        expect(issues).toContain("element <script> is not allowed");
        expect(issues).toContain("element <image> is not allowed");
    });

    test("rejects inline styles and provenance attributes", () => {
        const issues = validateSvg(
            `<svg viewBox="0 0 1 1" style="color:red"><path data-icon-name="x" d="M0 0" fill="currentColor"/></svg>`,
        );

        expect(issues).toContain(`<svg> attribute "style" is not allowed`);
        expect(issues).toContain(`<path> carries provenance attribute "data-icon-name"; run normalize`);
    });

    test("rejects stroke-based geometry", () => {
        const issues = validateSvg(
            `<svg viewBox="0 0 1 1"><path d="M0 0" stroke="currentColor" stroke-width="2"/></svg>`,
        );

        expect(issues).toContain(`<path> uses stroke-based geometry; flatten it to filled paths`);
    });

    test("rejects literal fill colours", () => {
        const issues = validateSvg(`<svg viewBox="0 0 1 1"><path d="M0 0" fill="#abc"/></svg>`);

        expect(issues).toContain(`<path> fill "#abc" must be "currentColor" or "none"; run normalize`);
    });

    test("rejects external references", () => {
        const issues = validateSvg(
            `<svg viewBox="0 0 1 1"><path d="M0 0" fill="currentColor" transform="url(http://x)"/></svg>`,
        );

        expect(issues).toContain(`<path> attribute "transform" references external content`);
    });

    test("rejects an empty drawing", () => {
        expect(validateSvg(`<svg viewBox="0 0 1 1"/>`)).toContain("svg has no drawing elements");
    });
});

describe("isValidIconName", () => {
    test("accepts kebab-case names", () => {
        expect(isValidIconName("arrow-right")).toBe(true);
        expect(isValidIconName("x")).toBe(true);
    });

    test("rejects other shapes", () => {
        expect(isValidIconName("ArrowRight")).toBe(false);
        expect(isValidIconName("arrow_right")).toBe(false);
        expect(isValidIconName("-arrow")).toBe(false);
        expect(isValidIconName("arrow-")).toBe(false);
        expect(isValidIconName("")).toBe(false);
    });
});
