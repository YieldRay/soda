import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
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
    plugins: [react()],
    build: {
        outDir: 'demo',
    },
    base: './',
})
