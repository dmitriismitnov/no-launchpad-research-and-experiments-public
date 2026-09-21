// NOTE: lint-staged appends file paths to string commands; an explicit function
// around mise is clearer and keeps quotes for paths with spaces.
const quoteFiles = (files) => files.map((file) => JSON.stringify(file)).join(" ");

export default {
    "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}": (files) => [
        `mise run fix:lint-staged -- ${quoteFiles(files)}`,
        `mise run fix:format-staged -- ${quoteFiles(files)}`,
    ],
    "*.{json,jsonc,md}": (files) => [
        `mise run fix:format-staged -- ${quoteFiles(files)}`,
    ],
};
