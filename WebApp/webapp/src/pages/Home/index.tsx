import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import { Grid, Typography, Box } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { motion } from 'framer-motion';

/**
 * The Home component is designed to be the landing page of that application. Provides descriptions
 * and links to the other features/pages
 * @returns 
 */
function Home() {
  const navigate = useNavigate();

  function handleNavigate(route: string) {
    navigate(route);
  }

  return (
    <Layout>
      <div className={styles.homePage}>
        <div className={styles.header}>
          <h1>NBA Matchup Analysis</h1>
          <p>Explore team statistics, compare matchups, and predict game outcomes</p>
        </div>

        <Grid container spacing={6} rowSpacing={20} className={styles.features}>
          {/* Team Matchups Section */}
          <Grid item xs={12} md={5}>
            <Box className={styles.description}>
              <Typography variant="h6" gutterBottom>
                Team Matchups
              </Typography>
              <Typography variant="body1">
                Compare two teams based on their statistics and see how they stack up against each other.
                This feature allows you to analyze team performance across various metrics.
              </Typography>
              <button className={styles.featureButton} onClick={() => handleNavigate("/matchups")}>
                Go to Team Matchups
              </button>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src='/static/Screenshots/matchupsPage.png' 
                alt={"MatchupsPage"} 
                className={styles.screenshot}
              />
            </motion.div>
          </Grid>

          {/* Win/Loss Prediction Section */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src='/static/Screenshots/predictionsPage.png' 
                alt={"PredictionsPage"} 
                className={styles.screenshot}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box className={styles.description}>
              <Typography variant="h6" gutterBottom>
                Win/Loss Prediction
              </Typography>
              <Typography variant="body1">
                This prediction feature is based on a model that uses previous basketball data and the
                correlation these statistics have with a team's winning or losing. Using this, given two
                team's data, this feature predicts which team will win the matchup.
              </Typography>
              <button className={styles.featureButton} onClick={() => handleNavigate("/predictions")}>
                Go to Win/Loss Prediction
              </button>
            </Box>
          </Grid>

          {/* Statistical Dashboard Section */}
          <Grid item xs={12} md={5}>
            <Box className={styles.description}>
              <Typography variant="h6" gutterBottom>
                Statistical Dashboard
              </Typography>
              <Typography variant="body1">
                View detailed statistical trends for any team over time. This dashboard provides
                comprehensive insights into team performance across various metrics.
              </Typography>
              <button className={styles.featureButton} onClick={() => handleNavigate("/dashboard")}>
                Go to Statistical Dashboard
              </button>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src='/static/Screenshots/dashboardPage.png' 
                alt={"DashboardPage"} 
                className={styles.screenshot}
              />
            </motion.div>
          </Grid>
        </Grid>

        <div className={styles.acknowledgmenet}>
          <Typography variant="h6" gutterBottom>
            Acknowledgement
          </Typography>
          <Typography variant="body1">
            The data that is presented from this website was all taken from basketballreference.com. All raw data was scraped from their website, and then transformed for the purposes of this application. All credit for the raw data goes to them.
          </Typography>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
