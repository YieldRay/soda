import { IconButton } from '@/components/icon-button'
import { Collapsible } from '@/composition/Collapsible'
import clsx from 'clsx'
import { useState } from 'react'

/**
 * This component can be both controlled or uncontrolled depending on the open property.
 */
export function Details({
    summary,
    children,
    open,
    defaultOpen,
    sd: initSd,
    onChange,
    ...props
}: {
    summary: React.ReactNode
    children: React.ReactNode
    /**
     * If any not null value is provided, act as a controlled
     */
    open?: boolean
    /**
     * For uncontrolled use
     * @default false
     */
    defaultOpen?: boolean
    onChange?: (open: boolean) => void
    /**
     * @default filled
     */
    sd?: 'outlined' | 'filled'
}) {
    const sd = initSd || 'filled'
    const iconSd = (
        {
            outlined: 'standard',
            filled: 'tonal',
        } as const
    )[sd]

    const controlled = open !== undefined
    const [stateOpen, setStateOpen] = useState(!!defaultOpen)
    const isOpen = controlled ? open : stateOpen

    return (
        <div {...props} className={clsx('details', sd)}>
            <style jsx>{`
                .details {
                    border-radius: 28px;
                }
                .details.outlined {
                    border: solid 1px var(--sd-sys-color-outline);
                }
                .details.filled {
                    background: var(--sd-sys-color-surface-container-low);
                }
                .summary {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 8px 8px 16px;
                    -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
                }
                .summary.open.outlined {
                    border-bottom: solid 1px var(--sd-sys-color-outline);
                }
                .summary.open.filled {
                }
                .children {
                    margin: 16px;
                }
            `}</style>
            <div
                className={clsx('summary', sd, isOpen && 'open')}
                onClick={() => {
                    if (controlled) {
                        onChange?.(!open)
                    } else {
                        setStateOpen(!stateOpen)
                    }
                }}
            >
                <span>{summary}</span>
                <IconButton sd={iconSd}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{
                            transform: `rotate(${isOpen ? '0' : '180deg'})`,
                            transition: 'all 200ms',
                        }}
                    >
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </IconButton>
            </div>
            <Collapsible open={isOpen}>
                <div className="children">{children}</div>
            </Collapsible>
        </div>
    )
}
