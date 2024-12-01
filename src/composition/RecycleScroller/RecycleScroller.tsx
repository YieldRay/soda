import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react'

interface RecycleScrollerProps<T> {
    data: T[]
    itemHeight: number
    windowHeight: number
    children: (item: T, index: number) => React.ReactNode
    bufferSize?: number
    defaultRevealedIndex?: number
}

export interface RecycleScrollerHandle {
    scrollToIndex: (index: number) => void
}

/**
 * @experimental
 * Highly experimental!
 */
export const RecycleScroller = forwardRef(function RecycleScroller<T>(
    {
        data,
        itemHeight,
        windowHeight,
        children,
        bufferSize = 3,
        defaultRevealedIndex = 0,
    }: RecycleScrollerProps<T>,
    ref: React.ForwardedRef<RecycleScrollerHandle>,
) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isScrolling, setIsScrolling] = useState(false)
    const scrollingTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
    const initialScrollApplied = useRef(false)

    const totalHeight = data.length * itemHeight

    // Force re-render when scrolling
    const [, forceUpdate] = useState({})

    const getVisibleItems = useCallback(() => {
        const scrollTop = containerRef.current?.scrollTop ?? 0
        const startIndex = Math.max(
            0,
            Math.floor(scrollTop / itemHeight) - bufferSize,
        )
        const endIndex = Math.min(
            data.length,
            Math.ceil((scrollTop + windowHeight) / itemHeight) + bufferSize,
        )

        return data.slice(startIndex, endIndex).map((item, index) => ({
            item,
            index: startIndex + index,
            top: (startIndex + index) * itemHeight,
        }))
    }, [data, itemHeight, windowHeight, bufferSize])

    const visibleItems = useMemo(getVisibleItems, [
        getVisibleItems,
        isScrolling,
    ])

    const handleScroll = useCallback(
        (_event: React.UIEvent<HTMLDivElement>) => {
            forceUpdate({})
            setIsScrolling(true)

            if (scrollingTimeoutRef.current) {
                clearTimeout(scrollingTimeoutRef.current)
            }

            scrollingTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false)
            }, 150)
        },
        [],
    )

    const scrollToIndex = useCallback(
        (index: number) => {
            if (containerRef.current) {
                const scrollPosition = Math.max(0, index * itemHeight)
                containerRef.current.scrollTop = scrollPosition
                forceUpdate({})
            }
        },
        [itemHeight],
    )

    // initial scroll position
    useEffect(() => {
        if (
            defaultRevealedIndex != null &&
            !initialScrollApplied.current &&
            containerRef.current
        ) {
            initialScrollApplied.current = true
            scrollToIndex(defaultRevealedIndex)
        }
    }, [defaultRevealedIndex, scrollToIndex])

    useEffect(() => {
        return () => {
            if (scrollingTimeoutRef.current) {
                clearTimeout(scrollingTimeoutRef.current)
            }
        }
    }, [])

    useImperativeHandle(
        ref,
        () => ({
            scrollToIndex,
        }),
        [scrollToIndex],
    )

    return (
        <div
            ref={containerRef}
            style={{
                height: windowHeight,
                overflow: 'auto',
                position: 'relative',
            }}
            onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                {visibleItems.map(({ item, index, top }) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top,
                            height: itemHeight,
                            width: '100%',
                        }}
                    >
                        {children(item, index)}
                    </div>
                ))}
            </div>
        </div>
    )
})
