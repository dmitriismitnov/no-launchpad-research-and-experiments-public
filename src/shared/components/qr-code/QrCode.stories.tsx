import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { QrCode, } from "./qr-code";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
});

const meta = {
    title: "Components/Data display/QR Code",
    component: QrCode,
} satisfies Meta<typeof QrCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Labelled: Story = {
    args: { label: "Scan to open the app", },
};

export const Pair: Story = {
    parameters: { controls: { disable: true, }, },
    render: () => (
        <div className={row}>
            <QrCode label="Scan to open the app" />
            <QrCode label="Scan to join the workspace" />
        </div>
    ),
};
