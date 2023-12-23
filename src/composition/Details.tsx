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
    sd?: 'outlined' | 'filled'
}) {
    const sd = initSd || 'filled'
    // icon sd is corresponding to sd
    const iconSd = (
        {
            outlined: 'standard',
            filled: 'tonal',
        } as const
    )[sd]

    const controlled = expanded !== undefined
    const [expanded$, setExpanded$] = useState(!!defaultExpanded)
    const isExpanded = controlled ? expanded : expanded$
    const dispatchChange = () => {
        onChange?.(!expanded)
        if (!controlled) {
            setExpanded$(!expanded$)
        }
    }

    return (
        <div
            {...props}
            className={clsx('sd-details', `sd-details-${sd}`, sd)}
            data-sd-expanded={isExpanded}
        >
            <div className="sd-details_summary" onClick={dispatchChange}>
                <span>{summary}</span>
                <IconButton
                    sd={iconSd}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') dispatchChange()
                    }}
                >
                    <Icon
                        path={mdiChevronDown}
                        size={1}
                        style={{
                            transform: `rotate(${isExpanded ? '180deg' : '0'})`,
                            transition: 'all 200ms',
                        }}
                    />
                </IconButton>
            </div>
            <Collapsible expanded={isExpanded}>
                <div style={{ padding: '16px' }}>{children}</div>
            </Collapsible>
        </div>
    )
}
