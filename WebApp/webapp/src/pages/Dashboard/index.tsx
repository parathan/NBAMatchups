import { ChangeEvent, useEffect, useState, useCallback, useMemo } from 'react';
import styles from './index.module.css';
import Layout from "../../components/Layout/Layout";
import { Alert, CircularProgress, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
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

import { TotalTeamData, TeamData } from '../../interfaces/TotalTeamData';
import { ChartFormat } from '../../interfaces/ChartFormat';
import { teamsNames } from '../../constants/teamNames';
import { statsArray } from '../../constants/statArray';
import { statsMap } from '../../constants/statDictionary';
import { allTeamsMicroservice } from '../../constants/routes';
import { getAPIURL } from '../../config/config';
import colours from '../../constants/colours';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Constants
const START_YEAR = 2019;
const END_YEAR = 2023;
const YEARS = ["2019", "2020", "2021", "2022", "2023"];

// Chart options
const chartOptions = {
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

// Initial chart data
const initialChartData: ChartFormat = {
    labels: YEARS,
    datasets: [
        {
            label: "Data",
            backgroundColor: colours.RED,
            borderColor: colours.RED,
            data: []
        },
        {
            label: "League Average",
            backgroundColor: colours.BLUE,
            borderColor: colours.BLUE,
            data: []
        }
    ]
};

/**
 * Dashboard component that displays team statistics over time and compares them to league averages.
 * Uses ChartJS for data visualization and includes team and statistic selection dropdowns.
 */
function Dashboard() {
    // State management
    const [data, setData] = useState<TotalTeamData[]>([]);
    const [meanData, setMeanData] = useState<TotalTeamData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<{ hasError: boolean; message: string }>({ hasError: false, message: "" });
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedField, setSelectedField] = useState("");
    const [chartData, setChartData] = useState<ChartFormat>(initialChartData);

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(getAPIURL() + allTeamsMicroservice, {
                    startYear: START_YEAR,
                    endYear: END_YEAR
                });
                
                setData(response.data.data);
                const meanTeamData = response.data.data.find((team: TotalTeamData) => team.teamname === "MEAN");
                setMeanData(meanTeamData);
            } catch (err) {
                setError({
                    hasError: true,
                    message: `Error retrieving data from server: ${err instanceof Error ? err.message : 'Unknown error'}`
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Memoized function to process chart data
    const processChartData = useCallback((team: string, field: string) => {
        const teamData = data.find(t => t.teamname === team);
        if (!teamData || !meanData) return;

        const fieldData = teamData.stats.map(stat => Number(stat[field as keyof TeamData]));
        const averageData = meanData.stats.map(stat => Number(stat[field as keyof TeamData]));
        const labelName = statsMap.get(field) || "";

        setChartData({
            labels: YEARS,
            datasets: [
                {
                    label: labelName,
                    backgroundColor: colours.RED,
                    borderColor: colours.RED,
                    data: fieldData
                },
                {
                    label: "League Average",
                    backgroundColor: colours.BLUE,
                    borderColor: colours.BLUE,
                    data: averageData
                }
            ]
        });
    }, [data, meanData]);

    // Event handlers
    const handleTeamChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const team = e.target.value;
        setSelectedTeam(team);
        if (selectedField) {
            processChartData(team, selectedField);
        }
    }, [selectedField, processChartData]);

    const handleFieldChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const field = e.target.value;
        setSelectedField(field);
        if (selectedTeam) {
            processChartData(selectedTeam, field);
        }
    }, [selectedTeam, processChartData]);

    // Memoized dropdown options
    const teamOptions = useMemo(() => (
        teamsNames.map(teamName => (
            <option key={teamName} value={teamName}>{teamName}</option>
        ))
    ), []);

    const statOptions = useMemo(() => (
        statsArray.map(stat => (
            <option key={stat[0]} value={stat[0]}>{stat[1]}</option>
        ))
    ), []);

    return (
        <Layout>
            <div className={styles.dashboard}>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        Dashboard
                    </div>
                </div>
                
                {isLoading && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress size={60} />
                    </Box>
                )}
                
                {error.hasError && (
                    <div className={styles.errMessage}>
                        <Alert severity='error' sx={{ borderRadius: 2 }}>
                            {error.message}
                        </Alert>
                    </div>
                )}
                
                {!error.hasError && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.input}>
                            <div className={styles.inputContainer}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1" gutterBottom sx={{ color: 'var(--text-secondary)' }}>
                                            Select Team
                                        </Typography>
                                        <select 
                                            onChange={handleTeamChange} 
                                            className={styles.dropdown}
                                            value={selectedTeam}
                                        >
                                            <option value="">Choose a team</option>
                                            {teamOptions}
                                        </select>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1" gutterBottom sx={{ color: 'var(--text-secondary)' }}>
                                            Select Statistic
                                        </Typography>
                                        <select 
                                            onChange={handleFieldChange} 
                                            className={styles.dropdown}
                                            value={selectedField}
                                        >
                                            <option value="">Choose a statistic</option>
                                            {statOptions}
                                        </select>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                        {selectedTeam && selectedField && (
                            <motion.div 
                                className={styles.chartContainer}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Line options={chartOptions} data={chartData} />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </Layout>
    );
}

export default Dashboard;