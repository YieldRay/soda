import './SodaImage.scss'
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { mdiImageBrokenVariant } from '@mdi/js'
import { IconButton } from '@/components/icon-button'
import { CircularProgressIndicator } from '@/components/progress-indicator/CircularProgressIndicator'
import { SodaSimpleTransition } from '@/composition/SodaTransition'
import isNumber from 'lodash-es/isNumber'

/**
 * A high-level image component, supports loading progress (when `crossOrigin` is specified),
 * timeout with default reload button, lazy load, and so on.
 *
 * When use this component, explicit set the width and height (or min-height/min-width) is recommended,
 * otherwise the loading placeholder cannot be rendered as width and height is zero by default.
 */
export const SodaImage = forwardRef<
    { reload(): void },
    ExtendProps<
        {
            src?: string
            /**
             * This prevent the image to load until the image get into the viewport
             */
            lazy?: boolean
            /**
             * Timeout in ms, default 10,000
             */
            timeout?: number
            /**
             * Placeholder when the image is loading, by default use `<CircularProgressIndicator/>`
             */
            placeholder?: React.ReactNode
            /**
             * Description string
             */
            description?: React.ReactNode
            /**
             * Adjust the image's object-fit
             */
            objectFit?: React.CSSProperties['objectFit']
            /**
             * Adjust the image's aspect-ratio
             */
            aspectRatio?: React.CSSProperties['aspectRatio']
            /**
             * Alt attribute for the image itself
             */
            alt?: HTMLImageElement['alt']
            /**
             * Send CORS request to fetch the image, this allow us to known how much we have downloaded
             * so we can display a concrete value in the placeholder of `<CircularProgressIndicator/>`
             */
            crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
            referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
            /**
             * Cache property for fetch, works when `crossOrigin` is specified
             */
            cache?: RequestCache
            width?: string | number
            height?: string | number
            minWidth?: string | number
            minHeight?: string | number
            /**
             * Can be used to customize behavior based on state
             */
            children?:
                | ((
                      state: 'lazy' | 'loading' | 'error' | 'loaded'
                  ) => React.ReactNode)
                | React.ReactNode
        },
        HTMLDivElement
    >
>(function SodaImage(
    {
        src = '', // make sure src is string, not undefined
        width,
        height,
        minWidth,
        minHeight,
        timeout = 30 * 1000,
        className,
        placeholder,
        objectFit = 'contain',
        aspectRatio,
        description,
        lazy = false,
        alt,
        crossOrigin,
        referrerPolicy,
        cache,
        children,
        ...props
    },
    ref
) {
    const [state, setState] = useState<'lazy' | 'loading' | 'error' | 'loaded'>(
        'loading'
    )
    const eRef = useRef<HTMLImageElement>(null)
    const timeoutRef = useRef<number | undefined>(undefined)
    const [loadPercentage, setLoadPercentage] = useState<number | undefined>(
        undefined
    )
    const hasIntoView = useRef(false)

    const clearEffect = () => {
        const img = eRef.current!
        // clear last effect
        window.clearTimeout(timeoutRef.current)
        img.onload = null
        img.onerror = null
        URL.revokeObjectURL(img.src)
    }

    const load = useCallback(async () => {
        setState('loading')
        clearEffect()
        const img = eRef.current!
        // start to load
        if (crossOrigin) {
            // crossOrigin, manually use fetch() to download image
            try {
                const res = await fetch(src!, {
                    credentials:
                        crossOrigin === 'use-credentials'
                            ? 'include'
                            : 'same-origin',
                    referrerPolicy,
                    signal: timeout ? AbortSignal.timeout(timeout) : undefined,
                    cache,
                })
                if (!res.body) {
                    setState('error')
                    return
                }
                const contentLength = Number.parseInt(
                    res.headers.get('content-length')!
                )
                if (contentLength) {
                    // content-length is provided
                    let receivedLength = 0
                    const chunks = []
                    const reader = res.body.getReader()
                    for (;;) {
                        const { done, value } = await reader.read()
                        if (done) break
                        chunks.push(value)
                        receivedLength += value.length
                        setLoadPercentage(receivedLength / contentLength)
                    }
                    const chunksAll = new Uint8Array(receivedLength)
                    let position = 0
                    for (const chunk of chunks) {
                        chunksAll.set(chunk, position)
                        position += chunk.length
                    }
                    const blob = new Blob([chunksAll], {
                        type: res.headers.get('content-type')!,
                    })
                    setState('loaded')
                    img.src = URL.createObjectURL(blob)
                } else {
                    // content-length is not provided
                    const blob = await res.blob()
                    setState('loaded')
                    img.src = URL.createObjectURL(blob)
                }
            } catch (e) {
                // fail to load or timeout
                setState('error')
                img.src = ''
            }
        } else {
            // not crossOrigin, just act as normal Image()
            img.src = src!
            img.onload = () => {
                window.clearTimeout(timeoutRef.current)
                setState('loaded')
            }
            img.onerror = () => {
                window.clearTimeout(timeoutRef.current)
                setState('error')
            }
            timeoutRef.current = window.setTimeout(() => {
                if (state === 'loading') {
                    // if is still loading, stop it
                    setState('error')
                    img.src = ''
                }
            }, timeout)
        }
        // [warn]: only changes of `src` trigger this function to re-cache
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src])

    const reload = () => {
        const img = eRef.current!
        img.src = ''
        return load()
    }

    useLayoutEffect(() => {
        const img = eRef.current!
        if (lazy && !hasIntoView.current) {
            const io = new IntersectionObserver((entries) => {
                const entry = entries[0]
                if (entry.intersectionRatio > 0 && !hasIntoView.current) {
                    hasIntoView.current = true
                    load()
                }
            })
            io.observe(img)
            return () => {
                io.unobserve(img)
                clearEffect()
            }
        } else {
            hasIntoView.current = true
            load()
            return clearEffect
        }
    }, [lazy, load])

    useImperativeHandle(ref, () => ({
        reload,
    }))

    const isLoading = state === 'loading'
    const isImgShow = state === 'loaded'
    const isErrorShow = state === 'error'

    const placeholderRef = useRef<HTMLDivElement>(null)

    return (
        <div className={clsx('sd-image', className)} {...props}>
            <SodaSimpleTransition in={isLoading}>
                <div ref={placeholderRef} className="sd-image-placeholder">
                    {placeholder ?? (
                        <CircularProgressIndicator value={loadPercentage} />
                    )}
                </div>
            </SodaSimpleTransition>

            <img
                ref={eRef}
                style={{
                    opacity: isImgShow ? '1' : '0',
                    pointerEvents: isImgShow ? undefined : 'none',
                    userSelect: isImgShow ? undefined : 'none',
                    objectFit,
                    aspectRatio,
                    minWidth: isNumber(minWidth) ? `${minWidth}px` : minWidth,
                    minHeight: isNumber(minHeight)
                        ? `${minHeight}px`
                        : minHeight,
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
                    <IconButton onClick={reload} path={mdiImageBrokenVariant} />
                </div>
            )}

            {description && (
                <div className="sd-image-scrim">
                    <div className="sd-image-description">{description}</div>
                </div>
            )}

            {typeof children === 'function' ? (
                <div className="sd-image-customize">{children(state)}</div>
            ) : (
                children && <div className="sd-image-customize">{children}</div>
            )}
        </div>
    )
})
