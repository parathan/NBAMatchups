import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from "../../components/Layout/Layout";
import { CircularProgress, Grid } from '@mui/material';

import axios from 'axios';
import { totalTeamData, TeamData } from '../../interfaces/TotalTeamData';
import { teamsNames } from '../../constants/teamNames';
import { statsArray } from '../../constants/statArray';


function Dashboard() {

    const [data, setData] = useState<totalTeamData[]>([]) // Total Data to be fetched
    const [progress, setProgress] = useState(true) // For progress bar
    const [error, setError] = useState(false) // For Error message if error fetching data
    // TODO #5
    const [startYear, setStartYear] = useState(2019) // Start year of data used
    const [endYear, setEndYear] = useState(2023) // End year of data used
    const [years, setYears] = useState<string[]>([]) // Years that will be used as labels
    const [team, setTeam] = useState("") // The team name who's data will be displayed
    const [field, setField] = useState("") // The team's field name that will be displayed
    const [displayData, setDisplayData] = useState<number[]>([]) // The field data

    // Intended that useEffect runs once, as empty array given means that it only updates once when page renders.
    // In development, it will run twice due to strict mode being on. This won't happen in production, however.
    // https://byby.dev/useeffect-run-twice
    useEffect(() => {
        axios.post(process.env.REACT_APP_API_URL + '/teams/allTeams', {
            startYear: startYear,
            endYear: endYear
        })
        .then((response) => {
            for (let i = startYear; i <= endYear; i++) {
                setYears(oldArray => [...oldArray, i.toString()])
            }
            setData(response.data)
            setProgress(false)
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
        if (field !== "") {
            let teamData: totalTeamData | undefined = data.find(givenTeam => {
                return givenTeam.teamName === team
            })
            teamData?.stats.forEach(function (yearlyStat) {
                setDisplayData(oldArray => [...oldArray, Number(yearlyStat.yearStats[field as keyof TeamData])])
            })
            console.log("Both")
        }
    }
    
    function changeField(e: ChangeEvent<HTMLSelectElement>) {
        let field = e.target.value // needs to be seperate as set functions are async, so can't use them in function
        setField(field)
        if (team !== "") {
            let teamData: totalTeamData | undefined = data.find(givenTeam => {
                return givenTeam.teamName === team
            })
            teamData?.stats.forEach(function (yearlyStat) {
                setDisplayData(oldArray => [...oldArray, Number(yearlyStat.yearStats[field as keyof TeamData])])
            })
            console.log("Both")
        }
    }

    function onSubmit() {
        console.log(displayData)
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
                <div className={`${styles.header} ${error || progress ? styles.hidden : styles.notHidden}`}>
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
                        <Grid item xs={12}>
                            <button onClick={onSubmit} className={styles.submit}>Check Matchup</button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;