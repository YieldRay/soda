import './slider.scss'
import { useEffect, useRef, useState, forwardRef, useCallback } from 'react'
import clamp from 'lodash-es/clamp'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import {
    autoUpdate,
    useFloating,
    offset,
    flip,
    shift,
    arrow,
    FloatingArrow,
} from '@floating-ui/react'
import { useAutoState } from '@/hooks/use-auto-state'
import { useMergeRefs } from '@/hooks/use-merge'

/**
 * An slider component, note that you should set width or height (use `style` property) for this component!
 *
 * TODO: Two handles is not implemented yet!
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
    ref
) {
    const eRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)

    const [value, setValue] = useAutoState(onChange, value$co, defaultValue)

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
        [steps, minValue, maxValue]
    )

    // just util function
    const valueLimitRange = useCallback(
        (value: number) => clamp(value, minValue, maxValue),
        [minValue, maxValue]
    )

    useEffect(() => {
        const container = eRef.current!
        container.style.setProperty(
            '--percentage',
            toPercentage((value - minValue) / (maxValue - minValue))
        )
    }, [value, minValue, maxValue])

    useEffect(() => {
        // fix the value to the limited value
        const fixedValue = valueLimitRange(valueLimitStep(value))
        if (value !== fixedValue) setValue(fixedValue)
    }, [value, setValue, valueLimitRange, valueLimitStep])

    const [isPressing, setPressing] = useState(false)
    const [isHover, setHover] = useState(false)
    const [isFocus, setFocus] = useState(false)

    const updatePercentage = (e: React.PointerEvent<HTMLDivElement>) => {
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

        setValue(
            valueLimitRange(
                valueLimitStep(minValue + (maxValue - minValue) * percentage)
            )
        )
    }

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const thumb = thumbRef.current!
        thumb.setPointerCapture(e.pointerId)
        setPressing(true)
        updatePercentage(e)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isPressing) return
        updatePercentage(e)
    }

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        setPressing(false)
        const thumb = thumbRef.current!
        thumb.releasePointerCapture(e.pointerId)
    }

    // floating-ui

    const arrowRef = useRef(null)
    const { refs, floatingStyles, update, context } = useFloating({
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
        open: isHover,
        transform: false,
    })

    return (
        <div
            {...props}
            ref={useMergeRefs(ref, eRef)}
            className={clsx('sd-slider', className)}
            data-sd-disabled={disabled}
            data-sd-direction={direction}
            role="slider"
            tabIndex={disabled ? undefined : 0}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(e) => {
                if (!disabled) {
                    const step = (maxValue - minValue) / (steps ?? 10)
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                        e.preventDefault() // prevent scroll
                        setValue(value - step)
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                        e.preventDefault() // prevent scroll
                        setValue(value + step)
                    }
                }
            }}
            onPointerDown={updatePercentage}
            onResize={update}
        >
            <div
                className="sd-slider-inactive_track"
                onDragStart={(e) => e.preventDefault()}
            />
            <div
                className="sd-slider-active_track"
                onDragStart={(e) => e.preventDefault()}
            />
            <div
                className="sd-slider-state_layer"
                onDragStart={(e) => e.preventDefault()}
                style={{
                    opacity: isPressing ? 1 : isHover || isFocus ? 0.6 : 0,
                }}
            />
            <div
                className="sd-slider-handle"
                ref={useMergeRefs(thumbRef, refs.setReference)}
                onResize={update}
                style={{ cursor: isPressing ? 'grabbing' : '' }}
                onDragStart={(e) => e.preventDefault()}
                onPointerDown={onPointerDown}
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
                            {label ?? value}
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
        </div>
    )
})

function toPercentage(value: number) {
    return value * 100 + '%'
}
