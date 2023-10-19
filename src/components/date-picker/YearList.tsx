import clsx from 'clsx'

export function YearList({
    current,
    onChange,
}: {
    current: number
    onChange?: (year: number) => void
}) {
    return (
        <ul>
            {getClosest15Years(current).map((year) => (
                <li
                    className={clsx(current === year && 'active')}
                    onClick={() => onChange?.(year)}
                    key={year}
                >
                    {
                        new Intl.DateTimeFormat(undefined, {
                            year: 'numeric',
                        }).formatToParts(new Date(year, 1, 1))[0].value
                    }
                </li>
            ))}
            <style jsx>{`
                ul {
                    all: unset;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: center;
                    justify-items: center;
                    row-gap: 1rem;
                }
                li {
                    all: unset;
                    display: inline-block;
                    width: 76px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    border-radius: 2rem;
                    color: var(--sd-sys-color-on-surface-variant);
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 200ms;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
                }
                li:hover {
                    background: rgba(0 0 0 / 0.04);
                }
                li:active {
                    background: rgba(0 0 0 / 0.08);
                }
                li.active {
                    background: var(--sd-sys-color-primary);
                    color: var(--sd-sys-color-on-primary);
                }
            `}</style>
        </ul>
    )
}

function getClosest15Years(year: number): number[] {
    const result: number[] = []
    let begin = year - 7
    for (let i = 0; i < 15; i++) {
        result.push(begin++)
    }
    return result
}
