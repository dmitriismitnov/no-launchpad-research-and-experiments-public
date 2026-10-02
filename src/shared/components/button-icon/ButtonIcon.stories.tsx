import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { CSSProperties, ReactNode, } from "react";

import { useEffect, useRef, useState, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ICON_CODEPOINTS, type IconName, } from "../icon/manifest.generated";
import { ButtonIcon, } from "./button-icon";
import type { ButtonIconProps, } from "./button-icon";

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

const tones = [ "primary", "secondary", "ghost", ] as const;

// Storybook-only state metadata. Uses data attributes so interaction states are
// deterministic and independent of pointer timing.
const states = [ "default", "hover", "active", "focus", "disabled", ] as const;

const stateProps: Record<typeof states[number], ButtonIconProps> = {
    default: { icon: "settings", label: "default", },
    hover: { icon: "settings", label: "hover", "data-hover": "", } as ButtonIconProps,
    active: { icon: "settings", label: "active", "data-active": "", } as ButtonIconProps,
    focus: { icon: "settings", label: "focus", "data-focus-visible": "", } as ButtonIconProps,
    disabled: { icon: "settings", label: "disabled", disabled: true, },
};

const renderSample = (tone: typeof tones[number], state: typeof states[number], key: string) => (
    <ButtonIcon key={key} tone={tone} {...stateProps[state]} />
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
    title: "Components/ButtonIcon",
    component: ButtonIcon,
    parameters: { layout: "fullscreen", },
    args: {
        icon: "settings",
        label: "Settings",
        tone: "primary",
        size: "md",
    },
    argTypes: {
        tone: {
            control: { type: "select", },
            options: [ "primary", "secondary", "ghost", ],
        },
        size: {
            control: { type: "select", },
            options: [ "sm", "md", ],
        },
        icon: {
            control: { type: "select", },
            options: iconNames,
        },
        label: {
            control: { type: "text", },
        },
    },
} satisfies Meta<typeof ButtonIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: (args) => (
        <ThemeShell theme="light">
            <div className={row}>
                <ButtonIcon {...args} />
            </div>
        </ThemeShell>
    ),
};

export const AllTones: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                {tones.map((tone) => <ButtonIcon key={tone} tone={tone} icon="settings" label={tone} />)}
            </div>
        </ThemeShell>
    ),
};

export const Sizes: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <ButtonIcon size="sm" icon="menu" label="Menu" />
                <ButtonIcon size="md" icon="menu" label="Menu" />
            </div>
        </ThemeShell>
    ),
};

export const Icons: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <ButtonIcon icon="menu" label="Menu" tone="secondary" />
                <ButtonIcon icon="x" label="Close" tone="ghost" />
                <ButtonIcon icon="arrow-right" label="Next" tone="secondary" />
                <ButtonIcon icon="mail" label="Email" tone="ghost" />
            </div>
        </ThemeShell>
    ),
};

// A sentinel proves the glyph resolves from the tone's semantic foreground
// rather than an inherited literal.
const FOREGROUND_PROBE = "rgb(17, 34, 51)";

const foregroundVariable = (tone: typeof tones[number]): string => {
    if ( tone === "primary" ) {
        return "--colors-semantic-action-primary-foreground";
    }

    if ( tone === "secondary" ) {
        return "--colors-semantic-action-secondary-foreground";
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
                    <ButtonIcon tone={tone} icon="settings" label={tone} />
                </div>
            ))}
        </div>
    </ThemeShell>
);

const assertSlotRoles = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);

    for ( const tone of tones ) {
        const button = canvas.getByRole("button", { name: tone, });
        const glyph = button.querySelector(".icon") as Element;

        // The glyph reads the tone foreground.
        await expect(getComputedStyle(glyph).color).toBe(FOREGROUND_PROBE);
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

const RefProbe = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [ tag, setTag, ] = useState("pending");

    useEffect(() => {
        setTag(ref.current?.tagName ?? "none");
    }, []);

    return (
        <div className={row}>
            <ButtonIcon ref={ref} icon="check" label="Ref" />
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

export const NamedAccessible: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <ButtonIcon icon="x" label="Close dialog" />
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: "Close dialog", });
        const glyph = button.querySelector(".icon") as Element;

        // The button owns the accessible name; the glyph stays decorative.
        await expect(glyph).toHaveAttribute("aria-hidden", "true");
        await expect(glyph).not.toHaveAttribute("aria-label");
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
