import React from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';

function Matchups() {
  return (
    <Layout>
      <div className={styles.homePage}>
        <header className={styles.header}>
          <p>
            Team Matchups
          </p>
        </header>
        <header className={styles.features}>
          <p>
            This is the Team Matchups feature
          </p>
        </header>
      </div>
    </Layout>
  );
}

export default Matchups;
