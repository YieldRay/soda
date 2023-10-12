//TODO

import { Portal } from '@/utils/Portal'

export function SnakerbarHolder({
    children,
    teleportTo,
}: {
    children?: React.ReactNode
    teleportTo?: Element | DocumentFragment
}) {
    return (
        <Portal container={teleportTo}>
            <style jsx>{`
                .sd-snakebar-holder {
                }
            `}</style>
            <div className="sd-snakebar-holder">{children}</div>
        </Portal>
    )
}
