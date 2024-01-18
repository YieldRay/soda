import type { Meta, StoryObj } from '@storybook/react'

import { PopoverHolder, PopoverHolderHandle } from './PopoverHolder'
import { TopAppBar } from '../components/app-bar'
import { IconButton } from '../components/icon-button'
import { PlainTooltip, RichTooltip } from '../components/tooltip'
import { mdiAccount, mdiDotsVertical, mdiMenu } from '@mdi/js'
import { Default as menuDefaultStory } from '../components/menu/Menu.stories'
import { useRef } from 'react'

const meta = {
    title: 'composition/PopoverHolder',
    component: PopoverHolder,
    tags: ['autodocs'],
} satisfies Meta<typeof PopoverHolder>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const popoverHolderHandleRef = useRef<PopoverHolderHandle>(null)
        return (
            <>
                <TopAppBar
                    fixed
                    leadingNavigationIcon={
                        <PopoverHolder
                            trigger={<IconButton path={mdiMenu} />}
                            content={<PlainTooltip>menu</PlainTooltip>}
                        />
                    }
                    trailingIcon={
                        <>
                            <PopoverHolder
                                trigger={<IconButton path={mdiAccount} />}
                                content={
                                    <PlainTooltip>
                                        so loooooooooong
                                    </PlainTooltip>
                                }
                            />
                            <PopoverHolder
                                ref={popoverHolderHandleRef}
                                placement="bottom-start"
                                trigger={<IconButton path={mdiDotsVertical} />}
                                content={
                                    <div
                                        onClick={() =>
                                            (popoverHolderHandleRef.current!.open =
                                                false)
                                        }
                                    >
                                        {menuDefaultStory.render?.(
                                            {},
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            //@ts-ignore
                                            {}
                                        )}
                                    </div>
                                }
                            />
                        </>
                    }
                >
                    TopAppBar
                </TopAppBar>

                <div style={{ height: '64px' }} />

                <PopoverHolder
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
                        Dolorem mollitia qui, pariatur quia omnis perspiciatis
                        ad sapiente enim quas recusandae, aspernatur deserunt
                        fugit iure! Et neque similique explicabo architecto hic.
                    </p>
                ))}
            </>
        )
    },
}
