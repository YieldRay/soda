import type { UseTransitionStylesProps } from '@floating-ui/react'

export const common: UseTransitionStylesProps['common'] = ({ side }) => ({
    transformOrigin: (
        {
            top: 'center 100%',
            bottom: 'center 0',
            left: '100% center',
            right: '0 center',
        } as const
    )[side],
})

// see https://floating-ui.com/docs/usetransition#usetransitionstyles
export const useTransitionStylesProps = {
    initial: { transform: 'scale(0)' },
    open: { transform: 'scale(1)', opacity: '1' },
    close: { opacity: '0' },
    common,
    duration: { open: 150, close: 300 },
} satisfies UseTransitionStylesProps
