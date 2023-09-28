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
    expanded,
    defaultExpanded,
    sd: initSd,
    onChange,
    ...props
}: {
    summary: React.ReactNode
    children: React.ReactNode
    /**
     * If any not null value is provided, act as a controlled
     */
    expanded?: boolean
    /**
     * For uncontrolled use
     * @default false
     */
    defaultExpanded?: boolean
    onChange?: (expanded: boolean) => void
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

    const controlled = expanded !== undefined
    const [stateExpanded, setStateExpanded] = useState(!!defaultExpanded)
    const isExpanded = controlled ? expanded : stateExpanded

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
                .summary.expanded.outlined {
                    border-bottom: solid 1px var(--sd-sys-color-outline);
                }
                .summary.expanded.filled {
                }
                .children {
                    margin: 16px;
                }
            `}</style>
            <div
                className={clsx('summary', sd, isExpanded && 'expanded')}
                onClick={() => {
                    if (controlled) {
                        onChange?.(!expanded)
                    } else {
                        setStateExpanded(!stateExpanded)
                    }
                }}
            >
                <span>{summary}</span>
                <IconButton sd={iconSd}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{
                            transform: `rotate(${isExpanded ? '180deg' : '0'})`,
                            transition: 'all 200ms',
                        }}
                    >
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </IconButton>
            </div>
            <Collapsible expanded={isExpanded}>
                <div className="children">{children}</div>
            </Collapsible>
        </div>
    )
}
