import './slider.scss'
import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import {
    arrow,
    autoUpdate,
    flip,
    FloatingArrow,
    offset,
    shift,
    useFloating,
} from '@floating-ui/react'
import { useAutoState } from '@/hooks/use-auto-state'
import { useMergeRefs } from '@/hooks/use-merge'
import { ExtendProps } from '@/utils/type'
import { calculatePercentage, toPercentage, useSliderUtils } from './slider-utils'

/**
 * A range slider component with two handles for selecting a range of values.
 * Note that you should set width or height (use `style` property) for this component!
 *
 * @specs https://m3.material.io/components/sliders/specs
 */
export const RangeSlider = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        value?: [number, number]
        onChange?: (value: [number, number]) => void
        /**
         * For uncontrolled
         */
        defaultValue?: [number, number]
        disabled?: boolean
        steps?: number
        /**
         * @default 0
         */
        min?: number
        /**
         * @default 100
         */
        max?: number
        /**
         * @default horizontal
         */
        direction?: 'horizontal' | 'vertical'
        /**
         * Customize the label, by default show the value
         */
        label?: React.ReactNode
        hideLabel?: boolean
    }>
>(function RangeSlider(
    {
        defaultValue = [0, 100],
        value: value$co,
        onChange,
        min: minValue = 0,
        max: maxValue = 100,
        steps,
        direction = 'horizontal',
        disabled,
        className,
        label,
        hideLabel,
        ...props
    },
    ref,
) {
    const eRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)
    const thumbRef2 = useRef<HTMLDivElement>(null)

    const [value, setValue] = useAutoState(onChange, value$co, defaultValue)
    const { valueLimitStep, valueLimitRange } = useSliderUtils(steps, minValue, maxValue)

    useEffect(() => {
        const container = eRef.current!
        const startPercentage = (value[0] - minValue) / (maxValue - minValue)
        const endPercentage = (value[1] - minValue) / (maxValue - minValue)
        container.style.setProperty('--start-percentage', toPercentage(startPercentage))
        container.style.setProperty('--end-percentage', toPercentage(endPercentage))
        container.style.setProperty('--percentage', toPercentage(endPercentage - startPercentage))
    }, [value, minValue, maxValue])

    useEffect(() => {
        // fix the value to the limited value
        const fixedMin = valueLimitRange(valueLimitStep(value[0]))
        const fixedMax = valueLimitRange(valueLimitStep(value[1]))
        const fixedRange: [number, number] = [Math.min(fixedMin, fixedMax), Math.max(fixedMin, fixedMax)]
        if (value[0] !== fixedRange[0] || value[1] !== fixedRange[1]) {
            setValue(fixedRange)
        }
    }, [value, setValue, valueLimitRange, valueLimitStep])

    const [isPressing, setPressing] = useState(false)
    const [isHover, setHover] = useState(false)
    const [isFocus, setFocus] = useState(false)
    const [activeHandle, setActiveHandle] = useState<'min' | 'max' | null>(null)

    const updatePercentage = (e: React.PointerEvent<HTMLDivElement>, handleType?: 'min' | 'max') => {
        const container = eRef.current!
        const percentage = calculatePercentage(e, container, direction)

        const newValue = valueLimitRange(
            valueLimitStep(minValue + (maxValue - minValue) * percentage),
        )

        const currentRange = value
        let newRange: [number, number]
        
        if (handleType) {
            // Specific handle is being moved
            if (handleType === 'min') {
                newRange = [Math.min(newValue, currentRange[1]), currentRange[1]]
            } else {
                newRange = [currentRange[0], Math.max(newValue, currentRange[0])]
            }
        } else {
            // Click on track - move nearest handle
            const distToMin = Math.abs(newValue - currentRange[0])
            const distToMax = Math.abs(newValue - currentRange[1])
            
            if (distToMin <= distToMax) {
                newRange = [Math.min(newValue, currentRange[1]), currentRange[1]]
                setActiveHandle('min')
            } else {
                newRange = [currentRange[0], Math.max(newValue, currentRange[0])]
                setActiveHandle('max')
            }
        }
        
        setValue(newRange)
    }

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, handleType?: 'min' | 'max') => {
        const thumb = handleType === 'max' ? thumbRef2.current! : thumbRef.current!
        thumb.setPointerCapture(e.pointerId)
        setPressing(true)
        if (handleType) {
            setActiveHandle(handleType)
        }
        updatePercentage(e, handleType)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isPressing) return
        updatePercentage(e, activeHandle || undefined)
    }

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        setPressing(false)
        setActiveHandle(null)
        const thumb = thumbRef.current!
        const thumb2 = thumbRef2.current!
        thumb.releasePointerCapture(e.pointerId)
        thumb2.releasePointerCapture(e.pointerId)
    }

    // floating-ui for min handle
    const arrowRef = useRef(null)
    const { refs, floatingStyles, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: direction === 'vertical' ? 'left' : 'top',
        middleware: [
            offset(10),
            flip(),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
        open: isHover && (activeHandle === 'min' || activeHandle === null),
        transform: false,
    })

    // floating-ui for max handle
    const arrowRef2 = useRef(null)
    const { refs: refs2, floatingStyles: floatingStyles2, context: context2 } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: direction === 'vertical' ? 'left' : 'top',
        middleware: [
            offset(10),
            flip(),
            shift(),
            arrow({
                element: arrowRef2,
            }),
        ],
        open: isHover && (activeHandle === 'max' || activeHandle === null),
        transform: false,
    })

    const mergedRef = useMergeRefs(ref, eRef)
    const mergedThumbRef = useMergeRefs(thumbRef, refs.setReference)
    const mergedThumbRef2 = useMergeRefs(thumbRef2, refs2.setReference)

    return (
        <div
            {...props}
            ref={mergedRef}
            className={clsx('sd-slider', className)}
            data-sd-disabled={disabled}
            data-sd-direction={direction}
            data-sd-range={true}
            role="group"
            tabIndex={disabled ? undefined : 0}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-valuetext={`${value[0]} to ${value[1]}`}
            aria-orientation={direction}
            aria-disabled={disabled}
            aria-label="Range slider"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(e) => {
                if (!disabled) {
                    const step = (maxValue - minValue) / (steps ?? 10)
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                        e.preventDefault() // prevent scroll
                        // Move the min handle
                        const newRange: [number, number] = [
                            Math.max(minValue, value[0] - step),
                            value[1]
                        ]
                        setValue(newRange)
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                        e.preventDefault() // prevent scroll
                        // Move the max handle
                        const newRange: [number, number] = [
                            value[0],
                            Math.min(maxValue, value[1] + step)
                        ]
                        setValue(newRange)
                    }
                }
            }}
            onPointerDown={updatePercentage}
        >
            <div
                className="sd-slider-inactive_track"
                onDragStart={(e) => e.preventDefault()}
            />
            <div
                className="sd-slider-active_track"
                onDragStart={(e) => e.preventDefault()}
            />
            {/* State layers for each handle */}
            <div
                className="sd-slider-state_layer"
                data-handle="min"
                onDragStart={(e) => e.preventDefault()}
                style={{
                    opacity: isPressing ? 1 : isHover || isFocus ? 0.6 : 0,
                }}
            />
            <div
                className="sd-slider-state_layer"
                data-handle="max"
                onDragStart={(e) => e.preventDefault()}
                style={{
                    opacity: isPressing ? 1 : isHover || isFocus ? 0.6 : 0,
                }}
            />
            
            {/* Min handle */}
            <div
                className="sd-slider-handle"
                data-handle="min"
                ref={mergedThumbRef}
                style={{ cursor: isPressing ? 'grabbing' : '' }}
                onDragStart={(e) => e.preventDefault()}
                onPointerDown={(e) => onPointerDown(e, 'min')}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
            >
                {!hideLabel && (
                    <div
                        className="sd-slider-label"
                        ref={refs.setFloating}
                        style={{
                            opacity: isHover || isFocus ? 1 : 0,
                            ...floatingStyles,
                        }}
                    >
                        <div style={{ overflow: 'hidden' }}>
                            {label ?? value[0]}
                        </div>
                        <FloatingArrow
                            ref={arrowRef}
                            context={context}
                            fill="var(--md-sys-color-primary)"
                            style={{ transform: 'translateY(-2px)' }}
                        />
                    </div>
                )}
            </div>
            
            {/* Max handle */}
            <div
                className="sd-slider-handle"
                data-handle="max"
                ref={mergedThumbRef2}
                style={{ cursor: isPressing ? 'grabbing' : '' }}
                onDragStart={(e) => e.preventDefault()}
                onPointerDown={(e) => onPointerDown(e, 'max')}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
            >
                {!hideLabel && (
                    <div
                        className="sd-slider-label"
                        ref={refs2.setFloating}
                        style={{
                            opacity: isHover || isFocus ? 1 : 0,
                            ...floatingStyles2,
                        }}
                    >
                        <div style={{ overflow: 'hidden' }}>
                            {value[1]}
                        </div>
                        <FloatingArrow
                            ref={arrowRef2}
                            context={context2}
                            fill="var(--md-sys-color-primary)"
                            style={{ transform: 'translateY(-2px)' }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
})