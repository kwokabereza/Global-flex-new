// themes/your-theme/vite.config.ts
import { defineConfig } from 'vite'
import { resolve, basename } from 'path'

// Your JS/TS/CSS entrypoints.
const input = {
    main: resolve(__dirname, 'src/js/global.js'),
    css: resolve(__dirname, 'src/css/global.css'),
    index: resolve(__dirname, 'src/js/index.js'),
}

// Auto detect the theme name, works only if one theme is available.
// const themeName = __dirname.match(/themes\/([^\/]+)/)[1];
const themeName = 'murmansk'

export default defineConfig({
    // Included assets will use this path as the base URL.
    base: `/themes/${themeName}/assets/build/`,
    build: {
        rollupOptions: { input },
        manifest: true,
        emptyOutDir: true,
        // Output assets to /themes/your-theme/assets/build
        outDir: resolve(__dirname, 'assets/build'),
    },
    server: {
        hmr: {
            // Do not use encrypted connections for the HMR websocket.
            protocol: 'ws',
        },
    }
})
