# Home

## Description

The Home component serves as the landing page for the NBAMatchups application. It provides descriptions of the application's features and links to navigate to different pages.

## Usage
```
import Home from './Home';

function App() {
  return (
    <Home />
  );
}

export default App;
```


## Props
This component does not accept any props.

## State
This component does not have any internal state.

## Functions
**handleNavigate(route: string)**: Function to handle navigation to different pages based on the provided route string.  

## Dependencies
**react-router-dom**: Provides navigation functionality for routing within the React application.  
**Material-UI (Mui)**: A React UI framework used for styling and layout components.  

## External Resources
**Material-UI**: A popular React UI framework used for styling and layout components.

## Styles
The component uses CSS modules for styling. The main styles are defined in the index.module.css file.

## Notes
Each feature description is accompanied by a button that navigates the user to the corresponding feature page.  
The Home component provides users with an overview of the application's capabilities and serves as a starting point for navigation to different features.  
