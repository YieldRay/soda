import { mdiAccount, mdiContentSave } from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SplitButton } from '.'

const meta: Meta<typeof SplitButton> = {
    title: 'components/Button/SplitButton',
    component: SplitButton,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            type: 'boolean',
            options: [false, true],
            control: { type: 'radio' },
        },
        variant: {
            control: { type: 'select' },
            options: ['elevated', 'filled', 'tonal', 'outlined'],
        },
        size: {
            control: { type: 'select' },
            options: ['XS', 'S', 'M', 'L', 'XL'],
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Elevated: Story = {
    args: {
        variant: 'elevated',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const Tonal: Story = {
    args: {
        variant: 'tonal',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const WithIcon: Story = {
    args: {
        variant: 'filled',
        icon: <Icon size="20px" path={mdiContentSave} />,
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const IconOnly: Story = {
    args: {
        variant: 'filled',
        icon: <Icon size="20px" path={mdiAccount} />,
        onClick: () => console.log('Action clicked'),
        onMenuClick: () => console.log('Menu clicked'),
        'aria-label': 'User actions',
    },
}

export const SizeXS: Story = {
    args: {
        variant: 'filled',
        size: 'XS',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const SizeS: Story = {
    args: {
        variant: 'filled',
        size: 'S',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const SizeM: Story = {
    args: {
        variant: 'filled',
        size: 'M',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const SizeL: Story = {
    args: {
        variant: 'filled',
        size: 'L',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const SizeXL: Story = {
    args: {
        variant: 'filled',
        size: 'XL',
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const Disabled: Story = {
    args: {
        variant: 'filled',
        label: 'Save',
        disabled: true,
        onClick: () => console.log('Save clicked'),
        onMenuClick: () => console.log('Menu clicked'),
    },
}

export const Interactive: Story = {
    render: () => {
        const [menuOpen, setMenuOpen] = useState(false)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SplitButton
                    variant="filled"
                    label="Save"
                    icon={<Icon size="20px" path={mdiContentSave} />}
                    onClick={() => console.log('Save clicked')}
                    onMenuClick={() => {
                        setMenuOpen(!menuOpen)
                        console.log('Menu clicked')
                    }}
                    menuSelected={menuOpen}
                />
                {menuOpen && (
                    <div style={{ 
                        padding: '8px',
                        background: 'var(--md-sys-color-surface-container)',
                        borderRadius: '8px',
                        fontSize: '14px'
                    }}>
                        Menu is open (click menu button to toggle)
                    </div>
                )}
            </div>
        )
    },
}

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SplitButton
                variant="elevated"
                label="Elevated"
                onClick={() => console.log('Elevated clicked')}
                onMenuClick={() => console.log('Elevated menu clicked')}
            />
            <SplitButton
                variant="filled"
                label="Filled"
                onClick={() => console.log('Filled clicked')}
                onMenuClick={() => console.log('Filled menu clicked')}
            />
            <SplitButton
                variant="tonal"
                label="Tonal"
                onClick={() => console.log('Tonal clicked')}
                onMenuClick={() => console.log('Tonal menu clicked')}
            />
            <SplitButton
                variant="outlined"
                label="Outlined"
                onClick={() => console.log('Outlined clicked')}
                onMenuClick={() => console.log('Outlined menu clicked')}
            />
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <SplitButton
                variant="filled"
                size="XS"
                label="XS"
                onClick={() => console.log('XS clicked')}
                onMenuClick={() => console.log('XS menu clicked')}
            />
            <SplitButton
                variant="filled"
                size="S"
                label="S"
                onClick={() => console.log('S clicked')}
                onMenuClick={() => console.log('S menu clicked')}
            />
            <SplitButton
                variant="filled"
                size="M"
                label="M"
                onClick={() => console.log('M clicked')}
                onMenuClick={() => console.log('M menu clicked')}
            />
            <SplitButton
                variant="filled"
                size="L"
                label="L"
                onClick={() => console.log('L clicked')}
                onMenuClick={() => console.log('L menu clicked')}
            />
            <SplitButton
                variant="filled"
                size="XL"
                label="XL"
                onClick={() => console.log('XL clicked')}
                onMenuClick={() => console.log('XL menu clicked')}
            />
        </div>
    ),
}
