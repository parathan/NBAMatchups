import React from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';

function Matchups() {
  return (
    <Layout>
      <div className={styles.homePage}>
        <header className={styles.header}>
          <p>
            Welcome to NBAMatchups
          </p>
        </header>
        <header className={styles.features}>
          <p>
            Team Matchups
          </p>
          <p>
            Win/Loss Prediction
          </p>
        </header>
      </div>
    </Layout>
  );
}

export default Matchups;
