import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

import Layout from '../../components/Layout/Layout';
import { Grid } from '@mui/material';

/**
 * The Home component is designed to be the landing page of that application. Provides descriptions
 * and links to the other features/pages
 * @returns 
 */
function Home() {

  const navigate = useNavigate();

  function handleNavigate(route: string) {
      navigate(route)
  }

  return (
    <Layout>
      <div className={styles.homePage}>
        <header className={styles.header}>
            <p>
              Welcome to NBAnalytics
            </p>
        </header>
        <div className={styles.features}>
          <Grid container spacing={2} rowGap={10}>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={4}>
              <div className={styles.description}>
                Matchups is a feature that allows you to compare two teams based on their statistics
                in a given season. Just select the two teams you want to compare, and the season
                that you want to use. However, instead of comparing both teams on their same stats,
                this feature compares them based on opposing stats, and orders them by biggest
                differences. For example, if Team A is in the bottom percentile for defensive
                rebounding and Team B is in the top percentile of offensive rebounding, these are 
                the stats that would be compared and shown near the top as the difference is the 
                greatest. This feature would show the list of these opposing stats and order them based
                on these differences.
              </div>
              <button className={styles.featureButton} onClick={() => handleNavigate("/matchups")}>
                Go to Team Matchups
              </button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <img src='/Assets/Screenshots/matchupsPage.png' alt={"MatchupsPage"} className={styles.screenshot}/>
            </Grid>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={4}>
              <img src='/Assets/Screenshots/predictionsPage.png' alt={"PredictionsPage"} className={styles.screenshot}/>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <div className={styles.description}>
                This prediction feature is based on a model that uses previous basketball data and the
                correlation these statistics have with a team's winning or losing. Using this, given two
                team's data, this feature predicts which team will win the matchup.
              </div>
              <button className={styles.featureButton} onClick={() => handleNavigate("/predictions")}>
                  Go to Win/Loss Prediction
              </button>
            </Grid>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={4}>
            <div className={styles.description}>
                The Dashboard feature visualizes the trends teams have had in the past few years for the
                various statistical categories that have been used in this platform. It also allows you to
                see the comparison between the teams statistical trends for a particular stat against the 
                league average for this stat over the years.
              </div>
              <button className={styles.featureButton} onClick={() => handleNavigate("/dashboard")}>
                Go to Dashboard
              </button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <img src='/Assets/Screenshots/dashboardPage.png' alt={"DashboardPage"} className={styles.screenshot}/>
            </Grid>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              
              
              <div className={styles.acknowledgmenet}>
                Acknowledgement
              </div>
              <div className={styles.description}>
                The data that is presented from this website was all taken from basketballreference.com.
                All raw data was scraped from their website, and then transformed for the purposes of this
                application. All credit for the raw data goes to them.
              </div>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
