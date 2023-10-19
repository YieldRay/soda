import type { UseTransitionStylesProps } from '@floating-ui/react'

export const useTransitionStylesProps = {
    initial: { transform: 'scale(0)' },
    open: { transform: 'scale(1)' },
    close: { transform: 'scale(0)' },
    common: ({ side }) => ({
        transformOrigin: (
            {
                top: 'center 100%',
                bottom: 'center 0',
                left: '100% center',
                right: '0 center',
            } as const
        )[side],
    }),
} satisfies UseTransitionStylesProps
