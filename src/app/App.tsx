import { Button, } from "@shared/components/button";
import { ButtonIcon, } from "@shared/components/button-icon";
import { css, } from "@shared/styled-system/css";

const tones = [ "primary", "secondary", "ghost", ] as const;

const section = css({
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

const ThemePanel = ({ theme, }: { theme: "light" | "dark"; }) => (
    <section data-theme={theme}>
        <div className={section}>
            <div className={row}>
                {tones.map((tone) => <Button key={tone} tone={tone}>{tone}</Button>)}
                <Button tone="secondary" suffixIcon="arrow-right">Open</Button>
                {tones.map((tone) => <ButtonIcon key={tone} tone={tone} icon="settings" label={tone} />)}
            </div>
        </div>
    </section>
);

export const App = () => (
    <main className={css({ display: "grid", gap: "x8", padding: "x12", })}>
        <h1 className={css({ fontSize: "xl", fontWeight: "semibold", lineHeight: "tight", })}>No Launchpad</h1>
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
    </main>
);
