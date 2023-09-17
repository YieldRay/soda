import { defineConfig } from 'vite'
import path from 'path'

// for build
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/style/index.scss';\n`,
            },
        },
    },
    build: {
        target: 'es2020',
        lib: {
            entry: 'src/index.ts',
            name: 'soda',
            fileName: 'index',
        },
        rollupOptions: {
            external: ['react'],
        },
    },
})
