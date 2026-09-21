import { Button, } from "@shared/components/button";
import { css, } from "@shared/styled-system/css";

const tones = [ "primary", "secondary", "ghost", ] as const;

const section = css({
    padding: "x12",
    backgroundColor: {
        _light: "surfaceRaised.light",
        _dark: "surfaceRaised.dark",
    },
    color: {
        _light: "ink.light",
        _dark: "ink.dark",
    },
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
                <Button tone="icon" aria-label="Settings" prefixIcon={<span aria-hidden>+</span>} />
            </div>
        </div>
    </section>
);

export const App = () => (
    <main className={css({ display: "grid", gap: "x8", padding: "x12", })}>
        <h1 className={css({ fontSize: "heading", fontWeight: "semibold", })}>No Launchpad</h1>
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
    </main>
);
