import type { Meta, StoryObj } from '@storybook/react'

import { FloatingTip } from './FloatingTip'
import { TopAppBar } from '../components/app-bar'
import { IconButton } from '../components/icon-button'
import { PlainTooltip, RichTooltip } from '../components/tooltip'
import { IconMenu } from '@/utils/icons'

const meta = {
    title: 'composition/FloatingTip',
    component: FloatingTip,
    tags: ['autodocs'],
} satisfies Meta<typeof FloatingTip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <>
            <TopAppBar
                leadingNavigationIcon={
                    <FloatingTip
                        trigger={
                            <IconButton>
                                <IconMenu />
                            </IconButton>
                        }
                        content={<PlainTooltip>menu</PlainTooltip>}
                    ></FloatingTip>
                }
                trailingIcon={
                    <>
                        <FloatingTip
                            trigger={<IconButton>❤</IconButton>}
                            content={
                                <PlainTooltip>
                                    love but so loooooooooong
                                </PlainTooltip>
                            }
                        ></FloatingTip>
                        <FloatingTip
                            trigger={<IconButton>×</IconButton>}
                            content={
                                <PlainTooltip>
                                    close but so loooooooooong
                                </PlainTooltip>
                            }
                        ></FloatingTip>
                    </>
                }
            >
                TopAppBar
            </TopAppBar>

            <FloatingTip
                trigger={<IconButton>❤</IconButton>}
                content={
                    <RichTooltip subhead="subhead" action="action">
                        love but so loooooooooong
                    </RichTooltip>
                }
            ></FloatingTip>

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
