import { ripple } from '@/ripple/ripple-effect'

export function SelectYear({
    current,
    onChange,
}: {
    current: number
    onChange?: (year: number) => void
}) {
    return (
        <ul className="sd-date_picker-year_list">
            {getClosest15Years(current).map((year) => (
                <li
                    className="sd-date_picker-year_item"
                    data-sd-active={current === year}
                    onClick={() => onChange?.(year)}
                    key={year}
                    ref={(el) => el && ripple(el)}
                >
                    <div className="sd-date_picker-year_cell">
                        {
                            new Intl.DateTimeFormat(undefined, {
                                year: 'numeric',
                            }).formatToParts(new Date(year, 1, 1))[0].value
                        }
                    </div>
                </li>
            ))}
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
