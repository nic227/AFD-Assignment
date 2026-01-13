import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProjectsPage from '../pages/ProjectsPage';
import ContactPage from '../pages/ContactPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default AppRoutes;
