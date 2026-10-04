import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import type { FileUploadProps, } from "./file-upload";
import { FileUpload, } from "./file-upload";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "320px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: FileUploadProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <FileUpload {...args} />
        </div>
    </ThemeShell>
);

const png = () => new File([ "png", ], "logo.png", { type: "image/png", });
const svg = () => new File([ "<svg/>", ], "mark.svg", { type: "image/svg+xml", });

// The PEN reference (`File Upload`, id `YxCMD`) in its idle state.
const reference: FileUploadProps = {
    accept: "image/png,image/svg+xml",
    multiple: true,
};

const meta = {
    title: "Components/Forms & selection/File Upload",
    component: FileUpload,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "title", "description", "hint", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        title: { control: { type: "text", }, },
        description: { control: { type: "text", }, },
        hint: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        ...reference,
        hint: "До 10 МБ.",
        invalid: false,
        error: "Файл слишком большой.",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const input = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;

        await expect(input.accept).toBe("image/png,image/svg+xml");
        await expect(canvasElement.textContent).toContain("Drop files here");
    },
};

export const WithSelection: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const input = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;

        await user.upload(input, [ png(), svg(), ]);
        await expect(canvasElement.textContent).toContain("2 files selected");
    },
};

export const DragActive: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const dropzone = canvasElement.querySelector(".fileUpload__root") as Element;

        await fireEvent.dragOver(dropzone);
        await expect(dropzone.className).toContain("fileUpload__root--dragging_true");
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Файл слишком большой.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const input = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Файл слишком большой.");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const input = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;

        await expect(input.disabled).toBe(true);
    },
};

export const KeyboardActivation: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const input = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;
        const root = canvasElement.querySelector(".fileUpload__root") as Element;

        input.focus();
        await expect(document.activeElement).toBe(input);
        await expect(getComputedStyle(root).outlineStyle).toBe("solid");
        await expect(getComputedStyle(root).outlineWidth).toBe("2px");
    },
};

const assertExternalUploading = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const progress = canvasElement.querySelector('[role="progressbar"]') as Element;
    const root = canvasElement.querySelector(".fileUpload__root") as Element;
    const bar = canvasElement.querySelector(".fileUpload__progressBar") as HTMLElement;

    await expect(progress.getAttribute("aria-valuenow")).toBe("42");
    await expect(progress.getAttribute("aria-valuemin")).toBe("0");
    await expect(progress.getAttribute("aria-valuemax")).toBe("100");
    await expect(bar.style.width).toBe("42%");
    await expect(canvasElement.textContent).toContain("logo.png");
    await expect(canvasElement.textContent).toContain("Загрузка…");
    await expect(getComputedStyle(root).borderTopColor).not.toBe("rgb(220, 38, 38)");
};

export const ExternalUploading: Story = {
    args: { ...reference, status: "uploading", progress: 42, fileName: "logo.png", statusMessage: "Загрузка…", },
    render: renderIn("light"),
    play: assertExternalUploading,
};

export const DarkExternalUploading: Story = {
    args: { ...reference, status: "uploading", progress: 42, fileName: "logo.png", statusMessage: "Загрузка…", },
    render: renderIn("dark"),
    play: assertExternalUploading,
};

export const ProgressClamp: Story = {
    args: { ...reference, status: "uploading", progress: 140, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const progress = canvasElement.querySelector('[role="progressbar"]') as Element;

        await expect(progress.getAttribute("aria-valuenow")).toBe("100");
    },
};

export const ExternalComplete: Story = {
    args: { ...reference, status: "complete", fileName: "logo.png", statusMessage: "Готово", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelector('[role="progressbar"]')).toBeNull();
        await expect(canvasElement.textContent).toContain("logo.png");
        await expect(canvasElement.textContent).toContain("Готово");
    },
};

export const DarkExternalComplete: Story = {
    args: { ...reference, status: "complete", fileName: "logo.png", statusMessage: "Готово", },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.textContent).toContain("logo.png");
        await expect(canvasElement.textContent).toContain("Готово");
    },
};

const assertExternalError = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    border: string,
): Promise<void> => {
    const root = canvasElement.querySelector(".fileUpload__root") as Element;
    const input = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;

    await expect(canvasElement.textContent).toContain("Файл слишком большой.");
    await expect(getComputedStyle(root).borderTopColor).toBe(border);
    await expect(input.getAttribute("aria-describedby")).toBeTruthy();
};

export const ExternalError: Story = {
    args: { ...reference, status: "error", statusMessage: "Файл слишком большой.", },
    render: renderIn("light"),
    play: async (context) => assertExternalError(context, "rgb(220, 38, 38)"),
};

export const DarkExternalError: Story = {
    args: { ...reference, status: "error", statusMessage: "Файл слишком большой.", },
    render: renderIn("dark"),
    play: async (context) => assertExternalError(context, "rgb(248, 113, 113)"),
};

const assertThemeRoot = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const root = canvasElement.querySelector(".fileUpload__root") as Element;

    await expect(getComputedStyle(root).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeRoot(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeRoot(context, "rgb(2, 6, 23)"),
};
