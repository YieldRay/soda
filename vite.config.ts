import { defineConfig } from 'vite'

// for build
export default defineConfig({
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
