import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import { Grid, Slider } from '@mui/material';

function MatchupSlider() {

    const [value, setValue] = useState([0.333, .666])

    function handleValue(e: Event, newValue: number | number[]) {
        setValue(newValue as number[]);
    }

    return (
        <Grid container spacing={2} className={styles.slider}>
            <Grid item xs={3} className={styles.description}>
                team1 field<br/>
                team1 traditional value
            </Grid>
            <Grid item xs={6}>
                <Slider
                min={0}
                max={1}
                value={value}
                step={0.001}
                valueLabelDisplay='on'
                onChange={handleValue}
                disabled
                />
            </Grid>
            <Grid item xs={3} className={styles.description}>
                team2 field<br/>
                team2 traditional value
            </Grid>
        </Grid>
    )
}

export default MatchupSlider;