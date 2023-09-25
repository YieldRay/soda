import { Ripple } from '@/utils/Ripple'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import omit from 'lodash-es/omit'
import { forwardRef } from 'react'

/**
 * To make a NavigationDrawer, use a `<SideSheet>` to contain `<DrawerItem>`
 */
export const DrawerItem = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        icon?: React.ReactNode
        badge?: React.ReactNode
        children?: React.ReactNode
        enabled?: boolean
    }>
>((props, ref) => (
    <>
        <style jsx>{`
            .container {
                box-sizing: border-box;
                height: 56px;
                padding-left: 16px;
                padding-right: 24px;
                transition: all 200ms;
                display: flex;
                align-items: center;
                color: var(--sd-sys-color-on-surface-variant);
                font-size: small;
                font-weight: 500;
                -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
            }
            .container:hover {
                background: rgb(0 0 0 / 0.04);
            }
            .container:active {
                background: rgb(0 0 0 / 0.08);
            }
            .container.enabled {
                background: var(--sd-sys-color-secondary-container);
            }
            .icon {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
            }
            .label-text {
                text-wrap: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: 16px;
                margin-right: 12px;
            }
            .badge {
                flex-shrink: 0;
                margin-left: auto;
            }
        `}</style>
        <Ripple
            style={{
                borderRadius: '28px',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
        >
            <div
                {...omit(props, 'className')}
                ref={ref}
                className={clsx('container', props.enabled && 'enabled')}
            >
                <div className="icon">{props.icon}</div>
                <div className="label-text">{props.children}</div>
                <div className="badge">{props.badge}</div>
            </div>
        </Ripple>
    </>
))
