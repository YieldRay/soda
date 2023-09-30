import './select.scss'

import {
    useFloating,
    flip,
    size,
    autoUpdate,
    SideObject,
    useInteractions,
    inner,
    useInnerOffset,
    useClick,
    useListNavigation,
    useDismiss,
    useRole,
    useTypeahead,
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
    offset,
    shift,
} from '@floating-ui/react'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ScrollArrow } from './ScrollArrow'
import clsx from 'clsx'

/**
 * [warn]: Not an official component defined in material design document
 *
 * Based on https://codesandbox.io/s/shy-snowflake-kp6479?file=/src/Select.tsx
 *
 * This component do not have ref forwarded
 */
export function Select({
    items = [],
    selectedIndex = 0,
    onChange,
}: {
    items?: Array<string>
    selectedIndex?: number
    onChange?(selectedIndex: number): void
}) {
    const listRef = useRef<Array<HTMLElement | null>>([])
    const listContentRef = useRef<Array<string | null>>([])
    const overflowRef = useRef<SideObject>(null)
    const allowSelectRef = useRef(false)
    const allowMouseUpRef = useRef(true)
    const selectTimeoutRef = useRef<any>()
    const scrollRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [fallback, setFallback] = useState(false)
    const [innerOffset, setInnerOffset] = useState(0)
    const [touch, setTouch] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)
    const [blockSelection, setBlockSelection] = useState(false)

    if (!open) {
        if (innerOffset !== 0) setInnerOffset(0)
        if (fallback) setFallback(false)
        if (blockSelection) setBlockSelection(false)
    }

    const { refs, floatingStyles, context, isPositioned } = useFloating({
        placement: 'bottom-start',
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        transform: false,
        middleware: fallback
            ? [
                  offset(5),
                  touch
                      ? shift({ crossAxis: true, padding: 10 })
                      : flip({ padding: 10 }),
                  size({
                      apply({ availableHeight }) {
                          Object.assign(scrollRef.current?.style ?? {}, {
                              maxHeight: `${availableHeight}px`,
                          })
                      },
                      padding: 10,
                  }),
              ]
            : [
                  inner({
                      listRef,
                      overflowRef,
                      scrollRef,
                      index: selectedIndex,
                      offset: innerOffset,
                      onFallbackChange: setFallback,
                      padding: 10,
                      minItemsVisible: touch ? 8 : 4,
                      referenceOverflowThreshold: 20,
                  }),
                  offset({ crossAxis: -4 }),
              ],
    })

    const { getReferenceProps, getFloatingProps, getItemProps } =
        useInteractions([
            useClick(context, { event: 'mousedown' }),
            useDismiss(context),
            useRole(context, { role: 'listbox' }),
            useInnerOffset(context, {
                enabled: !fallback,
                onChange: setInnerOffset,
                overflowRef,
                scrollRef,
            }),
            useListNavigation(context, {
                listRef,
                activeIndex,
                selectedIndex,
                onNavigate: setActiveIndex,
            }),
            useTypeahead(context, {
                listRef: listContentRef,
                activeIndex,
                onMatch: open ? setActiveIndex : onChange,
            }),
        ])

    useEffect(() => {
        if (open) {
            selectTimeoutRef.current = setTimeout(() => {
                allowSelectRef.current = true
            }, 300)

            return () => {
                clearTimeout(selectTimeoutRef.current)
            }
        } else {
            allowSelectRef.current = false
            allowMouseUpRef.current = true
        }
    }, [open])

    const handleArrowScroll = (amount: number) => {
        if (fallback) {
            if (scrollRef.current) {
                scrollRef.current.scrollTop -= amount
                flushSync(() => setScrollTop(scrollRef.current?.scrollTop ?? 0))
            }
        } else {
            flushSync(() => setInnerOffset((value) => value - amount))
        }
    }

    const handleArrowHide = () => {
        if (touch) {
            clearTimeout(selectTimeoutRef.current)
            setBlockSelection(true)
            selectTimeoutRef.current = setTimeout(() => {
                setBlockSelection(false)
            }, 400)
        }
    }

    return (
        <>
            <button
                ref={refs.setReference}
                className="sd-select-button"
                {...getReferenceProps({
                    onTouchStart() {
                        setTouch(true)
                    },
                    onPointerMove({ pointerType }) {
                        if (pointerType !== 'touch') {
                            setTouch(false)
                        }
                    },
                })}
            >
                <span>{items[selectedIndex]}</span>
            </button>
            {open && (
                <FloatingPortal>
                    <FloatingOverlay lockScroll={!touch} style={{ zIndex: 1 }}>
                        <FloatingFocusManager context={context} modal={false}>
                            <div
                                ref={refs.setFloating}
                                style={{ ...floatingStyles, outline: '0' }}
                            >
                                <div
                                    className="sd-select"
                                    ref={scrollRef}
                                    {...getFloatingProps({
                                        onScroll({ currentTarget }) {
                                            flushSync(() =>
                                                setScrollTop(
                                                    currentTarget.scrollTop
                                                )
                                            )
                                        },
                                        onContextMenu(e) {
                                            e.preventDefault()
                                        },
                                    })}
                                >
                                    {items.map((item, i) => {
                                        return (
                                            <button
                                                key={item}
                                                // Prevent immediate selection on touch devices when
                                                // pressing the ScrollArrows
                                                disabled={blockSelection}
                                                aria-selected={
                                                    selectedIndex === i
                                                }
                                                role="option"
                                                tabIndex={
                                                    activeIndex === i ? 0 : -1
                                                }
                                                className={clsx(
                                                    'sd-select-item',
                                                    activeIndex === i &&
                                                        'sd-select-active_item',
                                                    i === selectedIndex &&
                                                        'sd-select-selected_item'
                                                )}
                                                ref={(node) => {
                                                    listRef.current[i] = node
                                                    listContentRef.current[i] =
                                                        item
                                                }}
                                                {...getItemProps({
                                                    onTouchStart() {
                                                        allowSelectRef.current =
                                                            true
                                                        allowMouseUpRef.current =
                                                            false
                                                    },
                                                    onKeyDown() {
                                                        allowSelectRef.current =
                                                            true
                                                    },
                                                    onClick() {
                                                        if (
                                                            allowSelectRef.current
                                                        ) {
                                                            onChange?.(i)
                                                            setOpen(false)
                                                        }
                                                    },
                                                    onMouseUp() {
                                                        if (
                                                            !allowMouseUpRef.current
                                                        ) {
                                                            return
                                                        }

                                                        if (
                                                            allowSelectRef.current
                                                        ) {
                                                            onChange?.(i)
                                                            setOpen(false)
                                                        }

                                                        // On touch devices, prevent the element from
                                                        // immediately closing `onClick` by deferring it
                                                        clearTimeout(
                                                            selectTimeoutRef.current
                                                        )
                                                        selectTimeoutRef.current =
                                                            setTimeout(() => {
                                                                allowSelectRef.current =
                                                                    true
                                                            })
                                                    },
                                                })}
                                            >
                                                <span>{item}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                                {(['up', 'down'] as Array<'up' | 'down'>).map(
                                    (dir) => (
                                        <ScrollArrow
                                            key={dir}
                                            dir={dir}
                                            scrollTop={scrollTop}
                                            scrollRef={scrollRef}
                                            innerOffset={innerOffset}
                                            isPositioned={isPositioned}
                                            onScroll={handleArrowScroll}
                                            onHide={handleArrowHide}
                                        />
                                    )
                                )}
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                </FloatingPortal>
            )}
        </>
    )
}
