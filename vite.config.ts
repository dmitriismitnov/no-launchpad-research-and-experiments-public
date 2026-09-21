import react from "@vitejs/plugin-react";
import { defineConfig, } from "vite";

export default defineConfig({
    plugins: [ react(), ],
    resolve: {
        alias: {
            "@app": new URL("./src/app", import.meta.url).pathname,
            "@shared": new URL("./src/shared", import.meta.url).pathname,
        },
    },
});
