import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box } from "@mui/material";
import styles from './index.module.css'

import { Link } from "react-router-dom"

function NavBar() {
    return (
        // https://codesandbox.io/p/sandbox/react-dashboard-pnm6fh?file=%2Fsrc%2Fpages%2Fglobal%2Fsidebar%2FMyProSidebar.jsx%3A51%2C6-51%2C9
        // <Box
        //     // sx={{
        //     //     position: "fixed",
        //     //     display: "flex",
        //     //     height: "100vh",
        //     //     top: 0,
        //     //     bottom: 0,
        //     //     zIndex: 10000,
        //     // }}
        // >
        //     <Sidebar>
        //         <Menu>
        //             <MenuItem>Home</MenuItem>
        //             <MenuItem>Team Matchups</MenuItem>
        //             <MenuItem>Win/Loss Prediction</MenuItem>
        //         </Menu>
        //     </Sidebar>
        // </Box>

        <Sidebar>
            <Menu>
                <MenuItem component={<Link to="/" />}>Home</MenuItem>
                <MenuItem component={<Link to="/matchups" />}>Team Matchups</MenuItem>
                <MenuItem component={<Link to="/predictions" />}>Win/Loss Prediction</MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default NavBar;