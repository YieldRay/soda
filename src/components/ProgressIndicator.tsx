/**
 * @specs https://m3.material.io/components/progress-indicators/specs#efada034-defe-401e-803a-e6ea2833a396
 */
export function LinearProgressIndicator(props: {
    /**
     * between 0 and 1, if is unset, act as undeterminate
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

/**
 * @specs https://m3.material.io/components/progress-indicators/specs#c1e48032-c857-45d6-af1d-c5b5b0022cf4
 */
export function CircularProgressIndicator(props: {
    /**
     * between 0 and 1, if is unset, act as undeterminate
     */
    value?: number
}) {
    return (
        <div
            className="sd-circular_progress_indicator"
            ref={
                typeof props.value !== 'undefined'
                    ? (e) =>
                          e?.style.setProperty(
                              '--value',
                              `${props.value! * 100}%`
                          )
                    : undefined
            }
            data-sd={
                typeof props.value !== 'undefined'
                    ? 'determinate'
                    : 'undeterminate'
            }
        ></div>
    )
}
