import { defineTokens, } from "@pandacss/dev";

/**
 * Technical opacity scale (not semantic).
 * Values mean percent opacity, so they compose directly in `opacity` and in
 * `color-mix()`.
 */
export const OPACITY_STEPS = [ 0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, ] as const;

export const opacity = defineTokens.opacity(
    Object.fromEntries(
        OPACITY_STEPS.map((step) => [ `${step}`, { value: `${step}%`, }, ]),
    ),
);
