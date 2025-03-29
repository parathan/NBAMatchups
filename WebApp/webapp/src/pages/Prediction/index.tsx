import { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';

import { teamsNames } from '../../constants/teamNames';
import axios from 'axios';
import { Alert, CircularProgress, Grid } from '@mui/material';
import { predictionMicroservice } from '../../constants/routes';
import { multby100 } from '../../util/Math/math';
import CircularPercentage from '../../components/CircularPercentage';
import { getAPIURL } from '../../config/config';


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
  const [errMessage, setErrorMessage] = useState("Error")
  const [winner, setData] = useState("")
  const [winnerImage, setWinImg] = useState("")
  const [winProb, setWinProb] = useState(0)
  const [team1image, setTeam1Image] = useState("nba-logo.png")
  const [team2image, setTeam2Image] = useState("nba-logo.png")

  const handleRefresh = () => {
    window.location.reload();
  }

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

  function onSubmit() {
    if (team1 === "Waiting On Team 1 Choice" || team2 === "Waiting On Team 2 Choice") {
      throwEmptyInputError();
    } else if (team1 === team2) {
      throwDuplicateTeamError();
    } else {
      getUncachedData();
    }
  }

  function getUncachedData() {
    setFormVisible(false)
    setProgressVisible(true)
    setErrorVisible(false)
    axios.post(getAPIURL() + predictionMicroservice, {
      team1: team1,
      team2: team2,
      year: 2023
    })
    .then((response) => {
      setProgressVisible(false)
      setFormVisible(false)
      setSuccessVisible(true)
      setErrorVisible(false)
      if(response.data.prediction >= 0.50){
        setData(team1)
        setWinImg(team1image)
        setWinProb(multby100(response.data.prediction))
      }
      else{
        setData(team2)
        setWinImg(team2image)
        setWinProb(multby100(1 - response.data.prediction))
      }
    })
    .catch((error) => {
      console.log("catch error")
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
                <button onClick={onSubmit} className={styles.submit}>Predict Winner</button>
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
          <Grid container spacing={1} className={styles.predHeader}>
            <Grid item xs={2.75}></Grid>
            <Grid item xs={3} className={styles.results}>
              <div className={styles.individualResults}>
                <p className={styles.individualResultsHeader}>Winner</p>
                <img src={'/Assets/NBALogos/' + winnerImage} alt={winner} className={styles.logoResult}/><br/>
                <p>{winner} are expected to win!</p>
              </div>
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={3} className={styles.results}>
              <div className={styles.individualResults}>
                <p className={styles.individualResultsHeader}>Confidence Score</p>
                <CircularPercentage percentage={winProb} />
                <p>{winner} is predicted to win with a confidence of {winProb}%!</p>
              </div>
            </Grid>
            <Grid item xs={2.75}></Grid>
            <Grid item xs={12}>
              <button onClick={handleRefresh} className={styles.submit}>
                Try Another Prediction!
              </button>
            </Grid>
            
          </Grid>
          :
          null
        }
      </div>
    </Layout>
  );
}

export default Prediction;
