// ProjectFilter component
// Renders filter buttons for project technologies with ARIA roles for accessibility
import { memo, useCallback } from 'react';
import styles from '../../pages/Projects/ProjectsPage.module.css';

interface ProjectFilterProps {
  technologies: string[]; // List of technology names
  activeFilter: string; // Currently selected filter
  onFilterChange: (tech: string) => void; // Handler for filter change
}

export const ProjectFilter = memo<ProjectFilterProps>(
  ({ technologies, activeFilter, onFilterChange }) => {
    // Handle filter button click
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
