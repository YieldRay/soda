import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'
import { applyThemeForSoda } from '../src/utils/theme'

const color = localStorage.getItem('sourceColor') || '#6750a4'
applyThemeForSoda(color)

const theme = create({
    base: 'light',
    brandTitle: 'soda-material',
    brandUrl: 'https://soda.js.org/',
    brandTarget: '_self',

    colorPrimary: '#6750A4',
    colorSecondary: '#625B71',
    appBorderRadius: 8,
})

addons.setConfig({ theme })
