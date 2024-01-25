import './Details.scss'
import clsx from 'clsx'
import Icon from '@mdi/react'
import { useRef } from 'react'
import { IconButton } from '@/components/icon-button'
import { useAutoState } from '@/hooks/use-auto-state'
import { mdiChevronDown } from '@mdi/js'
import { useCollapsible } from '@/hooks/use-collapsible'

/**
 * This component can be both controlled or uncontrolled depending on the open property.
 */
export function Details({
    variant = 'filled',
    summary,
    expanded: expanded$co,
    defaultExpanded = false,
    onChange,
    children,
    ...props
}: {
    summary: React.ReactNode
    children: React.ReactNode
    /**
     * If any none-null value is provided, act as a controlled
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
    variant?: 'outlined' | 'filled'
}) {
    // variant of icon is corresponding to variant
    const iconVariant = (
        {
            outlined: 'standard',
            filled: 'tonal',
        } as const
    )[variant]

    const [expanded, setExpanded] = useAutoState(
        onChange,
        expanded$co,
        defaultExpanded
    )

    const collapsibleRef = useRef<HTMLDivElement>(null)
    useCollapsible(collapsibleRef, !expanded)

    return (
        <div
            {...props}
            className={clsx('sd-details', `sd-details-${variant}`, variant)}
            data-sd-expanded={expanded}
        >
            <div
                className="sd-details_summary"
                onClick={() => setExpanded(!expanded)}
            >
                <span>{summary}</span>
                <IconButton
                    variant={iconVariant}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setExpanded(!expanded)
                        }
                    }}
                >
                    <Icon
                        path={mdiChevronDown}
                        size={1}
                        style={{
                            transform: `rotate(${expanded ? '180deg' : '0'})`,
                            transition: 'all 200ms',
                        }}
                    />
                </IconButton>
            </div>

            <div className="sd-details_collapsible" ref={collapsibleRef}>
                <div style={{ padding: '1rem' }}>{children}</div>
            </div>
        </div>
    )
}
