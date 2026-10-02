import { defineTokens, } from "@pandacss/dev";

import { createScale, } from "./scale";

/**
 * Size foundation.
 * Declares no system axis. Shares the regular scale with `spacing`.
 */
export const sizes = defineTokens.sizes(createScale([ 0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 16, 20, 24, 25, ]));
