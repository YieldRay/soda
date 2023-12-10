import Icon from '@mdi/react'
import { MenuItem } from '@/components/menu/MenuItem'
import { mdiCheck } from '@mdi/js'

export function SelectMonth({
    current,
    onChange,
}: {
    current: number
    onChange?: (month: number) => void
}) {
    return (
        <>
            {getClosest6Months(current).map((month) => (
                <MenuItem
                    key={month}
                    onClick={() => onChange?.(month)}
                    leadingIcon={
                        <Icon
                            style={{
                                visibility:
                                    month === current ? 'visible' : 'hidden',
                            }}
                            path={mdiCheck}
                        />
                    }
                >
                    {
                        new Intl.DateTimeFormat(undefined, {
                            month: 'long',
                        }).formatToParts(new Date(0, month - 1, 1))[0].value
                    }
                </MenuItem>
            ))}
        </>
    )
}

function getClosest6Months(month: number): number[] {
    const result: number[] = []
    let begin = month - 2
    if (begin < 1) begin = 1
    if (month >= 9) begin = 7
    for (let i = 0; i < 6; i++) {
        result.push(begin++)
    }
    return result
}
