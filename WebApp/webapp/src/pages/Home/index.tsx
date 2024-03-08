import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

function Home() {

  const navigate = useNavigate();

    function handleNavigate(route: string) {
        navigate(route)
    }

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
          <p>
            Welcome to NBAMatchups
          </p>
      </header>
      <div className={styles.features}>
          <button className={styles.featureButton} onClick={() => handleNavigate("/matchups")}>
            Team Matchups
          </button>
          <button className={styles.featureButton} onClick={() => handleNavigate("/predictions")}>
            Win/Loss Prediction
          </button>
      </div>
    </div>
  );
}

export default Home;
