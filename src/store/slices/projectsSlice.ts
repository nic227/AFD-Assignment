// Redux slice for managing project data, filters, and loading state
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProjects } from '../thunks';
import projectsData from '../../data/projects.json';

// Project type definition
export interface Project {
  id: number;
  title: string;
  tech: string;
  image: string;
  description?: string;
  link?: string;
}

// State shape for projects feature
export interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  activeFilter: string;
  loading: boolean;
  error: string | null;
}

// Initial state for projects slice
const initialState: ProjectsState = {
  projects: projectsData as Project[],
  selectedProject: null,
  activeFilter: 'ALL',
  loading: false,
  error: null,
};

// Create the projects slice with reducers and async thunk handling
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Set the list of projects
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.error = null;
    },
    // Select a single project for details view
    selectProject: (state, action: PayloadAction<Project | null>) => {
      state.selectedProject = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch projects';
      });
  },
});

export const { setProjects, selectProject, setActiveFilter, setLoading, setError, clearError } =
  projectsSlice.actions;

export { fetchProjects };
export default projectsSlice.reducer;
