import type { ComponentProps, ReactNode, } from "react";

import { cx, } from "@shared/styled-system/css";
import { themeSwitchPreview, } from "@shared/styled-system/recipes";

export type ThemeSwitchPreviewProps = Omit<ComponentProps<"div">, "children"> & {
    /** Content compared in both theme contexts; rendered identically twice. */
    children: ReactNode;
    /** Accessible name for the comparison group. */
    label?: string;
    /** Visible caption above the light panel. */
    lightLabel?: string;
    /** Visible caption above the dark panel. */
    darkLabel?: string;
};

/**
 * Visual comparison of one composition across the two theme contexts.
 *
 * Pen's `Theme Switch Preview` master (`q5xZR3`) is a preview block, not a
 * theme controller: `Foundation — Theme comparison` (`YQ6kU`) renders two
 * instances of the same master, one under `theme: light` and one under
 * `theme: dark`. The port keeps that contract — the consumer supplies the
 * content, the component resolves it in explicit light and dark contexts and
 * never owns or mutates a global theme preference.
 */
export const ThemeSwitchPreview = ({
    children,
    label = "Theme switch preview",
    lightLabel = "Light",
    darkLabel = "Dark",
    className,
    ...props
}: ThemeSwitchPreviewProps) => {
    const styles = themeSwitchPreview();

    return (
        <div {...props} role="group" aria-label={label} className={cx(styles.root, className)}>
            <Panel theme="light" caption={lightLabel} styles={styles}>
                {children}
            </Panel>
            <Panel theme="dark" caption={darkLabel} styles={styles}>
                {children}
            </Panel>
        </div>
    );
};

type ThemeSwitchPreviewStyles = ReturnType<typeof themeSwitchPreview>;

type PanelProps = {
    theme: "light" | "dark";
    caption: string;
    styles: ThemeSwitchPreviewStyles;
    children: ReactNode;
};

const Panel = ({ theme, caption, styles, children, }: PanelProps) => (
    <div data-theme={theme} className={styles.panel}>
        <span className={styles.caption}>{caption}</span>
        <div className={styles.surface}>{children}</div>
    </div>
);
