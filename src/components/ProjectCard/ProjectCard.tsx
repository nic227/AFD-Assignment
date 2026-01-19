import { memo, useCallback } from 'react';
import type { Project } from '../../store/slices/projectsSlice';
import styles from '../../pages/Projects/ProjectsPage.module.css';

interface ProjectCardProps {
  project: Project;
  onLiveClick: (projectId: number) => void;
}

export const ProjectCard = memo<ProjectCardProps>(({ project, onLiveClick }) => {
  const handleClick = useCallback(() => {
    onLiveClick(project.id);
  }, [onLiveClick, project.id]);

  return (
    <article className={styles.projectCard}>
      <div className={styles.projectImageContainer}>
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
          className={styles.projectImage}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.projectFooter}>
        <strong>{project.tech}</strong>
        <button
          onClick={handleClick}
          className={styles.liveButton}
          aria-label={`View ${project.title} live project`}
        >
          Live
        </button>
      </div>
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';
