import { DockedDatePicker } from './DockedDatePicker'

export function DatePicker(props: {
    initDate?: Date
    onOK?: (value: Date) => string
    onCancel?: (value: Date) => string
    sd?: 'docked'
}) {
    return <DockedDatePicker {...props} />
}
