import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Splitter, } from "./splitter";

const frame = css({ width: "360px", });

const paneLabel = css({
    fontFamily: "body",
    fontSize: "xs",
    fontWeight: "regular",
    lineHeight: "normal",
    color: "semantic.common.600.background",
});

const meta = {
    title: "Components/Layout/Splitter",
    component: Splitter,
    args: {
        start: <span className={paneLabel}>Editor</span>,
        end: <span className={paneLabel}>Preview</span>,
    },
    decorators: [
        (Story) => (
            <div className={frame}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
    args: { orientation: "vertical", },
};
