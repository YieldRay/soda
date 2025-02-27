import type { Meta, StoryObj } from '@storybook/react'
import { useRef, useState } from 'react'
import { Button } from '@/components/button'
import { SodaImage } from './SodaImage'

const meta: Meta<typeof SodaImage> = {
    title: 'composition/SodaImage',
    component: SodaImage,
    tags: ['autodocs'],
    args: {
        minWidth: 100,
        minHeight: 100,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [src, setSrc] = useState('https://temp.im/123x456')
        const reload = () =>
            setSrc(
                `https://temp.im/${Math.random().toString().slice(2, 5)}x${Math.random().toString().slice(2, 5)}`,
            )
        return (
            <>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <SodaImage src={src} description={src} />
                    <SodaImage src={src} description={src} />
                </div>
                <Button onClick={reload}>Reload</Button>
            </>
        )
    },
}

export const WithDescription: Story = {
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
                <SodaImage src={src} description={description} />
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
                    src={src}
                    description={description}
                    width={300}
                    height={300}
                />
            </>
        )
    },
}

export const LazyLoad: Story = {
    args: {
        lazy: true,
        src: 'https://picsum.photos/200',
    },
}

export const DefaultError: Story = {
    render: (props) => {
        const ref = useRef<{ reload: VoidFunction }>(null)

        return (
            <>
                <SodaImage
                    ref={ref}
                    src="https://httpstat.us/404?sleep=5000"
                    timeout={1000}
                    {...props}
                />
            </>
        )
    },
}

export const CrossOrigin: Story = {
    args: {
        lazy: true,
        src: 'https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Supports%20emojis!%20%F0%9F%98%8B',
        width: 440,
        height: 230,
        crossOrigin: 'anonymous',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
    },
}
