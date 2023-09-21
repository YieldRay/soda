import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import omit from 'lodash-es/omit'

/**
 * use <Tab> to wrap it
 */
export function TabItem(
    props: {
        children?: React.ReactNode
        icon?: React.ReactNode
        active?: boolean
    } & Omit<React.HTMLProps<HTMLDivElement>, 'ref'>
) {
    return (
        <Ripple
            as="div"
            {...omit(props, 'classNam')}
            className={clsx('sd-tab_item', props.className)}
            data-sd-active={props.active ? 'true' : 'false'}
        >
            {props.icon && <div className="sd-tab_item-icon">{props.icon}</div>}
            <div className="sd-tab_item-label_text">{props.children}</div>
            <div className="sd-tab_item-active_indicator"></div>
        </Ripple>
    )
}
