
// Entry point for the React application
// Sets up Redux, React Router, and global theme effects
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App.tsx';
import { store } from './store/store';
import ThemeEffects from './components/ThemeEffects/ThemeEffects';
import './styles/index.css';

// Ensure scroll position is always at the top on navigation
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Mount the React app to the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provide Redux store to the app */}
    <Provider store={store}>
      {/* Apply theme and accessibility effects globally */}
      <ThemeEffects />
      {/* Enable client-side routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
