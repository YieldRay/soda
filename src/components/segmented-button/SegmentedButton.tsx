import './segmented-button.scss'
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps } from '@/utils/type'

export const SegmentedButton = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        activeIndex?: number
        items?: Array<{
            label: React.ReactNode
            disabled?: boolean
            /**
             * optional, defaults to array index
             */
            key?: React.Key
        }>
        onChange?(activeIndex: number): void
        /**
         * Each step down in density removes 4px from the height
         */
        density?: 0 | -1 | -2 | -3
    }>
>(function SegmentedButton(props, ref) {
    const eRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => eRef.current!)
    useEffect(() => {
        if (props.density)
            eRef.current!.style.setProperty(
                '--height',
                `${40 + props.density * 4}px`
            )
    }, [props])

    return (
        <div className="sd-segmented_button" ref={eRef}>
            {props.items &&
                props.items.map(({ label, disabled, key }, index) => (
                    <Ripple
                        key={key ?? index}
                        className="sd-segmented_button-item"
                        data-sd-active={
                            props.activeIndex === index ? 'true' : 'false'
                        }
                        data-sd-disabled={disabled}
                        onClick={() => props.onChange?.(index)}
                    >
                        <div className="sd-segmented_button-label">{label}</div>
                    </Ripple>
                ))}
        </div>
    )
})
