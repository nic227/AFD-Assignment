import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const projectUrls: { [key: string]: string } = {
      '1': 'https://budget-buddy-project-deploy.vercel.app/',
      '2': 'https://ascension-project-vercel-deploy.vercel.app/',
      '3': 'https://anaimated-card-project-deploy.vercel.app/',
    };

    if (projectId && projectUrls[projectId]) {
      window.open(projectUrls[projectId], '_blank');
      navigate('/projects');
    }
  }, [projectId, navigate]);

  return <div>Opening project...</div>;
};

export default ProjectDetailsPage;
