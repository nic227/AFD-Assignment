import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.projects.projects);

  useEffect(() => {
    if (projectId) {
      const project = projects.find((p) => p.id === parseInt(projectId, 10));
      if (project?.link) {
        window.open(project.link, '_blank');
      }
      navigate('/projects');
    }
  }, [projectId, projects, navigate]);

  return <div>Opening project...</div>;
};

export default ProjectDetailsPage;
