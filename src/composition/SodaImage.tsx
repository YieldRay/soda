import {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import isFunction from 'lodash-es/isFunction'
import { CircularProgressIndicator } from '../components/progress-indicator/CircularProgressIndicator'
import { SimpleFadeTransition } from './SodaTransition'
import { IconButton } from '../components/icon-button'

export const SodaImage = forwardRef<
    { reload(): void },
    ExtendProps<
        {
            src?: string
            lazy?: boolean
            /**
             * Timeout in ms, default 10,000
             */
            timeout?: number
            placeholder?: React.ReactNode
            description?: React.ReactNode
            customize?: (
                state: 'loading' | 'error' | 'loaded'
            ) => React.ReactNode | undefined
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
        timeout = 10000,
        className,
        placeholder,
        objectFit = 'contain',
        description,
        customize,
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

    const eRef = useRef<HTMLImageElement>(null)
    const timeoutRef = useRef<number | undefined>(undefined)

    useLayoutEffect(() => {
        setState('loading')
        const img = eRef.current!
        img.onload = () => setState('loaded')
        img.onerror = () => setState('error')
        if (lazy) {
            const io = new IntersectionObserver((entries) => {
                const entry = entries[0]
                if (entry.intersectionRatio > 0) {
                    img.src = src!
                    window.clearTimeout(timeoutRef.current)
                    timeoutRef.current = window.setTimeout(() => {
                        img.src = ''
                        setState('error')
                    }, timeout)
                }
            })
            io.observe(img)
            return () => {
                io.unobserve(img)
                window.clearTimeout(timeoutRef.current)
                img.onload = null
                img.onerror = null
            }
        } else {
            img.src = src!
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = window.setTimeout(() => {
                img.src = ''
                setState('error')
            }, timeout)
            return () => {
                window.clearTimeout(timeoutRef.current)
                img.onload = null
                img.onerror = null
            }
        }
    }, [lazy, src, timeout])

    const reload = () => {
        setState('loading')
        const img = eRef.current!
        img.src = ''
        img.src = src!
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
            img.src = ''
            setState('error')
        }, timeout)
    }

    useImperativeHandle(ref, () => ({
        reload,
    }))

    const isImgShow = state === 'loaded'
    const isErrorShow = state === 'error'

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
                alt={alt}
                width={width}
                height={height}
                crossOrigin={crossOrigin}
                referrerPolicy={referrerPolicy}
                loading={lazy ? undefined : 'lazy'}
            />

            {isErrorShow && (
                <div className="sd-image-error">
                    <IconButton onClick={reload} title="reload">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px"
                        >
                            <path d="M21,5V11.59L18,8.58L14,12.59L10,8.59L6,12.59L3,9.58V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5M18,11.42L21,14.43V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V12.42L6,15.41L10,11.41L14,15.41" />
                        </svg>
                    </IconButton>
                </div>
            )}

            {description && (
                <div className="sd-image-scrim">
                    <div className="sd-image-description">{description}</div>
                </div>
            )}

            {isFunction(customize) && (
                <div className="sd-image-customize">{customize(state)}</div>
            )}

            <style jsx global>{`
                .sd-image,
                .sd-image > * {
                    display: inline-block;
                    vertical-align: middle;
                }
                .sd-image {
                    position: relative;
                    overflow: hidden;
                    mix-blend-mode: plus-lighter;
                }
                .sd-image > img {
                    object-fit: contain;
                    box-sizing: border-box;
                    max-width: 100%;
                    max-height: 100%;
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
                    box-sizing: border-box;
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
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    border: solid 1px var(--sd-sys-color-outline);
                    border-radius: 4px;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .sd-image .sd-image-customize {
                    position: absolute;
                    top: 0;
                    left: 0;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    )
})
