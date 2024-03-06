import React from 'react';
import styles from './index.module.css';

function Matchups() {
  return (
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
  );
}

export default Matchups;
