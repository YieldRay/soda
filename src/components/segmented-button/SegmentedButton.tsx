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
>(function SegmentedButton({ activeIndex, items, onChange, density }, ref) {
    const eRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => eRef.current!)
    useEffect(() => {
        if (density)
            eRef.current!.style.setProperty('--height', `${40 + density * 4}px`)
    }, [density])

    return (
        <div className="sd-segmented_button" ref={eRef}>
            {items &&
                items.map(({ label, disabled, key }, index) => (
                    <Ripple
                        key={key ?? index}
                        tabIndex={index + 1}
                        className="sd-segmented_button-item"
                        data-sd-active={
                            activeIndex === index ? 'true' : 'false'
                        }
                        data-sd-disabled={disabled}
                        onClick={() => onChange?.(index)}
                        onKeyDown={(e) => {
                            if (onChange && e.key === 'Enter' && !disabled) {
                                onChange(index)
                            }
                        }}
                    >
                        <div className="sd-segmented_button-label">{label}</div>
                    </Ripple>
                ))}
        </div>
    )
})
