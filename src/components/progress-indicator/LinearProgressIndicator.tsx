import './progress-indicator.scss'

/**
 * @specs https://m3.material.io/components/progress-indicators/specs#efada034-defe-401e-803a-e6ea2833a396
 */
export function LinearProgressIndicator(props: {
    /**
     * Between 0 and 1, if is unset, act as undeterminate
     */
    value?: number
}) {
    return (
        <div
            className="sd-linear_progress_indicator"
            data-sd={
                typeof props.value !== 'undefined'
                    ? 'determinate'
                    : 'undeterminate'
            }
        >
            <div
                className="sd-linear_progress_indicator-track"
                style={{
                    width:
                        typeof props.value !== 'undefined'
                            ? `${props.value * 100}%`
                            : '',
                }}
            ></div>
        </div>
    )
}
