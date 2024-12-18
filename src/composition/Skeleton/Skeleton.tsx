import { forwardRef } from 'react'
import './Skeleton.scss'

/**
 * @experimental
 * Highly experimental!
 */
export const Skeleton = forwardRef<
    HTMLDivElement,
    Partial<React.CSSProperties>
>(({ ...style }) => {
    return <div className="sd-skeleton" style={style} />
})
