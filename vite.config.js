import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
        host: 'localhost',
        port: 5173,
    },
    build: {
        outDir: 'public/build',
        manifest: true,
        rollupOptions: {
            input: 'resources/js/app.js',
        },
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});