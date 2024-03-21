import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import MatchupSlider from '../../components/MatchupSlider';

import { teamsNames } from '../../constants/teamNames';
import { years } from '../../constants/years';
import axios from 'axios';
import { Grid, Slider } from '@mui/material';

interface Data {
  field1: string,
  field2: string,
  PercentileDifference: string,
  absPercentileDifference: number,
  team1Percentile1: number,
  team2Percentile_Op: number,
  TraditionalDifference: string,
  team1Trad: number,
  team2Trad_Op: number
}

function Matchups() {

  const [formVisible, setFormVisible] = useState(true)
  const [progressVisible, setProgressVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [team1, setTeam1] = useState("")
  const [team2, setTeam2] = useState("")
  const [year, setYear] = useState("")
  const [errMessage, setErrorMessage] = useState("Error")
  const [data, setData] = useState<Data[]>([])

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
    team1 !== "" && team2 !== "" && year !== "" ? getData() : throwInputError()
  }

  function getData() {
    setFormVisible(false)
    setProgressVisible(true)
    axios.post('http://localhost:5050/teams/OrderedPercentile', {
      team1: team1,
      team2: team2,
      year: year
    })
    .then((response) => {
      setProgressVisible(false)
      setErrorVisible(false)
      setSuccessVisible(true)
      setData(response.data.statistics)
    }).then(() => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
      setProgressVisible(false)
      setErrorVisible(true)
      let errorMessage = "Error retrieving from Server\n"
      setErrorMessage(errorMessage.concat(error))
    })
  }

  function throwInputError() {
    setProgressVisible(false)
    setErrorVisible(true)
    setErrorMessage("All fields need to be selected")
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
          {errMessage}
        </div>
        <div className={`${styles.description} ${successVisible ? styles.notHidden : styles.hidden}`}>
          Success
        </div>
        <MatchupSlider/>
      </div>
    </Layout>
  );
}

export default Matchups;
