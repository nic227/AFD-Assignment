import { memo } from 'react';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = memo(() => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.spinner} />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';
