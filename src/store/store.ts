
// Redux store configuration
// Combines all feature slices and exports store, RootState, and AppDispatch types
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import projectsReducer from './slices/projectsSlice';
import contactReducer from './slices/contactSlice';

// Create the Redux store with all feature reducers
export const store = configureStore({
  reducer: {
    theme: themeReducer,      // Theme and accessibility state
    projects: projectsReducer, // Project data and filters
    contact: contactReducer,   // Contact form state
  },
});

// RootState type for useSelector
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch type for useDispatch
export type AppDispatch = typeof store.dispatch;
