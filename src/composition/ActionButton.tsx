import { Ripple } from '@/utils/Ripple'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { ExtendProps, TagNameString } from '@/utils/type'

export function ActionButton(
    props: ExtendProps<{
        inverse?: boolean
        disabled?: boolean
        children?: React.ReactNode
        as?: TagNameString
    }>
) {
    return (
        <>
            <style jsx global>{`
                .sd-action_button {
                    all: unset;
                    display: inline-block;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 4px;
                    padding: 6px 10px;
                    cursor: pointer;
                    user-select: none;
                    transition: all 200ms;
                    -webkit-tap-highlight-color: transparent;
                }
                .sd-action_button[data-sd-inverse='false'] {
                    color: var(--sd-sys-color-primary);
                }
                .sd-action_button[data-sd-inverse='false']:hover {
                    background: rgb(0 0 0 / 0.04);
                }
                .sd-action_button[data-sd-inverse='false']:active {
                    background: rgb(0 0 0 / 0.08);
                }
                .sd-action_button[data-sd-inverse='true'] {
                    color: var(--sd-sys-color-inverse-primary);
                }
                .sd-action_button[data-sd-inverse='true']:hover {
                    background: rgb(255 255 255 / 0.04);
                }
                .sd-action_button[data-sd-inverse='true']:active {
                    background: rgb(255 255 255 / 0.08);
                }
                .sd-action_button[data-sd-disabled='true'] {
                    pointer-events: none;
                    filter: grayscale(98%) opacity(40%);
                }
            `}</style>
            <Ripple
                {...omit(props, ['className', 'inverse', 'disabled'])}
                className={clsx('sd-action_button', props.className)}
                rippleColor={
                    props.inverse
                        ? 'rgb(255 255 255 / 0.1)'
                        : 'rgb(0 0 0 / 0.1)'
                }
                data-sd-inverse={props.inverse ? 'true' : 'false'}
                data-sd-disabled={props.disabled ? 'true' : 'false'}
                as={props.as || 'button'}
            >
                {props.children}
            </Ripple>
        </>
    )
}
