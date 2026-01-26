// TechStack component
// Displays a horizontally scrolling list of technology icons and names
import { memo } from 'react';
import type { ReactElement } from 'react';
import styles from '../../pages/Home/HomePage.module.css';

interface Tech {
  name: string; // Technology name
  icon: ReactElement; // Technology icon (JSX)
}

interface TechStackProps {
  techStack: Tech[]; // Array of technologies to display
}

export const TechStack = memo<TechStackProps>(({ techStack }) => (
  <section className={styles.techStack}>
    <div className={styles.techContainer}>
      <div className={styles.techScrollWrapper}>
        <div className={styles.techGrid}>
          {/* Duplicate techStack for seamless scroll effect */}
          {[...techStack, ...techStack].map((tech, index) => (
            <div key={`${tech.name}-${index}`} className={styles.techCard}>
              <div className={styles.techIcon}>{tech.icon}</div>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

TechStack.displayName = 'TechStack';
