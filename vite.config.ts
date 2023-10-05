import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { micromark } from 'micromark'

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
        mdPlugin(),
    ],
})

/**
 * just a simple plugin for parsing markdown to html using micromark
 */
function mdPlugin() {
    return {
        name: 'md-plugin',
        transform(src: string, id: string) {
            const url = new URL(id, 'file://')
            const filename = path.basename(url.pathname)
            if (filename.endsWith('.md')) {
                return {
                    code: [
                        `export const html = ${JSON.stringify(micromark(src))}`,
                        `export const markdown = ${JSON.stringify(src)}`,
                    ].join('\n'),
                    map: null,
                }
            }
        },
    }
}
