import './list.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple.tsx'
import { ExtendProps, TagNameString } from '@/utils/type.ts'
import { omit } from 'lodash-es'
import { forwardRef } from 'react'

/**
 * `<ListItem>` has `display: inline-block` by default,
 * to make it occupy full width, use `display: block`
 * @specs https://m3.material.io/components/lists/specs
 */
export const ListItem = forwardRef<
    HTMLElement,
    ExtendProps<{
        headline: React.ReactNode
        supportingText?: React.ReactNode
        leadingIcon?: React.ReactNode
        leadingAvatarLabelText?: React.ReactNode
        leadingVideoThubnail?: React.ReactNode
        trailingIcon?: React.ReactNode
        trailingSupportingText?: React.ReactNode
        disabled?: boolean
        /**
         * 1 means only one line of headline and no supporting text
         * 2 means one lines of supporting text
         * 3 means two lines of supporting text
         */
        lines?: 1 | 2 | 3
        as?: TagNameString
    }>
>(function ListItem(props, ref) {
    return (
        <Ripple
            {...omit(props, [
                'className',
                'children',
                'headline',
                'supportingText',
                'leadingIcon',
                'leadingAvatarLabelText',
                'leadingVideoThubnail',
                'trailingIcon',
                'trailingSupportingText',
                'disabled',
                'lines',
            ])}
            ref={ref}
            className={clsx('sd-list', props.className)}
            data-sd-lines={props.lines}
            data-sd-disabled={props.disabled}
        >
            {props.leadingVideoThubnail && (
                <div className="sd-list-leading_video_thubnail">
                    {props.leadingVideoThubnail}
                </div>
            )}
            {props.leadingIcon && (
                <div className="sd-list-leading_icon">{props.leadingIcon}</div>
            )}
            {props.leadingAvatarLabelText && (
                <div className="sd-list-leading_avatar_label_text">
                    {props.leadingAvatarLabelText}
                </div>
            )}

            <div className="sd-list-helper">
                <div className="sd-list-headline">{props.headline}</div>
                {props.supportingText && (
                    <div className="sd-list-supporting_text">
                        {props.supportingText}
                    </div>
                )}
            </div>

            {props.trailingSupportingText && (
                <div className="sd-list-trailing_supporting_text">
                    {props.trailingSupportingText}
                </div>
            )}

            {props.trailingIcon && (
                <div className="sd-list-trailing_icon">
                    {props.trailingIcon}
                </div>
            )}
        </Ripple>
    )
})
