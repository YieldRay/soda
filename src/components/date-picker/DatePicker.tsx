import { DockedDatePicker } from './DockedDatePicker'
import { ModalDatePicker } from './ModalDatePicker'

/**
 * Material Design 3 Date Picker component.
 * 
 * @specs https://m3.material.io/components/date-pickers/specs
 */
export function DatePicker(props: {
    initDate?: Date
    format?: (value: Date) => string
    supportingText?: string
    onOK?: (value: Date) => void
    onCancel?: (value: Date) => void
    variant?: 'docked' | 'modal'
}) {
    const { variant = 'docked', ...otherProps } = props
    
    if (variant === 'modal') {
        return <ModalDatePicker {...otherProps} />
    }
    
    return <DockedDatePicker {...otherProps} />
}
