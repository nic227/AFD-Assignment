import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import projectsReducer from './slices/projectsSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
