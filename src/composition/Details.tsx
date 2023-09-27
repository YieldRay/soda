import { IconButton } from '@/components/icon-button'
import { Collapsible } from '@/composition/Collapsible'
import clsx from 'clsx'

export function Details({
    summary,
    children,
    open,
    onChange,
    sd: initSd,
    ...props
}: {
    summary?: React.ReactNode
    children?: React.ReactNode
    open?: boolean
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

    return (
        <>
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
            <div {...props} className={clsx('details', sd)}>
                <div
                    className={clsx('summary', sd, open && 'open')}
                    onClick={() => onChange?.(!open)}
                >
                    <span>{summary}</span>
                    <IconButton sd={iconSd}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            style={{
                                transform: `rotate(${open ? '0' : '180deg'})`,
                                transition: 'all 200ms',
                            }}
                        >
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </IconButton>
                </div>
                <Collapsible open={!!open}>
                    <div className="children">{children}</div>
                </Collapsible>
            </div>
        </>
    )
}
