import { useState } from 'react'
import { mdiArrowLeft, mdiClose } from '@mdi/js'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SideSheet } from '.'
import { Button } from '../button'
import { IconButton } from '../icon-button'
import { List } from '../list'
import { Switch } from '../switch'

const meta: Meta<typeof SideSheet> = {
    title: 'components/Sheet/SideSheet',
    component: SideSheet,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Standard: Story = {
    render: () => {
        {
            const [open, setOpen] = useState(true)
            const [isRight, setRight] = useState(true)

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isRight ? undefined : 'row-reverse',
                        height: '100vh',
                        background: 'var(--md-sys-color-surface)',
                    }}
                >
                    <div
                        style={{
                            flex: '1',
                            // here we use flex layout
                            // it's important to set flex-grow: 1
                        }}
                    >
                        <List
                            headline="open"
                            onClick={() => setOpen(!open)}
                            trailingIcon={<Switch checked={open} />}
                        />
                        <List
                            headline="position"
                            onClick={() => setRight(!isRight)}
                            trailingIcon={<Switch checked={isRight} />}
                        />
                    </div>
                    <SideSheet
                        open={open}
                        position={isRight ? 'right' : 'left'}
                        header={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>Title</span>
                                <IconButton
                                    path={mdiClose}
                                    onClick={() => setOpen(false)}
                                />
                            </div>
                        }
                    >
                        Standard side sheet
                    </SideSheet>
                </div>
            )
        }
    },
}

export const Modal: Story = {
    render: () => {
        const [open, setOpen] = useState(true)
        const [isRight, setRight] = useState(true)

        return (
            <div style={{ willChange: 'transform', height: '100vh' }}>
                <List
                    headline="open"
                    onClick={() => setOpen(!open)}
                    trailingIcon={<Switch checked={open} />}
                />
                <List
                    headline="position"
                    onClick={() => setRight(!isRight)}
                    trailingIcon={<Switch checked={isRight} />}
                />
                <SideSheet
                    modal
                    open={open}
                    position={isRight ? 'right' : 'left'}
                    onScrimClick={() => setOpen(false)}
                    header={
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <IconButton
                                path={mdiArrowLeft}
                                onClick={() => setOpen(false)}
                            />
                            <span>Title</span>
                            <IconButton
                                path={mdiClose}
                                style={{ marginLeft: 'auto' }}
                                onClick={() => setOpen(false)}
                            />
                        </div>
                    }
                    footer={
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button onClick={() => setOpen(false)}>Save</Button>
                            <Button
                                variant="outlined"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    }
                >
                    Modal side sheet
                </SideSheet>
            </div>
        )
    },
}
