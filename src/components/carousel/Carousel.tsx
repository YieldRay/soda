import './carousel.scss'
import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { ExtendProps } from '@/utils/type'

export interface Item {
    key?: React.Key
    value: React.ReactNode
    label?: React.ReactNode
}

interface ItemWithFlex extends Item {
    flex: 0 | 1 | 2 | 4
}

/**
 * @beta This is an incomplete implementation, and only three visible items is implemented,
 * make sure the array length is multiple of 3
 *
 * @specs https://m3.material.io/components/carousel/specs
 */
export const Carousel = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * The array length must be a multiple of 3
         */
        items: Array<Item>
        /**
         * Shortcut for style.height
         * @default "12rem"
         */
        height?: string
    }>
>(function Carousel(
    { items: initItems, height, className, style, ...props },
    ref,
) {
    initItems.slice(0, initItems.length - (initItems.length % 3)) // make sure the array length is multiple of 3
    const [items, setItems] = useState(initFlex(initItems))
    const containerRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => containerRef.current!)

    const list = items.map((item, index) => {
        const { value, label, flex } = item
        const key = item.key ?? index
        return (
            <div
                {...props}
                className={clsx('sd-carousel-item', className)}
                key={key}
                style={{ flex, height, ...style }}
                onDragStart={(e) => e.preventDefault()}
            >
                <div className="sd-carousel-value">{value}</div>
                {label && (
                    <div className="sd-carousel-scrim">
                        <div className="sd-carousel-label">{label}</div>
                    </div>
                )}
            </div>
        )
    })

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            className="sd-carousel"
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                    setItems((prev) => updateFlex(prev, 'rr'))
                } else if (e.key === 'ArrowLeft') {
                    setItems((prev) => updateFlex(prev, 'll'))
                }
            }}
            onPointerDown={(e) => {
                const container = containerRef.current!
                const rect = container.getBoundingClientRect()
                const pos = e.clientX - rect.left
                const w = rect.width
                const gesture = (() => {
                    if (pos < w / 4) return 'll'
                    else if (pos < (w / 4) * 2) return 'l'
                    else if (pos < (w / 4) * 3) return 'r'
                    else return 'rr'
                })()

                setItems((prev) => updateFlex(prev, gesture))
            }}
        >
            {list}
        </div>
    )
})

function clearFlex(items: Item[]) {
    const itemWithFlex: Array<ItemWithFlex> = items.map((item) => ({
        ...item,
        flex: 0,
    }))
    return itemWithFlex
}

function initFlex(items: Item[]) {
    const itemWithFlex = clearFlex(items)
    itemWithFlex[0].flex = 4
    itemWithFlex[1].flex = 2
    itemWithFlex[2].flex = 1
    return itemWithFlex
}

function updateFlex(
    prev: ItemWithFlex[],
    gesture: 'rr' | 'r' | 'l' | 'll',
): ItemWithFlex[] {
    const firstVisibleIndex = prev.findIndex(({ flex }) => flex > 0)!
    let virtualItems = prev.slice(0)

    // console.debug({ gesture, firstVisibleIndex })

    // what we click, what to enlarge
    switch (gesture) {
        case 'rr':
            if (firstVisibleIndex < prev.length - 3) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisibleIndex + 3].flex = 4
                virtualItems[firstVisibleIndex + 4].flex = 2
                virtualItems[firstVisibleIndex + 5].flex = 1
            } else {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisibleIndex].flex = 1
                virtualItems[firstVisibleIndex + 1].flex = 2
                virtualItems[firstVisibleIndex + 2].flex = 4
            }
            break
        case 'r':
            if (prev[firstVisibleIndex + 2].flex === 1) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisibleIndex].flex = 1
                virtualItems[firstVisibleIndex + 1].flex = 2
                virtualItems[firstVisibleIndex + 2].flex = 4
            }
            break
        case 'll':
            if (firstVisibleIndex > 2) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisibleIndex - 3].flex = 1
                virtualItems[firstVisibleIndex - 2].flex = 2
                virtualItems[firstVisibleIndex - 1].flex = 4
            } else {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisibleIndex].flex = 4
                virtualItems[firstVisibleIndex + 1].flex = 2
                virtualItems[firstVisibleIndex + 2].flex = 1
            }
            break
        case 'l':
            if (prev[firstVisibleIndex].flex !== 4) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisibleIndex].flex = 4
                virtualItems[firstVisibleIndex + 1].flex = 2
                virtualItems[firstVisibleIndex + 2].flex = 1
            }
            break
    }
    return virtualItems
}
