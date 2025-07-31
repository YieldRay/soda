import fs from 'node:fs'
import path from 'node:path/posix'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { globSync } from 'glob'
import { readConfigFile } from 'typescript'
import type { LibraryOptions, Plugin } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

/**
 * Like the "vite-tsconfig-paths" package, but it cannot handle CSS @import alias.
 * This plugin, instead, just convert tsconfig.json's compilerOptions.paths to
 * vite's resolve.alias options rather than the resolveId hook
 */
function tsconfigAliasPlugin(): Plugin {
    const { config } = readConfigFile('tsconfig.json', (path) =>
        fs.readFileSync(path, 'utf-8'),
    )
    const { baseUrl, paths } = config.compilerOptions as {
        baseUrl: string
        paths: Record<string, string[]>
    }
    /** convert "src/*" to "src" */
    const convert = (s: string) => s.replace(/\/\*$/, '')

    const alias: Array<{ find: string; replacement: string }> = []
    for (const [from, mappings] of Object.entries(paths)) {
        for (const mapping of mappings) {
            alias.push({
                find: convert(from),
                replacement: fileURLToPath(
                    new URL(
                        path.resolve(baseUrl, convert(mapping)),
                        import.meta.url,
                    ),
                ),
            })
        }
    }
    console.debug(alias)
    return {
        name: 'tsconfigAliasPlugin',
        config() {
            return { resolve: { alias } }
        },
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: fs.readFileSync(
                    './src/style/index.scss',
                    'utf-8',
                ),
                // api: 'modern-compiler',
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
            external: ['react', 'react-dom', 'react/jsx-runtime', 'scheduler'],
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
        tsconfigAliasPlugin(),
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
