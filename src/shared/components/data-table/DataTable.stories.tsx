import type { Meta, StoryObj, } from "@storybook/react-vite";

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
