import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import MatchupSlider from '../../components/MatchupSlider';
import { MatchupData } from '../../interfaces/data';

import { teamsNames } from '../../constants/teamNames';
import { years } from '../../constants/years';
import axios from 'axios';
import { Grid } from '@mui/material';


function Matchups() {

  const [formVisible, setFormVisible] = useState(true)
  const [progressVisible, setProgressVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [team1, setTeam1] = useState("nba-logo.png")
  const [team2, setTeam2] = useState("nba-logo.png")
  const [year, setYear] = useState("")
  const [errMessage, setErrorMessage] = useState("Error")
  const [data, setData] = useState<MatchupData[]>([])
  const [team1image, setTeam1Image] = useState("")
  const [team2image, setTeam2Image] = useState("")
  const [imageClass, setImageClass] = useState(styles.nothing)

  function changeTeam1(e: ChangeEvent<HTMLSelectElement>) {
    let newTeam: string = e.target.value;
    let newTeamImage: string = newTeam.replace(/ /g,"_")
    newTeamImage = newTeamImage.concat('.png')
    setTeam1(newTeam)
    setTeam1Image(newTeamImage)
  }

  function changeTeam2(e: ChangeEvent<HTMLSelectElement>) {
    let newTeam: string = e.target.value;
    let newTeamImage: string = newTeam.replace(/ /g,"_")
    newTeamImage = newTeamImage.concat('.png')
    setTeam2(newTeam)
    setTeam2Image(newTeamImage)
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
      setImageClass(styles.teamName)
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
          <Grid container spacing={2} className={styles.input}>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={3}>
              <select onChange={changeTeam1} className={styles.dropdown}>
                <option value="">Pick a Team</option>
                {teamsNames.map( teamName =>
                  <option value={teamName}>{teamName}</option>
                )};
              </select>
            </Grid>
            <Grid item xs={3}>
              <select onChange={changeTeam2} className={styles.dropdown}>
                <option value="">Pick a Team</option>
                {teamsNames.map( teamName =>
                  <option value={teamName}>{teamName}</option>
                )};
              </select>
            </Grid>
            <Grid item xs={3}>
              <select onChange={changeYear} className={styles.dropdown}>
              <option value="">Pick a Year</option>
                {years.map( year =>
                  <option value={year}>{year}</option>
                )};
              </select>
            </Grid>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={12}>
              <button onClick={onSubmit} className={styles.submit}>Check Matchup</button>
            </Grid>
          </Grid>
          <div>
            
          </div>
        </div>
        <div className={`${styles.description} ${progressVisible ? styles.notHidden : styles.hidden}`}>
          In Progress
        </div>
        <div className={`${styles.description} ${errorVisible ? styles.notHidden : styles.hidden}`}>
          {errMessage}
        </div>
        <Grid container spacing={2} className={`${imageClass} ${successVisible ? styles.notHidden : styles.hidden}`}>
          <Grid item xs={4}>
            {team1}<br/>
            <img src={'/Assets/NBALogos/' + team1image} alt={team1} className={styles.logo}/>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            {team2}<br/>
            <img src={'/Assets/NBALogos/' + team2image} alt={team2} className={styles.logo}/>
          </Grid>
        </Grid>
        {
          data.map( sliderData =>
            <MatchupSlider 
              field1={sliderData.field1}
              field2={sliderData.field2}
              PercentileDifference={sliderData.PercentileDifference}
              absPercentileDifference={sliderData.absPercentileDifference} 
              team1Percentile1={sliderData.team1Percentile1} 
              team2Percentile_Op={sliderData.team2Percentile_Op} 
              TraditionalDifference={sliderData.TraditionalDifference} 
              team1Trad={sliderData.team1Trad} 
              team2Trad_Op={sliderData.team2Trad_Op} 
            />
        )};
      </div>
    </Layout>
  );
}

export default Matchups;
