import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from './ProjectsPage.module.css';
import budgetBuddyImg from '../../assets/images/budget-buddy.png';
import ascensionImg from '../../assets/images/ascension-of-the-forgotten.png';
import portfolioImg from '../../assets/images/animated-card.png';

interface Project {
  id: number;
  title: string;
  tech: string;
  image: string;
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: 1,
      title: 'Budget Buddy',
      tech: 'REACT',
      image: budgetBuddyImg,
    },
    {
      id: 2,
      title: 'Ascension Forgotten',
      tech: 'REACT',
      image: ascensionImg,
    },
    {
      id: 3,
      title: 'Personal Portfolio',
      tech: 'NEXT.JS',
      image: portfolioImg,
    },
  ];

  const technologies = ['ALL', ...Array.from(new Set(projects.map((p) => p.tech)))];
  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.tech === activeFilter);

  const handleLiveClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <>
      <Outlet />
      <section id="projects" className={styles.container}>
        <h1 className={styles.heading}>My Projects</h1>
        <p className={styles.subheading}>Check out some of my recent work and side projects</p>

        {/* Filter */}
        <div className={styles.filterContainer}>
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`${styles.filterButton} ${activeFilter === tech ? styles.filterButtonActive : ''}`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects */}
        <div className={styles.projectsContainer}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImageContainer}>
                <img src={project.image} alt={project.title} className={styles.projectImage} />
              </div>

              <div className={styles.projectFooter}>
                <span className={styles.techBadge}>{project.tech}</span>

                {/* Live Button */}
                <button
                  onClick={() => handleLiveClick(project.id)} // Navigates to /projects/:projectId
                  className={styles.liveButton}
                >
                  Live
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
