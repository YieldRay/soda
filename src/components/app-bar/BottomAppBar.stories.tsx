import type { Meta, StoryObj } from '@storybook/react'

import { BottomAppBar } from '.'
import { Fab } from '../fab'
import { IconButton } from '../icon-button'

const meta = {
    title: 'BottomAppBar',
    component: BottomAppBar,
    tags: ['autodocs'],
} satisfies Meta<typeof BottomAppBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        return (
            <div style={{ minWidth: '400px', paddingBottom: '80px' }}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit quos error explicabo nobis numquam, fuga laborum
                    adipisci molestias reiciendis tenetur rem esse maxime ullam
                    facere consectetur, obcaecati sunt delectus necessitatibus.
                </p>
                <BottomAppBar>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <IconButton>✅</IconButton>
                            <IconButton>✏</IconButton>
                            <IconButton>🎧</IconButton>
                            <IconButton>🖼</IconButton>
                        </div>

                        <Fab sd="secondary">＋</Fab>
                    </div>
                </BottomAppBar>
            </div>
        )
    },
}
