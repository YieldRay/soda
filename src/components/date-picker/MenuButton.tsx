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
        <div className="sd-date_picker-menu_button">
            <IconButton path={mdiChevronLeft} onClick={onLeft} />
            {children && (
                <Ripple
                    as="div"
                    onClick={onClick}
                    className="sd-date_picker-menu_button_label"
                >
                    <span>{children}</span>
                    <Icon size={1} path={mdiMenuDown} />
                </Ripple>
            )}
            <IconButton path={mdiChevronRight} onClick={onRight} />
        </div>
    )
}
