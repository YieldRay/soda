import { mdiAccountPlus, mdiEmailOutline, mdiPencilOutline, mdiPhone, mdiVideoOutline } from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Fab, FabMenu, FabMenuItem } from '.'

const meta: Meta<typeof FabMenu> = {
    title: 'components/Button/FabMenu',
    component: FabMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        },
        anchor: {
            options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
            control: { type: 'radio' },
        },
    },
}

export default meta

type Story = StoryObj<typeof meta>

// Helper component to demonstrate the FAB menu with a trigger
function FabMenuDemo({ variant = 'primary', anchor = 'bottom-right' }: { variant?: 'primary' | 'secondary' | 'tertiary', anchor?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' }) {
    const [open, setOpen] = useState(false)

    return (
        <div style={{ position: 'relative', width: '300px', height: '200px', background: '#f5f5f5', borderRadius: '8px' }}>
            {/* Trigger FAB */}
            <Fab
                variant={variant === 'primary' ? 'surface' : variant}
                onClick={() => setOpen(!open)}
                style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: anchor.includes('right') ? '16px' : undefined,
                    left: anchor.includes('left') ? '16px' : undefined,
                    top: anchor.includes('top') ? '16px' : undefined,
                }}
            >
                <Icon path={mdiPencilOutline} size={1} />
            </Fab>

            {/* FAB Menu */}
            <FabMenu
                open={open}
                variant={variant}
                anchor={anchor}
                onClose={() => setOpen(false)}
            >
                <FabMenuItem
                    icon={<Icon path={mdiEmailOutline} size={1} />}
                    onClick={() => {
                        console.log('Email clicked')
                        setOpen(false)
                    }}
                >
                    Email
                </FabMenuItem>
                <FabMenuItem
                    icon={<Icon path={mdiPhone} size={1} />}
                    onClick={() => {
                        console.log('Call clicked')
                        setOpen(false)
                    }}
                >
                    Call
                </FabMenuItem>
                <FabMenuItem
                    icon={<Icon path={mdiVideoOutline} size={1} />}
                    onClick={() => {
                        console.log('Video clicked')
                        setOpen(false)
                    }}
                >
                    Video
                </FabMenuItem>
                <FabMenuItem
                    icon={<Icon path={mdiAccountPlus} size={1} />}
                    onClick={() => {
                        console.log('Add contact clicked')
                        setOpen(false)
                    }}
                >
                    Add Contact
                </FabMenuItem>
            </FabMenu>
        </div>
    )
}

export const Primary: Story = {
    render: () => <FabMenuDemo variant="primary" />,
}

export const Secondary: Story = {
    render: () => <FabMenuDemo variant="secondary" />,
}

export const Tertiary: Story = {
    render: () => <FabMenuDemo variant="tertiary" />,
}

export const BottomLeft: Story = {
    render: () => <FabMenuDemo variant="primary" anchor="bottom-left" />,
}

export const TopRight: Story = {
    render: () => <FabMenuDemo variant="primary" anchor="top-right" />,
}

export const TwoItems: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        
        return (
            <div style={{ position: 'relative', width: '300px', height: '200px', background: '#f5f5f5', borderRadius: '8px' }}>
                <Fab
                    onClick={() => setOpen(!open)}
                    style={{ position: 'absolute', bottom: '16px', right: '16px' }}
                >
                    <Icon path={mdiPencilOutline} size={1} />
                </Fab>

                <FabMenu
                    open={open}
                    variant="primary"
                    onClose={() => setOpen(false)}
                >
                    <FabMenuItem
                        icon={<Icon path={mdiEmailOutline} size={1} />}
                        onClick={() => setOpen(false)}
                    />
                    <FabMenuItem
                        icon={<Icon path={mdiPhone} size={1} />}
                        onClick={() => setOpen(false)}
                    />
                </FabMenu>
            </div>
        )
    }
}

export const SixItems: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        
        return (
            <div style={{ position: 'relative', width: '300px', height: '300px', background: '#f5f5f5', borderRadius: '8px' }}>
                <Fab
                    onClick={() => setOpen(!open)}
                    style={{ position: 'absolute', bottom: '16px', right: '16px' }}
                >
                    <Icon path={mdiPencilOutline} size={1} />
                </Fab>

                <FabMenu
                    open={open}
                    variant="primary"
                    onClose={() => setOpen(false)}
                >
                    <FabMenuItem icon={<Icon path={mdiEmailOutline} size={1} />} onClick={() => setOpen(false)}>Email</FabMenuItem>
                    <FabMenuItem icon={<Icon path={mdiPhone} size={1} />} onClick={() => setOpen(false)}>Call</FabMenuItem>
                    <FabMenuItem icon={<Icon path={mdiVideoOutline} size={1} />} onClick={() => setOpen(false)}>Video</FabMenuItem>
                    <FabMenuItem icon={<Icon path={mdiAccountPlus} size={1} />} onClick={() => setOpen(false)}>Add</FabMenuItem>
                    <FabMenuItem icon={<Icon path={mdiPencilOutline} size={1} />} onClick={() => setOpen(false)}>Edit</FabMenuItem>
                    <FabMenuItem icon={<Icon path={mdiEmailOutline} size={1} />} onClick={() => setOpen(false)}>Share</FabMenuItem>
                </FabMenu>
            </div>
        )
    }
}