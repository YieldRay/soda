import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * TODO: <Select> is high level <Menu>
 */
export const Select = forwardRef<
    HTMLDivElement,
    ExtendProps<{ open?: boolean }>
>(({ children, className, ...props }, ref) => {
    return (
        <div {...props} ref={ref} className={clsx(className)}>
            {children}
        </div>
    )
})
