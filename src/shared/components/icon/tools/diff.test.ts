import { describe, expect, test, } from "bun:test";

import { classifyChanges, migrateUsages, scanIconUsages, } from "./diff";

const svg = (body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">${body}</svg>`;

describe("classifyChanges", () => {
    const current = { "arrow-right": 0xE001, "plus": 0xE002, };
    const canonical = { "arrow-right": svg('<path d="a"/>'), "plus": svg('<path d="b"/>'), };

    test("classifies added, unchanged, changed and removed", () => {
        const diff = classifyChanges(
            [
                { name: "arrow-right", svg: canonical["arrow-right"], },
                { name: "plus", svg: svg('<path d="changed"/>'), },
                { name: "star", svg: svg('<path d="c"/>'), },
            ],
            current,
            canonical,
        );

        expect(diff.added).toEqual([ "star", ]);
        expect(diff.unchanged).toEqual([ "arrow-right", ]);
        expect(diff.changed).toEqual([ "plus", ]);
        expect(diff.removed).toEqual([]);
    });

    test("reports a removal whose glyph reappears under a new key as a rename", () => {
        const diff = classifyChanges(
            [ { name: "arrow-left", svg: canonical["plus"], }, {
                name: "arrow-right",
                svg: canonical["arrow-right"],
            }, ],
            current,
            canonical,
        );

        expect(diff.removed).toEqual([ "plus", ]);
        expect(diff.added).toEqual([ "arrow-left", ]);
        expect(diff.renames).toEqual([ { from: "plus", to: "arrow-left", }, ]);
    });

    test("does not invent a rename for a genuinely new glyph", () => {
        const diff = classifyChanges(
            [ { name: "arrow-right", svg: canonical["arrow-right"], }, { name: "plus", svg: canonical["plus"], }, {
                name: "star",
                svg: svg('<path d="new"/>'),
            }, ],
            current,
            canonical,
        );

        expect(diff.renames).toEqual([]);
    });
});

describe("scanIconUsages", () => {
    test("finds literal names and reports dynamic usages", () => {
        const files = [
            {
                path: "src/app/App.tsx",
                content: [
                    `import { Icon } from "x";`,
                    `const a = <Icon name="arrow-right" />;`,
                    `const b = <Icon name={"plus"} size="sm" />;`,
                    `const c = <Icon name={dynamic} />;`,
                ].join("\n"),
            },
        ];

        const scan = scanIconUsages(files);

        expect(scan.static).toEqual([
            { key: "arrow-right", file: "src/app/App.tsx", line: 2, },
            { key: "plus", file: "src/app/App.tsx", line: 3, },
        ]);
        expect(scan.dynamic).toEqual([ { file: "src/app/App.tsx", line: 4, }, ]);
    });
});

describe("migrateUsages", () => {
    test("rewrites literal names in both quote styles", () => {
        const before = `<Icon name="plus" /><Icon name={'plus'} />`;
        const { content, count, } = migrateUsages(before, "plus", "add");

        expect(count).toBe(2);
        expect(content).toBe(`<Icon name="add" /><Icon name="add" />`);
    });

    test("leaves dynamic names and other icons untouched", () => {
        const before = `<Icon name={kind} /><Icon name="arrow-right" />`;
        const { content, count, } = migrateUsages(before, "plus", "add");

        expect(count).toBe(0);
        expect(content).toBe(before);
    });
});
