import { ReactNode } from "react"
import styles from './index.module.css';

import NavBar from "../NavBar"

/**
 * The layout component is used to integrate the given children component with the navbar to create pages that have the content
 * of the chidlren component and the navigation provided by the navbar.
 * @param children
 * @returns 
 */
function Layout({ children }: {
    children: ReactNode
}) {
    return (
        <div className={styles.layout}>
            <div className={styles.navbar} data-testid='navbar'>
                <NavBar />
            </div>
            <div className={styles.children} data-testid='child'>
                {children}
            </div>
        </div>
    )
}

export default Layout;