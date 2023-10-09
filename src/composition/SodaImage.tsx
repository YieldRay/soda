import { ExtendProps } from '@/utils/type'
import assign from 'lodash-es/assign'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CircularProgressIndicator } from '..'
import { SimpleFadeTransition } from './SodaTransition'

export function SodaImage({
    src,
    style,
    placeholder,
    objectFit = 'contain',
    description,
    lazy = false,
    ...props
}: ExtendProps<
    {
        lazy?: boolean
        placeholder?: React.ReactNode
        description?: React.ReactNode
        objectFit?: React.CSSProperties['objectFit']
    },
    HTMLImageElement
>) {
    const [state, setState] = useState<'loading' | 'error' | 'loaded'>(
        'loading'
    )
    const [inview, setInview] = useState(!lazy)

    const ref = useRef<HTMLImageElement>(null)

    useEffect(() => {
        setState('loading')
    }, [src])

    useLayoutEffect(() => {
        const img = ref.current!
        img.onload = () => setState('loaded')
        img.onerror = () => setState('error')
        if (lazy) {
            const io = new IntersectionObserver((entries) => {
                const entry = entries[0]
                setInview(entry.intersectionRatio > 0)
            })
            io.observe(img)
            return () => io.unobserve(img)
        }
    }, [src, lazy])

    return (
        <div className="sd-image">
            <SimpleFadeTransition
                className="sd-image-placeholder"
                state={state === 'loading'}
            >
                {placeholder ?? <CircularProgressIndicator />}
            </SimpleFadeTransition>

            <img
                ref={ref}
                style={assign(
                    {
                        opacity: state === 'loaded' ? '1' : '0',
                        pointerEvents: state === 'loaded' ? '' : 'none',
                    },
                    style,
                    { objectFit }
                )}
                src={inview ? src : undefined}
                {...props}
            />
            {description && (
                <div className="sd-image-scrim">
                    <div className="sd-image-description">{description}</div>
                </div>
            )}

            <style jsx global>{`
                .sd-image,
                .sd-image > * {
                    display: inline-block;
                    vertical-align: middle;
                }
                .sd-image {
                    position: relative;
                    mix-blend-mode: plus-lighter;
                }
                .sd-image > img {
                    object-fit: contain;
                }
                .sd-image > img {
                    object-fit: contain;
                }
                .sd-image > img,
                .sd-image .sd-image-placeholder {
                    transition: all 300ms;
                }
                .sd-image .sd-image-placeholder {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .sd-image .sd-image-scrim {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        to bottom,
                        rgb(0 0 0 / 0.01),
                        rgb(0 0 0 / 0.01) 80%,
                        rgb(0 0 0 / 0.2)
                    );
                    color: #fff;
                    overflow: hidden;
                    pointer-events: none;
                    user-select: none;
                }
                .sd-image .sd-image-description {
                    position: absolute;
                    bottom: clamp(5%, 1rem, 15%);
                    left: 50%;
                    transform: translate(-50%);
                }
            `}</style>
        </div>
    )
}
