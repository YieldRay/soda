import * as Soda from '@/components/menu'
import { IconMenuRight } from '@/utils/icons'
import { ExtendProps } from '@/utils/type'

import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListItem,
    useListNavigation,
    useMergeRefs,
    useRole,
    useTypeahead,
} from '@floating-ui/react'
import assign from 'lodash-es/assign'
import * as React from 'react'

const NestedMenuContext = React.createContext<{
    getItemProps: (
        userProps?: React.HTMLProps<HTMLElement>
    ) => Record<string, unknown>
    activeIndex: number | null
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
    isOpen: boolean
}>({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    isOpen: false,
})

export interface NestedMenuProps extends Soda.Props {
    /**
     * Provide a ReactNode to toggle the menu.
     * Context menu should not provide this property
     */
    label?: React.ReactNode
    /**
     * Do not need to specify this property in the most cases
     */
    nested?: boolean
    children?: React.ReactNode
    defaultOpen?: boolean
    /**
     * If set to true, the component can be a context menu (right click the document to show)
     */
    contextMenu?: boolean
    /**
     * Which element to trigger the context menu, e.g.
     * `contextMenuSource.addEventListener('contextmenu', onContextMenu)`
     * @default document
     */
    contextMenuSource?: HTMLElement
}

/**
 * for internal use
 */
const NestedMenuComponent = React.forwardRef<
    HTMLElement,
    ExtendProps<NestedMenuProps>
>(
    (
        {
            children,
            label,
            defaultOpen,
            contextMenu,
            contextMenuSource = document,
            ...props
        },
        forwardedRef
    ) => {
        const [isOpen, setIsOpen] = React.useState(defaultOpen ? true : false)
        const [activeIndex, setActiveIndex] = React.useState<number | null>(
            null
        )

        const elementsRef = React.useRef<Array<HTMLElement | null>>([])
        const labelsRef = React.useRef<Array<string | null>>([])
        const parent = React.useContext(NestedMenuContext)

        const tree = useFloatingTree()
        const nodeId = useFloatingNodeId()
        const parentId = useFloatingParentNodeId()
        const item = useListItem()

        const isNested = parentId != null

        const { floatingStyles, refs, context } =
            useFloating<HTMLButtonElement>({
                nodeId,
                open: isOpen,
                onOpenChange: setIsOpen,
                placement: isNested ? 'right-start' : 'bottom-start',
                middleware: [
                    offset({
                        mainAxis: isNested ? 0 : 4,
                        alignmentAxis: isNested ? -4 : 0,
                    }),
                    flip({ fallbackPlacements: ['left-start'] }),
                    shift(),
                ],
                whileElementsMounted: autoUpdate,
            })

        const hover = useHover(context, {
            enabled: isNested,
            delay: { open: 75 },
            handleClose: safePolygon({ blockPointerEvents: true }),
        })
        const click = useClick(context, {
            event: 'mousedown',
            toggle: !isNested,
            ignoreMouse: isNested,
        })
        const role = useRole(context, { role: 'menu' })
        const dismiss = useDismiss(context, { bubbles: true })
        const listNavigation = useListNavigation(context, {
            listRef: elementsRef,
            activeIndex,
            nested: isNested,
            onNavigate: setActiveIndex,
        })
        const typeahead = useTypeahead(context, {
            listRef: labelsRef,
            onMatch: isOpen ? setActiveIndex : undefined,
            activeIndex,
        })

        const { getReferenceProps, getFloatingProps, getItemProps } =
            useInteractions([
                hover,
                click,
                role,
                dismiss,
                listNavigation,
                typeahead,
            ])

        // Event emitter allows you to communicate across tree components.
        // This effect closes all menus when an item gets clicked anywhere
        // in the tree.
        React.useEffect(() => {
            if (!tree) return

            function handleTreeClick() {
                setIsOpen(false)
            }

            function onSubMenuOpen(event: {
                nodeId: string
                parentId: string
            }) {
                if (event.nodeId !== nodeId && event.parentId === parentId) {
                    setIsOpen(false)
                }
            }

            tree.events.on('click', handleTreeClick)
            tree.events.on('menuopen', onSubMenuOpen)

            return () => {
                tree.events.off('click', handleTreeClick)
                tree.events.off('menuopen', onSubMenuOpen)
            }
        }, [tree, nodeId, parentId])

        React.useEffect(() => {
            if (isOpen && tree) {
                tree.events.emit('menuopen', { parentId, nodeId })
            }
        }, [tree, isOpen, nodeId, parentId])

        // for context menu
        const allowMouseUpCloseRef = React.useRef(false)
        React.useEffect(() => {
            if (!contextMenu) return
            const source = contextMenuSource // just an alias
            let timeout: number

            const onContextMenu = ((e: MouseEvent) => {
                e.preventDefault()

                refs.setPositionReference({
                    getBoundingClientRect() {
                        return {
                            width: 0,
                            height: 0,
                            x: e.clientX,
                            y: e.clientY,
                            top: e.clientY,
                            right: e.clientX,
                            bottom: e.clientY,
                            left: e.clientX,
                        }
                    },
                })

                setIsOpen(true)
                clearTimeout(timeout)

                allowMouseUpCloseRef.current = false
                timeout = window.setTimeout(() => {
                    allowMouseUpCloseRef.current = true
                }, 300)
            }) as EventListenerOrEventListenerObject

            // const onMouseUp = () => {
            //     if (allowMouseUpCloseRef.current) {
            //         setIsOpen(false)
            //     }
            // }

            source.addEventListener('contextmenu', onContextMenu)
            // source.addEventListener('mouseup', onMouseUp)
            return () => {
                source.removeEventListener('contextmenu', onContextMenu)
                // source.removeEventListener('mouseup', onMouseUp)
                clearTimeout(timeout)
            }
        }, [refs, contextMenu, contextMenuSource])

        const nested = (
            <Soda.MenuItem
                ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                tabIndex={parent.activeIndex === item.index ? 0 : -1}
                {...getReferenceProps(parent.getItemProps({ ...props }))}
                trailingIcon={<IconMenuRight />}
            >
                {label}
            </Soda.MenuItem>
        )

        const notNested = (
            <div
                aria-haspopup
                ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                {...getReferenceProps(parent.getItemProps({ ...props }))}
                style={assign({ display: 'inline-block' }, props.style)}
            >
                {label}
            </div>
        )

        return (
            <FloatingNode id={nodeId}>
                {isNested ? nested : notNested}

                <NestedMenuContext.Provider
                    value={{
                        activeIndex,
                        setActiveIndex,
                        getItemProps,
                        isOpen,
                    }}
                >
                    <FloatingList
                        elementsRef={elementsRef}
                        labelsRef={labelsRef}
                    >
                        {isOpen && (
                            <FloatingPortal>
                                <FloatingFocusManager
                                    context={context}
                                    modal={false}
                                    initialFocus={isNested ? -1 : 0}
                                    returnFocus={!isNested}
                                >
                                    <Soda.Menu
                                        ref={refs.setFloating}
                                        style={floatingStyles}
                                        {...getFloatingProps()}
                                    >
                                        {children}
                                    </Soda.Menu>
                                </FloatingFocusManager>
                            </FloatingPortal>
                        )}
                    </FloatingList>
                </NestedMenuContext.Provider>
            </FloatingNode>
        )
    }
)

/**
 * If contextMenu property is not provided,
 * the root menu must has a label property, which will toggle the whole menu,
 * any sub menu in it will automatically become a `<MenuItem>`.
 *
 * These two components add logic to `<Menu>` `<MenuItem>` components.
 * Refer relative components documentd to see how to use.
 *
 * Based on floating-ui, supports keyboard navigation.
 */
export const NestedMenu = React.forwardRef<
    HTMLElement,
    ExtendProps<NestedMenuProps>
>((props, ref) => {
    const parentId = useFloatingParentNodeId()

    if (parentId === null) {
        return (
            <FloatingTree>
                <NestedMenuComponent {...props} ref={ref} />
            </FloatingTree>
        )
    }

    return <NestedMenuComponent {...props} ref={ref} />
})

export const NestedMenuItem = React.forwardRef<
    HTMLElement,
    Soda.Props & React.HTMLAttributes<HTMLElement>
>(({ children, disabled, ...props }, forwardedRef) => {
    const menu = React.useContext(NestedMenuContext)
    const item = useListItem()
    const tree = useFloatingTree()
    const isActive = item.index === menu.activeIndex

    return (
        <Soda.MenuItem
            {...props}
            ref={useMergeRefs([item.ref, forwardedRef])}
            type="button"
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            {...menu.getItemProps({
                onClick(event: React.MouseEvent<HTMLButtonElement>) {
                    props.onClick?.(event)
                    tree?.events.emit('click')
                },
            })}
        >
            {children}
        </Soda.MenuItem>
    )
})
