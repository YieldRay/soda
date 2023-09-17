import './app-bar.scss'

/**
 * @specs https://m3.material.io/components/top-app-bar/specs
 * @warn unimplemented yet!
 */
export function TopAppBar(props: {
    children?: React.ReactNode
    fixed?: boolean
}) {
    return (
        <div
            className="sd-top_app_bar"
            style={
                props.fixed
                    ? { position: 'fixed', left: '0', top: '0' }
                    : undefined
            }
        >
            {props.children}
        </div>
    )
}
