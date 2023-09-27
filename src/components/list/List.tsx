import './list.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple.tsx'
import { ExtendProps, TagNameString } from '@/utils/type.ts'
import { omit } from 'lodash-es'
import { forwardRef } from 'react'

/**
 * @specs https://m3.material.io/components/lists/specs
 */
export const List = forwardRef<
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
>(function List(
    {
        className,
        headline,
        supportingText,
        leadingIcon,
        leadingAvatarLabelText,
        leadingVideoThubnail,
        trailingIcon,
        trailingSupportingText,
        disabled,
        lines,
        ...props
    },
    ref
) {
    return (
        <Ripple
            {...omit(props, ['children'])}
            ref={ref}
            className={clsx('sd-list', className)}
            data-sd-lines={lines}
            data-sd-disabled={disabled}
        >
            {leadingVideoThubnail && (
                <div className="sd-list-leading_video_thubnail">
                    {leadingVideoThubnail}
                </div>
            )}
            {leadingIcon && (
                <div className="sd-list-leading_icon">{leadingIcon}</div>
            )}
            {leadingAvatarLabelText && (
                <div className="sd-list-leading_avatar_label_text">
                    {leadingAvatarLabelText}
                </div>
            )}

            <div className="sd-list-helper">
                <div className="sd-list-headline">{headline}</div>
                {supportingText && (
                    <div className="sd-list-supporting_text">
                        {supportingText}
                    </div>
                )}
            </div>

            {trailingSupportingText && (
                <div className="sd-list-trailing_supporting_text">
                    {trailingSupportingText}
                </div>
            )}

            {trailingIcon && (
                <div className="sd-list-trailing_icon">{trailingIcon}</div>
            )}
        </Ripple>
    )
})
