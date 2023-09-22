import './tab.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple'
import omit from 'lodash-es/omit'
import { ExtendProps } from '@/utils/type'

/**
 * use `<Tab>` to wrap it
 */
export function TabItem(
    props: Omit<
        ExtendProps<{
            children?: React.ReactNode
            icon?: React.ReactNode
            active?: boolean
        }>,
        'ref'
    >
) {
    return (
        <Ripple
            as="div"
            {...omit(props, 'classNam')}
            className={clsx('sd-tab_item', props.className)}
            data-sd-active={props.active}
        >
            {props.icon && <div className="sd-tab_item-icon">{props.icon}</div>}
            <div className="sd-tab_item-label_text">{props.children}</div>
            <div className="sd-tab_item-active_indicator"></div>
        </Ripple>
    )
}
