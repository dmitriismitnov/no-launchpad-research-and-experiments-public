/**
 * Panda `preflight` is a build-level option (CssgenOptions), not part of a preset.
 * It is exported here so the policy stays owned by `settings`; the root config
 * only wires the value into `defineConfig`.
 */
export const preflight = true as const;
