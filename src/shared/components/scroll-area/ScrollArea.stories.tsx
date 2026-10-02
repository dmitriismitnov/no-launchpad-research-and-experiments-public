import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { ScrollArea, } from "./scroll-area";

const frame = css({ width: "260px", });

const line = css({
    fontFamily: "body",
    fontSize: "sm",
    fontWeight: "regular",
    lineHeight: "normal",
    color: "semantic.common.700.background",
});

const lines = [
    "Scrollable content line 1",
    "Scrollable content line 2",
    "Scrollable content line 3",
    "Scrollable content line 4",
    "Scrollable content line 5",
    "Scrollable content line 6",
    "Scrollable content line 7",
    "Scrollable content line 8",
];

const stack = Array.from({ length: 8, },
    (_, index) => <p key={index} className={line}>{lines[index] ?? `Scrollable content line ${index + 1}`}</p>);

const meta = {
    title: "Components/Layout/Scroll Area",
    component: ScrollArea,
    args: { children: stack, },
    decorators: [
        (Story) => (
            <div className={frame}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Labelled: Story = {
    args: { label: "Release notes", },
};

export const Tall: Story = {
    args: { maxHeight: "20rem", },
};
