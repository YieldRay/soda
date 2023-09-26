import { ExtendProps } from '@/utils/type'
import './carousel.scss'
import { useRef, useState, forwardRef, useImperativeHandle } from 'react'

export interface Item {
    key?: React.Key
    value: React.ReactNode
    label?: React.ReactNode
}

interface ItemWithFlex extends Item {
    flex: 0 | 1 | 2 | 4
}

/**
 * warn: incomplete implemention, and only three visiable items is implemented,
 * make sure the array length is multiple of 3, or it will throw error
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
         * @default 12rem
         */
        height?: string
    }>
>(function Carousel(props, ref) {
    if (props.items.length % 3 !== 0)
        throw new Error('the item array length must be a multiple of 3')
    const [items, setItems] = useState(initFlex(props.items))
    const containerRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => containerRef.current!)

    const list = items.map((item, index) => {
        const { value, label, flex } = item
        const key = item.key ?? index
        return (
            <div
                className="sd-carousel-item"
                key={key}
                style={{ flex }}
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
            className="sd-carousel"
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
    gesture: 'rr' | 'r' | 'l' | 'll'
): ItemWithFlex[] {
    const firstVisiableIndex = prev.findIndex(({ flex }) => flex > 0)!
    let virtualItems = prev.slice(0)

    console.debug({ gesture, firstVisiableIndex })

    // what we click, what to enlarge
    switch (gesture) {
        case 'rr':
            if (firstVisiableIndex < prev.length - 3) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisiableIndex + 3].flex = 4
                virtualItems[firstVisiableIndex + 4].flex = 2
                virtualItems[firstVisiableIndex + 5].flex = 1
            } else {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisiableIndex].flex = 1
                virtualItems[firstVisiableIndex + 1].flex = 2
                virtualItems[firstVisiableIndex + 2].flex = 4
            }
            break
        case 'r':
            if (prev[firstVisiableIndex + 2].flex === 1) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisiableIndex].flex = 1
                virtualItems[firstVisiableIndex + 1].flex = 2
                virtualItems[firstVisiableIndex + 2].flex = 4
            }
            break
        case 'll':
            if (firstVisiableIndex > 2) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisiableIndex - 3].flex = 1
                virtualItems[firstVisiableIndex - 2].flex = 2
                virtualItems[firstVisiableIndex - 1].flex = 4
            } else {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisiableIndex].flex = 4
                virtualItems[firstVisiableIndex + 1].flex = 2
                virtualItems[firstVisiableIndex + 2].flex = 1
            }
            break
        case 'l':
            if (prev[firstVisiableIndex].flex !== 4) {
                virtualItems = clearFlex(virtualItems)
                virtualItems[firstVisiableIndex].flex = 4
                virtualItems[firstVisiableIndex + 1].flex = 2
                virtualItems[firstVisiableIndex + 2].flex = 1
            }
            break
    }
    return virtualItems
}
