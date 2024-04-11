# MatchupSlider

## Description

The MatchupSlider component renders a slider element representing the comparison between two teams based on their statistics. It displays two statistical fields and their corresponding values for each team, along with a slider bar indicating the comparison between the teams.

## Usage
```
import MatchupSlider from './MatchupSlider';

function MyComponent() {
  return (
    <MatchupSlider
      field1="Field 1"
      field2="Field 2"
      team1Percentile1={75}
      team2Percentile_Op={50}
      team1Trad={100}
      team2Trad_Op={80}
      mean1={60}
      mean2={70}
      absPercentileDifference={0.25}
      TraditionalDifference: "20",
      PercentileDifference: "25"
    />
  );
}

export default MyComponent;
```


## Props
field1: The name of the first statistical field to be displayed.  
field2: The name of the second statistical field to be displayed.  
team1Percentile1: The percentile value of the first team for the first statistical field.  
team2Percentile_Op: The percentile value of the second team for the second statistical field.  
team1Trad: The traditional statistic value of the first team.  
team2Trad_Op: The traditional statistic value of the second team.  
mean1: The league average value for the first statistical field.  
mean2: The league average value for the second statistical field.  
absPercentileDifference: The absolute percentile difference between the two teams.  
traditionalDifference: Difference between the traditional statistic value.  
PercentileDifference: The percentile difference between the two teams.  


## State
This component does not have any internal state.

## Functions
This component does not have any functions.

## Dependencies
Material-UI (Mui): A React UI framework used for styling and layout components. The component uses Slider, Grid, and ThemeProvider components from MUI.  

## External Resources
No external resources were used in this component.  

## Styles
The component uses CSS modules for styling. The main styles are defined in the index.module.css file.

## Notes
The MatchupSlider component dynamically adjusts its appearance based on the provided statistical data, highlighting the difference between the two teams.  
Each slider displays the statistical comparison between the two teams, with color-coding indicating the significance of the difference.  
