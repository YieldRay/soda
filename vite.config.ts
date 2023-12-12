import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
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
        target: 'es2021',
        lib: {
            entry: 'src/index.ts',
            name: 'soda',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react'],
        },
    },
    plugins: [
        react({
            babel: {
                plugins: [['styled-jsx/babel', { optimizeForSpeed: true }]],
            },
        }),
    ],
})
