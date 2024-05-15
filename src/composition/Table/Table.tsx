import './Table.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

/**
 * This is simply a wrapper for `<table class="sd-table">`.
 *
 * Alternatively, you can directly use the `sd-table` class name.
 */
export const Table = forwardRef<
    HTMLTableElement,
    ExtendProps<{ open?: boolean }>
>(({ className, ...props }, ref) => {
    return (
        <table {...props} ref={ref} className={clsx('sd-table', className)} />
    )
})
