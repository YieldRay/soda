import { forwardRef } from 'react'
import './Skeleton.scss'

/**
 * @experimental
 * Highly experimental!
 */
export const Skeleton = forwardRef<
    HTMLDivElement,
    Partial<React.CSSProperties>
>(({ ...style }, ref) => {
    return <div ref={ref} className="sd-skeleton" style={style} />
})
