# MatchupSlider

## Description

The CircularPercentage Component renders a circular progress bar that animates on mounting, displaying the given percentage in both text and circular graph format.

## Usage
```
import CircularPercentage from './CircularPercentage';

function MyComponent() {
  return (
    <CircularPercentage percentage={53} />
  );
}

export default MyComponent;
```


## Props
**percentage**: The percentage to be displayed  


## State
**animatedPercentage**: The percentage to be displayed  

## Functions
**useEffect**:  The percentage displayed is done after a timer to ensure the animation doesnt coincide with the fade in animation.  

## Dependencies
**react-circular-progressbar**: A React library that provides the circular progress bar component.  

## External Resources
No external resources were used in this component.  

## Styles
The component uses CSS modules for styling. The main styles are defined in the index.module.css file.

## Notes
The CircularPercentage component is mainly used for the predictive feature component, to be displayed after a fade in animation, which is the reason for the timer delay.  
