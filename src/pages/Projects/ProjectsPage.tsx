import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects, setActiveFilter } from '../../store/slices/projectsSlice';
import styles from './ProjectsPage.module.css';

function ProjectsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { projects, activeFilter, loading, error } = useAppSelector((state) => state.projects);

  // Fetch projects on component mount
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const technologies = useMemo(
    () => ['ALL', ...Array.from(new Set(projects.map((p) => p.tech)))],
    [projects]
  );
  const filteredProjects = useMemo(
    () => (activeFilter === 'ALL' ? projects : projects.filter((p) => p.tech === activeFilter)),
    [projects, activeFilter]
  );

  const handleLiveClick = useCallback(
    (projectId: number) => {
      navigate(`/projects/${projectId}`);
    },
    [navigate]
  );

  const handleFilterChange = useCallback(
    (tech: string) => {
      dispatch(setActiveFilter(tech));
    },
    [dispatch]
  );

  return (
    <>
      <Outlet />
      <section id="projects" className={styles.container}>
        <h1 className={styles.heading}>My Projects</h1>
        <p className={styles.subheading}>Check out some of my recent work and side projects</p>

        {/* Filter */}
        <div
          className={styles.filterContainer}
          role="tablist"
          aria-label="Filter projects by technology"
        >
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => handleFilterChange(tech)}
              className={`${styles.filterButton} ${activeFilter === tech ? styles.filterButtonActive : ''}`}
              role="tab"
              aria-selected={activeFilter === tech}
              aria-controls="projects-list"
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingContainer} aria-live="polite" aria-busy="true">
            <p>Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={styles.errorContainer} role="alert" aria-live="assertive">
            <p>Error loading projects: {error}</p>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && (
          <div className={styles.projectsContainer} id="projects-list">
            {filteredProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
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
                  <span className={styles.techBadge} aria-label={`Built with ${project.tech}`}>
                    {project.tech}
                  </span>

                  <button
                    onClick={() => handleLiveClick(project.id)}
                    className={styles.liveButton}
                    aria-label={`View ${project.title} live project`}
                  >
                    Live
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ProjectsPage;
