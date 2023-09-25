import './tab.scss'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * You can set its width like `style={{width: "100vw"}}` to occupy more width.
 * Child elements (`<TabItem>`) will divide its width equally.
 */
export const Tab = forwardRef<
    HTMLDivElement,
    ExtendProps<{ children?: React.ReactNode }>
>(function Tab(props, ref) {
    return (
        <div
            {...omit(props, 'className')}
            ref={ref}
            className={clsx('sd-tab', props.className)}
        >
            {props.children}
        </div>
    )
})
