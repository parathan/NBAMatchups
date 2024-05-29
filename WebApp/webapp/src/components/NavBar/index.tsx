import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaHome, FaClipboardList, FaChartBar, FaTachometerAlt, FaBuilding } from 'react-icons/fa';
import styles from './index.module.css';

type MenuItemType = 'home' | 'matchups' | 'predictions' | 'dashboard'; // Define the type of menu items

function NavBar() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType>('home'); // Initialize selected menu item

  const handleMenuItemClick = (menuItem: MenuItemType) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <>
      <Box 
        className={collapsed ? styles.collapsedOverlay : styles.expandedOverlay}
        onMouseEnter={() => setCollapsed(false)} 
        onMouseLeave={() => setCollapsed(true)}
      >
        <Sidebar
          collapsed={collapsed}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#444444',
              color: '#dddddd',
              height: '100vh',
            },
          }}
        >
          {/* Company Info */}
          <Box className={styles.companyInfo}>
            <FaBuilding size={30} />
            {!collapsed && <Typography variant="h6">NBAnalytics</Typography>}
          </Box>
          
          {/* Menu Subtitle or Gray Line */}
          {!collapsed ? (
            <Box className={styles.menuSubtitle}>
              <Typography variant="subtitle1">Menu</Typography>
            </Box>
          ) : (
            <div className={styles.grayLine} />
          )}

          {/* Menu Items */}
          <Menu>
            <MenuItem 
              icon={<FaHome size={20} />} 
              component={<Link to="/" />} 
              className={selectedMenuItem === 'home' ? styles.activeMenuItem : ''}
              onClick={() => handleMenuItemClick('home')}
            >
              Home
            </MenuItem>
            <MenuItem 
              icon={<FaClipboardList size={20} />} 
              component={<Link to="/matchups" />} 
              className={selectedMenuItem === 'matchups' ? styles.activeMenuItem : ''}
              onClick={() => handleMenuItemClick('matchups')}
            >
              Team Matchups
            </MenuItem>
            <MenuItem 
              icon={<FaChartBar size={20} />} 
              component={<Link to="/predictions" />} 
              className={selectedMenuItem === 'predictions' ? styles.activeMenuItem : ''}
              onClick={() => handleMenuItemClick('predictions')}
            >
              Win/Loss Prediction
            </MenuItem>
            <MenuItem 
              icon={<FaTachometerAlt size={20} />} 
              component={<Link to="/dashboard" />} 
              className={selectedMenuItem === 'dashboard' ? styles.activeMenuItem : ''}
              onClick={() => handleMenuItemClick('dashboard')}
            >
              Dashboard
            </MenuItem>
          </Menu>
        </Sidebar>
      </Box>
      { !collapsed && <div className={styles.overlay} /> }
    </>
  );
}

export default NavBar;