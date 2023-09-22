import './segmented-button.scss'
import { Ripple } from '@/utils/Ripple'

export function SegmentedButton<T extends React.Key>(props: {
    value?: T
    values?: Array<{
        label: React.ReactNode
        value: T
        disabled?: boolean
    }>
    onChange?(value: T): void
    /**
     * Each step down in density removes 4px from the height
     */
    density?: 0 | -1 | -2 | -3
}) {
    return (
        <div
            className="sd-segmented_button"
            ref={(e) => {
                if (props.density)
                    e?.style.setProperty(
                        '--height',
                        `${40 + props.density * 4}px`
                    )
            }}
        >
            {props.values &&
                props.values.map(({ label, value, disabled }) => (
                    <Ripple
                        key={value}
                        className="sd-segmented_button-item"
                        data-sd-selected={props.value === value}
                        data-sd-disabled={disabled}
                        onClick={() => props.onChange?.(value)}
                    >
                        <div className="sd-segmented_button-label">{label}</div>
                    </Ripple>
                ))}
        </div>
    )
}
