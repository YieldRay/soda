import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
    mdiCheckboxOutline,
    mdiGreasePencil,
    mdiImageOutline,
    mdiMicrophone,
    mdiPlus,
} from '@mdi/js'
import Icon from '@mdi/react'
import { Portal } from '@/utils/Portal'
import { BottomAppBar } from '.'
import { Switch } from '..'
import { Fab } from '../fab'
import { IconButton } from '../icon-button'

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
                <Switch onClick={() => setFixed(!fixed)} />
                toggle fixed
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit quos error explicabo nobis numquam, fuga laborum
                    adipisci molestias reiciendis tenetur rem esse maxime ullam
                    facere consectetur, obcaecati sunt delectus necessitatibus.
                </p>
                <Portal container={fixed ? document.body : undefined}>
                    <BottomAppBar
                        fixed={fixed}
                        buttons={
                            <>
                                <IconButton
                                    size={1}
                                    path={mdiCheckboxOutline}
                                />
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
                </Portal>
            </div>
        )
    },
}
