import './Blockquote.scss'
import clsx from 'clsx'
import { forwardRef, useRef, useState } from 'react'
import { mdiClose } from '@mdi/js'
import { Icon } from '@mdi/react'
import { useCollapsible } from '@/hooks/use-collapsible'
import { useMergeRefs } from '@/hooks/use-merge'
import { ExtendProps } from '@/utils/type'
import { IconRippleButton } from './IconRippleButton'

export const Blockquote = forwardRef<
    HTMLQuoteElement,
    ExtendProps<
        {
            variant?: 'tonal' | 'filled' | 'outlined' | 'error'
            /**
             * Path of svg, prefer using `@mdi/js`
             */
            iconPath?: string
            /**
             * Is able to close
             */
            close?: boolean
        },
        HTMLQuoteElement
    >
>(
    (
        {
            variant = 'tonal',
            iconPath,
            close = false,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        const [isClosed, setClosed] = useState(false)

        const collapsibleRef = useRef<HTMLQuoteElement>(null)
        useCollapsible(collapsibleRef, isClosed)

        return (
            <blockquote
                ref={useMergeRefs(ref, collapsibleRef)}
                {...props}
                className={clsx(
                    'sd-blockquote',
                    variant && `sd-blockquote-${variant}`,
                    className,
                )}
            >
                <div className="sd-blockquote_inner">
                    {iconPath && (
                        <div className="sd-blockquote_icon">
                            <Icon size={0.9} path={iconPath} />
                        </div>
                    )}
                    <div className="sd-blockquote_content">{children}</div>
                    {close && (
                        <div className="sd-blockquote_close">
                            <IconRippleButton
                                path={mdiClose}
                                onClick={() => setClosed(true)}
                                size="21px"
                            />
                        </div>
                    )}
                </div>
            </blockquote>
        )
    },
)
