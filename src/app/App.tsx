// Main application component
// Handles routing, layout, and error boundaries
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// Lazy load all route-level pages for code splitting
const HomePage = lazy(() => import('../pages/Home/HomePage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'));
const ProjectDetailsPage = lazy(() => import('../pages/Projects/ProjectDetailsPage'));

function App() {
  // Get current route for scroll restoration
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {/* Persistent navigation bar */}
      <Navbar />
      {/* Error boundary for all routes */}
      <ErrorBoundary>
        {/* Suspense fallback for lazy-loaded routes */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />}>
              {/* Nested route for project details */}
              <Route path=":projectId" element={<ProjectDetailsPage />} />
            </Route>
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      {/* Persistent footer */}
      <Footer />
    </div>
  );
}

export default App;
