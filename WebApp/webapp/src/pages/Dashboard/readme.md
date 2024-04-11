# Dashboard

## Description

The Dashboard component is a React component designed to display statistical data for different teams over multiple years. It allows users to select a team and a specific statistical field to visualize data using a line chart. The line chart then displays the data for that team as well as the league average for that statistic over the given years.

## Props
This component does not accept any props.

## State
**data**: An array of TotalTeamData objects fetched from the API containing statistical data for all teams.  
**meanData**: A TotalTeamData object containing the mean statistical data across all teams taken from the API response  
**progress**: A boolean value indicating whether data is being fetched from the API (true) or not (false).  
**error**: A boolean value indicating whether an error occurred while fetching data from the API (true) or not (false).  
**team**: The name of the selected team for which data will be displayed.  
**field**: The selected statistical field for which data will be displayed.  
**chartData**: A ChartFormat object containing data for the line chart.  

## Functions
**establishData(team: string, field: string)**: Function to establish data for the selected team and field. It updates the chartData state.  
**changeTeam(e: ChangeEvent<HTMLSelectElement>)**: Event handler function to change the selected team. It triggers the establishment of data for the selected team and field.  
**changeField(e: ChangeEvent<HTMLSelectElement>)**: Event handler function to change the selected field. It triggers the establishment of data for the selected team and field.  

## Dependencies
**axios**: For making HTTP requests to fetch data from the API.  
**react-chartjs-2**: React wrapper for Chart.js library to render line charts.  

## External Resources
**Chart.js**: A JavaScript library for creating charts, used for rendering the line chart.  
**Material-UI**: A popular React UI framework used for styling and layout components.  

## Styles
The component uses CSS modules for styling. The main styles are defined in the index.module.css file.

## Notes
The component fetches data from an API endpoint to populate the statistical information.  
It handles loading and error states to provide a better user experience.  
Users can select a team and a specific statistical field to visualize data using the line chart.  
