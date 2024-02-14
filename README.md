# Soda

[![soda-material](https://img.shields.io/badge/-soda--material-grey?logo=npm)](https://npm.im/soda-material)
[![npm](https://img.shields.io/npm/v/soda-material)](https://www.npmjs.com/package/soda-material)
[![install size](https://packagephobia.com/badge?p=soda-material)](https://packagephobia.com/result?p=soda-material)

A React(>=18) component library that may follow [Material Design 3](https://m3.material.io/components) (a.k.a. Material You)

Features:

-   Less dependencies (bundled in npm package)
-   Follow the Material You design
-   Complete implementation of Material You components (than any other library)
-   Keyboard accessibility
-   Support both controlled and uncontrolled

> [!WARNING]  
> Working in progress, API is unstable and can be changed in any time.  
> For production, you may want use the official [material web](https://github.com/material-components/material-web) component library or the [MDUI](https://www.mdui.org/) library.

This is an experimental project, (best) browser support:  
Chrome>=105, Safari>=15.4, Firefox>=121

> The recommended browser is Chrome>=119

# Installation

```sh
npm install soda-material
```

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'soda-material/dist/style.css' // Note that you MUST import the style
import { Button } from 'soda-material'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Button variant="outlined">Button</Button>
    </React.StrictMode>
)
```

If bundle size is your concern, it's also possible to import only the specific component.

```tsx
import 'soda-material/dist/style.css' // Still need to import the style in some where
import { Button } from 'soda-material/dist/components/button'
import { Select } from 'soda-material/dist/composition/Select'

export default function App() {
    return (
        <>
            <Button variant="text">Button</Button>
            <Select options={['one', 'two', 'three']}></Select>
        </>
    )
}
```

Next.js is also supported out of the box.

# Documentation

See: <https://soda.js.org>

> [!IMPORTANT]  
> Only components defined in the [Material Design Docs](https://m3.material.io/components) will be put into `src/components` directory, these components do NOT include heavy logic.  
> Other necessary components or helpers can be found at `src/composition` directory.

> [!NOTE]  
> Most components in `src/components` forward `ref` attribute for library interactivity.  
> If has, it will be the root DOM node of the entire component.  
> If not, it will be documented and will be checked if you use typescript.

# Resources

## Icons

This library use the [MDI Icon Library](https://pictogrammers.com/library/mdi/)  
You can refer it at <https://materialdesignicons.com/>

```tsx
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { IconButton } from 'soda-material'

const App = () => (
    <>
        <Icon path={mdiMagnify} size={1} />
        <IconButton path={mdiMagnify} />
    </>
)
```

A replacement is google fonts: <https://fonts.google.com/icons>

## Fonts

It's highly recommended that you use a font that supports `font-weight: 500`,  
as some component state requires it to behavior clear to user.

The easiest way is to use the `Roboto` font, just simply add a few lines of css code as below!

```css
/* using Roboto */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;700;900&display=swap');
* {
    font-family: 'Roboto', sans-serif;
}
/*
Tips:
Chinese user may prefer:
@import url('https://fonts.loli.net/css2?family=Roboto:wght@100;200;300;400;500;700;900&display=swap');
@import url('https://fonts.upset.dev/css2?family=Roboto:wght@100;200;300;400;500;700;900&display=swap');
@import url('https://fonts.font.im/css?family=Roboto:100,300,400,500,700,900');
@import url('https://fonts.bunny.net/css?family=roboto:100,300,400,500,700,900');
*/

/* using Google Sans */
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@100;200;300;400;500;700;900&display=swap');
* {
    font-family: 'Google Sans', sans-serif;
}
```

## Theming

This library use the official material design css variable (`--md-sys-color-<token>`, at `:root`) to theming.  
So you can simply overwrite them or use the [@material/material-color-utilities](https://github.com/material-foundation/material-color-utilities/tree/main/typescript) package to apply theme.

```tsx
// we also provide a series of wrapper function, making theming easier
import { applyThemeForSoda } from 'soda/dist/utils/theme'

// simply
applyThemeForSoda('#f82506')

// or
applyThemeForSoda(themeFromHexString('#f82506'), [
    {
        name: 'custom-1',
        value: argbFromHex('#ff0000'),
        blend: true,
    },
])

// or
function SelectThemeFromFileButton() {
    const onClick = async () => {
        const fileHandleArray = await window.showOpenFilePicker({
            types: [
                {
                    description: 'please choose an image',
                    accept: {
                        'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp'],
                    },
                },
            ],
            multiple: false,
            excludeAcceptAllOption: true,
        })
        const file: File = await fileHandleArray[0].getFile()
        applyThemeForSoda(await themeFromImageOrFile(file)) // *
    }
    return <button onClick={onClick}>Select An Image</button>
}
```

# TODO

-   [ ] ARIA support

-   [ ] More customizable css vars

# Development

```sh
npm install
npm run storybook
```

Naming convention:

-   a `.tsx` file with capitalized beginning is a react component (export a same name, no default export)
-   a `.scss` file will use strigula to separate component name in file name
-   in any css code, use underscore to separate component name, use strigula to separate name segments
