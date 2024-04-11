# Layout

## Description

The layout component is used to integrate the given children component with the navbar to create pages that have the content of the chidlren component and the navigation provided by the navbar.

## Usage
```
import React, { ReactNode } from "react";
import Layout from "./Layout";

function App() {
  return (
    <Layout>
      {/* Your page content goes here */}
    </Layout>
  );
}

export default App;
```


## Props
**children**: The content to be rendered inside the layout.

## State
This component does not have any internal state.

## Functions
This component does not have any functions.

## Dependencies
**react**: JavaScript library for building user interfaces.  

## External Resources
No external resources were used in this component.  

## Styles
The component uses CSS modules for styling. The main styles are defined in the index.module.css file.

## Notes
The Navbar is set to be 10% of the viewport width while the child component is tobe 90% of the viewport width.  
