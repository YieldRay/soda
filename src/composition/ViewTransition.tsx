import { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { startViewTransition } from '@/utils/view-transition'
import { ExtendProps, TagNameString } from '@/utils/type'

/**
 * [experimental]: This component can use both ref or props to toggle transition.
 */
export const ViewTransition = forwardRef<
    {
        replace(children: React.ReactNode): void
    },
    ExtendProps<{
        children?: React.ReactNode
        old?: React.ReactNode
        new?: React.ReactNode
        as?: TagNameString
    }>
>(({ old: oldView, new: newView, as, children, ...props }, ref) => {
    const As: any = as || 'div'
    const [view, setView] = useState<React.ReactNode>(children)

    useEffect(() => {
        const setViewTransition = (view: React.ReactNode) =>
            startViewTransition(() => {
                flushSync(() => {
                    setView(view)
                })
            })
        if (oldView && newView) {
            setViewTransition(newView)
        } else if (oldView) {
            setView(oldView)
        } else if (newView) {
            setView(newView)
        }
    }, [oldView, newView])

    useImperativeHandle(ref, () => ({
        replace(next) {
            startViewTransition(() => {
                flushSync(() => {
                    setView(next)
                })
            })
        },
    }))
    return <As {...props}>{view}</As>
})
