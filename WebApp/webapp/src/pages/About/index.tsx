import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/Layout/Layout';
import { Grid, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

function About() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.add(index);
              return Array.from(newSet);
            });
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const elements = document.querySelectorAll(`.${styles.section}`);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className={styles.aboutPage}>
        <header className={styles.header}>
          <Typography variant="h1" gutterBottom>
            About NBAnalytics
          </Typography>
          <Typography variant="h5" className={styles.subtitle}>
            Advanced NBA Statistics and Analysis Platform
          </Typography>
        </header>

        <section className={`${styles.section} ${styles.hero}`} data-index={0}>
          <Typography variant="body1" className={styles.description}>
            NBAnalytics is a comprehensive platform designed to provide deep insights into NBA team statistics,
            performance metrics, and predictive analytics. Our platform combines historical data analysis with
            modern statistical methods to offer unique perspectives on team matchups and performance trends.
          </Typography>
        </section>

        <Grid container spacing={4} className={styles.features}>
          <Grid item xs={12} md={6}>
            <motion.div
              className={`${styles.section} ${styles.featureCard}`}
              data-index={1}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Box className={styles.iconWrapper}>
                <CodeIcon className={styles.icon} />
              </Box>
              <Typography variant="h6" gutterBottom>
                Advanced Analytics
              </Typography>
              <Typography variant="body2">
                Leveraging sophisticated statistical models and machine learning algorithms to provide
                accurate predictions and insights into team performance.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              className={`${styles.section} ${styles.featureCard}`}
              data-index={2}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Box className={styles.iconWrapper}>
                <StorageIcon className={styles.icon} />
              </Box>
              <Typography variant="h6" gutterBottom>
                Comprehensive Data
              </Typography>
              <Typography variant="body2">
                Access to extensive historical NBA data, including team statistics, player performance,
                and game outcomes from multiple seasons.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              className={`${styles.section} ${styles.featureCard}`}
              data-index={3}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Box className={styles.iconWrapper}>
                <SpeedIcon className={styles.icon} />
              </Box>
              <Typography variant="h6" gutterBottom>
                Real-time Updates
              </Typography>
              <Typography variant="body2">
                Fast and efficient data processing with Redis caching to ensure quick access to
                the latest statistics and predictions.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              className={`${styles.section} ${styles.featureCard}`}
              data-index={4}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Box className={styles.iconWrapper}>
                <SecurityIcon className={styles.icon} />
              </Box>
              <Typography variant="h6" gutterBottom>
                Reliable Predictions
              </Typography>
              <Typography variant="body2">
                Built on robust statistical models and validated against historical data to provide
                accurate and reliable performance predictions.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        <section className={`${styles.section} ${styles.acknowledgment}`} data-index={5}>
          <Typography variant="h6" gutterBottom>
            Data Source
          </Typography>
          <Typography variant="body2">
            All data presented on this platform is sourced from basketballreference.com. We extend our
            gratitude for their comprehensive NBA statistics database.
          </Typography>
        </section>
      </div>
    </Layout>
  );
}

export default About;
