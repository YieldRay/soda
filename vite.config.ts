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
    build: {
        target: 'es2020',
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
