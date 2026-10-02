import type { ComponentProps, } from "react";

import { Badge, } from "@shared/components/badge";
import { Button, } from "@shared/components/button";
import { Card, } from "@shared/components/card";
import { Icon, } from "@shared/components/icon";
import { Input, } from "@shared/components/input";
import { Tab, TabList, } from "@shared/components/tab";
import { cx, } from "@shared/styled-system/css";
import { themeSwitchPreview, } from "@shared/styled-system/recipes";

export type ThemeSwitchPreviewProps = Omit<ComponentProps<"div">, "children">;

/**
 * Single fixed preview block from Pen's `Theme Switch Preview` master
 * (`q5xZR3`): a 420x383 `surface/raised` card that stacks the Pen Head,
 * Buttons, Input, Badges, Card and Tabs anatomy, composed from the existing
 * public components and icons only.
 *
 * Deliberate breaking API: the master is a passive preview, not a theme
 * controller. It owns its fixed content and sets no `data-theme`. Pen's
 * `Foundation — Theme comparison` (`YQ6kU`) renders two instances of the same
 * master, one under `theme: light` and one under `theme: dark`; that two-theme
 * composition lives in the Storybook `TwoThemes` story. The former controller
 * API (`theme`, `defaultTheme`, `onThemeChange`, `ThemeSwitchValue`) and the
 * arbitrary `children` / caption API are intentionally removed.
 *
 * The block is announced as one named static image (`role="img"` +
 * `aria-label="Theme preview"`, forced after consumer props) and its apparent
 * Buttons, read-only Input and Tabs are marked with the native `inert`
 * attribute. That removes the decorative controls from focus and assistive
 * technology without faking a disabled style, hiding focusable content with
 * `aria-hidden`, or growing a stateful controller surface.
 */
export const ThemeSwitchPreview = ({ className, ...props }: ThemeSwitchPreviewProps) => {
    const styles = themeSwitchPreview();

    return (
        <div {...props} role="img" aria-label="Theme preview" className={cx(styles.root, className)}>
            <div className={styles.head}>
                <Icon name="moon" size="sm" />
                <span className={styles.title}>Theme preview</span>
                <Badge label="theme" withDot={false} />
            </div>
            <div className={styles.actions} inert>
                <Button tone="primary">Primary</Button>
                <Button tone="secondary">Secondary</Button>
            </div>
            <Input defaultValue="team@acme.dev" readOnly inert />
            <div className={styles.badges}>
                <Badge label="Selected" tone="brand" />
                <Badge label="Passing" tone="positive" />
                <Badge label="Draft" />
            </div>
            <Card variant="plain" title="Card title" />
            <TabList inert>
                <Tab label="Preview" active />
                <Tab label="Code" />
            </TabList>
        </div>
    );
};
