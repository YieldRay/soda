import { DockedDatePicker } from './DockedDatePicker'

/**
 * TODO: not fully implemented yet!
 */
export function DatePicker(props: {
    initDate?: Date
    onOK?: (value: Date) => void
    onCancel?: (value: Date) => void
    sd?: 'docked'
}) {
    return <DockedDatePicker {...props} />
}
