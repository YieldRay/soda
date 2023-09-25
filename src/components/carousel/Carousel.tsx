/* eslint-disable */
//@ts-nocheck
//TODO: unimplemented yet!

import { useResizeObserver, useWindowSizeType } from '@/utils/hooks'
import { useRef, useState } from 'react'

interface Item {
    key?: React.Key
    value: React.ReactNode
    label?: React.ReactNode
}

/**
 *
 * @specs https://m3.material.io/components/carousel/specs
 */
export function Carousel(props: { items: Array<Item> }) {
    const windowSizeType = useWindowSizeType()
    const isCompact = windowSizeType === 'compact'
    const containerRef = useRef<HTMLDivElement>(null)
    const roEntry = useResizeObserver(containerRef)
    const minItemWidth = (roEntry?.contentRect.width ?? 0) / (isCompact ? 5 : 7)
    const [leftIndex, setLeftIndex] = useState(0)
    const [leftLarge, setLeftLarge] = useState(true)

    return <div className="sd-carousel"></div>
}
