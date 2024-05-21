import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import MatchupSlider from '../../components/MatchupSlider';
import { MatchupData } from '../../interfaces/MatchupData';

import { teamsNames } from '../../constants/teamNames';
import axios from 'axios';
import { Alert, CircularProgress, Grid } from '@mui/material';
import { orderedPerentile, orderedPerentileCached } from '../../constants/routes';


/**
 * This matchups page allows users to compare two teams based off opposing stats, and orders these
 * comparisons based on biggest percentile differences.
 * @returns 
 */
function Prediction() {

  const [formVisible, setFormVisible] = useState(true)
  const [progressVisible, setProgressVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [team1, setTeam1] = useState("Waiting On Team 1 Choice")
  const [team2, setTeam2] = useState("Waiting On Team 2 Choice")
  const [year, setYear] = useState("")
  const [errMessage, setErrorMessage] = useState("Error")
  const [data, setData] = useState<MatchupData[]>([])
  const [team1image, setTeam1Image] = useState("nba-logo.png")
  const [team2image, setTeam2Image] = useState("nba-logo.png")
  const [imageClass, setImageClass] = useState(styles.nothing)

  function changeTeam1(e: ChangeEvent<HTMLSelectElement>) {
    let newTeam: string = e.target.value;
    let newTeamImage: string = newTeam.replace(/ /g,"_")
    newTeamImage = newTeamImage.concat('.png')
    setTeam1(newTeam)
    setTeam1Image(newTeamImage)
    if(newTeam === ""){
      setTeam1Image("nba-logo.png")
      setTeam1("Waiting On Team 1 Choice")
    }
  }

  function changeTeam2(e: ChangeEvent<HTMLSelectElement>) {
    let newTeam: string = e.target.value;
    let newTeamImage: string = newTeam.replace(/ /g,"_")
    newTeamImage = newTeamImage.concat('.png')
    setTeam2(newTeam)
    setTeam2Image(newTeamImage)
    if(newTeam === ""){
      setTeam2Image("nba-logo.png")
      setTeam2("Waiting On Team 2 Choice")
    }
  }

  function changeYear(e: ChangeEvent<HTMLSelectElement>) {
    setYear(e.target.value)
  }

  function onSubmit() {
    if (!(team1 !== "" && team2 !== "")) {
      throwEmptyInputError();
    } else if (team1 === team2) {
      throwDuplicateTeamError();
    } else {
      getData();
    }
  }

  // Gets data from route that uses redis cache. If it fails it uses route that doesnt have cache
  function getData() {
    setFormVisible(false)
    setProgressVisible(true)
    setErrorVisible(false)
    axios.post(process.env.REACT_APP_API_URL + orderedPerentileCached, {
      team1: team1,
      team2: team2,
      year: "2023"
    })
    .then((response) => {
      setProgressVisible(false)
      setSuccessVisible(true)
      setData(response.data.statistics)
      setImageClass(styles.teamName)
    })
    .catch((error) => {
      console.log(error)
      getUncachedData();
    })
  }

  function getUncachedData() {
    axios.post(process.env.REACT_APP_API_URL + orderedPerentile, {
      team1: team1,
      team2: team2,
      year: "2023"
    })
    .then((response) => {
      setProgressVisible(false)
      setSuccessVisible(true)
      setData(response.data.statistics)
      setImageClass(styles.teamName)
    })
    .catch((error) => {
      setProgressVisible(false)
      setErrorVisible(true)
      let errorMessage = "Error retrieving from Server\n"
      setErrorMessage(errorMessage.concat(error))
    })
  }

  function throwEmptyInputError() {
    setProgressVisible(false)
    setErrorVisible(true)
    setErrorMessage("All fields need to be selected")
  }

  function throwDuplicateTeamError() {
    setProgressVisible(false)
    setErrorVisible(true)
    setErrorMessage("You can't compare the same team")
  }

  return (
    <Layout>
      <div className={styles.prediction}>
        <div className={styles.header}>
          <p>
            Match Prediction
          </p>
        </div>
        {formVisible ? 
          <div>
            <div className={styles.description}>
              <p>
                This is the Prediction feature <br/>
                Please input both teams to see who the winner could be according to our models
              </p>
            </div>
            <Grid container spacing={2} className={styles.input}>
              <Grid container spacing={2} className={styles.input}>
                <Grid item xs={6}>
                  <select onChange={changeTeam1} className={styles.dropdown}>
                    <option value="">Pick a Team</option>
                      {teamsNames.map((teamName) => (
                          <option data-testid="team1-options" key={teamName} value={teamName}>
                            {teamName}
                          </option>
                      ))}
                  </select>
                </Grid>
                <Grid item xs={6}>
                  <select onChange={changeTeam2} className={styles.dropdown}>
                    <option value="">Pick a Team</option>
                      {teamsNames.map((teamName) => (
                        <option data-testid="team2-options" key={teamName} value={teamName}>
                          {teamName}
                        </option>
                      ))}
                  </select>
                </Grid>
              </Grid>
              <Grid container spacing={2} className={styles.input}>
                <Grid item xs={6}>
                  <img src={'/Assets/NBALogos/' + team1image} alt={team1} className={styles.logo} />
                  <div className={styles.teamName}>{team1}</div>
                </Grid>
                <Grid item xs={6}>
                  <img src={'/Assets/NBALogos/' + team2image} alt={team2} className={styles.logo} />
                  <div className={styles.teamName}>{team2}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
                <button onClick={onSubmit} className={styles.submit}>Check Matchup</button>
            </Grid>
          </div>
          :
          null
        }
        {progressVisible ? <CircularProgress /> : null}
        {errorVisible ? 
          <div className={styles.errMessage}>
            <Alert severity='error'>
              {errMessage}
            </Alert>
          </div>
          :
          null
        }
        {successVisible ?
          <Grid container spacing={2} className={imageClass}>
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
          :
          null
        }
        
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
              mean1={sliderData.mean1}
              mean2={sliderData.mean2}
            />
        )}
      </div>
    </Layout>
  );
}

export default Prediction;
