import type { Decorator, Preview, } from "@storybook/react-vite";
import { useEffect, } from "react";

import "../src/shared/fonts/font.generated.css";
import "../src/shared/styled-system/styles.css";
import "./preview.css";

/**
 * Storybook has no application bootstrap, so nothing sets the theme axis the
 * semantic tokens resolve against. This decorator mirrors `src/main.tsx`: it
 * puts `data-theme` on `<html>`, making every story a descendant of the active
 * theme context. Stories that set their own `data-theme` (e.g. ThemeShell) still
 * win for their subtree.
 */
const withTheme: Decorator = (Story, context) => {
    const theme = ( context.globals["theme"] as string | undefined ) ?? "light";

    useEffect(() => {
        document.documentElement.dataset["theme"] = theme;
    }, [ theme, ]);

    return <Story />;
};

export const globalTypes = {
    theme: {
        description: "Theme context",
        defaultValue: "light",
        toolbar: {
            icon: "contrast",
            items: [
                { value: "light", title: "Light", },
                { value: "dark", title: "Dark", },
            ],
            dynamicTitle: true,
        },
    },
};

const preview: Preview = {
    decorators: [ withTheme, ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo",
        },
    },
};

export default preview;
