import clsx from 'clsx'
import { useRippleRef } from '@/utils/ripple-effect'

export function SelectYear({
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
                    ref={useRippleRef()}
                >
                    <div className="cell">
                        {
                            new Intl.DateTimeFormat(undefined, {
                                year: 'numeric',
                            }).formatToParts(new Date(year, 1, 1))[0].value
                        }
                    </div>
                </li>
            ))}
            <style jsx>{`
                ul {
                    all: unset;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: center;
                    justify-items: center;
                }
                li {
                    all: unset;
                    display: grid;
                    width: 100%;
                    place-items: center;
                    padding: 6px 0;
                    cursor: pointer;
                    overflow: hidden;
                }
                .cell {
                    display: inline-block;
                    width: 76px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    border-radius: 2rem;
                    color: var(--md-sys-color-on-surface-variant);
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
                li.active > .cell {
                    background: var(--md-sys-color-primary);
                    color: var(--md-sys-color-on-primary);
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
