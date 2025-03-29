import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import MatchupSlider from '../../components/MatchupSlider';
import { MatchupData } from '../../interfaces/MatchupData';

import { teamsNames } from '../../constants/teamNames';
import { years } from '../../constants/years';
import axios from 'axios';
import { Alert, CircularProgress, Grid } from '@mui/material';
import { orderedPerentileMicroservice } from '../../constants/routes';

import { motion } from "framer-motion";
import { getAPIURL } from '../../config/config';


const variant = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 100 },
};

/**
 * This matchups page allows users to compare two teams based off opposing stats, and orders these
 * comparisons based on biggest percentile differences.
 * @returns 
 */
function Matchups() {

  const [formVisible, setFormVisible] = useState(true)
  const [progressVisible, setProgressVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [team1, setTeam1] = useState("")
  const [team2, setTeam2] = useState("")
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
    if (!(team1 !== "" && team2 !== "" && year !== "")) {
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
    axios.post(getAPIURL() + orderedPerentileMicroservice, {
      team1: team1,
      team2: team2,
      year: parseInt(year)
    })
    .then((response) => {

      console.log(response.data)
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
      <div className={styles.matchups}>
        <div className={styles.header}>
          <p>
            Team Matchups
          </p>
        </div>
        {formVisible ? 
          <div>
            <div className={styles.description}>
              <p>
                This is the Team Matchups feature <br/>
                Please input both teams that you want to compare and the year that you want to use 
              </p>
            </div>
            <Grid container spacing={2} className={styles.input}>
              <Grid item xs={2.25}></Grid>
              <Grid item xs={2.5}>
                <select onChange={changeTeam1} className={styles.dropdown}>
                  <option value="">Pick a Team</option>
                  {teamsNames.map( teamName =>
                    <option data-testid="team1-options" key={teamName} value={teamName}>{teamName}</option>
                  )};
                </select>
              </Grid>
              <Grid item xs={2.5}>
                <select onChange={changeTeam2} className={styles.dropdown}>
                  <option value="">Pick a Team</option>
                  {teamsNames.map( teamName =>
                    <option data-testid="team2-options" key={teamName} value={teamName}>{teamName}</option>
                  )};
                </select>
              </Grid>
              <Grid item xs={2.5}>
                <select onChange={changeYear} className={styles.dropdown}>
                <option value="">Pick a Year</option>
                  {years.map( year =>
                    <option data-testid="year-options" key={year} value={year}>{year}</option>
                  )};
                </select>
              </Grid>
              <Grid item xs={2.25}></Grid>
              <Grid item xs={12}>
                <button onClick={onSubmit} className={styles.submit}>Check Matchup</button>
              </Grid>
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
          data.map( (sliderData, index) =>
            <motion.div
              key={index}
              variants={variant}
              initial="hidden" 
              whileInView="visible"
            >
              <MatchupSlider 
                field1={sliderData.field1}
                field2={sliderData.field2}
                percentile_difference={sliderData.percentile_difference}
                abs_percentile_difference={sliderData.abs_percentile_difference} 
                team1_percentile={sliderData.team1_percentile} 
                team2_op_percentile={sliderData.team2_op_percentile} 
                trad_difference={sliderData.trad_difference} 
                team1_trad={sliderData.team1_trad} 
                team2_op_trad={sliderData.team2_op_trad} 
                mean1={sliderData.mean1}
                mean2={sliderData.mean2}
              />
            </motion.div>
        )}
      </div>
    </Layout>
  );
}

export default Matchups;
