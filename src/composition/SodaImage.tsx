import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { CircularProgressIndicator } from '../components/progress-indicator/CircularProgressIndicator'
import { SimpleFadeTransition } from './SodaTransition'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'

export const SodaImage = forwardRef<
    { reload(): void },
    ExtendProps<
        {
            src?: string
            lazy?: boolean
            placeholder?: React.ReactNode
            description?: React.ReactNode
            error?: React.ReactNode
            objectFit?: React.CSSProperties['objectFit']
            alt?: HTMLImageElement['alt']
            crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
            referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
        },
        HTMLDivElement
    >
>(function SodaImage(
    {
        src,
        width,
        height,
        className,
        placeholder,
        objectFit = 'contain',
        description,
        error,
        lazy = false,
        alt,
        crossOrigin,
        referrerPolicy,
        ...props
    },
    ref
) {
    const [state, setState] = useState<'loading' | 'error' | 'loaded'>(
        'loading'
    )
    const [inview, setInview] = useState(!lazy)

    const eRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        setState('loading')
    }, [src])

    useLayoutEffect(() => {
        const img = eRef.current!
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

    useImperativeHandle(ref, () => ({
        reload() {
            setState('loading')
            const img = eRef.current!
            const src = img.src
            img.src = undefined as any
            img.src = src
        },
    }))

    const isImgShow =
        state === 'loaded' || (state === 'error' && error == undefined)

    return (
        <div className={clsx('sd-image', className)} {...props}>
            <SimpleFadeTransition
                className="sd-image-placeholder"
                state={state === 'loading'}
            >
                {placeholder ?? <CircularProgressIndicator />}
            </SimpleFadeTransition>

            <img
                ref={eRef}
                style={{
                    opacity: isImgShow ? '1' : '0',
                    pointerEvents: isImgShow ? undefined : 'none',
                    userSelect: isImgShow ? undefined : 'none',
                    objectFit,
                }}
                src={inview ? src : undefined}
                alt={alt}
                width={width}
                height={height}
                crossOrigin={crossOrigin}
                referrerPolicy={referrerPolicy}
                loading={lazy ? undefined : 'lazy'}
            />

            {error && (
                <SimpleFadeTransition
                    className="sd-image-error"
                    state={state === 'error'}
                >
                    {error}
                </SimpleFadeTransition>
            )}

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
                    max-width: 100%;
                    max-height: 100%;
                }
                .sd-image {
                    position: relative;
                    overflow: hidden;
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
                .sd-image .sd-image-error {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    )
})
