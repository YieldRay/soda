import type { Meta, StoryObj } from '@storybook/react'

import { BottomAppBar } from '.'
import { Fab } from '../fab'
import { IconButton } from '../icon-button'
import { Button } from '../button'
import { useState } from 'react'
import {
    mdiCheckboxOutline,
    mdiGreasePencil,
    mdiImageOutline,
    mdiMicrophone,
    mdiPlus,
} from '@mdi/js'
import Icon from '@mdi/react'

const meta = {
    title: 'components/AppBar/BottomAppBar',
    component: BottomAppBar,
    tags: ['autodocs'],
} satisfies Meta<typeof BottomAppBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [fixed, setFixed] = useState(false)
        return (
            <div style={{ minWidth: '400px', paddingBottom: '80px' }}>
                <Button onClick={() => setFixed(!fixed)}>toggle fixed</Button>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit quos error explicabo nobis numquam, fuga laborum
                    adipisci molestias reiciendis tenetur rem esse maxime ullam
                    facere consectetur, obcaecati sunt delectus necessitatibus.
                </p>

                <BottomAppBar
                    fixed={fixed}
                    teleportTo={document.body}
                    buttons={
                        <>
                            <IconButton size={1} path={mdiCheckboxOutline} />
                            <IconButton size={1} path={mdiGreasePencil} />
                            <IconButton size={1} path={mdiMicrophone} />
                            <IconButton size={1} path={mdiImageOutline} />
                        </>
                    }
                    fab={
                        <Fab variant="secondary">
                            <Icon size={1} path={mdiPlus} />
                        </Fab>
                    }
                />
            </div>
        )
    },
}
