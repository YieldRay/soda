import './Details.scss'
import { IconButton } from '@/components/icon-button'
import { Collapsible } from '@/composition/Collapsible'
import { mdiChevronDown } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useState } from 'react'

/**
 * This component can be both controlled or uncontrolled depending on the open property.
 */
export function Details({
    variant = 'filled',
    summary,
    expanded: expanded$co,
    defaultExpanded,
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

    const controlled = expanded$co !== undefined
    const [expanded$un, setExpanded$un] = useState(!!defaultExpanded)
    const expanded = controlled ? expanded$co : expanded$un
    const dispatchChange = () => {
        onChange?.(!expanded)
        if (!controlled) {
            setExpanded$un(!expanded$un)
        }
    }

    return (
        <div
            {...props}
            className={clsx('sd-details', `sd-details-${variant}`, variant)}
            data-sd-expanded={expanded}
        >
            <div className="sd-details_summary" onClick={dispatchChange}>
                <span>{summary}</span>
                <IconButton
                    variant={iconVariant}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') dispatchChange()
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
            <Collapsible expanded={expanded}>
                <div style={{ padding: '16px' }}>{children}</div>
            </Collapsible>
        </div>
    )
}
