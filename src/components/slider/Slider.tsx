import './slider.scss'
import clsx from 'clsx'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
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
import { clamp } from '@/utils/misc'
import { ExtendProps } from '@/utils/type'

/**
 * An slider component, note that you should set width or height (use `style` property) for this component!
 *
 * Supports both single value and range (two handles) modes.
 *
 * @specs https://m3.material.io/components/sliders/specs
 */
export const Slider = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        value?: number
        onChange?: (value: number) => void
        /**
         * For uncontrolled
         */
        defaultValue?: number
        /**
         * Range mode - two handles for selecting a range
         */
        range?: boolean
        rangeValue?: [number, number]
        onRangeChange?: (value: [number, number]) => void
        /**
         * For uncontrolled range mode
         */
        defaultRangeValue?: [number, number]
        disabled?: boolean
        steps?: number
        /**
         * @default 0
         */
        min?: number
        /**
         * @default 1
         */
        max?: number
        /**
         * @default horizon
         */
        direction?: 'horizontal' | 'vertical'
        /**
         * Customize the label, by default show the value
         */
        label?: React.ReactNode
        hideLabel?: boolean
    }>
>(function Slider(
    {
        defaultValue = 0,
        value: value$co,
        onChange,
        range = false,
        rangeValue: rangeValue$co,
        onRangeChange,
        defaultRangeValue = [0, 100],
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
    const [rangeValue, setRangeValue] = useAutoState(onRangeChange, rangeValue$co, defaultRangeValue)

    // Determine which values to use based on mode
    const isRangeMode = range
    const currentMinValue = isRangeMode ? rangeValue[0] : value
    const currentMaxValue = isRangeMode ? rangeValue[1] : value

    // just util function
    const valueLimitStep = useCallback(
        (value: number) => {
            if (!steps || steps === Infinity) return value

            const unit = (maxValue - minValue) / steps
            let segments = Math.floor(value / unit)
            const left = value % unit
            if (left >= unit / 2) segments++
            return segments * unit
        },
        [steps, minValue, maxValue],
    )

    // just util function
    const valueLimitRange = useCallback(
        (value: number) => clamp(minValue, value, maxValue),
        [minValue, maxValue],
    )

    useEffect(() => {
        const container = eRef.current!
        if (isRangeMode) {
            const startPercentage = (currentMinValue - minValue) / (maxValue - minValue)
            const endPercentage = (currentMaxValue - minValue) / (maxValue - minValue)
            container.style.setProperty('--start-percentage', toPercentage(startPercentage))
            container.style.setProperty('--end-percentage', toPercentage(endPercentage))
            container.style.setProperty('--percentage', toPercentage(endPercentage - startPercentage))
        } else {
            container.style.setProperty(
                '--percentage',
                toPercentage((value - minValue) / (maxValue - minValue)),
            )
        }
    }, [value, rangeValue, minValue, maxValue, isRangeMode, currentMinValue, currentMaxValue])

    useEffect(() => {
        // fix the value to the limited value
        if (isRangeMode) {
            const fixedMin = valueLimitRange(valueLimitStep(currentMinValue))
            const fixedMax = valueLimitRange(valueLimitStep(currentMaxValue))
            const fixedRange: [number, number] = [Math.min(fixedMin, fixedMax), Math.max(fixedMin, fixedMax)]
            if (rangeValue[0] !== fixedRange[0] || rangeValue[1] !== fixedRange[1]) {
                setRangeValue(fixedRange)
            }
        } else {
            const fixedValue = valueLimitRange(valueLimitStep(value))
            if (value !== fixedValue) setValue(fixedValue)
        }
    }, [value, rangeValue, setValue, setRangeValue, valueLimitRange, valueLimitStep, isRangeMode, currentMinValue, currentMaxValue])

    const [isPressing, setPressing] = useState(false)
    const [isHover, setHover] = useState(false)
    const [isFocus, setFocus] = useState(false)
    const [activeHandle, setActiveHandle] = useState<'min' | 'max' | null>(null)

    const updatePercentage = (e: React.PointerEvent<HTMLDivElement>, handleType?: 'min' | 'max') => {
        const container = eRef.current!
        let percentage: number
        if (direction === 'vertical') {
            const { height: cHeight, top: cY } =
                container.getBoundingClientRect()
            const pY = e.clientY
            percentage = 1 - (pY - cY) / cHeight
        } else {
            const { width: cWidth, left: cX } =
                container.getBoundingClientRect()
            const pX = e.clientX
            percentage = (pX - cX) / cWidth
        }

        const newValue = valueLimitRange(
            valueLimitStep(minValue + (maxValue - minValue) * percentage),
        )

        if (isRangeMode) {
            const currentRange = rangeValue
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
            
            setRangeValue(newRange)
        } else {
            setValue(newValue)
        }
    }

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, handleType?: 'min' | 'max') => {
        const thumb = handleType === 'max' && isRangeMode ? thumbRef2.current! : thumbRef.current!
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
        const thumb2 = thumbRef2.current
        thumb.releasePointerCapture(e.pointerId)
        if (thumb2) thumb2.releasePointerCapture(e.pointerId)
    }

    // floating-ui
    const arrowRef = useRef(null)
    const arrowRef2 = useRef(null)
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
        open: isHover && (!isRangeMode || activeHandle === 'min' || activeHandle === null),
        transform: false,
    })

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
        open: isRangeMode && isHover && (activeHandle === 'max' || activeHandle === null),
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
            data-sd-range={isRangeMode}
            role={isRangeMode ? 'group' : 'slider'}
            tabIndex={disabled ? undefined : 0}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-valuenow={isRangeMode ? undefined : value}
            aria-valuetext={isRangeMode ? `${rangeValue[0]} to ${rangeValue[1]}` : undefined}
            aria-orientation={direction}
            aria-disabled={disabled}
            aria-label={isRangeMode ? 'Range slider' : 'Slider'}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(e) => {
                if (!disabled) {
                    const step = (maxValue - minValue) / (steps ?? 10)
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                        e.preventDefault() // prevent scroll
                        if (isRangeMode) {
                            // Move the min handle
                            const newRange: [number, number] = [
                                Math.max(minValue, rangeValue[0] - step),
                                rangeValue[1]
                            ]
                            setRangeValue(newRange)
                        } else {
                            setValue(value - step)
                        }
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                        e.preventDefault() // prevent scroll
                        if (isRangeMode) {
                            // Move the max handle
                            const newRange: [number, number] = [
                                rangeValue[0],
                                Math.min(maxValue, rangeValue[1] + step)
                            ]
                            setRangeValue(newRange)
                        } else {
                            setValue(value + step)
                        }
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
            {isRangeMode && (
                <div
                    className="sd-slider-state_layer"
                    data-handle="max"
                    onDragStart={(e) => e.preventDefault()}
                    style={{
                        opacity: isPressing ? 1 : isHover || isFocus ? 0.6 : 0,
                    }}
                />
            )}
            
            {/* First handle (min value in range mode, single value in normal mode) */}
            <div
                className="sd-slider-handle"
                data-handle="min"
                ref={mergedThumbRef}
                style={{ cursor: isPressing ? 'grabbing' : '' }}
                onDragStart={(e) => e.preventDefault()}
                onPointerDown={(e) => onPointerDown(e, isRangeMode ? 'min' : undefined)}
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
                            {label ?? (isRangeMode ? rangeValue[0] : value)}
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
            
            {/* Second handle for range mode */}
            {isRangeMode && (
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
                                {rangeValue[1]}
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
            )}
        </div>
    )
})

function toPercentage(value: number) {
    return value * 100 + '%'
}
