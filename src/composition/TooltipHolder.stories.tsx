import type { Meta, StoryObj } from '@storybook/react'

import { TooltipHolder } from './TooltipHolder'
import { TopAppBar } from '../components/app-bar'
import { IconButton } from '../components/icon-button'
import { PlainTooltip, RichTooltip } from '../components/tooltip'
import { mdiAccount, mdiDotsVertical, mdiMenu } from '@mdi/js'

const meta = {
    title: 'composition/TooltipHolder',
    component: TooltipHolder,
    tags: ['autodocs'],
} satisfies Meta<typeof TooltipHolder>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <>
            <TopAppBar
                fixed
                leadingNavigationIcon={
                    <TooltipHolder
                        trigger={<IconButton path={mdiMenu} />}
                        content={<PlainTooltip>menu</PlainTooltip>}
                    />
                }
                trailingIcon={
                    <>
                        <TooltipHolder
                            trigger={<IconButton path={mdiAccount} />}
                            content={
                                <PlainTooltip>so loooooooooong</PlainTooltip>
                            }
                        />
                        <TooltipHolder
                            trigger={<IconButton path={mdiDotsVertical} />}
                            content={
                                <PlainTooltip>so loooooooooong</PlainTooltip>
                            }
                        />
                    </>
                }
            >
                TopAppBar
            </TopAppBar>

            <div style={{ height: '64px' }} />

            <TooltipHolder
                placement="right"
                trigger={<IconButton>❤</IconButton>}
                content={
                    <RichTooltip subhead="subhead" action="action">
                        love but so loooooooooong
                    </RichTooltip>
                }
            />

            <h1>hover on the icon to see how it works!</h1>

            {new Array(10).fill(0).map((_, i) => (
                <p key={i}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem mollitia qui, pariatur quia omnis perspiciatis ad
                    sapiente enim quas recusandae, aspernatur deserunt fugit
                    iure! Et neque similique explicabo architecto hic.
                </p>
            ))}
        </>
    ),
}
