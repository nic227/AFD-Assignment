import { memo, useCallback } from 'react';
import styles from '../../pages/Projects/ProjectsPage.module.css';

interface ProjectFilterProps {
  technologies: string[];
  activeFilter: string;
  onFilterChange: (tech: string) => void;
}

export const ProjectFilter = memo<ProjectFilterProps>(
  ({ technologies, activeFilter, onFilterChange }) => {
    const handleFilterClick = useCallback(
      (tech: string) => {
        onFilterChange(tech);
      },
      [onFilterChange]
    );

    return (
      <div
        className={styles.filterContainer}
        role="tablist"
        aria-label="Filter projects by technology"
      >
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => handleFilterClick(tech)}
            className={`${styles.filterButton} ${activeFilter === tech ? styles.filterButtonActive : ''}`}
            role="tab"
            aria-selected={activeFilter === tech}
            aria-controls="projects-list"
          >
            {tech}
          </button>
        ))}
      </div>
    );
  }
);

ProjectFilter.displayName = 'ProjectFilter';
