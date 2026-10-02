import type { ComponentProps, } from "react";
import { useState, } from "react";

import { Icon, } from "@shared/components/icon";
import { Switch, } from "@shared/components/switch";
import { cx, } from "@shared/styled-system/css";
import { themeSwitchPreview, } from "@shared/styled-system/recipes";

export type ThemeSwitchValue = "light" | "dark";

export type ThemeSwitchPreviewProps = Omit<ComponentProps<"div">, "children"> & {
    /** Accessible name for the underlying switch. */
    label?: string;
    /** Controlled theme; pass with `onThemeChange`. */
    theme?: ThemeSwitchValue;
    /** Initial theme when the control is uncontrolled. */
    defaultTheme?: ThemeSwitchValue;
    /** Called with the next theme on every toggle. */
    onThemeChange?: (theme: ThemeSwitchValue) => void;
    disabled?: boolean;
};

/**
 * Small theme control: sun glyph, the shared `Switch`, moon glyph. The consumer
 * owns the previewed surface; this component only reports the selected theme,
 * so the same instance works in light and dark contexts.
 */
export const ThemeSwitchPreview = ({
    label = "Dark theme",
    theme,
    defaultTheme = "light",
    onThemeChange,
    disabled = false,
    className,
    ...props
}: ThemeSwitchPreviewProps) => {
    const [ uncontrolledTheme, setUncontrolledTheme, ] = useState<ThemeSwitchValue>(defaultTheme);
    const isControlled = theme !== undefined;
    const currentTheme = isControlled ? theme : uncontrolledTheme;
    const isDark = currentTheme === "dark";
    const styles = themeSwitchPreview({ theme: currentTheme, disabled, });

    const handleChange: NonNullable<ComponentProps<"input">["onChange"]> = (event) => {
        const next: ThemeSwitchValue = event.target.checked ? "dark" : "light";

        if ( !isControlled ) {
            setUncontrolledTheme(next);
        }

        onThemeChange?.(next);
    };

    return (
        <div {...props} className={cx(styles.root, className)}>
            <Icon className={styles.sun} name="sun" size="sm" />
            <Switch aria-label={label} checked={isDark} disabled={disabled} onChange={handleChange} />
            <Icon className={styles.moon} name="moon" size="sm" />
        </div>
    );
};
