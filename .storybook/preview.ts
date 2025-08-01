import type { Preview } from '@storybook/react-vite'
import './preview.scss'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },

    tags: ['autodocs'],
}

export default preview
