import { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from "../../components/Layout/Layout";
import { Alert, CircularProgress, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

import axios from 'axios';
import { TotalTeamData, TeamData } from '../../interfaces/TotalTeamData';
import { ChartFormat } from '../../interfaces/ChartFormat';
import { teamsNames } from '../../constants/teamNames';
import { statsArray } from '../../constants/statArray';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { statsMap } from '../../constants/statDictionary';
import { allTeamsMicroservice } from '../../constants/routes';
import colours from '../../constants/colours';
import { getAPIURL } from '../../config/config';

const testData: ChartFormat = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
        {
            label: "Data",
            backgroundColor: colours.RED, // Setting up the background color for the dataset
            borderColor: colours.RED,
            data: []
        },
        {
            label: "League Average",
            backgroundColor: colours.BLUE, // Setting up the background color for the dataset
            borderColor: colours.BLUE,
            data: []
        }
    ]
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                color: colours.P_FONT_COLOUR,
                font: {
                    size: 14,
                    weight: 500
                }
            }
        },
        title: {
            display: false,
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false
            },
            ticks: {
                color: colours.P_FONT_COLOUR,
                font: {
                    size: 12,
                    weight: 500
                }
            },
        },
        y: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false
            },
            ticks: {
                color: colours.P_FONT_COLOUR,
                font: {
                    size: 12,
                    weight: 500
                }
            },
        }
    },
};


/**
 * This Dashboard page is used to show the trends of a team's stats over the past few years, and compare them to the league average for that 
 * stat over the same time period. It take an API call from the /teams/allTeams route to get the data, and use the ChartJS library to
 * display this data.
 * @returns 
 */
function Dashboard() {

    const [data, setData] = useState<TotalTeamData[]>([]) // Total Data to be fetched
    const [meanData, setMeanData] = useState<TotalTeamData>() // Mean Data will be saved seperately to be accessed more efficiently
    const [progress, setProgress] = useState(true) // For progress bar
    const [error, setError] = useState(false) // For Error message if error fetching data
    const [errMessage, setErrorMessage] = useState("Error")
    // TODO #5
    const startYear: number = 2019;
    const endYear: number = 2023;
    const years: string[] = ["2019","2020","2021","2022","2023"]
    const [team, setTeam] = useState("") // The team name who's data will be displayed
    const [field, setField] = useState("") // The team's field name that will be displayed
    const [chartData, setChartData] = useState<ChartFormat>(testData)

    // Intended that useEffect runs once, as empty array given means that it only updates once when page renders.
    // In development, it will run twice due to strict mode being on. This won't happen in production, however.
    // https://byby.dev/useeffect-run-twice
    useEffect(() => {
        // Gets data from route that uses redis cache. If it fails it uses route that doesnt have cache
        const getCachedData = async () => {
            axios.post(getAPIURL() + allTeamsMicroservice, {
                startYear: startYear,
                endYear: endYear
            })
            .then((response) => {
                setData(response.data.data)
                setProgress(false)
    
                let meanData: TotalTeamData | undefined = response.data.data.find((givenTeam: { teamname: string; }) => {
                    return givenTeam.teamname === "MEAN"
                })
                setMeanData(meanData)
            })
            .catch((error) => {
                setProgress(false)
                setError(true)
                let errorMessage = "Error retrieving from Server\n"
                setErrorMessage(errorMessage.concat(error))
            })
        }

        getCachedData();
        
    }, []) // empty array so this only updates once on render

    function establishData(team: string, field: string) {
        let labelName = statsMap.get(field) || ""
        let teamData: TotalTeamData | undefined = data.find(givenTeam => {
            return givenTeam.teamname === team
        })

        let fieldData: number[] = []
        teamData?.stats.forEach(function (teamStat) {
            fieldData.push(Number(teamStat[field as keyof TeamData]))
            // setDisplayData(oldArray => [...oldArray, Number(yearlyStat.yearStats[field as keyof TeamData])])
        })

        let averageData: number[] = []
        meanData?.stats.forEach(function (meanStat) {
            averageData.push(Number(meanStat[field as keyof TeamData]))
            // setDisplayData(oldArray => [...oldArray, Number(yearlyStat.yearStats[field as keyof TeamData])])
        })

        let newChart: ChartFormat = {
            labels: years,
            datasets: [
                {
                    label: labelName,
                    backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
                    borderColor: "rgb(255, 99, 132)",
                    data: fieldData
                },
                {
                    label: "League Average",
                    backgroundColor: "rgb(53, 162, 235)", // Setting up the background color for the dataset
                    borderColor: "rgba(53, 162, 235, 0.5)",
                    data: averageData
                }
            ]
        }
        setChartData(newChart)
    }

    function changeTeam(e: ChangeEvent<HTMLSelectElement>) {
        let team = e.target.value // needs to be seperate as set functions are async, so can't use them in function
        setTeam(team)
        if (field !== "") {
            establishData(team, field)
        }
    }
    
    function changeField(e: ChangeEvent<HTMLSelectElement>) {
        let field = e.target.value // needs to be seperate as set functions are async, so can't use them in function
        setField(field)
        if (team !== "") {
            establishData(team, field)
        }
    }

    return (
        <Layout>
            <motion.div 
                className={styles.dashboard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h2" className={styles.header}>
                    Statistical Dashboard
                </Typography>
                
                {progress && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress size={60} />
                    </Box>
                )}
                
                {error && (
                    <div className={styles.errMessage}>
                        <Alert severity='error' sx={{ borderRadius: 2 }}>
                            {errMessage}
                        </Alert>
                    </div>
                )}
                
                {!error && !progress && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Grid container spacing={3} className={styles.input}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: 'var(--text-secondary)' }}>
                                    Select Team
                                </Typography>
                                <select 
                                    onChange={changeTeam} 
                                    className={styles.dropdown}
                                    value={team}
                                >
                                    <option value="">Choose a team</option>
                                    {teamsNames.map(teamName => (
                                        <option key={teamName} value={teamName}>{teamName}</option>
                                    ))}
                                </select>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: 'var(--text-secondary)' }}>
                                    Select Statistic
                                </Typography>
                                <select 
                                    onChange={changeField} 
                                    className={styles.dropdown}
                                    value={field}
                                >
                                    <option value="">Choose a statistic</option>
                                    {statsArray.map(stat => (
                                        <option key={stat[0]} value={stat[0]}>{stat[1]}</option>
                                    ))}
                                </select>
                            </Grid>
                        </Grid>

                        {team && field && (
                            <motion.div 
                                className={styles.chartContainer}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Line options={options} data={chartData}/>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </Layout>
    )
}

export default Dashboard;