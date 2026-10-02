import { Badge, } from "@shared/components/badge";
import { Button, } from "@shared/components/button";
import { ButtonIcon, } from "@shared/components/button-icon";
import { css, cx, } from "@shared/styled-system/css";

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

/*
 * Experiment-local Inter specimen.
 *
 * This is not a reusable typography API: it exists to prove that the generated
 * WOFF2 faces load and that a component can compose its text from individual
 * foundation atoms. It deliberately uses one `css()` class per atomic token
 * instead of a shared `textStyles` layer.
 */
const specimen = css({
    display: "grid",
    gap: "x4",
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const specimenLine = css({
    fontFamily: "body",
    fontWeight: "regular",
    lineHeight: "normal",
    letterSpacing: "normal",
});

const specimenSize = {
    xs: css({ fontSize: "xs", }),
    sm: css({ fontSize: "sm", }),
    md: css({ fontSize: "md", }),
    lg: css({ fontSize: "lg", }),
    xl: css({ fontSize: "xl", }),
};

const specimenWeight = {
    regular: css({ fontWeight: "regular", }),
    medium: css({ fontWeight: "medium", }),
    semibold: css({ fontWeight: "semibold", }),
};

const specimenItalic = css({
    fontFamily: "body",
    fontStyle: "italic",
    fontSize: "sm",
    fontWeight: "semibold",
    lineHeight: "normal",
});

const specimenTitle = css({
    fontFamily: "body",
    fontSize: "lg",
    fontWeight: "semibold",
    lineHeight: "tight",
    letterSpacing: "tight",
});

const InterSpecimen = () => (
    <section data-testid="inter-specimen" className={specimen}>
        <p className={specimenTitle}>Inter specimen</p>
        <p className={cx(specimenLine, specimenSize["sm"], specimenWeight["regular"])}>
            Regular 400 — Launch / Запуск
        </p>
        <p className={cx(specimenLine, specimenSize["sm"], specimenWeight["medium"])}>
            Medium 500 — Launch / Запуск
        </p>
        <p className={cx(specimenLine, specimenSize["sm"], specimenWeight["semibold"])}>
            Semibold 600 — Launch / Запуск
        </p>
        <p className={specimenItalic}>Italic 600 — Launch / Запуск</p>
        <p className={specimenSize["xs"]}>xs · Launch / Запуск</p>
        <p className={specimenSize["sm"]}>sm · Launch / Запуск</p>
        <p className={specimenSize["md"]}>md · Launch / Запуск</p>
        <p className={specimenSize["lg"]}>lg · Launch / Запуск</p>
        <p className={specimenSize["xl"]}>xl · Launch / Запуск</p>
    </section>
);

export const App = () => (
    <main className={css({ display: "grid", gap: "x8", padding: "x12", })}>
        <h1 className={css({ fontSize: "xl", fontWeight: "semibold", lineHeight: "tight", })}>No Launchpad</h1>
        <div className={css({ display: "flex", gap: "x8", alignItems: "center", flexWrap: "wrap", })}>
            <Badge label="Neutral" />
            <Badge label="Healthy" tone="positive" />
            <Badge label="Failed" tone="negative" />
            <Badge label="New" tone="brand" />
            <Badge label="No dot" withDot={false} />
        </div>
        <InterSpecimen />
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
    </main>
);
