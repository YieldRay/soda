# Soda

A component library that may follow [material design 3](https://m3.material.io/components) (a.k.a. material you)

> Warn: working in progress, some features are missing or will not be fully implemented (such as ARIA).  
> API is unstable and can be changed in any time.  
> For production, you may want use the official [material web](https://github.com/material-components/material-web) component library.

This is an experimental project, browser support:  
Chrome>=105, Safari>=15.4, Firefox NoSupport

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

> Components in `src/components` directory (exported directly) do not include heavy logic.  
> Those logic helper components can be found in `src/composition` directory

> Most components in `src/components` forward `ref` attribute for library interactivity.  
> If has, it will be the root DOM node of the entire component.  
> If not, it will be documented and will be checked if you use typescript.

# Resources

## Icons

using google fonts: <https://fonts.google.com/icons>  
using mdi library: <https://materialdesignicons.com/>

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
// Tips:
// Chinese user may prefer:
// @import url('https://fonts.loli.net/css2?family=Roboto:wght@100;200;300;400;500;700;900&display=swap');
// @import url('https://fonts.font.im/css?family=Roboto:100,300,400,500,700,900');

/* using Google Sans */
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@100;200;300;400;500;700;900&display=swap');
* {
    font-family: 'Google Sans', sans-serif;
}
```

# Development

naming convention:

-   a `.tsx` file with capitalized beginning is a react component (export a same name, no default export)
-   a `.scss` file will use strigula to seperate component name in file name
-   in any css code, use underscore to seperate component name, use strigula to seperate name segments
