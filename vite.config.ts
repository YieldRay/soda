import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { globSync } from 'glob'
import { defineConfig } from 'vite'
import type { LibraryOptions } from 'vite'
import dts from 'vite-plugin-dts'

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
                additionalData: fs.readFileSync(
                    './src/style/index.scss',
                    'utf-8',
                ),
                api: 'modern-compiler',
                silenceDeprecations: ['mixed-decls', 'import'],
            },
        },
    },
    build: {
        target: 'es2021',
        sourcemap: true,
        lib: {
            name: 'soda',
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.js`,
            entry: inventory(),
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                banner: `"use client";`,
                manualChunks(id, { getModuleInfo }) {
                    if (id.includes('node_modules')) {
                        return // id.match(/\/node_modules\/(.[^/]+)\//)[1]
                    }
                    if (id.endsWith('.scss') || id.endsWith('.css')) {
                        return 'style.css'
                    }
                    /**
                     * Seems that vite ignore our options for rollupOptions.treeshake
                     * so we have to set it here
                     */
                    const info = getModuleInfo(id)
                    info.moduleSideEffects = false
                },
            },
        },
    },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
        dts({
            exclude: [
                'node_modules/**',
                '**/*.stories.*',
                '*/documentation/**/*',
            ],
        }),
    ],
})

/**
 * Generate entry for vite to build
 */
function inventory(): LibraryOptions['entry'] {
    const entry: LibraryOptions['entry'] = Object.fromEntries(
        globSync('src/**/*.{ts,tsx}', {
            nodir: true,
            ignore: ['**/*.stories.*', '**/*.d.ts', '*/documentation/**/*'],
        }).map((name) => {
            return [
                name.replace(/^src(\/|\\)/, '').replace(/\.(ts|tsx)$/, ''),
                name,
            ]
        }),
    )

    return entry
}
