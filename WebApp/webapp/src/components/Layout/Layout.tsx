import React, { ReactElement, ReactNode } from "react"
import styles from './index.module.css';

import NavBar from "../NavBar"


function Layout({ children }: {
    children: ReactNode
}) {
    return (
        <div className={styles.layout}>
            <div className={styles.navbar}>
                <NavBar />
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default Layout;