import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from './index.module.css'

function NavBar() {
    return (
        <Sidebar
            className={styles.navbar}
        >
            <Menu>
                <MenuItem>Home</MenuItem>
                <MenuItem>Team Matchups</MenuItem>
                <MenuItem>Win/Loss Prediction</MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default NavBar;