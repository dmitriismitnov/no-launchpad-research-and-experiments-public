import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { CSSProperties, ReactNode, } from "react";

import { useEffect, useRef, useState, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ICON_CODEPOINTS, type IconName, } from "../icon/manifest.generated";
import type { ButtonProps, } from "./button";
import { Button, } from "./button";

const iconNames = Object.keys(ICON_CODEPOINTS) as IconName[];

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
    flexWrap: "wrap",
});

const matrix = css({
    display: "grid",
    gap: "x8",
});

const matrixRow = css({
    display: "grid",
    gridTemplateColumns: "1fr repeat(5, auto)",
    alignItems: "center",
    gap: "x8",
});

const cell = css({
    display: "grid",
    justifyItems: "center",
    gap: "x2",
});

const stateLabel = css({ fontSize: "sm", opacity: 0.6, });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const tones = [ "primary", "secondary", "ghost", "destructive", ] as const;

// Storybook-only state metadata. Uses data attributes so interaction states are
// deterministic and independent of pointer timing.
const states = [ "default", "hover", "active", "focus", "disabled", ] as const;

const stateProps: Record<typeof states[number], ButtonProps> = {
    default: {},
    hover: { "data-hover": "", } as ButtonProps,
    active: { "data-active": "", } as ButtonProps,
    focus: { "data-focus-visible": "", } as ButtonProps,
    disabled: { disabled: true, },
};

const renderSample = (tone: typeof tones[number], state: typeof states[number], key: string) => (
    <Button key={key} tone={tone} {...stateProps[state]}>{tone}</Button>
);

const Matrix = () => (
    <div className={matrix}>
        {tones.map((tone) => (
            <div key={tone} className={matrixRow}>
                <span className={stateLabel}>{tone}</span>
                {states.map((state) => (
                    <div key={`${tone}-${state}`} className={cell}>
                        {renderSample(tone, state, `${tone}-${state}`)}
                        <span className={stateLabel}>{state}</span>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: { layout: "fullscreen", },
    argTypes: {
        tone: {
            control: { type: "select", },
            options: [ "primary", "secondary", "ghost", "destructive", ],
        },
        size: {
            control: { type: "select", },
            options: [ "sm", "md", ],
        },
        width: {
            control: { type: "select", },
            options: [ "hug", "full", ],
        },
        loading: {
            control: { type: "boolean", },
        },
        prefixIcon: {
            control: { type: "select", },
            options: iconNames,
        },
        suffixIcon: {
            control: { type: "select", },
            options: iconNames,
        },
        children: {
            control: { type: "text", },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        children: "Button",
        tone: "primary",
        size: "md",
        prefixIcon: "check",
        suffixIcon: "arrow-right",
    },
    render: (args) => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button {...args} />
            </div>
        </ThemeShell>
    ),
};

export const AllTones: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                {tones.map((tone) => <Button key={tone} tone={tone}>{tone}</Button>)}
            </div>
        </ThemeShell>
    ),
};

export const Sizes: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button size="sm" prefixIcon="check">Small</Button>
                <Button size="md" prefixIcon="check">Medium</Button>
            </div>
        </ThemeShell>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button tone="secondary" prefixIcon="check" suffixIcon="arrow-right">
                    Continue
                </Button>
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: "Continue", });
        const icons = button.querySelectorAll(".icon");

        // Both slots render an icon, and the button keeps a single accessible
        // name from its label; the icons stay decorative.
        await expect(icons.length).toBe(2);
        for ( const icon of icons ) {
            await expect(icon).toHaveAttribute("aria-hidden", "true");
        }

        // The colour is owned by the icon slot; the glyph inherits it.
        for ( const selector of [ ".button__prefixIcon", ".button__suffixIcon", ] ) {
            const slot = button.querySelector(selector) as Element;
            const glyph = slot.querySelector(".icon") as Element;

            await expect(getComputedStyle(glyph).color).toBe(getComputedStyle(slot).color);
        }
    },
};

// A sentinel proves the slot colour resolves from the tone's semantic
// foreground rather than an inherited literal.
const FOREGROUND_PROBE = "rgb(17, 34, 51)";

const foregroundVariable = (tone: typeof tones[number]): string => {
    if ( tone === "primary" ) {
        return "--colors-semantic-action-primary-foreground";
    }

    if ( tone === "secondary" ) {
        return "--colors-semantic-action-secondary-foreground";
    }

    if ( tone === "destructive" ) {
        return "--colors-semantic-action-danger-foreground";
    }

    return "--colors-semantic-text-secondary";
};

const roleOverrides = (tone: typeof tones[number]): CSSProperties => ( {
    [foregroundVariable(tone)]: FOREGROUND_PROBE,
} );

const SlotRoleProbe = ({ theme, }: { theme: "light" | "dark"; }) => (
    <ThemeShell theme={theme}>
        <div className={row}>
            {tones.map((tone) => (
                <div key={tone} style={roleOverrides(tone)}>
                    <Button tone={tone} prefixIcon="check" suffixIcon="arrow-right">
                        {tone}
                    </Button>
                </div>
            ))}
        </div>
    </ThemeShell>
);

const assertSlotRoles = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);

    for ( const tone of tones ) {
        const button = canvas.getByRole("button", { name: tone, });
        const label = button.querySelector(".button__label") as Element;
        const icons = Array.from(button.querySelectorAll(".icon"));

        // Pen paints the label and both glyphs from one tone foreground.
        await expect(getComputedStyle(label).color).toBe(FOREGROUND_PROBE);
        await expect(icons.length).toBe(2);
        for ( const icon of icons ) {
            await expect(getComputedStyle(icon).color).toBe(FOREGROUND_PROBE);
        }
    }
};

export const SlotColourRoles: Story = {
    render: () => <SlotRoleProbe theme="light" />,
    play: assertSlotRoles,
};

export const DarkSlotColourRoles: Story = {
    render: () => <SlotRoleProbe theme="dark" />,
    play: assertSlotRoles,
};

const destructiveStates = [ "default", "hover", "active", "disabled", ] as const;

// Storybook-only state metadata, mirroring the shared matrix. The `data-*`
// attributes let the recipe's interaction selectors resolve deterministically.
const destructiveStateProps: Record<typeof destructiveStates[number], ButtonProps> = {
    default: { "data-testid": "destructive-default", } as ButtonProps,
    hover: { "data-testid": "destructive-hover", "data-hover": "", } as ButtonProps,
    active: { "data-testid": "destructive-active", "data-active": "", } as ButtonProps,
    disabled: { "data-testid": "destructive-disabled", disabled: true, } as ButtonProps,
};

const DestructiveRow = () => (
    <div className={row}>
        {destructiveStates.map((state) => (
            <Button
                key={state}
                tone="destructive"
                prefixIcon="triangle-alert"
                {...destructiveStateProps[state]}
            >
                Delete
            </Button>
        ))}
    </div>
);

const assertDestructiveStates =
    (disabledFill: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const background = (id: string) => getComputedStyle(canvas.getByTestId(id)).backgroundColor;

        // Pen `IcuBw` destructive (state contract `xw0yy`): red.600 at rest and
        // loading, red.700 on hover and active, in both themes.
        await expect(background("destructive-default")).toBe("rgb(220, 38, 38)");
        await expect(background("destructive-hover")).toBe("rgb(185, 28, 28)");
        await expect(background("destructive-active")).toBe("rgb(185, 28, 28)");
        // Disabled falls back to the shared disabled role, resolved per theme.
        await expect(background("destructive-disabled")).toBe(disabledFill);
    };

export const DestructiveStates: Story = {
    render: () => (
        <ThemeShell theme="light">
            <DestructiveRow />
        </ThemeShell>
    ),
    play: assertDestructiveStates("rgb(241, 245, 249)"),
};

export const DarkDestructiveStates: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <DestructiveRow />
        </ThemeShell>
    ),
    play: assertDestructiveStates("rgb(30, 41, 59)"),
};

const RefProbe = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [ tag, setTag, ] = useState("pending");

    useEffect(() => {
        setTag(ref.current?.tagName ?? "none");
    }, []);

    return (
        <div className={row}>
            <Button ref={ref} prefixIcon="check">Ref</Button>
            <span data-testid="ref-tag">{tag}</span>
        </div>
    );
};

export const RefForwarding: Story = {
    render: () => (
        <ThemeShell theme="light">
            <RefProbe />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        // The ref reaches the native button, not the wrapper.
        await expect(canvas.getByTestId("ref-tag")).toHaveTextContent("BUTTON");
    },
};

export const LightStateMatrix: Story = {
    render: () => (
        <ThemeShell theme="light">
            <Matrix />
        </ThemeShell>
    ),
};

export const DarkStateMatrix: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <Matrix />
        </ThemeShell>
    ),
};

// Pen `IcuBw` full width (`MboG8` / `GW4Jy`) is a fill-container override inside
// a fixed column; `hug` (`Z8OMS4`) stays intrinsic.
const widthColumn = css({
    width: "280px",
    display: "flex",
    flexDirection: "column",
    gap: "x3",
});

const WidthProbe = ({ theme, }: { theme: "light" | "dark"; }) => (
    <ThemeShell theme={theme}>
        <div className={widthColumn}>
            <Button width="full" tone="secondary">Full width</Button>
            <Button>Hug width</Button>
        </div>
    </ThemeShell>
);

const assertWidthAxis = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const full = canvas.getByRole("button", { name: "Full width", });
    const hug = canvas.getByRole("button", { name: "Hug width", });
    const column = full.parentElement as Element;

    // The Pen fill-container override spans the 280px column; hug is intrinsic.
    await expect(Math.round(column.getBoundingClientRect().width)).toBe(280);
    await expect(Math.round(full.getBoundingClientRect().width)).toBe(280);
    await expect(hug.getBoundingClientRect().width).toBeLessThan(280);
    await expect(hug.getBoundingClientRect().width).toBeGreaterThan(0);
};

export const WidthHugAndFull: Story = {
    render: () => <WidthProbe theme="light" />,
    play: assertWidthAxis,
};

export const DarkWidthHugAndFull: Story = {
    render: () => <WidthProbe theme="dark" />,
    play: assertWidthAxis,
};

// Pen shared rule `Qur3j`: loading swaps in the indicator without shifting
// layout, and `sxGsG` adds that loading never changes the control geometry.
const LoadingProbe = ({ theme, }: { theme: "light" | "dark"; }) => (
    <ThemeShell theme={theme}>
        <div className={row}>
            <Button prefixIcon="check" suffixIcon="arrow-right">Save changes</Button>
            <Button loading prefixIcon="check" suffixIcon="arrow-right">Save changes</Button>
        </div>
    </ThemeShell>
);

const assertLoadingGeometry = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const loadingButtons = canvas.getAllByRole("button", { name: "Save changes", });
    const idle = loadingButtons[0] as HTMLElement;
    const active = loadingButtons[1] as HTMLElement;

    await expect(active).toBeDisabled();
    await expect(idle).not.toBeDisabled();

    // Fixed root dimensions and preserved label/icon layout width.
    const idleBox = idle.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    await expect(Math.round(activeBox.width)).toBe(Math.round(idleBox.width));
    await expect(Math.round(activeBox.height)).toBe(Math.round(idleBox.height));

    const idleLabel = idle.querySelector(".button__label") as Element;
    const activeLabel = active.querySelector(".button__label") as Element;
    await expect(Math.round(activeLabel.getBoundingClientRect().width)).toBe(
        Math.round(idleLabel.getBoundingClientRect().width),
    );
    // The label is hidden from paint but keeps its box and accessible name.
    await expect(getComputedStyle(activeLabel).opacity).toBe("0");

    const spinner = active.querySelector(".button__spinner") as Element;
    await expect(spinner).not.toBeNull();
    await expect(spinner.querySelector(".icon")).toHaveAttribute("aria-hidden", "true");
};

export const LoadingGeometry: Story = {
    render: () => <LoadingProbe theme="light" />,
    play: assertLoadingGeometry,
};

export const DarkLoadingGeometry: Story = {
    render: () => <LoadingProbe theme="dark" />,
    play: assertLoadingGeometry,
};

// Pen destructive loading (`chU7Q` / `bv3v1`): `danger-bg` fill and `danger-fg`
// indicator in both themes, never the muted disabled role.
const DestructiveLoadingProbe = ({ theme, }: { theme: "light" | "dark"; }) => (
    <ThemeShell theme={theme}>
        <div className={row}>
            <Button tone="destructive" loading prefixIcon="triangle-alert">Delete project</Button>
        </div>
    </ThemeShell>
);

const assertDestructiveLoading = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Delete project", });

    await expect(button).toBeDisabled();
    await expect(getComputedStyle(button).backgroundColor).toBe("rgb(220, 38, 38)");

    const spinner = button.querySelector(".button__spinner .icon") as Element;
    await expect(getComputedStyle(spinner).color).toBe("rgb(255, 255, 255)");
};

export const DestructiveLoading: Story = {
    render: () => <DestructiveLoadingProbe theme="light" />,
    play: assertDestructiveLoading,
};

export const DarkDestructiveLoading: Story = {
    render: () => <DestructiveLoadingProbe theme="dark" />,
    play: assertDestructiveLoading,
};
