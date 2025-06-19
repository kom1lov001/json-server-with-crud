import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { resolve, dirname } from "node:path";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),
        // vue(),
        quasar({
            sassVariables: "/src/quasar-variables.sass",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
