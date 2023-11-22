# Soda

A component library that may follow [Material Design 3](https://m3.material.io/components) (a.k.a. Material You)

Features:

-   Follow the Material You design
-   More complete implementation of Material You components (than any other library)
-   Keyboard accessibility
-   Support both controlled and uncontrolled

> [!WARNING]  
> Working in progress, API is unstable and can be changed in any time.  
> For production, you may want use the official [material web](https://github.com/material-components/material-web) component library or the [MDUI](https://www.mdui.org/) library.

This is an experimental project, browser support:  
Chrome>=105, Safari>=15.4, Firefox (partial support for latest version)

# Installation

```sh
npm install soda-material
```

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'soda-material/dist/style.css'
import { Button } from 'soda-material'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Button sd="outlined">Button</Button>
    </React.StrictMode>
)
```

# Documention

See: <https://yieldray.github.io/soda/>

> [!IMPORTANT]  
> Components in `src/components` directory (exported directly) do NOT include heavy logic.  
> Those logic helper components can be found in `src/composition` directory

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

It's highly recomended that you use a font that supports `font-weight: 500`,  
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
@import url(https://fonts.bunny.net/css?family=roboto:100,300,400,500,700,900);
*/

/* using Google Sans */
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@100;200;300;400;500;700;900&display=swap');
* {
    font-family: 'Google Sans', sans-serif;
}
```

# TODO

-   [ ] Integrate [@material/material-color-utilities](https://github.com/material-foundation/material-color-utilities/tree/main/typescript) to support dynamic color theme

-   [ ] ARIA support

-   [ ] More customizable css vars

# Development

```sh
npm install
npm run storybook
```

Naming convention:

-   a `.tsx` file with capitalized beginning is a react component (export a same name, no default export)
-   a `.scss` file will use strigula to seperate component name in file name
-   in any css code, use underscore to seperate component name, use strigula to seperate name segments
