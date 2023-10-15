import { Ripple } from '@/utils/Ripple'
import { mdiChevronLeft, mdiChevronRight, mdiMenuDown } from '@mdi/js'
import { IconButton } from '../icon-button/IconButton'
import Icon from '@mdi/react'

export function MenuButton({
    children,
    onLeft,
    onRight,
}: {
    children?: React.ReactNode
    onLeft?(): void
    onRight?(): void
}) {
    return (
        <div className="sd-menu_button-outer">
            <IconButton path={mdiChevronLeft} onClick={onLeft} />
            <Ripple className="sd-menu_button">
                <span>{children}</span>
                <Icon size={1} path={mdiMenuDown}></Icon>
            </Ripple>
            <IconButton path={mdiChevronRight} onClick={onRight} />
            <style jsx global>{`
                .sd-menu_button-outer {
                    display: inline-flex;
                    gap: 0.25rem;
                    align-items: center;
                }
                .sd-menu_button {
                    display: inline-flex;
                    gap: 0.5rem;
                    padding: 0.5rem 0;
                    align-items: center;
                    cursor: pointer;
                    transition: all 200ms;
                    user-select: none;
                }
                .sd-menu_button:hover {
                    background: rgb(0 0 0 / 0.04);
                }
            `}</style>
        </div>
    )
}
