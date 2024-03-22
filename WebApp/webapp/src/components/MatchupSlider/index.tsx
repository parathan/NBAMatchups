import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import { Grid, Slider } from '@mui/material';

import { Data } from '../../interfaces/data';

function MatchupSlider(props: Data) {

    const [value, setValue] = useState(
        [props.team1Percentile1 < props.team2Percentile_Op ? props.team1Percentile1 : props.team2Percentile_Op, 
        props.team1Percentile1 >= props.team2Percentile_Op ? props.team1Percentile1 : props.team2Percentile_Op]
    )
    const [field1, setField1] = useState(props.team1Percentile1 < props.team2Percentile_Op ? props.field1 : props.field2)
    const [field2, setField2] = useState(props.team1Percentile1 >= props.team2Percentile_Op ? props.field1 : props.field2)

    const [trad1, setTrad1] = useState(props.team1Percentile1 < props.team2Percentile_Op ? props.team1Trad : props.team2Trad_Op)
    const [trad2, setTrad2] = useState(props.team1Percentile1 >= props.team2Percentile_Op ? props.team1Trad : props.team2Trad_Op)

    return (
        <Grid container spacing={2} className={styles.slider}>
            <Grid item xs={3} className={styles.description}>
                {field1}<br/>
                {trad1}
            </Grid>
            <Grid item xs={6}>
                <Slider
                min={0}
                max={1}
                value={value}
                step={0.001}
                valueLabelDisplay='on'
                disabled
                />
            </Grid>
            <Grid item xs={3} className={styles.description}>
                {field2}<br/>
                {trad2}
            </Grid>
        </Grid>
    )
}

export default MatchupSlider;