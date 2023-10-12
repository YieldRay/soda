import type { Meta, StoryObj } from '@storybook/react'

import { ViewTransition } from './ViewTransition'
import { useRef, useState } from 'react'
import { Button } from '..'

const meta = {
    title: 'composition/ViewTransition',
    component: ViewTransition,
    tags: ['autodocs'],
} satisfies Meta<typeof ViewTransition>

export default meta

type Story = StoryObj<typeof meta>

const Tips = () => (
    <>
        window.top?.location.href.endsWith('--docs') && (
        <p>
            As you are currently in the summary page, view transition does not
            work because of the restriction saying that duplicate
            view-transition-name (you can see it in the console), please go to
            the{' '}
            <a href="./?path=/story/composition-viewtransition--ref">
                detailed page
            </a>{' '}
            and it will work there.
        </p>
        )
    </>
)

export const Ref: Story = {
    render: () => {
        const getAnotherOne = (() => {
            let i = 0
            const collection = [<div>False</div>, <div>True</div>] as const
            return () => collection[++i % 2]
        })()
        const ref = useRef<{ replace(children: React.ReactNode): void }>(null)
        return (
            <>
                <Tips />
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

export const Props: Story = {
    render: () => {
        const [views, setViews] = useState([<div>old</div>, undefined])

        return (
            <>
                <Tips />
                <Button
                    onClick={() => {
                        setViews((views) => {
                            if (views.filter(Boolean).length > 1) {
                                return views.toReversed()
                            } else {
                                return [<div>old</div>, <div>new</div>]
                            }
                        })
                    }}
                >
                    switch
                </Button>

                <ViewTransition
                    className="ViewTransitionDemoProps"
                    old={views[0]}
                    new={views[1]}
                />
                <style jsx global>{`
                    .ViewTransitionDemoProps {
                        view-transition-name: ViewTransitionDemoProps;
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

                    ::view-transition-old(ViewTransitionDemoProps) {
                        animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
                            300ms cubic-bezier(0.4, 0, 0.2, 1) both
                                slide-to-left;
                    }

                    ::view-transition-new(ViewTransitionDemoProps) {
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
