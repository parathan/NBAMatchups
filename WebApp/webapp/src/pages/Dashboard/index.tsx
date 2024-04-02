import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from "../../components/Layout/Layout";

import axios from 'axios';
import { totalTeamData } from '../../interfaces/TotalTeamData';


function Dashboard() {

    const [data, setData] = useState<totalTeamData[]>([])

    // Intended that useEffect runs once, as empty array given means that it only updates once when page renders.
    // In development, it will run twice due to strict mode being on. This won't happen in production, however.
    // https://byby.dev/useeffect-run-twice
    useEffect(() => {
        axios.post(process.env.REACT_APP_API_URL + '/teams/allTeams', {
            startYear: 2019,
            endYear: 2023
        })
        .then((response) => {
            console.log(response)
            setData(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])


    return (
        <Layout>
            <div className={styles.header}>Dashboard</div>
        </Layout>
    )
}

export default Dashboard;