import type { Meta, StoryObj } from '@storybook/react'

import { SodaTransition } from './SodaTransition'
import { Button } from '..'
import { useState } from 'react'

const meta = {
    title: 'composition/SodaTransition',
    component: SodaTransition,
    tags: ['autodocs'],
} satisfies Meta<typeof SodaTransition>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [show, setShow] = useState(true)
        return (
            <>
                <Button onClick={() => setShow(!show)}>toggle state</Button>
                <SodaTransition
                    state={show}
                    style={{ transition: 'all 200ms' }}
                    beforeEnter={{
                        opacity: '0.2',
                        transform: 'translateY(-100%)',
                    }}
                    afterEnter={{ opacity: '1', transform: 'translateY(0)' }}
                    beforeLeave={{
                        opacity: '1',
                        transform: 'translateY(0)',
                    }}
                    afterLeave={{
                        opacity: '0.2',
                        transform: 'translateY(100%)',
                    }}
                >
                    SodaTransition
                </SodaTransition>
            </>
        )
    },
}