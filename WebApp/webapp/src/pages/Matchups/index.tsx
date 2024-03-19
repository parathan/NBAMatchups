import React, { useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';

import { teamsNames } from '../../constants/teamNames';
import { years } from '../../constants/years';

function Matchups() {

  const [formVisible, setFormVisible] = useState(true)
  const [progressVisible, setProgressVisible] = useState(false)

  function onSubmit() {
    setFormVisible(false)
    setProgressVisible(true)
  }

  return (
    <Layout>
      <div className={styles.matchups}>
        <div className={styles.header}>
          <p>
            Team Matchups
          </p>
        </div>
        <div className={formVisible ? styles.notHidden : styles.hidden}>
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
            <button onClick={onSubmit}>Check Matchup</button>
          </div>
        </div>
        <div className={`${styles.description} ${progressVisible ? styles.notHidden : styles.hidden}`}>
          In Progress
        </div>
      </div>
    </Layout>
  );
}

export default Matchups;
