import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { MediaPlaceholder, } from "./media-placeholder";

const frame = css({ width: "220px", });

const meta = {
    title: "Components/Data display/Media Placeholder",
    component: MediaPlaceholder,
    args: { label: "16 : 9 media", },
    decorators: [
        (Story) => (
            <div className={frame}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof MediaPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLabel: Story = {
    args: { label: undefined, },
};

export const AlternativeGlyph: Story = {
    args: { icon: "waves", label: "Animated media", },
};
