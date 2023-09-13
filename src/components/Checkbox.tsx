import { Ripple } from '../utils/Ripple.tsx'

export function Checkbox(props: {
    checked?: boolean
    onChange?: (checked: boolean) => void
    children?: React.ReactNode
    disabled?: boolean
    /**
     * this do not have any functional effect, just change the color
     */
    error?: boolean
}) {
    const checkedIcon = props.children || (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>check</title>
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
            />
        </svg>
    )

    return (
        <Ripple
            className="sd-checkbox"
            data-sd={props.disabled ? 'disabled' : 'enabled'}
            data-sd-checked={props.checked ? 'true' : 'false'}
            data-sd-error={props.error ? 'true' : 'false'}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-checkbox-icon">
                {props.checked && checkedIcon}
            </div>
        </Ripple>
    )
}
