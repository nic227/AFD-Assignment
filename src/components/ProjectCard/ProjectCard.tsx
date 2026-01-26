// ProjectCard component displays a single project summary card
// Shows project image, tech badge, and a details button
import { memo, useCallback } from 'react';
import type { Project } from '../../store/slices/projectsSlice';
import styles from '../../pages/Projects/ProjectsPage.module.css';

// Props for ProjectCard
interface ProjectCardProps {
  project: Project; // Project data to display
  onLiveClick?: (projectId: number) => void; // Handler for details button
}

// Memoized ProjectCard for performance
export const ProjectCard = memo<ProjectCardProps>(({ project, onLiveClick }) => {
  // Handler for "Details" button click
  const handleClick = useCallback(() => {
    (onLiveClick ?? (() => {}))(project.id);
  }, [onLiveClick, project.id]);

  return (
    <article className={styles.projectCard}>
      {/* Project image */}
      <div className={styles.projectImageContainer}>
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
          className={styles.projectImage}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Footer with tech badge and details button */}
      <div className={styles.projectFooter}>
        <div className={styles.techBadgeWrapper}>
          <span className={styles.techBadge}>{project.tech}</span>
        </div>
        <button
          onClick={handleClick}
          className={styles.liveButton}
          aria-label={`View ${project.title} details`}
        >
          Details
        </button>
      </div>
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';
