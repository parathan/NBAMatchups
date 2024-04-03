import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from "../../components/Layout/Layout";
import { CircularProgress, Grid } from '@mui/material';

import axios from 'axios';
import { totalTeamData, TeamData } from '../../interfaces/TotalTeamData';
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

const testData: ChartFormat = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
        {
            label: "Data",
            backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
            borderColor: "rgb(255, 99, 132)",
            data: []
        },
        {
            label: "League Average",
            backgroundColor: "rgb(53, 162, 235)", // Setting up the background color for the dataset
            borderColor: "rgba(53, 162, 235, 0.5)",
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
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };



function Dashboard() {

    const [data, setData] = useState<totalTeamData[]>([]) // Total Data to be fetched
    const [meanData, setMeanData] = useState<totalTeamData>() // Mean Data will be saved seperately to be accessed more efficiently
    const [progress, setProgress] = useState(true) // For progress bar
    const [error, setError] = useState(false) // For Error message if error fetching data
    // TODO #5
    const [startYear, setStartYear] = useState(2019) // Start year of data used
    const [endYear, setEndYear] = useState(2023) // End year of data used
    const [years, setYears] = useState<string[]>(["2019","2020","2021","2022","2023"]) // Years that will be used as labels
    const [team, setTeam] = useState("") // The team name who's data will be displayed
    const [field, setField] = useState("") // The team's field name that will be displayed
    const [chartData, setChartData] = useState<ChartFormat>(testData)

    // Intended that useEffect runs once, as empty array given means that it only updates once when page renders.
    // In development, it will run twice due to strict mode being on. This won't happen in production, however.
    // https://byby.dev/useeffect-run-twice
    useEffect(() => {
        axios.post(process.env.REACT_APP_API_URL + '/teams/allTeams', {
            startYear: startYear,
            endYear: endYear
        })
        .then((response) => {
            setData(response.data)
            setProgress(false)

            let meanData: totalTeamData | undefined = response.data.find((givenTeam: { teamName: string; }) => {
                return givenTeam.teamName === "MEAN"
            })
            setMeanData(meanData)
        })
        .catch((error) => {
            console.log(error)
            setProgress(false)
            setError(true)
        })
    }, []) // empty array so this only updates once on render

    function changeTeam(e: ChangeEvent<HTMLSelectElement>) {
        let team = e.target.value // needs to be seperate as set functions are async, so can't use them in function
        setTeam(team)
        let labelName = statsMap.get(field) || "" // set to empty if statsmap returns undefined
        if (field !== "") {
            let teamData: totalTeamData | undefined = data.find(givenTeam => {
                return givenTeam.teamName === team
            })

            let fieldData: number[] = []
            teamData?.stats.forEach(function (yearlyStat) {
                fieldData.push(Number(yearlyStat.yearStats[field as keyof TeamData]))
                // setDisplayData(oldArray => [...oldArray, Number(yearlyStat.yearStats[field as keyof TeamData])])
            })

            let averageData: number[] = []
            meanData?.stats.forEach(function (yearlyStat) {
                averageData.push(Number(yearlyStat.yearStats[field as keyof TeamData]))
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
            console.log("Both")
        }
    }
    
    function changeField(e: ChangeEvent<HTMLSelectElement>) {
        let field = e.target.value // needs to be seperate as set functions are async, so can't use them in function
        setField(field)
        let labelName = statsMap.get(field) || "" // set to empty if statsmap returns undefined
        if (team !== "") {
            let teamData: totalTeamData | undefined = data.find(givenTeam => {
                return givenTeam.teamName === team
            })
            let fieldData: number[] = []
            teamData?.stats.forEach(function (yearlyStat) {
                fieldData.push(Number(yearlyStat.yearStats[field as keyof TeamData]))
                // setDisplayData(oldArray => [...oldArray, Number(yearlyStat.yearStats[field as keyof TeamData])])
            })

            let averageData: number[] = []
            meanData?.stats.forEach(function (yearlyStat) {
                averageData.push(Number(yearlyStat.yearStats[field as keyof TeamData]))
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
            console.log("Both")
        }
    }

    return (
        <Layout>
            <div className={styles.dashboard}>
                <div className={styles.header}>Dashboard</div>
                <div className={`${progress ? styles.notHidden : styles.hidden}`}>
                    <CircularProgress />
                </div>
                <div className={`${error ? styles.notHidden : styles.hidden}`}>
                    Errors getting data
                </div>
                <div className={`${error || progress ? styles.hidden : styles.notHidden}`}>
                    <Grid container spacing={2} className={styles.input}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                        <select onChange={changeTeam} className={styles.dropdown}>
                            <option value="">Pick a Team</option>
                            {teamsNames.map( teamName =>
                                <option value={teamName}>{teamName}</option>
                            )};
                        </select>
                        </Grid>
                        <Grid item xs={4}>
                        <select onChange={changeField} className={styles.dropdown}>
                            <option value="">Pick a Field</option>
                            {statsArray.map( stat =>
                                <option value={stat[0]}>{stat[1]}</option>
                            )}
                        </select>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6}>
                            <Line options={options} data={chartData}/>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;