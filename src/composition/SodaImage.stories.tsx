import type { Meta, StoryObj } from '@storybook/react'

import { SodaImage } from './SodaImage'
import { useRef, useState } from 'react'
import { Button } from '..'

const meta = {
    title: 'composition/SodaImage',
    component: SodaImage,
    tags: ['autodocs'],
} satisfies Meta<typeof SodaImage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [src, setSrc] = useState('https://temp.im/123x456')
        const [description, setDescription] = useState('123x456')
        const gen = function () {
            const range = (x: number, y: number) => x + (y - x) * Math.random()
            const w = Math.trunc(range(100, 500))
            const h = Math.trunc(range(100, 500))

            setSrc(`https://temp.im/${w}x${h}`)
            setDescription(`${w}x${h}`)
        }

        return (
            <>
                <Button onClick={gen}>Next</Button>
                <br />
                <SodaImage
                    {...{
                        src,
                        description,
                    }}
                />
            </>
        )
    },
}

export const FixedSize: Story = {
    render: () => {
        const [src, setSrc] = useState('https://temp.im/123x456')
        const [description, setDescription] = useState('123x456')
        const gen = function () {
            const range = (x: number, y: number) => x + (y - x) * Math.random()
            const w = Math.trunc(range(100, 500))
            const h = Math.trunc(range(100, 500))

            setSrc(`https://temp.im/${w}x${h}`)
            setDescription(`${w}x${h}`)
        }

        return (
            <>
                <Button onClick={gen}>Next</Button>
                <br />
                <SodaImage
                    {...{
                        src,
                        description,
                        width: '300',
                        height: '300',
                    }}
                />
            </>
        )
    },
}

export const LazyLoad: Story = {
    args: {
        lazy: true,
        src: 'https://picsum.photos/200',
        width: 200,
        height: 200,
    },
}

export const DefaultError: Story = {
    render: () => {
        const ref = useRef<{ reload: VoidFunction }>(null)

        return (
            <>
                <SodaImage
                    ref={ref}
                    src="https://httpstat.us/404?sleep=5000"
                    width="200px"
                    height="200px"
                    timeout={1000}
                />
            </>
        )
    },
}
