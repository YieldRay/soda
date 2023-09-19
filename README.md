# Soda

A component library that may follow [material design 3](https://m3.material.io/components) (a.k.a material you)

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

# Resources

Icon pack

<https://fonts.google.com/icons>  
<https://pictogrammers.com/library/mdi/>

Font

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
* {
    font-family: 'Roboto', sans-serif;
}
```

# Development

naming convention:

-   a `.tsx` file with capitalized beginning is a react component (export a same name, no default export)
-   a `.scss` file will use strigula to seperate component name in file name
-   in any css code, use underscore to seperate component name, use strigula to seperate name segments
