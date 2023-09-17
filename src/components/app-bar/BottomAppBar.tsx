import './app-bar.scss'

/**
 * @specs https://m3.material.io/components/bottom-app-bar/specs
 */
export function BottomAppBar(props: {
    children?: React.ReactNode
    fixed?: boolean
}) {
    return (
        <div
            className="sd-bottom_app_bar"
            style={
                props.fixed
                    ? { position: 'fixed', left: '0', bottom: '0' }
                    : undefined
            }
        >
            {props.children}
        </div>
    )
}
