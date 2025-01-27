import type { Alignment, UseTransitionStylesProps } from '@floating-ui/react'

export const common: UseTransitionStylesProps['common'] = ({
    side,
    placement,
}) => {
    const alignment = placement.split('-')[1] as Alignment | undefined
    const align = alignment
        ? {
              start: '0%',
              end: '100%',
          }[alignment]
        : 'center'
    return {
        transformOrigin: (
            {
                top: `${align} 100%`,
                bottom: `${align} 0`,
                left: `100% ${align}`,
                right: `0 ${align}`,
            } as const
        )[side],
    }
}

// see https://floating-ui.com/docs/usetransition#usetransitionstyles
export const useTransitionStylesProps = {
    initial: { visibility: 'hidden', transform: 'scale(0.5)' },
    open: { visibility: 'visible', transform: 'scale(1)', opacity: '1' },
    close: { opacity: '0' },
    common,
    duration: { open: 150, close: 300 },
} satisfies UseTransitionStylesProps
