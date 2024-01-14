import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { forwardRef } from 'react'

/**
 * Transition works for chrome>=117
 */
export const Scrim = forwardRef<
    HTMLDivElement,
    ExtendProps<{ open?: boolean }>
>(({ open, children, className, ...props }, ref) => {
    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-scrim', open && 'sd-scrim-open', className)}
        >
            <style jsx>{`
            .sd-scrim {
                background: rgb(0 0 0 / 0.1);
                transition-property: opacity, display;
                transition-duration: 200ms;
                transition-behavior: allow-discrete;
                position: fixed;
                inset: 0;
                width: 100%;,
                height: 100%;
                overflow: hidden;
                overscroll-behavior: contain;
            }
            
            .sd-scrim:not(.sd-scrim-open){
                display: none;
                opacity: 0;
                pointer-events: none;
            }
            .sd-scrim-open {
                display: block;
                opacity: 1;
            }
            @starting-style{
                .sd-scrim-open{
                    opacity: 0;
                }
            }
            `}</style>
            {children}
        </div>
    )
})
