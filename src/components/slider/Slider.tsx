import './slider.scss'
import {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    useCallback,
} from 'react'
import clamp from 'lodash-es/clamp'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import assign from 'lodash-es/assign'
import {
    autoUpdate,
    useFloating,
    offset,
    flip,
    shift,
    arrow,
    useMergeRefs,
    FloatingArrow,
} from '@floating-ui/react'

/**
 * TODO: Two handles is not implemented yet!
 * @specs https://m3.material.io/components/sliders/specs
 */
export const Slider = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        value?: number
        onChange?: (value: number) => void
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
        hideLabel?: boolean
    }>
>(function Slider(
    {
        onChange,
        steps,
        value = 0,
        min: minValue = 0,
        max: maxValue = 100,
        direction = 'horizontal',
        hideLabel,
        className,
        ...props
    },
    ref
) {
    const eRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)

    const valueLimitStep = useCallback(
        function (value: number) {
            if (!steps || steps === Infinity) return value

            const unit = (maxValue - minValue) / steps
            let segs = Math.floor(value / unit)
            const left = value % unit
            if (left >= unit / 2) segs++
            return segs * unit
        },
        [steps, minValue, maxValue]
    )

    const valueLimitRange = useCallback(
        function (value: number) {
            return clamp(value, minValue, maxValue)
        },
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
        if (value !== fixedValue) onChange?.(fixedValue)
    }, [onChange, value, valueLimitRange, valueLimitStep])

    useImperativeHandle(ref, () => eRef.current!)

    const [isPressing, setPressing] = useState(false)
    const [isHover, setHover] = useState(false)

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

        onChange?.(
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

    const arrowRef = useRef(null)
    const { refs, floatingStyles, update, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: direction === 'vertical' ? 'right' : 'top',
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
            className={clsx('sd-slider', className)}
            ref={eRef}
            data-sd-direction={direction}
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
                    opacity: isPressing ? 1 : isHover ? 0.6 : 0,
                }}
            />
            <div
                className="sd-slider-handle"
                ref={useMergeRefs([thumbRef, refs.setReference])}
                onResize={update}
                style={{
                    cursor: isPressing ? 'grabbing' : '',
                }}
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
                        style={assign(
                            isHover
                                ? {
                                      opacity: 1,
                                  }
                                : { opacity: 0 },
                            floatingStyles
                        )}
                    >
                        <span style={{ overflow: 'hidden' }}>{value}</span>
                        <FloatingArrow
                            ref={arrowRef}
                            context={context}
                            fill="var(--sd-sys-color-primary)"
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