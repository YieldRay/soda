import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const theme = create({
    base: 'light',
    brandTitle: 'soda-material',
    brandUrl: 'https://soda.js.org/',
    brandTarget: '_self',
})

addons.setConfig({
    theme,
})
