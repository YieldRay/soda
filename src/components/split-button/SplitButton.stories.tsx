import { mdiAccount, mdiContentSave } from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu, MenuItem } from '../menu'
import { SplitButton } from '.'

const meta: Meta<typeof SplitButton> = {
    title: 'components/Button/SplitButton',
    component: SplitButton,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['elevated', 'filled', 'tonal', 'outlined'],
        },
        size: {
            control: { type: 'radio' },
            options: ['xs', 's', 'm', 'l', 'xl'],
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const SampleMenu = (
    <Menu>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
    </Menu>
)

export const Filled: Story = {
    args: {
        variant: 'filled',
        size: 'm',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const Elevated: Story = {
    args: {
        variant: 'elevated',
        size: 'm',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const Tonal: Story = {
    args: {
        variant: 'tonal',
        size: 'm',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        size: 'm',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const WithLeadingIcon: Story = {
    args: {
        variant: 'filled',
        size: 'm',
        leadingIcon: <Icon size="18px" path={mdiContentSave} />,
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const IconOnly: Story = {
    args: {
        variant: 'filled',
        size: 'm',
        leadingIcon: <Icon size="18px" path={mdiAccount} />,
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
        'aria-label': 'User actions',
    },
}

export const SizeXS: Story = {
    args: {
        variant: 'filled',
        size: 'xs',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const SizeS: Story = {
    args: {
        variant: 'filled',
        size: 's',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const SizeM: Story = {
    args: {
        variant: 'filled',
        size: 'm',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const SizeL: Story = {
    args: {
        variant: 'filled',
        size: 'l',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const SizeXL: Story = {
    args: {
        variant: 'filled',
        size: 'xl',
        children: 'Save',
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}

export const Disabled: Story = {
    args: {
        variant: 'filled',
        size: 'm',
        children: 'Save',
        disabled: true,
        onAction: () => console.log('Action clicked'),
        menu: SampleMenu,
    },
}
