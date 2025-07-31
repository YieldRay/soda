import { useState } from 'react'
import {
    mdiContentCopy,
    mdiContentCut,
    mdiContentPaste,
    mdiFormatBold,
    mdiFormatItalic,
    mdiFormatUnderline,
    mdiMagnify,
    mdiPlus,
    mdiShare,
    mdiUndo,
    mdiRedo
} from '@mdi/js'
import Icon from '@mdi/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Portal } from '@/utils/Portal'
import { Button } from '../button'
import { IconButton } from '../icon-button'
import { TextField } from '../text-field'
import { Fab } from '../fab'
import { Toolbar } from './Toolbar'

export default {
    title: 'Components/Toolbar',
    component: Toolbar,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['docked', 'floating'],
        },
        colorScheme: {
            control: { type: 'radio' },
            options: ['standard', 'vibrant'],
        },
        orientation: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
        },
        fixed: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Toolbar>

type Story = StoryObj<typeof Toolbar>

export const DockedStandard: Story = {
    render: (args) => {
        const [fixed, setFixed] = useState(false)
        
        return (
            <div style={{ minWidth: '400px', paddingBottom: '100px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <input
                        type="checkbox"
                        checked={fixed}
                        onChange={(e) => setFixed(e.target.checked)}
                    />
                    Fixed positioning
                </label>
                
                <p>
                    Docked toolbars are similar to bottom app bars but more flexible.
                    They display frequently used actions and can contain various control types.
                </p>
                
                <p>Try the toolbar below with different actions:</p>
                
                <Portal>
                    <Toolbar
                        {...args}
                        variant="docked"
                        colorScheme="standard"
                        fixed={fixed}
                        actions={
                            <>
                                <IconButton variant="standard" path={mdiUndo} />
                                <IconButton variant="standard" path={mdiRedo} />
                                <IconButton variant="standard" path={mdiContentCut} />
                                <IconButton variant="standard" path={mdiContentCopy} />
                                <IconButton variant="standard" path={mdiContentPaste} />
                                <Button variant="text">Share</Button>
                            </>
                        }
                        fab={<Fab variant="surface"><Icon path={mdiPlus} size={1} /></Fab>}
                    />
                </Portal>
            </div>
        )
    },
}

export const DockedVibrant: Story = {
    render: (args) => (
        <div style={{ minWidth: '400px', paddingBottom: '100px' }}>
            <p>
                Vibrant color scheme uses primary container colors for greater emphasis.
            </p>
            
            <Portal>
                <Toolbar
                    {...args}
                    variant="docked"
                    colorScheme="vibrant"
                    fixed={true}
                    actions={
                        <>
                            <IconButton variant="tonal" path={mdiFormatBold} />
                            <IconButton variant="tonal" path={mdiFormatItalic} />
                            <IconButton variant="tonal" path={mdiFormatUnderline} />
                            <TextField 
                                variant="outlined" 
                                placeholder="Search..." 
                                style={{ minWidth: '120px' }}
                            />
                            <Button variant="filled">Apply</Button>
                        </>
                    }
                />
            </Portal>
        </div>
    ),
}

export const FloatingHorizontal: Story = {
    render: (args) => (
        <div style={{ minWidth: '400px', height: '300px', position: 'relative', backgroundColor: 'var(--md-sys-color-surface-variant)', padding: '20px' }}>
            <p>Floating toolbars can be positioned anywhere and have rounded corners.</p>
            
            <Toolbar
                {...args}
                variant="floating"
                colorScheme="standard"
                orientation="horizontal"
                style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                actions={
                    <>
                        <IconButton variant="standard" path={mdiUndo} />
                        <IconButton variant="standard" path={mdiRedo} />
                        <IconButton variant="standard" path={mdiShare} />
                    </>
                }
            />
        </div>
    ),
}

export const FloatingVertical: Story = {
    render: (args) => (
        <div style={{ minWidth: '400px', height: '400px', position: 'relative', backgroundColor: 'var(--md-sys-color-surface-variant)', padding: '20px' }}>
            <p>Vertical floating toolbars stack actions vertically.</p>
            
            <Toolbar
                {...args}
                variant="floating"
                colorScheme="standard"
                orientation="vertical"
                style={{ 
                    position: 'absolute',
                    top: '20px',
                    right: '20px'
                }}
                actions={
                    <>
                        <IconButton variant="standard" path={mdiUndo} />
                        <IconButton variant="standard" path={mdiRedo} />
                        <IconButton variant="standard" path={mdiContentCopy} />
                        <IconButton variant="standard" path={mdiShare} />
                    </>
                }
            />
        </div>
    ),
}

export const FloatingWithFAB: Story = {
    render: (args) => (
        <div style={{ minWidth: '400px', height: '300px', position: 'relative', backgroundColor: 'var(--md-sys-color-surface-variant)', padding: '20px' }}>
            <p>Floating toolbars can be paired with FABs to emphasize certain actions.</p>
            
            <Toolbar
                {...args}
                variant="floating"
                colorScheme="vibrant"
                orientation="horizontal"
                style={{ 
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
                actions={
                    <>
                        <IconButton variant="tonal" path={mdiMagnify} />
                        <IconButton variant="tonal" path={mdiShare} />
                    </>
                }
                fab={<Fab variant="surface"><Icon path={mdiPlus} size={1} /></Fab>}
            />
        </div>
    ),
}

export const InteractiveExample: Story = {
    render: () => {
        const [variant, setVariant] = useState<'docked' | 'floating'>('docked')
        const [colorScheme, setColorScheme] = useState<'standard' | 'vibrant'>('standard')
        const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
        const [showFab, setShowFab] = useState(true)
        
        return (
            <div style={{ minWidth: '400px', paddingBottom: '120px' }}>
                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <label>Variant: </label>
                        <select value={variant} onChange={(e) => setVariant(e.target.value as 'docked' | 'floating')}>
                            <option value="docked">Docked</option>
                            <option value="floating">Floating</option>
                        </select>
                    </div>
                    
                    <div>
                        <label>Color Scheme: </label>
                        <select value={colorScheme} onChange={(e) => setColorScheme(e.target.value as 'standard' | 'vibrant')}>
                            <option value="standard">Standard</option>
                            <option value="vibrant">Vibrant</option>
                        </select>
                    </div>
                    
                    {variant === 'floating' && (
                        <div>
                            <label>Orientation: </label>
                            <select value={orientation} onChange={(e) => setOrientation(e.target.value as 'horizontal' | 'vertical')}>
                                <option value="horizontal">Horizontal</option>
                                <option value="vertical">Vertical</option>
                            </select>
                        </div>
                    )}
                    
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={showFab}
                                onChange={(e) => setShowFab(e.target.checked)}
                            />
                            Show FAB
                        </label>
                    </div>
                </div>
                
                <div style={{ 
                    height: '200px', 
                    position: 'relative', 
                    backgroundColor: variant === 'floating' ? 'var(--md-sys-color-surface-variant)' : 'transparent',
                    borderRadius: variant === 'floating' ? '8px' : '0',
                    padding: variant === 'floating' ? '20px' : '0'
                }}>
                    {variant === 'docked' ? (
                        <Portal>
                            <Toolbar
                                variant={variant}
                                colorScheme={colorScheme}
                                orientation={orientation}
                                fixed={variant === 'docked'}
                                actions={
                                    <>
                                        <IconButton variant={colorScheme === 'vibrant' ? 'tonal' : 'standard'} path={mdiUndo} />
                                        <IconButton variant={colorScheme === 'vibrant' ? 'tonal' : 'standard'} path={mdiRedo} />
                                        <IconButton variant={colorScheme === 'vibrant' ? 'tonal' : 'standard'} path={mdiContentCopy} />
                                        {variant === 'docked' && (
                                            <Button variant={colorScheme === 'vibrant' ? 'filled' : 'text'}>
                                                Share
                                            </Button>
                                        )}
                                    </>
                                }
                                fab={showFab ? <Fab variant="surface"><Icon path={mdiPlus} size={1} /></Fab> : undefined}
                            />
                        </Portal>
                    ) : (
                        <Toolbar
                            variant={variant}
                            colorScheme={colorScheme}
                            orientation={orientation}
                            fixed={false}
                            style={variant === 'floating' ? {
                                position: 'absolute',
                                top: orientation === 'vertical' ? '20px' : '50%',
                                left: orientation === 'vertical' ? 'auto' : '50%',
                                right: orientation === 'vertical' ? '20px' : 'auto',
                                transform: orientation === 'vertical' ? 'none' : 'translate(-50%, -50%)'
                            } : undefined}
                            actions={
                                <>
                                    <IconButton variant={colorScheme === 'vibrant' ? 'tonal' : 'standard'} path={mdiUndo} />
                                    <IconButton variant={colorScheme === 'vibrant' ? 'tonal' : 'standard'} path={mdiRedo} />
                                    <IconButton variant={colorScheme === 'vibrant' ? 'tonal' : 'standard'} path={mdiContentCopy} />
                                    <Button variant={colorScheme === 'vibrant' ? 'filled' : 'text'}>
                                        Share
                                    </Button>
                                </>
                            }
                            fab={showFab ? <Fab variant="surface"><Icon path={mdiPlus} size={1} /></Fab> : undefined}
                        />
                    )}
                </div>
            </div>
        )
    },
}