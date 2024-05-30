# Matchups

## Description

The Prediction page allows users to input two teams in the given season and uses the api
to fetch the team's average data and use it with the ml model to determine the which team
has a higher probability of winning the game.  

## Usage
```
import Matchups from './Matchups';

function App() {
  return (
    <Prediction />
  );
}

export default App;
```


## Props
This component does not accept any props.

## State
**formVisible**: Boolean state to control the visibility of the form for inputting team names and year.  
**progressVisible**: Boolean state to control the visibility of the progress indicator while data is being fetched.  
**errorVisible**: Boolean state to control the visibility of error messages.  
**successVisible**: Boolean state to control the visibility of the matchup results.  
**team1**: String state to store the name of the first selected team.  
**team2**: String state to store the name of the second selected team.  
**year**: String state to store the selected year.  
**errMessage**: String state to store error messages.  
**winner**: The team out of the two with the higher win probability.  
**winnerImage**: The winning teams logo.  
**winProb**: The win probability of the winning team.  
**data**: Array state to store matchup data.  
**team1image**: String state to store the image filename for the first team's logo.  
**team2image**: String state to store the image filename for the second team's logo.  
**imageClass**: String state to control the styling of logo images.  

## Functions
**changeTeam1(e: ChangeEvent<HTMLSelectElement>)**: Function to handle the change event when selecting the first team.  
**changeTeam2(e: ChangeEvent<HTMLSelectElement>)**: Function to handle the change event when selecting the second team.  
**changeYear(e: ChangeEvent<HTMLSelectElement>)**: Function to handle the change event when selecting the year.
**onSubmit()**: Function to validate input and fetch matchup data.  
**getUncachedData()**: Function to fetch matchup data from the server.  
**throwEmptyInputError()**: Function to handle errors when input fields are empty.  
**throwDuplicateTeamError()**: Function to handle errors when both selected teams are the same.  

## Dependencies
**react**: JavaScript library for building user interfaces.  
**axios**: Promise-based HTTP client for making requests to the server.  
**@mui/material**: Material-UI library for UI components.  
**MatchupSlider**: Custom component for displaying matchup sliders.  
**Layout**: Custom component for layout structure.  

## External Resources
**Material-UI**: A popular React UI framework used for styling and layout components.

## Styles
The component uses CSS modules for styling. The main styles are defined in the index.module.css file.

## Notes
Users must input both teams and select a year before checking the matchup.  
Error messages are displayed if input fields are empty or if the same team is selected for comparison.  
The component fetches matchup data from the server and displays the results using sliders.  
