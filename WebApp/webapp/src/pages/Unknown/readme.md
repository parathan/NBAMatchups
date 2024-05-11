# Unknown

## Description

The Unknown component returns a page that indicates that the user visited a page that does not exist. It will then redirect the user to the home page. It's purpose is for navigation for unknown routes.

## Usage
```
import Home from './Unknown';

function App() {
  return (
    <Unknown />
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
This page is for routes that have not been defined. If the user visits any such route, it redirects to this page.  