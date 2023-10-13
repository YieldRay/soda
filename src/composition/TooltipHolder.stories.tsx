import type { Meta, StoryObj } from '@storybook/react'

import { TooltipHolder } from './TooltipHolder'
import { TopAppBar } from '../components/app-bar'
import { IconButton } from '../components/icon-button'
import { PlainTooltip, RichTooltip } from '../components/tooltip'
import { mdiMenu } from '@mdi/js'

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
                leadingNavigationIcon={
                    <TooltipHolder
                        trigger={<IconButton path={mdiMenu} />}
                        content={<PlainTooltip>menu</PlainTooltip>}
                    ></TooltipHolder>
                }
                trailingIcon={
                    <>
                        <TooltipHolder
                            trigger={<IconButton>❤</IconButton>}
                            content={
                                <PlainTooltip>
                                    love but so loooooooooong
                                </PlainTooltip>
                            }
                        ></TooltipHolder>
                        <TooltipHolder
                            trigger={<IconButton>×</IconButton>}
                            content={
                                <PlainTooltip>
                                    close but so loooooooooong
                                </PlainTooltip>
                            }
                        ></TooltipHolder>
                    </>
                }
            >
                TopAppBar
            </TopAppBar>

            <TooltipHolder
                placement="right"
                trigger={<IconButton>❤</IconButton>}
                content={
                    <RichTooltip subhead="subhead" action="action">
                        love but so loooooooooong
                    </RichTooltip>
                }
            ></TooltipHolder>

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
