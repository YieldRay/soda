import './slider.scss'
import {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react'
import clamp from 'lodash-es/clamp'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'

/**
 * TODO: not fully implemented yet!
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
    }>
>(function Slider(
    {
        onChange,
        steps,
        value = 0,
        min: minValue,
        max: maxValue,
        direction = 'horizontal',
        className,
        ...props
    },
    ref
) {
    const eRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const container = eRef.current!
        container.style.setProperty('--percentage', toPercentage(value))
    }, [value])
    useImperativeHandle(ref, () => eRef.current!)

    const [isPressing, setPressing] = useState(false)
    const [isHover, setHover] = useState(false)

    const updatePercentage = (e: React.PointerEvent<HTMLDivElement>) => {
        const container = eRef.current!
        let value: number
        if (direction === 'vertical') {
            const { height: cHeight, top: cY } =
                container.getBoundingClientRect()
            const pY = e.clientY
            value = 1 - (pY - cY) / cHeight
        } else {
            const { width: cWidth, left: cX } =
                container.getBoundingClientRect()
            const pX = e.clientX
            value = (pX - cX) / cWidth
        }

        onChange?.(valueLimit(valueLimitStep(value, steps), minValue, maxValue))
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

    return (
        <div
            {...props}
            className={clsx('sd-slider', className)}
            ref={eRef}
            data-sd-direction={direction}
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
            <div
                className="sd-slider-state_layer"
                onDragStart={(e) => e.preventDefault()}
                style={{
                    opacity: isHover ? 1 : 0,
                }}
            />
            <div
                className="sd-slider-handle"
                ref={thumbRef}
                style={{
                    cursor: isPressing ? 'grabbing' : '',
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
            />
        </div>
    )
})

function toPercentage(value: number) {
    return value * 100 + '%'
}

function valueLimitStep(value: number, steps?: number) {
    if (!steps) return value

    const unit = 1 / steps
    let segs = Math.floor(value / unit)
    const left = value % unit
    if (left >= unit / 2) segs++
    return segs * unit
}

function valueLimit(value: number, min?: number, max?: number) {
    return clamp(value, min ? Math.min(0, min) : 0, max ? Math.max(1, max) : 1)
}
