import { IconButton } from '@/components/icon-button'
import { Collapsible } from '@/headless'
import clsx from 'clsx'

export function Details(props: {
    summary?: React.ReactNode
    children?: React.ReactNode
    open?: boolean
    onChange?: (open: boolean) => void
    sd?: 'outlined' | 'filled'
}) {
    const sd = props.sd ?? 'filled'
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
            <div className={clsx('details', sd)}>
                <div
                    className={clsx('summary', sd, props.open && 'open')}
                    onClick={() => props.onChange?.(!props.open)}
                >
                    <span>{props.summary}</span>
                    <IconButton
                        sd={
                            { outlined: 'standard', filled: 'tonal' }[sd] as any
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            style={{
                                transform: `rotate(${
                                    props.open ? '0' : '180deg'
                                })`,
                                transition: 'all 200ms',
                            }}
                        >
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </IconButton>
                </div>
                <Collapsible open={!!props.open}>
                    <div className="children">{props.children}</div>
                </Collapsible>
            </div>
        </>
    )
}
