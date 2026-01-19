import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProjects } from '../thunks';

export interface Project {
  id: number;
  title: string;
  tech: string;
  image: string;
  description?: string;
  link?: string;
}

export interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  activeFilter: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [
    {
      id: 1,
      title: 'Budget Buddy',
      tech: 'REACT',
      image: '/src/assets/images/budget-buddy.png',
      description: 'A budgeting application for financial management',
      link: 'https://budget-buddy-project-deploy.vercel.app/',
    },
    {
      id: 2,
      title: 'Ascension Forgotten',
      tech: 'REACT',
      image: '/src/assets/images/ascension-of-the-forgotten.png',
      description: 'An interactive gaming experience',
      link: 'https://ascension-project-vercel-deploy.vercel.app/',
    },
    {
      id: 3,
      title: 'Personal Portfolio',
      tech: 'NEXT.JS',
      image: '/src/assets/images/animated-card.png',
      description: 'A modern portfolio website',
      link: 'https://anaimated-card-project-deploy.vercel.app/',
    },
  ],
  selectedProject: null,
  activeFilter: 'ALL',
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.error = null;
    },
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
