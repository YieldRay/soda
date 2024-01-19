import './Select.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import {
    forwardRef,
    useRef,
    useEffect,
    useState,
    useDeferredValue,
} from 'react'
import { Menu, MenuItem } from '../components/menu'
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
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
    offset,
    shift,
    useTransitionStyles,
    Placement,
    useTypeahead,
} from '@floating-ui/react'
import { isFunction } from 'lodash-es'

/**
 * `<Select>` is high level `<Menu>`
 *
 * You should always set `value` or `defaultValue` to an existing option's value,
 * otherwise it will lead to undefined behavior
 */
export const Select = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        value?: string
        /**
         * If you prefer uncontrolled, you MUST set `defaultValue`
         */
        defaultValue?: string
        onChange?: (value: string) => void
        options: Array<{
            value: string
            /**
             * You can omit the label, it will show the `value`
             */
            label?: React.ReactNode
            disabled?: boolean
        }>
        children: React.ReactNode | ((value: string) => React.ReactNode)
        /**
         * The placement of the floating options
         */
        placement?: Placement
        /**
         * Can be used to adjust the position of the floating options
         */
        floatingStyle?: React.CSSProperties
    }>
>(
    (
        {
            value,
            defaultValue,
            onChange,
            options,
            className,
            children,
            placement = 'bottom-start',
            floatingStyle,
            ...props
        },
        ref
    ) => {
        const controlled = value !== undefined
        const [value$, setValue$] = useState(defaultValue)
        const realValue = controlled ? value : value$
        const dispatchChange = (v: string) => {
            onChange?.(v)
            if (!controlled) {
                setValue$(v)
            }
        }

        const realValueDeferred = useDeferredValue(realValue)
        const dispatchChangeDeferred = (v: string) => {
            setTimeout(
                () => requestAnimationFrame(() => dispatchChange(v)),
                200
            )
        }

        // floating-ui
        // based on: https://codesandbox.io/p/sandbox/shy-snowflake-kp6479

        const listRef = useRef<Array<HTMLElement | null>>([])
        const listContentRef = useRef<Array<string | null>>([])
        const overflowRef = useRef<SideObject>(null)
        const allowSelectRef = useRef(false)
        const allowMouseUpRef = useRef(true)
        const selectTimeoutRef = useRef<any>()
        const scrollRef = useRef<HTMLUListElement>(null)

        const [open, setOpen] = useState(false)
        const selectedIndex = options.findIndex(
            ({ value }) => value === realValue
        )
        const [activeIndex, setActiveIndex] = useState<number | null>(null)
        const [fallback, setFallback] = useState(false)
        const [innerOffset, setInnerOffset] = useState(0)
        const [touch, setTouch] = useState(false)
        const [blockSelection, setBlockSelection] = useState(false)

        if (!open) {
            if (innerOffset !== 0) setInnerOffset(0)
            if (fallback) setFallback(false)
            if (blockSelection) setBlockSelection(false)
        }

        const { refs, floatingStyles, context } = useFloating({
            placement,
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
                    onMatch: open
                        ? setActiveIndex
                        : (i) => dispatchChange(options[i].value),
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

        const { styles, isMounted } = useTransitionStyles(context, {
            duration: {
                open: 250,
                close: 200,
            },
            common: {
                transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
            },
            initial: {
                opacity: 0.5,
                clipPath: `inset(${
                    ((selectedIndex + 1) / options.length) * 50
                }% -4px ${
                    ((options.length - selectedIndex - 1) / options.length) * 50
                }% -4px)`,
            },
            open: {
                opacity: 1,
                clipPath: 'inset(-4px -4px -4px -4px)',
            },
            close: {
                opacity: 0,
            },
        })

        const optionMapper: Parameters<
            typeof options.map<React.ReactNode>
        >[0] = ({ value: optionValue, label }, i) => {
            return (
                <MenuItem
                    className={clsx(
                        'sd-select_option',
                        realValueDeferred === optionValue &&
                            'sd-select_option-selected'
                    )}
                    key={optionValue}
                    // Prevent immediate selection on touch devices when
                    // pressing the ScrollArrows
                    disabled={blockSelection}
                    aria-selected={realValue === optionValue}
                    role="option"
                    tabIndex={activeIndex === i ? 0 : -1}
                    ref={(node) => {
                        listRef.current[i] = node
                        listContentRef.current[i] = optionValue
                    }}
                    {...getItemProps({
                        onTouchStart() {
                            allowSelectRef.current = true
                            allowMouseUpRef.current = false
                        },
                        onKeyDown() {
                            allowSelectRef.current = true
                        },
                        onClick() {
                            if (allowSelectRef.current) {
                                dispatchChangeDeferred(optionValue)
                                setOpen(false)
                            }
                        },
                        onMouseUp() {
                            if (!allowMouseUpRef.current) {
                                return
                            }

                            if (allowSelectRef.current) {
                                dispatchChangeDeferred(optionValue)
                                setOpen(false)
                            }

                            // On touch devices, prevent the element from
                            // immediately closing `onClick` by deferring it
                            clearTimeout(selectTimeoutRef.current)
                            selectTimeoutRef.current = setTimeout(() => {
                                allowSelectRef.current = true
                            })
                        },
                    })}
                >
                    {label ?? optionValue}
                </MenuItem>
            )
        }

        const optionsNode = isMounted && (
            <FloatingPortal>
                <FloatingOverlay lockScroll={!touch} style={{ zIndex: 1 }}>
                    <FloatingFocusManager context={context} modal={false}>
                        <div
                            ref={refs.setFloating}
                            style={{
                                ...floatingStyle,
                                ...floatingStyles,
                                ...styles,
                                outline: '0',
                            }}
                        >
                            <Menu
                                className="sd-select_options"
                                ref={scrollRef}
                                {...getFloatingProps({
                                    onContextMenu(e) {
                                        e.preventDefault()
                                    },
                                })}
                            >
                                {options.map(optionMapper)}
                            </Menu>
                        </div>
                    </FloatingFocusManager>
                </FloatingOverlay>
            </FloatingPortal>
        )

        return (
            <div {...props} ref={ref} className={clsx('sd-select', className)}>
                <div
                    ref={refs.setReference}
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
                    {isFunction(children) ? children(realValue!) : children}
                </div>

                {optionsNode}
            </div>
        )
    }
)
