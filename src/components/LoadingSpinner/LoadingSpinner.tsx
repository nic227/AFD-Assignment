// LoadingSpinner component
// Shows a spinner and loading text for async/suspense states
import { memo } from 'react';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = memo(() => (
  <div className={styles.container}>
    <div className={styles.content}>
      {/* Animated spinner */}
      <div className={styles.spinner} />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';
