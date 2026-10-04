import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { DataTable, type DataTableProps, type DataTableRow, } from "./data-table";

const columns = [
    { key: "component", header: "COMPONENT", emphasis: "primary", },
    { key: "owner", header: "OWNER", width: 150, },
    { key: "status", header: "STATUS", width: 120, },
] satisfies DataTableProps["columns"];

const components: readonly DataTableRow[] = [
    { id: "button", cells: { component: "Button", owner: "Ada Rivera", status: "Stable", }, },
    { id: "select", cells: { component: "Select", owner: "Kai Nakamura", status: "Beta", }, },
    { id: "data-table", cells: { component: "Data Table", owner: "Sam Okoro", status: "Draft", }, },
];

const meta = {
    title: "Components/Data display/Data Table",
    component: DataTable,
    args: { columns, rows: components, },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NumericColumns: Story = {
    args: {
        columns: [
            { key: "package", header: "PACKAGE", emphasis: "primary", },
            { key: "downloads", header: "DOWNLOADS", align: "end", width: 140, },
            { key: "size", header: "SIZE", align: "end", width: 100, },
        ],
        rows: [
            { id: "core", cells: { package: "@nolaunchpad/core", downloads: "48.2K", size: "48 KB", }, },
            { id: "tokens", cells: { package: "@nolaunchpad/tokens", downloads: "31.7K", size: "12 KB", }, },
            { id: "icons", cells: { package: "@nolaunchpad/icons", downloads: "9.4K", size: "6 KB", }, },
        ],
    },
};

export const Empty: Story = {
    args: { rows: [], },
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const frame = css({ width: "640px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `FZPkF` / `M2LZ59` (docs `g02ukq`): the card `surface/raised` and
// `border/subtle` discriminate in both themes; the header band `surface/sunken`
// discriminates in dark only (neutral.100 light value-equal vs neutral.950 dark);
// header `text/tertiary`, body `text/secondary` and leading `text/primary` are
// value-equal role renames (asserted, not claimed RED). Row/header separators
// stay the Pen `common/200/divider`. The doc's focus rule belongs to the BLOCKED
// interactive row (focus-indicator audit 0/0).
const dataTableColours = {
    surface: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    head: { light: "rgb(241, 245, 249)", dark: "rgb(2, 6, 23)", },
    headCell: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
    cell: { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", },
    cellLead: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
} as const;

const assertDataTableTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("data-table-tokens");
        const head = root.querySelector(".dataTable__head") as HTMLElement;
        const headCell = root.querySelector(".dataTable__headCell") as HTMLElement;
        const cell = root.querySelector(".dataTable__cell:not(.dataTable__cellLead)") as HTMLElement;
        const cellLead = root.querySelector(".dataTable__cellLead") as HTMLElement;

        await expect(getComputedStyle(root).backgroundColor).toBe(dataTableColours.surface[theme]);
        await expect(getComputedStyle(root).borderTopColor).toBe(dataTableColours.border[theme]);
        await expect(getComputedStyle(head).backgroundColor).toBe(dataTableColours.head[theme]);
        await expect(getComputedStyle(headCell).color).toBe(dataTableColours.headCell[theme]);
        await expect(getComputedStyle(cell).color).toBe(dataTableColours.cell[theme]);
        await expect(getComputedStyle(cellLead).color).toBe(dataTableColours.cellLead[theme]);
    };

const dataTableTokens = (
    <DataTable
        data-testid="data-table-tokens"
        aria-label="Components"
        columns={columns}
        rows={components}
    />
);

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>{dataTableTokens}</div>
        </ThemeShell>
    ),
    play: assertDataTableTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={frame}>{dataTableTokens}</div>
        </ThemeShell>
    ),
    play: assertDataTableTokens("dark"),
};
