import { css, } from "@shared/styled-system/css";

import { Landing, } from "./Landing";

/**
 * Verification surface for the ported design system: the landing rendered in
 * both theme contexts from the same components. Theme is system context, never
 * a component variant.
 */
export const App = () => (
    <main className={css({ display: "grid", })}>
        <section data-theme="light">
            <Landing />
        </section>
        <section data-theme="dark">
            <Landing />
        </section>
    </main>
);
