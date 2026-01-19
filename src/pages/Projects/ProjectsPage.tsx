import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects, setActiveFilter } from '../../store/slices/projectsSlice';
import { ProjectFilter } from '../../components/ProjectFilter/ProjectFilter';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
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

        <ProjectFilter
          technologies={technologies}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {loading && (
          <div className={styles.loadingContainer} aria-live="polite" aria-busy="true">
            <p>Loading projects...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer} role="alert" aria-live="assertive">
            <p>Error loading projects: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.projectsContainer} id="projects-list">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onLiveClick={handleLiveClick} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ProjectsPage;
