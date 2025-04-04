import { Grid, Slider, ThemeProvider, createTheme, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';

import { MatchupData } from '../../interfaces/MatchupData';
import { statsMap } from '../../constants/statDictionary';
import { multby100 } from '../../util/Math/math';
import { perc2color } from '../../util/Color/color';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: 'var(--secondary-background-colour)',
  color: 'var(--font-colour)',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: '4px',
  backgroundColor: 'var(--tertiary-colour)',
  color: 'var(--font-colour)',
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 2),
}));

const SliderLabels = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  color: 'var(--p-font-colour)',
}));

const DifferenceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: 'var(--tertiary-colour)',
  borderRadius: '4px',
}));

const DifferenceItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
}));

const MatchupSlider = (props: MatchupData) => {
  const value = [
    props.team1_percentile < props.team2_op_percentile
      ? multby100(props.team1_percentile)
      : multby100(props.team2_op_percentile),
    props.team1_percentile >= props.team2_op_percentile
      ? multby100(props.team1_percentile)
      : multby100(props.team2_op_percentile),
  ];

  const field1 = props.team1_percentile < props.team2_op_percentile ? statsMap.get(props.field1) : statsMap.get(props.field2);
  const field2 = props.team1_percentile >= props.team2_op_percentile ? statsMap.get(props.field1) : statsMap.get(props.field2);
  const trad1 = props.team1_percentile < props.team2_op_percentile ? props.team1_trad : props.team2_op_trad;
  const trad2 = props.team1_percentile >= props.team2_op_percentile ? props.team1_trad : props.team2_op_trad;
  const mean1 = props.team1_percentile < props.team2_op_percentile ? props.mean1 : props.mean2;
  const mean2 = props.team1_percentile >= props.team2_op_percentile ? props.mean1 : props.mean2;

  const sliderColor = perc2color(props.abs_percentile_difference * 100);

  const customTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: sliderColor,
      },
      background: {
        paper: 'var(--secondary-background-colour)',
        default: 'var(--background-colour)',
      },
      text: {
        primary: 'var(--font-colour)',
        secondary: 'var(--p-font-colour)',
      },
    },
    components: {
      MuiSlider: {
        styleOverrides: {
          thumb: {
            backgroundColor: sliderColor,
          },
          track: {
            backgroundColor: sliderColor,
          },
          rail: {
            backgroundColor: 'var(--p-font-colour)',
            opacity: 0.5,
          },
          valueLabel: {
            backgroundColor: 'var(--tertiary-colour)',
            color: 'var(--font-colour)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <StyledPaper elevation={3}>
        <Typography variant="h6" align="center" gutterBottom fontWeight="bold" color="var(--header-font-colour)">
          {field1} vs {field2}
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <StatBox>
              <Typography variant="subtitle1" fontWeight="medium" color="var(--header-font-colour)">
                {field1}
              </Typography>
              <Typography variant="body2">Team Stat: {trad1}</Typography>
              <Typography variant="body2">League Avg: {mean1}</Typography>
            </StatBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SliderContainer>
              <Slider
                min={0}
                max={100}
                value={value}
                step={0.1}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `${value}%`}
              />
              <SliderLabels>
                <Typography variant="caption">0%</Typography>
                <Typography variant="caption">50%</Typography>
                <Typography variant="caption">100%</Typography>
              </SliderLabels>
            </SliderContainer>
          </Grid>
          <Grid item xs={12} md={3}>
            <StatBox>
              <Typography variant="subtitle1" fontWeight="medium" color="var(--header-font-colour)">
                {field2}
              </Typography>
              <Typography variant="body2">Team Stat: {trad2}</Typography>
              <Typography variant="body2">League Avg: {mean2}</Typography>
            </StatBox>
          </Grid>
        </Grid>
        <DifferenceBox>
          <DifferenceItem>
            <Typography variant="caption" color="var(--p-font-colour)">
              Percentile Difference
            </Typography>
            <Typography variant="body1" color={sliderColor}>
              {props.percentile_difference ? (props.percentile_difference * 100).toFixed(1) : '0.0'}%
            </Typography>
          </DifferenceItem>
          <DifferenceItem>
            <Typography variant="caption" color="var(--p-font-colour)">
              Traditional Difference
            </Typography>
            <Typography variant="body1" color="var(--font-colour)">
              {props.trad_difference ? props.trad_difference.toFixed(1) : '0.0'}
            </Typography>
          </DifferenceItem>
        </DifferenceBox>
      </StyledPaper>
    </ThemeProvider>
  );
};

export default MatchupSlider;