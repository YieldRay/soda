# Soda

<a href="https://github.com/YieldRay/soda" target="_blank"><img src="https://img.shields.io/badge/YieldRay/soda-grey?logo=github" alt="github" /></a>&nbsp;
<a href="https://www.npmjs.com/package/soda-material" target="_blank"><img src="https://img.shields.io/npm/v/soda-material" alt="npm" /></a>&nbsp;
<a href="https://packagephobia.com/result?p=soda-material" target="_blank"><img src="https://packagephobia.com/badge?p=soda-material" alt="install size" /></a>&nbsp;

A React (>=18) component library that follows
[Material Design 3](https://m3.material.io/components) (a.k.a. Material You).

Features:

-   Fewer dependencies (bundled in the npm package)
-   Follows the Material You design
-   Complete implementation of Material You components
-   Keyboard accessibility
-   Supports both controlled and uncontrolled components

> [!WARNING]  
> Work in progress, API is unstable and can change at any time.  
> For production, you may want to use the official
> [material web](https://github.com/material-components/material-web) component
> library or the [MDUI](https://www.mdui.org/) library.

This is an experimental project with the best browser support for:  
Chrome >= 105, Safari >= 15.4, Firefox >= 121

> The recommended browser is Chrome >= 119

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
    </React.StrictMode>,
)
```

If bundle size is your concern, it's also possible to import only specific
components.

```tsx
import 'soda-material/dist/style.css' // You still need to import the style somewhere
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

> [!TIP]  
> This library is designed to maintain a small footprint, making it easy to integrate with other libraries in the ecosystem.
> For instance, it pairs well with Tailwind CSS, though it does not depend on it.

# Documentation

See: <https://soda.js.org>

> [!IMPORTANT]  
> Only components defined in the
> [Material Design Docs](https://m3.material.io/components) will be included in the
> `src/components` directory. These components do NOT include heavy logic.  
> Other necessary components or helpers can be found in the `src/composition`
> directory.

> [!NOTE]  
> Most components in `src/components` forward the `ref` attribute for library
> interactivity.  
> If present, it will be the root DOM node of the entire component.  
> If not, it will be documented and will be checked if you use TypeScript.

# TODO

-   [ ] More ARIA support

-   [ ] More customizable CSS variables

# Development

```sh
npm install
npm run storybook
```

Naming convention:

-   A `.tsx` file with a capitalized beginning is a React component (exports the same
    name, no default export)
-   A `.scss` file will use _hyphen_ to separate component names in the file name
-   In any CSS code, use _underscore_ to separate component names, use _hyphen_ to
    separate name segments.
