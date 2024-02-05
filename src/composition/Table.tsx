import './Table.scss'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * Just a wrapper of `<table class="sd-table">`
 *
 * You may use directly className `sd-table` instead
 */
export const Table = forwardRef<
    HTMLTableElement,
    ExtendProps<{ open?: boolean }>
>(({ className, ...props }, ref) => {
    return (
        <table {...props} ref={ref} className={clsx('sd-table', className)} />
    )
})
