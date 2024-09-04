import styles from './index.module.css';
import { Grid, Slider, ThemeProvider, createTheme } from '@mui/material';

import { MatchupData } from '../../interfaces/MatchupData';
import { statsMap } from '../../constants/statDictionary';
import { multby100 } from '../../util/Math/math';
import { perc2color } from '../../util/Color/color';

/**
 * The MatchupSlider component renders a slider element representing the 
 * comparison between two teams based on their statistics. 
 * It displays two statistical fields and their corresponding values for each team, 
 * along with a slider bar indicating the comparison between the teams.
 * @param props: MatchupData 
 * @returns 
 */
function MatchupSlider(props: MatchupData) {
    const value = [props.team1Percentile1 < props.team2Percentile_Op ? multby100(props.team1Percentile1) : multby100(props.team2Percentile_Op), 
        props.team1Percentile1 >= props.team2Percentile_Op ? multby100(props.team1Percentile1) : multby100(props.team2Percentile_Op)];
    const field1 = props.team1Percentile1 < props.team2Percentile_Op ? statsMap.get(props.field1) : statsMap.get(props.field2);
    const field2 = props.team1Percentile1 >= props.team2Percentile_Op ? statsMap.get(props.field1) : statsMap.get(props.field2);
    const trad1 = props.team1Percentile1 < props.team2Percentile_Op ? props.team1Trad : props.team2Trad_Op;
    const trad2 = props.team1Percentile1 >= props.team2Percentile_Op ? props.team1Trad : props.team2Trad_Op;
    const mean1 = props.team1Percentile1 < props.team2Percentile_Op ? props.mean1 : props.mean2;
    const mean2 = props.team1Percentile1 >= props.team2Percentile_Op ? props.mean1 : props.mean2;

    const customTheme = createTheme({
        palette: {
            primary: {
                main: perc2color(props.absPercentileDifference * 100),
            }
        }
    })

    return (
        <Grid container spacing={2} className={styles.slider}>
            <Grid item xs={3} className={styles.descriptionLeft}>
                <div>{field1}<br/></div>
                <div>Team Stat: {trad1}<br/></div>
                <div>League Average: {mean1}</div>
            </Grid>
            <Grid item xs={6}>
                <ThemeProvider theme={customTheme}>
                    <Slider
                        min={0}
                        max={100}
                        value={value}
                        step={0.1}
                        valueLabelDisplay='on'
                        className={styles.line}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item xs={3} className={styles.descriptionRight}>
                <div>{field2}<br/></div>
                <div>Team Stat: {trad2}<br/></div>
                <div>League Average: {mean2}</div>
            </Grid>
        </Grid>
    )
}

export default MatchupSlider;