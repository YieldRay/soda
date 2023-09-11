import clsx from 'clsx'
import { ripple } from '../utils/ripple'
import { useRef, useEffect } from 'react'

// @specs https://m3.material.io/components/lists/specs
export function ListItem(props: {
    headline: React.ReactNode
    supportingText?: React.ReactNode
    trailingSupportingText?: React.ReactNode
    trailingIcon?: React.ReactNode
    leadingAvatarLabelText?: React.ReactNode
    leadingIcon?: React.ReactNode
    leadingVideoThubnail?: React.ReactNode
    disabled?: boolean
    /**
     * 1 means only one line of headline and no supporting text
     * 2 means one lines of supporting text
     * 3 means three lines of supporting text
     */
    lines?: 1 | 2 | 3
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        return ripple(ref.current!)
    })

    return (
        <div
            {...props}
            className={clsx('sd-list', props.className)}
            data-sd-lines={props.lines}
            ref={ref}
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
        </div>
    )
}
