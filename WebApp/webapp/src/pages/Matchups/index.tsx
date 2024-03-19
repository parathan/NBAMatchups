import React from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';

import { teamsNames } from '../../constants/teamNames';
import { years } from '../../constants/years';

function Matchups() {
  return (
    <Layout>
      <div className={styles.matchups}>
        <div className={styles.header}>
          <p>
            Team Matchups
          </p>
        </div>
        <div className={styles.description}>
          <p>
            This is the Team Matchups feature <br/>
            Please input both teams that you want to compare and the year that you want to use 
          </p>
        </div>
        <div className={styles.input}>
          <select>
            {teamsNames.map( teamName =>
              <option value={teamName}>{teamName}</option>
            )};
          </select>
          <select>
            {teamsNames.map( teamName =>
              <option value={teamName}>{teamName}</option>
            )};
          </select>
          <select>
            {years.map( year =>
              <option value={year}>{year}</option>
            )};
          </select>
        </div>
        <div>
          <button>Check Matchup</button>
        </div>
      </div>
    </Layout>
  );
}

export default Matchups;
