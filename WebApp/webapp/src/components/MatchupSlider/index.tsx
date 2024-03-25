import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.css';
import { Grid, Slider, ThemeProvider, createMuiTheme, createTheme, makeStyles } from '@mui/material';

import { MatchupData } from '../../interfaces/data';
import { statsMap } from '../../constants/statDictionary';

function MatchupSlider(props: MatchupData) {

    const [value, setValue] = useState(
        [props.team1Percentile1 < props.team2Percentile_Op ? props.team1Percentile1 : props.team2Percentile_Op, 
        props.team1Percentile1 >= props.team2Percentile_Op ? props.team1Percentile1 : props.team2Percentile_Op]
    )
    const [field1, setField1] = useState(props.team1Percentile1 < props.team2Percentile_Op ? statsMap.get(props.field1) : statsMap.get(props.field2))
    const [field2, setField2] = useState(props.team1Percentile1 >= props.team2Percentile_Op ? statsMap.get(props.field1) : statsMap.get(props.field2))

    const [trad1, setTrad1] = useState(props.team1Percentile1 < props.team2Percentile_Op ? props.team1Trad : props.team2Trad_Op)
    const [trad2, setTrad2] = useState(props.team1Percentile1 >= props.team2Percentile_Op ? props.team1Trad : props.team2Trad_Op)

    function perc2color(perc: number,min: number,max: number) {
        var base = (max - min);

        if (base == 0) { perc = 100; }
        else {
            perc = (perc - min) / base * 100; 
        }
        var r, g, b = 0;
        if (perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }


    const customTheme = createTheme({
        palette: {
            primary: {
                main: perc2color(props.absPercentileDifference * 100, 0, 100),
            }
        }
    })

    return (
        <Grid container spacing={2} className={styles.slider}>
            <Grid item xs={3} className={styles.description}>
                {field1}<br/>
                {trad1}
            </Grid>
            <Grid item xs={6}>
                <ThemeProvider theme={customTheme}>
                    <Slider
                        min={0}
                        max={1}
                        value={value}
                        step={0.001}
                        valueLabelDisplay='on'
                        className={styles.line}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item xs={3} className={styles.description}>
                {field2}<br/>
                {trad2}
            </Grid>
        </Grid>
    )
}

export default MatchupSlider;