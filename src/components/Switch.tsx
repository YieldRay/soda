export function Switch(props: {
    checked?: boolean
    onChange?: (checked: boolean) => void
    children?: React.ReactNode
    disabled?: boolean
}) {
    return (
        <div
            className="sd-switch"
            data-sd={props.disabled ? 'disabled' : 'enabled'}
            data-sd-checked={props.checked ? 'true' : 'false'}
            data-sd-error={props.error ? 'true' : 'false'}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-switch-thumb">
                <div className="sd-switch-icon">{props.children}</div>
            </div>
        </div>
    )
}
