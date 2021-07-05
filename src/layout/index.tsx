import { LayoutProps } from "./index.types"

export const Layout: React.FC<LayoutProps> = ({barItems, children}) => {
    return <div>Layout
        {children}
    </div>
}