import './Select.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef, useRef, useState, useDeferredValue } from 'react'
import { Menu, MenuItem } from '@/components/menu'
import {
    useFloating,
    flip,
    size,
    autoUpdate,
    SideObject,
    useInteractions,
    inner,
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
} from '@floating-ui/react'
import { isFunction } from 'lodash-es'
import { Ripple } from '@/ripple/Ripple'
import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js'
import { useAutoState } from '@/hooks/use-auto-state'

/**
 * `<Select>` is high level `<Menu>`
 *
 * You MUST either set `value` or `defaultValue` to an existing `options`'s `value`,
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
        /**
         * Make sure each value is UNIQUE
         */
        options: Array<{
            value: string
            /**
             * You can omit the label, it will show the `value`
             */
            label?: React.ReactNode
            disabled?: boolean
        }>
        /**
         * Customize select behavior
         */
        children?: React.ReactNode | ((value: string) => React.ReactNode)
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
            value: value$co,
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
        const [value, setValue] = useAutoState(
            onChange,
            value$co,
            defaultValue!
        )

        const valueDeferred = useDeferredValue(value)
        const dispatchChangeDeferred = (v: string) => {
            setTimeout(() => setValue(v), 200)
        }

        // floating-ui
        // based on: https://codesandbox.io/p/sandbox/shy-snowflake-kp6479

        const listRef = useRef<Array<HTMLElement | null>>([])
        const overflowRef = useRef<SideObject>(null)
        const scrollRef = useRef<HTMLUListElement>(null)

        const [open, setOpen] = useState(false)
        const selectedIndex = options.findIndex(
            ({ value: optionValue }) => optionValue === value
        )
        const [activeIndex, setActiveIndex] = useState<number | null>(null)
        const fallbackRef = useRef(false)
        if (!open) fallbackRef.current = false
        const touch = 'ontouchstart' in document.documentElement

        const { refs, floatingStyles, context } = useFloating({
            placement,
            open,
            onOpenChange: setOpen,
            whileElementsMounted: autoUpdate,
            transform: false,
            middleware: fallbackRef.current
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
                          offset: 0,
                          onFallbackChange: (fallback) =>
                              (fallbackRef.current = fallback),
                          padding: 10,
                          minItemsVisible: touch ? 8 : 4,
                          referenceOverflowThreshold: 20,
                      }),
                      offset({ crossAxis: -4 }),
                  ],
        })

        const { getReferenceProps, getFloatingProps, getItemProps } =
            useInteractions([
                useClick(context),
                useDismiss(context),
                useRole(context, { role: 'listbox' }),
                useListNavigation(context, {
                    listRef,
                    activeIndex,
                    selectedIndex,
                    onNavigate: setActiveIndex,
                }),
            ])

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
                        valueDeferred === optionValue &&
                            'sd-select_option-selected'
                    )}
                    key={optionValue}
                    aria-selected={value === optionValue}
                    role="option"
                    tabIndex={activeIndex === i ? 0 : -1}
                    ref={(node) => {
                        listRef.current[i] = node
                    }}
                    {...getItemProps({
                        onClick() {
                            dispatchChangeDeferred(optionValue)
                            setOpen(false)
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
                                outline: '0',
                                ...floatingStyle,
                                ...floatingStyles,
                                ...styles,
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
                <div ref={refs.setReference} {...getReferenceProps()}>
                    {isFunction(children)
                        ? children(value!)
                        : children ?? (
                              <Ripple className="sd-select-menu_button">
                                  <div className="sd-select-menu_button-label">
                                      <span>
                                          {options[selectedIndex].label ??
                                              value}
                                      </span>
                                      <Icon size={1} path={mdiMenuDown}></Icon>
                                  </div>
                              </Ripple>
                          )}
                </div>
                {optionsNode}
            </div>
        )
    }
)
