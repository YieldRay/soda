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
    label?: React.ReactNode
    nested?: boolean
    children?: React.ReactNode
    defaultOpen?: boolean
}

/**
 * for internal use
 */
const NestedMenuComponent = React.forwardRef<
    HTMLElement,
    ExtendProps<NestedMenuProps>
>(({ children, label, defaultOpen, ...props }, forwardedRef) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen ? true : false)
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

    const elementsRef = React.useRef<Array<HTMLElement | null>>([])
    const labelsRef = React.useRef<Array<string | null>>([])
    const parent = React.useContext(NestedMenuContext)

    const tree = useFloatingTree()
    const nodeId = useFloatingNodeId()
    const parentId = useFloatingParentNodeId()
    const item = useListItem()

    const isNested = parentId != null

    const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
        nodeId,
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: isNested ? 'right-start' : 'bottom-start',
        middleware: [
            offset({
                mainAxis: isNested ? 0 : 4,
                alignmentAxis: isNested ? -4 : 0,
            }),
            flip(),
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

        function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
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

    const Container: any = isNested ? Soda.MenuItem : 'div'

    return (
        <FloatingNode id={nodeId}>
            <Container
                ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                tabIndex={
                    !isNested
                        ? undefined
                        : parent.activeIndex === item.index
                        ? 0
                        : -1
                }
                {...getReferenceProps(parent.getItemProps({ ...props }))}
                trailingIcon={isNested ? <IconMenuRight /> : undefined}
                style={isNested ? undefined : { display: 'inline-block' }}
            >
                {label}
            </Container>
            <NestedMenuContext.Provider
                value={{
                    activeIndex,
                    setActiveIndex,
                    getItemProps,
                    isOpen,
                }}
            >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
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
})

/**
 * The root menu must has a label property, which will toggle the whole menu
 * any sub menu in it will automatically become a `MenuItem`
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
