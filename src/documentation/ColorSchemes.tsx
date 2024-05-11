const COLOR_TOKEN_MAP = {
    'surface-tint': ['', 'color'],
    'on-error': ['', 'container'],
    error: ['', 'container'],
    'on-tertiary': ['', 'container'],
    tertiary: ['', 'container'],
    shadow: [''],
    outline: ['', 'variant'],
    'on-background': [''],
    background: [''],
    'inverse-on-surface': [''],
    'inverse-surface': [''],
    'on-surface': ['', 'variant'],
    surface: [
        '',
        'variant',
        'container',
        'container-lowest',
        'container-low',
        'container-high',
        'container-highest',
    ],
    'on-secondary': ['', 'container'],
    secondary: ['', 'container'],
    'inverse-primary': [''],
    'on-primary': ['', 'container'],
    primary: ['', 'container'],
}

export function ColorStatic() {
    return Object.entries(COLOR_TOKEN_MAP).map(([prefix, decorates]) => (
        <section key={prefix}>
            <ul
                style={{
                    padding: '0',
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '.3rem',
                }}
            >
                {decorates.map((decorate) => {
                    const name = decorate ? `${prefix}-${decorate}` : prefix
                    const color = `var(--md-sys-color-${name})`
                    return (
                        <li
                            style={{
                                background: color,
                                margin: '0',
                                padding: '.5rem 1rem',
                                boxSizing: 'border-box',
                                borderRadius: '.25rem',
                                border: 'solid 1px var(--md-sys-color-outline)',
                            }}
                        >
                            <span
                                style={{
                                    color,
                                    filter: 'grayscale(1) contrast(999) invert(1)',
                                    userSelect: 'all',
                                }}
                            >
                                {color}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </section>
    ))
}
