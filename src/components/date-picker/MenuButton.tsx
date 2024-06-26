import { mdiChevronLeft, mdiChevronRight, mdiMenuDown } from '@mdi/js'
import Icon from '@mdi/react'
import { Ripple } from '@/ripple/Ripple'
import { IconButton } from '../icon-button/IconButton'

export function MenuButton({
    children,
    onLeft,
    onRight,
    onClick,
}: {
    children?: React.ReactNode
    onLeft?(): void
    onRight?(): void
    onClick?(): void
}) {
    return (
        <div className="sd-menu_button-outer">
            <IconButton path={mdiChevronLeft} onClick={onLeft} />
            {children && (
                <Ripple as="div" className="sd-menu_button" onClick={onClick}>
                    <span>{children}</span>
                    <Icon size={1} path={mdiMenuDown} />
                </Ripple>
            )}
            <IconButton path={mdiChevronRight} onClick={onRight} />
            <style jsx global>{`
                .sd-menu_button-outer {
                    display: inline-flex;
                    gap: 0.25rem;
                    align-items: center;
                }
                .sd-menu_button {
                    overflow: hidden;
                    flex-shrink: 1;
                    display: inline-flex;
                    gap: 0.15rem;
                    padding: 0.5rem 0;
                    align-items: center;
                    cursor: pointer;
                    transition: all 200ms;
                    word-break: keep-all;
                    font-size: 14px;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
                }
                @media (any-hover: hover) {
                    .sd-menu_button:hover {
                        background: rgb(0 0 0 / 0.04);
                    }
                }
            `}</style>
        </div>
    )
}
