import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styles from './index.module.css';

/**
 * This component is an animated circular progress bar that animates on mounting to display the given percentage
 * with both text and a circular visual representation.
 * @param percentage the percentage that is used for the circularProgress bar
 * @returns Circular progress bar
 */
function CircularPercentage({ percentage }: {
    percentage: number
}) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 500);

    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className={styles.circularProgress}>
      <CircularProgressbar
        value={animatedPercentage}
        text={`${animatedPercentage}%`}
        styles={buildStyles({
          pathTransitionDuration: 1,
          textColor: '#dddddd',
          pathColor: '#4caf50',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default CircularPercentage;