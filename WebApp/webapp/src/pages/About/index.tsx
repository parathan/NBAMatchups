import styles from './index.module.css';

import Layout from '../../components/Layout/Layout';
import { Grid } from '@mui/material';


function About() {

  return (
    <Layout>
      <div className={styles.homePage}>
        <header className={styles.header}>
            <p>
              About
            </p>
        </header>
        <div className={styles.features}>
          <Grid container spacing={2} rowGap={10}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} className={styles.description}>
                Nba Matchups is an application designed to provide data analytics for nba basketball
                teams such as comparison between teams, predictions, and more. This application was created
                by Parathan Vakeesan and Jaakulan Subeethakumar.
            </Grid>
            <Grid item xs={4}></Grid>

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

export default About;
