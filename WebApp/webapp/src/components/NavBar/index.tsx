import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
import { Box } from "@mui/material";
import styles from './index.module.css'

import { Link } from "react-router-dom"

/**
 * The NavBar component provides navigation links to different pages of the application. 
 * It utilizes the react-pro-sidebar library to create a sidebar menu with clickable 
 * items that direct users to various sections of the application.
 * @returns 
 */
function NavBar() {
    return (
        // https://codesandbox.io/p/sandbox/react-dashboard-pnm6fh?file=%2Fsrc%2Fpages%2Fglobal%2Fsidebar%2FMyProSidebar.jsx%3A51%2C6-51%2C9

        <Sidebar
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: '#444444',
                    color: '#dddddd',
                },
            }}
        >
            <Menu>
                <MenuItem component={<Link to="/" />}>Home</MenuItem>
                <MenuItem component={<Link to="/matchups" />}>Team Matchups</MenuItem>
                <MenuItem component={<Link to="/predictions" />}>Win/Loss Prediction</MenuItem>
                <MenuItem component={<Link to="/dashboard" />}>Dashboard</MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default NavBar;