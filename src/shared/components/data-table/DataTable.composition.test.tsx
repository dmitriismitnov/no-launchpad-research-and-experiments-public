import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { DataTable, } from "./data-table";

const columns = [
    { key: "name", header: "NAME", emphasis: "primary", },
    { key: "owner", header: "OWNER", width: 130, },
    { key: "status", header: "STATUS", width: 120, },
] as const;

const rows = [
    { id: "button", cells: { name: "Button", owner: "Ada Rivera", status: "Stable", }, },
    { id: "select", cells: { name: "Select", owner: "Kai Nakamura", status: "Beta", }, },
] as const;

describe("data table composition", () => {
    test("renders a semantic table with a header and one row per entry", () => {
        const markup = renderToStaticMarkup(<DataTable columns={columns} rows={rows} />);

        expect(markup).toContain("<table");
        expect(markup).toContain("<thead");
        expect(markup).toContain("<tbody");
        expect(markup).toContain("dataTable__root");
        expect(markup).toContain("dataTable__head");
        expect(markup).toContain("dataTable__headCell");
        expect(markup).toContain("dataTable__row");
        expect(markup).toContain("dataTable__cell");
        expect(markup).toContain('scope="col"');
        expect(markup).toContain("NAME");
        expect(markup).toContain("OWNER");
        expect(markup).toContain("STATUS");
        expect(markup).toContain("Button");
        expect(markup).toContain("Ada Rivera");
        expect(markup).toContain("Stable");
        expect(markup.match(/dataTable__row\b/g)?.length).toBe(2);
        expect(markup.match(/dataTable__headCell\b/g)?.length).toBe(3);
    });

    test("paints the emphasised and right-aligned columns", () => {
        const markup = renderToStaticMarkup(
            <DataTable
                columns={[ { key: "metric", header: "METRIC", emphasis: "primary", }, {
                    key: "value",
                    header: "VALUE",
                    align: "end",
                }, ]}
                rows={[ { cells: { metric: "Bundle", value: "48 KB", }, }, ]}
            />,
        );

        expect(markup).toContain("dataTable__cellLead");
        expect(markup).toContain("dataTable__cellEnd");
    });

    test("renders the header with no body rows for an empty set", () => {
        const markup = renderToStaticMarkup(<DataTable columns={columns} rows={[]} />);

        expect(markup).toContain("dataTable__headCell");
        expect(markup).toContain("<tbody></tbody>");
        expect(markup).not.toContain("dataTable__row");
    });

    test("forwards native table attributes", () => {
        const markup = renderToStaticMarkup(
            <DataTable columns={columns} rows={rows} aria-label="Components" data-testid="t" />,
        );

        expect(markup).toContain(`aria-label="Components"`);
        expect(markup).toContain(`data-testid="t"`);
    });

    test("rejects children at the type level", () => {
        // @ts-expect-error the table owns its structure; rows are typed data
        const withChildren = <DataTable columns={columns} rows={rows}>child</DataTable>;

        expect(withChildren).toBeDefined();
    });

    test("requires the columns and rows data props", () => {
        // @ts-expect-error columns are required
        const withoutColumns = <DataTable rows={rows} />;

        expect(withoutColumns).toBeDefined();
    });
});
