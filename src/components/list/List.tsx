import './list.scss'
import clsx from 'clsx'
import { ExtendProps, TagNameString } from '@/utils/type.ts'
import { omit } from 'lodash-es'
import { forwardRef } from 'react'
import { useRippleRef } from '@/ripple/hooks'
import { useMergeRefs } from '@/hooks/use-merge'

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
        leadingVideoThumbnail?: React.ReactNode
        trailingIcon?: React.ReactNode
        trailingSupportingText?: React.ReactNode
        /**
         * 1 means only one line of headline and no supporting text
         * 2 means one lines of supporting text
         * 3 means two lines of supporting text
         */
        lines?: 1 | 2 | 3
        /**
         * Shortcut for `style={{ width: "100%" }}`, as `<List>` is inline-block
         */
        full?: boolean
        disabled?: boolean
        /**
         * HTML tag name, div by default
         */
        as?: TagNameString
    }>
>(function List(
    {
        className,
        headline,
        supportingText,
        leadingIcon,
        leadingAvatarLabelText,
        leadingVideoThumbnail,
        trailingIcon,
        trailingSupportingText,
        disabled,
        full,
        as,
        lines,
        ...props
    },
    ref
) {
    const As: any = as || 'div'
    return (
        <As
            {...omit(props, ['children'])}
            ref={useMergeRefs(ref, useRippleRef())}
            style={{ ...props.style, width: full ? '100%' : undefined }}
            className={clsx('sd-list', className)}
            data-sd-lines={lines}
            data-sd-disabled={disabled}
        >
            {leadingVideoThumbnail && (
                <div className="sd-list-leading_video_thumbnail">
                    {leadingVideoThumbnail}
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
        </As>
    )
})
