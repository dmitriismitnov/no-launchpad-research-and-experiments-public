import { defineTokens, } from "@pandacss/dev";

import { createScale, } from "./scale";

/**
 * Spacing foundation.
 * Declares no system axis. Layout is axis-agnostic in v1; a future `density`
 * axis would be owned here as `_compact` / `_comfortable`.
 */
export const spacing = defineTokens.spacing(createScale([ 0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 16, 20, 24, 25, ]));
