import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styles from './index.module.css';

const CircularPercentage = ({ percentage }: {
    percentage: number
}) => {
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