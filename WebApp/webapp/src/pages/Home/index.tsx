import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import { Grid, Typography, Box } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';

/**
 * The Home component is designed to be the landing page of that application. Provides descriptions
 * and links to the other features/pages
 * @returns 
 */
function Home() {
  const navigate = useNavigate();
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages(prev => {
              const newSet = new Set(prev);
              newSet.add(index);
              return Array.from(newSet);
            });
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const elements = document.querySelectorAll(`.${styles.screenshot}`);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function handleNavigate(route: string) {
    navigate(route);
  }

  return (
    <Layout>
      <div className={styles.homePage}>
        <header className={styles.header}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <SportsBasketballIcon sx={{ fontSize: '3rem', color: 'var(--secondary-color)' }} />
            <Typography variant="h1">Welcome to NBAnalytics</Typography>
          </Box>
        </header>
        <div className={styles.features}>
          <Grid container spacing={6} rowGap={12}>
            {/* Team Matchups Section */}
            <Grid item xs={12} md={5}>
              <Box className={styles.description}>
                <Typography variant="h6" gutterBottom>
                  Team Matchups
                </Typography>
                <Typography variant="body1">
                  Matchups is a feature that allows you to compare two teams based on their statistics
                  in a given season. Just select the two teams you want to compare, and the season
                  that you want to use. However, instead of comparing both teams on their same stats,
                  this feature compares them based on opposing stats, and orders them by biggest
                  differences. For example, if Team A is in the bottom percentile for defensive
                  rebounding and Team B is in the top percentile of offensive rebounding, these are 
                  the stats that would be compared and shown near the top as the difference is the 
                  greatest. This feature would show the list of these opposing stats and order them based
                  on these differences.
                </Typography>
                <button className={styles.featureButton} onClick={() => handleNavigate("/matchups")}>
                  Go to Team Matchups
                </button>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <img 
                src='/static/Screenshots/matchupsPage.png' 
                alt={"MatchupsPage"} 
                className={styles.screenshot}
                data-index={0}
              />
            </Grid>

            {/* Win/Loss Prediction Section */}
            <Grid item xs={12} md={7}>
              <img 
                src='/static/Screenshots/predictionsPage.png' 
                alt={"PredictionsPage"} 
                className={styles.screenshot}
                data-index={1}
              />
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
                  The Dashboard feature visualizes the trends teams have had in the past few years for the
                  various statistical categories that have been used in this platform. It also allows you to
                  see the comparison between the teams statistical trends for a particular stat against the 
                  league average for this stat over the years.
                </Typography>
                <button className={styles.featureButton} onClick={() => handleNavigate("/dashboard")}>
                  Go to Dashboard
                </button>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <img 
                src='/static/Screenshots/dashboardPage.png' 
                alt={"DashboardPage"} 
                className={styles.screenshot}
                data-index={2}
              />
            </Grid>

            {/* Acknowledgement Section */}
            <Grid item xs={12}>
              <Box className={styles.description}>
                <Typography variant="h6" gutterBottom className={styles.acknowledgmenet}>
                  Acknowledgement
                </Typography>
                <Typography variant="body1">
                  The data that is presented from this website was all taken from basketballreference.com.
                  All raw data was scraped from their website, and then transformed for the purposes of this
                  application. All credit for the raw data goes to them.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
