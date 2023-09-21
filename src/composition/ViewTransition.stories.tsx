import type { Meta, StoryObj } from '@storybook/react'

import { ViewTransition } from './ViewTransition'
import { useRef } from 'react'
import { Button } from '..'

const meta = {
    title: 'composition/ViewTransition',
    component: ViewTransition,
    tags: ['autodocs'],
} satisfies Meta<typeof ViewTransition>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        let bool = false
        const collection = {
            true: <div>True</div>,
            false: <div>False</div>,
        }
        const getAnotherOne = () => {
            bool = !bool
            return collection[String(bool) as keyof typeof collection]
        }
        const ref = useRef<{ replace(children: React.ReactNode): void }>(null)
        return (
            <>
                <Button onClick={() => ref.current?.replace(getAnotherOne())}>
                    switch
                </Button>

                <ViewTransition ref={ref} className="ViewTransitionDemo">
                    {getAnotherOne()}
                </ViewTransition>

                <style jsx global>{`
                    .ViewTransitionDemo {
                        view-transition-name: ViewTransitionDemo;
                    }

                    @keyframes fade-in {
                        from {
                            opacity: 0;
                        }
                    }

                    @keyframes fade-out {
                        to {
                            opacity: 0;
                        }
                    }

                    @keyframes slide-from-right {
                        from {
                            transform: translateX(30px);
                        }
                    }

                    @keyframes slide-to-left {
                        to {
                            transform: translateX(-30px);
                        }
                    }

                    ::view-transition-old(ViewTransitionDemo) {
                        animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
                            300ms cubic-bezier(0.4, 0, 0.2, 1) both
                                slide-to-left;
                    }

                    ::view-transition-new(ViewTransitionDemo) {
                        animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both
                                fade-in,
                            300ms cubic-bezier(0.4, 0, 0.2, 1) both
                                slide-from-right;
                    }
                `}</style>
            </>
        )
    },
}
