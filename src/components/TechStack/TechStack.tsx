import { memo } from 'react';
import type { ReactElement } from 'react';
import styles from '../../pages/Home/HomePage.module.css';

interface Tech {
  name: string;
  icon: ReactElement;
}

interface TechStackProps {
  techStack: Tech[];
}

export const TechStack = memo<TechStackProps>(({ techStack }) => (
  <section className={styles.techStack}>
    <div className={styles.techContainer}>
      <div className={styles.techScrollWrapper}>
        <div className={styles.techGrid}>
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
