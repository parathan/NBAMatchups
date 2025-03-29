import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.css';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Typography, 
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

function NavBar() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Matchups', path: '/matchups' },
    { name: 'Predictions', path: '/predictions' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box className={styles.mobileLogo}>
        <SportsBasketballIcon sx={{ fontSize: '2rem', color: 'var(--accent-color)' }} />
        <Typography variant="h6" className={styles.companyName}>
          NBAnalytics
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            to={item.path}
            className={`${styles.mobileNavItem} ${location.pathname === item.path ? styles.active : ''}`}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      className={styles.appBar}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Section */}
          <Link to="/" className={styles.logoSection}>
            <SportsBasketballIcon sx={{ fontSize: '2rem', color: 'var(--accent-color)' }} />
            <Box className={styles.logoText}>
              <Typography variant="h6" className={styles.companyName}>
                NBAnalytics
              </Typography>
              <Typography variant="caption" className={styles.menuSubtitle}>
                Advanced NBA Statistics
              </Typography>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box className={styles.navLinks}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  className={`${styles.navButton} ${location.pathname === item.path ? styles.active : ''}`}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={styles.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: 'var(--surface-color)',
            borderLeft: '1px solid var(--border-color)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
