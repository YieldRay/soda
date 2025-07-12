/**
 * Shared utilities for Slider and RangeSlider components
 */

import { useCallback } from 'react'

export function toPercentage(value: number) {
    return value * 100 + '%'
}

export function useSliderUtils(steps: number | undefined, minValue: number, maxValue: number) {
    // Limit value to steps
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

    // Limit value to range
    const valueLimitRange = useCallback(
        (value: number) => Math.max(minValue, Math.min(value, maxValue)),
        [minValue, maxValue],
    )

    return { valueLimitStep, valueLimitRange }
}

export function calculatePercentage(
    e: React.PointerEvent<HTMLDivElement>,
    container: HTMLDivElement,
    direction: 'horizontal' | 'vertical'
): number {
    if (direction === 'vertical') {
        const { height: cHeight, top: cY } = container.getBoundingClientRect()
        const pY = e.clientY
        return 1 - (pY - cY) / cHeight
    } else {
        const { width: cWidth, left: cX } = container.getBoundingClientRect()
        const pX = e.clientX
        return (pX - cX) / cWidth
    }
}