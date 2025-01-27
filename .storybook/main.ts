import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: [
        '../src/documentation/README.mdx',
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@chromatic-com/storybook',
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
