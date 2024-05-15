const COLOR_TOKEN_MAP = {
    primary: ['', 'container'],
    'inverse-primary': [''],
    'on-primary': ['', 'container'],
    secondary: ['', 'container'],
    'on-secondary': ['', 'container'],
    tertiary: ['', 'container'],
    'on-tertiary': ['', 'container'],
    error: ['', 'container'],
    'on-error': ['', 'container'],
    surface: [
        '',
        'variant',
        'container',
        'container-lowest',
        'container-low',
        'container-high',
        'container-highest',
    ],
    'on-surface': ['', 'variant'],
    'inverse-surface': [''],
    'inverse-on-surface': [''],
    'surface-tint': ['', 'color'],
    background: [''],
    'on-background': [''],
    outline: ['', 'variant'],
    shadow: [''],
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
                        'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '.3rem',
                }}
            >
                {decorates.map((decorate) => {
                    const name = decorate ? `${prefix}-${decorate}` : prefix
                    const color = `var(--md-sys-color-${name})`
                    return (
                        <li
                            key={name}
                            style={{
                                background: color,
                                margin: '0',
                                padding: '.5rem 1rem',
                                boxSizing: 'border-box',
                                borderRadius: '.25rem',
                                border: 'solid 1px var(--md-sys-color-outline)',
                            }}
                        >
                            <small
                                style={{
                                    color,
                                    filter: 'grayscale(1) contrast(999) invert(1)',
                                    userSelect: 'all',
                                    fontWeight: 'bold',
                                }}
                            >
                                {color}
                            </small>
                        </li>
                    )
                })}
            </ul>
        </section>
    ))
}
