import './Table.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'

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
