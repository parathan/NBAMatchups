import { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import { Alert, CircularProgress, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { teamsNames } from '../../constants/teamNames';
import axios from 'axios';
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
        setWinProb(multby100(response.data.prediction))
      }
      else{
        setData(team2)
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
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            Win/Loss Prediction
          </div>
        </div>
        
        <div className={styles.description}>
          <p>
            Enter two teams and a year to predict the winner of their matchup based on historical statistics.
          </p>
        </div>

        {formVisible && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Grid container spacing={3} className={styles.input}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={styles.inputDescription}>
                            Select two teams to see who our AI model predicts will win their matchup
                        </Typography>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" gutterBottom sx={{ color: 'var(--text-secondary)' }}>
                                First Team
                            </Typography>
                            <select 
                                onChange={changeTeam1} 
                                className={styles.dropdown}
                            >
                                <option value="">Choose a team</option>
                                {teamsNames.map(teamName => (
                                    <option key={teamName} value={teamName}>{teamName}</option>
                                ))}
                            </select>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <img src={'/static/NBALogos/' + team1image} alt={team1} className={styles.logo} />
                                <div className={styles.teamName}>{team1}</div>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" gutterBottom sx={{ color: 'var(--text-secondary)' }}>
                                Second Team
                            </Typography>
                            <select 
                                onChange={changeTeam2} 
                                className={styles.dropdown}
                            >
                                <option value="">Choose a team</option>
                                {teamsNames.map(teamName => (
                                    <option key={teamName} value={teamName}>{teamName}</option>
                                ))}
                            </select>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <img src={'/static/NBALogos/' + team2image} alt={team2} className={styles.logo} />
                                <div className={styles.teamName}>{team2}</div>
                            </motion.div>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <motion.button 
                            onClick={onSubmit} 
                            className={styles.submit}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Predict Winner
                        </motion.button>
                    </Grid>
                </Grid>
            </motion.div>
        )}
        
        {progressVisible && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress size={60} />
            </Box>
        )}
        
        {errorVisible && (
            <motion.div 
                className={styles.errMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Alert severity='error' sx={{ borderRadius: 2 }}>
                    {errMessage}
                </Alert>
            </motion.div>
        )}
        
        {successVisible && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Grid container spacing={4} className={styles.predHeader}>
                    <Grid item xs={12}>
                        <motion.div 
                            className={styles.results}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className={styles.individualResults}>
                                <Typography variant="h4" className={styles.individualResultsHeader}>
                                    Match Prediction Results
                                </Typography>
                                
                                <div className={styles.vsContainer}>
                                    <motion.div
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <img 
                                            src={'/static/NBALogos/' + team1image} 
                                            alt={team1} 
                                            className={styles.teamLogo}
                                            style={{ opacity: winner === team1 ? 1 : 0.6 }}
                                        />
                                    </motion.div>
                                    
                                    <Typography variant="h5" className={styles.vsText}>
                                        VS
                                    </Typography>
                                    
                                    <motion.div
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <img 
                                            src={'/static/NBALogos/' + team2image} 
                                            alt={team2} 
                                            className={styles.teamLogo}
                                            style={{ opacity: winner === team2 ? 1 : 0.6 }}
                                        />
                                    </motion.div>
                                </div>

                                <motion.div 
                                    className={styles.winnerCard}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <Typography variant="h5" sx={{ color: 'var(--text-secondary)' }}>
                                        Predicted Winner
                                    </Typography>
                                    <Typography className={styles.winnerTeamName}>
                                        {winner}
                                    </Typography>
                                    <CircularPercentage percentage={winProb} />
                                    <Typography className={styles.confidenceValue}>
                                        {winProb}% Confidence
                                    </Typography>
                                </motion.div>
                            </div>
                        </motion.div>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <motion.button 
                            onClick={handleRefresh} 
                            className={styles.submit}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Try Another Prediction
                        </motion.button>
                    </Grid>
                </Grid>
            </motion.div>
        )}
      </div>
    </Layout>
  );
}

export default Prediction;
