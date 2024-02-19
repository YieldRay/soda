import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
    mdiCardSearch,
    mdiCardSearchOutline,
    mdiCog,
    mdiCogOutline,
    mdiHome,
    mdiHomeOutline,
} from '@mdi/js'
import Icon from '@mdi/react'
import { Portal } from '@/utils/Portal'
import { NavigationRail } from '.'
import { Fab } from '../fab'
import { Switch } from '../switch'

const meta = {
    title: 'components/Navigation/NavigationRail',
    component: NavigationRail,
    tags: ['autodocs'],
} satisfies Meta<typeof NavigationRail>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        fab: (
            <>
                <Fab>＋</Fab>
            </>
        ),
        items: [
            {
                key: 'home',
                label: 'home',
                icon: (active) => (
                    <Icon size={1} path={active ? mdiHome : mdiHomeOutline} />
                ),
                active: true,
            },
            {
                key: 'search',
                label: 'search',
                icon: (active) => (
                    <Icon
                        size={1}
                        path={active ? mdiCardSearch : mdiCardSearchOutline}
                    />
                ),
            },
            {
                key: 'settings',
                label: 'settings',
                icon: (active) => (
                    <Icon size={1} path={active ? mdiCog : mdiCogOutline} />
                ),
            },
        ],
    },
    render: (props) => {
        const [fixed, setFixed] = useState(false)
        const [items, setItems] = useState(props.items)
        return (
            <>
                <center>
                    fixed
                    <Switch checked={fixed} onChange={setFixed} />
                </center>
                <Portal container={fixed ? document.body : undefined}>
                    <NavigationRail
                        fab={props.fab}
                        fixed={fixed}
                        items={items}
                        onChange={({ key }) => {
                            setItems(
                                items.map((item) => ({
                                    ...item,
                                    active: item.key === key,
                                })),
                            )
                        }}
                    />
                </Portal>
            </>
        )
    },
}
