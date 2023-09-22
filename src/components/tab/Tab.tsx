import './tab.scss'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'

/**
 * You can set its width like `style={{width: "100vw"}}` to occupy more width.
 * Child elements (`<TabItem>`) will divide its width equally.
 */
export function Tab(props: ExtendProps<{ children?: React.ReactNode }>) {
    return (
        <div
            className={clsx('sd-tab', props.className)}
            {...omit(props, 'className')}
        >
            {props.children}
        </div>
    )
}
