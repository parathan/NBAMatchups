import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';

import { teamsNames } from '../../constants/teamNames';
import { years } from '../../constants/years';
import axios from 'axios';

function Matchups() {

  const [formVisible, setFormVisible] = useState(true)
  const [progressVisible, setProgressVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [team1, setTeam1] = useState("")
  const [team2, setTeam2] = useState("")
  const [year, setYear] = useState("")

  function changeTeam1(e: ChangeEvent<HTMLSelectElement>) {
    setTeam1(e.target.value)
  }

  function changeTeam2(e: ChangeEvent<HTMLSelectElement>) {
    setTeam2(e.target.value)
  }

  function changeYear(e: ChangeEvent<HTMLSelectElement>) {
    setYear(e.target.value)
  }

  function onSubmit() {
    setFormVisible(false)
    setProgressVisible(true)
    team1 !== "" && team2 !== "" && year !== "" ? getData() : throwInputError()
  }

  function getData() {
    axios.post('http://localhost:5050/teams/OrderedPercentile', {
      team1: team1,
      team2: team2,
      year: year
    })
    .then((response) => {
      console.log(response)
      setProgressVisible(false)
      setSuccessVisible(true)
    })
    .catch((error) => {
      console.log(error)
      setProgressVisible(false)
      setErrorVisible(true)
    })
  }

  function throwInputError() {
    setProgressVisible(false)
    setErrorVisible(true)
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
            <select onChange={changeTeam1}>
              <option value="">Pick a Team</option>
              {teamsNames.map( teamName =>
                <option value={teamName}>{teamName}</option>
              )};
            </select>
            <select onChange={changeTeam2}>
              <option value="">Pick a Team</option>
              {teamsNames.map( teamName =>
                <option value={teamName}>{teamName}</option>
              )};
            </select>
            <select onChange={changeYear}>
            <option value="">Pick a Year</option>
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
        <div className={`${styles.description} ${errorVisible ? styles.notHidden : styles.hidden}`}>
          An Err occured
        </div>
        <div className={`${styles.description} ${successVisible ? styles.notHidden : styles.hidden}`}>
          Success
        </div>
      </div>
    </Layout>
  );
}

export default Matchups;
