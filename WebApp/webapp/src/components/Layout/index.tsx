import { Box } from '@mui/material';
import NavBar from '../NavBar';
import styles from './index.module.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box className={styles.layout}>
      <NavBar />
      <Box component="main" className={styles.main}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 