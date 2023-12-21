import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import type { LibraryOptions } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

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
            name: 'soda',
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.js`,
            entry: inventory(),
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
    plugins: [
        react({
            babel: {
                plugins: [['styled-jsx/babel', { optimizeForSpeed: true }]],
            },
        }),
        // https://github.com/sanyuan0704/vite-plugin-chunk-split
        chunkSplitPlugin({
            strategy: 'all-in-one',
            customSplitting: {
                shared: [/src\//],
            },
        }),
    ],
})

/**
 * Generate entry for vite to build
 */
function inventory() {
    const basename = (filename: string) =>
        path.basename(filename, path.extname(filename))

    const entriesFromDir = (dir: string) =>
        Object.fromEntries(
            fs
                .readdirSync(`src/${dir}`)
                .map((filename) => [
                    `${dir}/${basename(filename)}`,
                    `src/${dir}/${filename}`,
                ])
        )

    const entiresForComponents = Object.fromEntries(
        fs
            .readdirSync('src/components')
            .filter((name) =>
                fs.statSync(`src/components/${name}`).isDirectory()
            )
            .map((name) => [
                `components/${name}/index`,
                `src/components/${name}/index.ts`,
            ])
    )

    const entriesForComposition = Object.fromEntries(
        fs
            .readdirSync('src/composition')
            .filter(
                (name) => name.endsWith('.tsx') && !name.includes('.stories.')
            )
            .map((name) => [
                `composition/${basename(name)}`,
                `src/composition/${name}`,
            ])
    )

    const entry: LibraryOptions['entry'] = {
        index: 'src/index.ts',
        'components/index': 'src/components/index.ts',
        'composition/index': 'src/composition/index.ts',
        ...entriesFromDir('hooks'),
        ...entriesFromDir('ripple'),
        ...entriesFromDir('utils'),
        ...entiresForComponents,
        ...entriesForComposition,
    }
    return entry
}
