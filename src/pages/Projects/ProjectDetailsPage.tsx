// ProjectDetailsPage component
// Shows detailed information for a single project, with modal/dialog accessibility
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects } from '../../store/slices/projectsSlice';
import type { Project } from '../../store/slices/projectsSlice';
import styles from './ProjectDetailsPage.module.css';

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get projects and loading state from Redux
  const { projects, loading } = useAppSelector((state) => state.projects);

  // Ensure projects are available when user deep-links directly to /projects/:id
  useEffect(() => {
    if (!projects.length) dispatch(fetchProjects());
  }, [dispatch, projects.length]);

  // Find the project by ID from the URL
  const project: Project | undefined = useMemo(() => {
    const id = Number(projectId);
    if (!Number.isFinite(id)) return undefined;
    return projects.find((p) => p.id === id);
  }, [projectId, projects]);

  // Handler to close the details modal
  const close = useCallback(() => {
    navigate('/projects');
  }, [navigate]);

  // ESC key closes the detail view
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  // Loading state
  if (loading && !projects.length) {
    return (
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Project details">
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 className={styles.title}>Loading…</h2>
            <button className={styles.closeBtn} onClick={close} aria-label="Close project details">
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!project) {
    return (
      <div
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Project not found"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 className={styles.title}>Project not found</h2>
            <button className={styles.closeBtn} onClick={close} aria-label="Close project details">
              ✕
            </button>
          </div>
          <div className={styles.body}>
            <p className={styles.description}>
              We couldn't find this project. It may have been removed or the URL is incorrect.
            </p>
            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={close}>
                Back to projects
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Project detail view
  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      onMouseDown={(e) => {
        // Click backdrop to close
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          <button className={styles.closeBtn} onClick={close} aria-label="Close project details">
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />

          <div className={styles.metaRow}>
            <span className={styles.badge}>{project.tech}</span>

            <div className={styles.actions}>
              {project.link && (
                <a
                  className={`${styles.actionBtn} ${styles.primary}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Project
                </a>
              )}

              <button className={styles.actionBtn} onClick={close}>
                Back to Projects
              </button>
            </div>
          </div>

          <p className={styles.description}>
            {project.description || 'No description provided yet.'}
          </p>
        </div>
      </div>
    </div>
  );
}
