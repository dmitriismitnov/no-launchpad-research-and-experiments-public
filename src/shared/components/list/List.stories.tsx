import type { Meta, StoryObj, } from "@storybook/react-vite";

import { List, } from "./list";

const files = [
    { title: "primitive-tokens.json", meta: "12 KB · 2h ago", trailing: "JSON", icon: "file", },
    { title: "semantic-tokens.json", meta: "48 KB · 2h ago", trailing: "JSON", icon: "file", },
    { title: "Button.tsx", meta: "Edited by Ada", trailing: "TSX", icon: "file", },
    { title: "Archived notes", meta: "Read only", trailing: "—", icon: "file", },
] as const;

const meta = {
    title: "Components/Data display/List",
    component: List,
    args: { items: files, },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcons: Story = {
    args: {
        items: [
            { title: "Foundation published", meta: "Mar 2", trailing: "Done", },
            { title: "Components in review", meta: "In progress", trailing: "12", },
        ],
    },
};

export const TitlesOnly: Story = {
    args: {
        items: [
            { title: "Design tokens", },
            { title: "Components", },
            { title: "Patterns", },
        ],
    },
};
