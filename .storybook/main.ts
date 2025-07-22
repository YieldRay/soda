import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: [
        '../src/documentation/README.mdx',
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],

    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-links',
        '@storybook/addon-docs',
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {},
    },

    docs: {
        // defaultName: 'soda-material',
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
}
export default config
