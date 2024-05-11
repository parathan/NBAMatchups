# Navbar

## Description

The NavBar component provides navigation links to different pages of the application. It utilizes the react-pro-sidebar library to create a sidebar menu with clickable items that direct users to various sections of the application.


## Usage
```
import NavBar from './NavBar';

function App() {
  return (
    <NavBar />
  );
}

export default App;
```


## Props
This component does not accept any props.

## State
This component does not have any internal state.

## Functions
This component does not have any functions.

## Dependencies
**react-pro-sidebar**: A React library for creating responsive and customizable sidebar menus.  
**@mui/material**: The Material-UI library for UI components, used for styling.  

## External Resources
No external resources were used in this component.  

## Styles
The component uses CSS modules for styling. The main styles are defined in the index.module.css file.

## Notes
The NavBar component renders a sidebar menu with clickable items representing different sections of the application.  
Each menu item is a link that directs users to the corresponding page within the application.  
The styling of the sidebar menu can be customized using the provided rootStyles prop of the Sidebar component.  
