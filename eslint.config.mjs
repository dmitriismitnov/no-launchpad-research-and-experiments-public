import js from "@eslint/js";
import json from "@eslint/json";
import { defineConfig, } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// Base quality rules; formatting is handled by dprint.
const commonRules = {
    // Console is allowed in configs, stories and local debugging.
    "no-console": "off",

    // `var` is discouraged but not blocking yet.
    "no-var": "warn",

    // Braces around conditions protect against block-extension mistakes.
    curly: "warn",
};

const spacingRules = {
    // Blank lines between code groups stay in ESLint, not dprint.
    "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "import", next: "*", },
        { blankLine: "always", prev: "*", next: "import", },
        { blankLine: "any", prev: "import", next: "import", },
        { blankLine: "always", prev: "export", next: "*", },
        { blankLine: "always", prev: "*", next: "export", },
        { blankLine: "any", prev: "export", next: "export", },
        { blankLine: "always", prev: "*", next: [ "const", "let", ], },
        { blankLine: "any", prev: [ "const", "let", ], next: [ "const", "let", ], },
        { blankLine: "always", prev: "*", next: [ "switch", "function", "class", "return", "if", ], },
        { blankLine: "always", prev: [ "function", "class", "return", "if", ], next: "*", },
    ],
};

const typeScriptRules = {
    ...commonRules,
    ...spacingRules,

    // `_name` marks a deliberately unused value.
    "@typescript-eslint/no-unused-vars": [
        "error",
        {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        },
    ],

    // Types must not leak into the runtime import graph.
    "@typescript-eslint/consistent-type-imports": "error",
};

const strictTypeScriptRules = {
    ...typeScriptRules,

    // Promises must not be dropped without an explicit await/void.
    "@typescript-eslint/no-floating-promises": "error",

    // Only Error-like values should be thrown.
    "@typescript-eslint/only-throw-error": "error",

    // switch over unions must cover every variant.
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // Wrapped errors must preserve the original cause.
    "preserve-caught-error": [ "error", { requireCatchParameter: true, }, ],
};

const fileGroups = {
    json: [ "**/*.json", ],
    jsonWithComments: [ "**/*.jsonc", "tsconfig*.json", ".vscode/*.json", ],
    json5: [ "**/*.json5", ],
    nodeJavaScript: [ "**/*.{js,mjs,cjs}", ],
    nodeTypeScript: [
        "test/**/*.{ts,tsx,mts,cts}",
        ".storybook/**/*.{ts,tsx,mts,cts}",
        "*.{ts,mts,cts}",
        "*.config.{ts,mts,cts}",
        "panda.config.ts",
    ],
    sourceTypeScript: [ "src/**/*.{ts,tsx,mts,cts}", ],
};

const ignoredGlobs = [
    // Generated files.
    ".output",
    "styled-system",
    "storybook-static",
    "src/shared/styled-system",
    "**/*.generated.*",
    "**/*.gen.*",
    "**/*_generated/**",

    // Install, build, test and local artifacts.
    "dist",
    "panda-studio",
    "coverage",
    "test-results",
    "playwright-report",
    "node_modules",
    ".local",
    "gitignore",

    // Git worktrees and plan execution workspace.
    ".worktrees",
    ".superpowers",

    // Local editor agent config is not part of the project.
    ".opencode",

    // Lock files are managed by the package manager.
    "package-lock.json",
    "bun.lock",
];

const typedParserOptions = {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
};

const createTypedTypeScriptConfig = (files, runtimeGlobals) =>
    defineConfig({
        files,
        extends: [ js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ],
        languageOptions: {
            globals: runtimeGlobals,
            parserOptions: typedParserOptions,
        },
        rules: strictTypeScriptRules,
    });

export default tseslint.config(
    defineConfig({ ignores: ignoredGlobs, }),
    defineConfig({
        files: fileGroups.json,
        ignores: [ "tsconfig*.json", ".vscode/*.json", ],
        plugins: { json, },
        language: "json/json",
        extends: [ "json/recommended", ],
    }),
    defineConfig({
        files: fileGroups.jsonWithComments,
        plugins: { json, },
        language: "json/jsonc",
        languageOptions: { allowTrailingCommas: false, },
        extends: [ "json/recommended", ],
    }),
    defineConfig({
        files: fileGroups.json5,
        plugins: { json, },
        language: "json/json5",
        extends: [ "json/recommended", ],
    }),
    defineConfig({
        files: fileGroups.nodeJavaScript,
        extends: [ js.configs.recommended, ],
        languageOptions: { globals: { ...globals.node, }, },
        rules: { ...commonRules, ...spacingRules, },
    }),
    createTypedTypeScriptConfig(fileGroups.nodeTypeScript, globals.node),
    createTypedTypeScriptConfig(fileGroups.sourceTypeScript, globals.browser),
);
