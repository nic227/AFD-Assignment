import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ProjectsPage from '../pages/ProjectsPage';
import ContactPage from '../pages/Contact/ContactPage';

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
