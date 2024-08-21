import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaChartBar, FaTachometerAlt, FaBuilding } from 'react-icons/fa';
import styles from './index.module.css';

type MenuItemType = 'home' | 'matchups' | 'predictions' | 'dashboard';

function NavBar() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType>('home');
  const location = useLocation();

  // Update the selected menu item based on the current path
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelectedMenuItem('home');
        break;
      case '/matchups':
        setSelectedMenuItem('matchups');
        break;
      case '/predictions':
        setSelectedMenuItem('predictions');
        break;
      case '/dashboard':
        setSelectedMenuItem('dashboard');
        break;
      default:
        setSelectedMenuItem('home');
    }
  }, [location.pathname]);

  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#444444',
          color: '#dddddd',
          height: '100vh',
          position: 'fixed',
          width: '26vh'
        },
      }}
    >
      <Box className={styles.companyInfo}>
        <FaBuilding size={30} />
        <Typography variant="h6">NBAnalytics</Typography>
      </Box>
      <Box className={styles.menuSubtitle}>
        <Typography variant="subtitle1">Menu</Typography>
      </Box>
      <Menu>
        <MenuItem 
          icon={<FaHome size={20} />} 
          component={<Link to="/" />} 
          className={selectedMenuItem === 'home' ? styles.activeMenuItem : ''}
          onClick={() => setSelectedMenuItem('home')}
        >
          Home
        </MenuItem>
        <MenuItem 
          icon={<FaClipboardList size={20} />} 
          component={<Link to="/matchups" />} 
          className={selectedMenuItem === 'matchups' ? styles.activeMenuItem : ''}
          onClick={() => setSelectedMenuItem('matchups')}
        >
          Team Matchups
        </MenuItem>
        <MenuItem 
          icon={<FaChartBar size={20} />} 
          component={<Link to="/predictions" />} 
          className={selectedMenuItem === 'predictions' ? styles.activeMenuItem : ''}
          onClick={() => setSelectedMenuItem('predictions')}
        >
          Win/Loss Prediction
        </MenuItem>
        <MenuItem 
          icon={<FaTachometerAlt size={20} />} 
          component={<Link to="/dashboard" />} 
          className={selectedMenuItem === 'dashboard' ? styles.activeMenuItem : ''}
          onClick={() => setSelectedMenuItem('dashboard')}
        >
          Dashboard
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default NavBar;
