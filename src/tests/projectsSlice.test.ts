import { describe, it, expect } from 'vitest';
import reducer, {
  setProjects,
  selectProject,
  setActiveFilter,
  setLoading,
  setError,
  clearError,
} from '../store/slices/projectsSlice';
import { fetchProjects } from '../store/thunks';

const initialState = {
  projects: [],
  selectedProject: null,
  activeFilter: 'ALL',
  loading: false,
  error: null,
};

describe('projectsSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(expect.objectContaining({
      ...initialState,
      projects: expect.any(Array), // loaded from projects.json
    }));
  });

  it('should set projects', () => {
    const projects = [{ id: 1, title: 'Test', tech: '', image: '' }];
    expect(reducer(initialState, setProjects(projects))).toMatchObject({ projects });
  });

  it('should set projects to empty array', () => {
    expect(reducer(initialState, setProjects([]))).toMatchObject({ projects: [] });
  });

  it('should select project', () => {
    const project = { id: 1, title: 'Test', tech: '', image: '' };
    expect(reducer(initialState, selectProject(project))).toMatchObject({ selectedProject: project });
  });

  it('should select project as null', () => {
    expect(reducer(initialState, selectProject(null))).toMatchObject({ selectedProject: null });
  });

  it('should set active filter', () => {
    expect(reducer(initialState, setActiveFilter('React'))).toMatchObject({ activeFilter: 'React' });
  });

  it('should set active filter to empty string', () => {
    expect(reducer(initialState, setActiveFilter(''))).toMatchObject({ activeFilter: '' });
  });

  it('should set loading', () => {
    expect(reducer(initialState, setLoading(true))).toMatchObject({ loading: true });
  });

  it('should set loading to false', () => {
    expect(reducer({ ...initialState, loading: true }, setLoading(false))).toMatchObject({ loading: false });
  });

  it('should set error', () => {
    expect(reducer(initialState, setError('err'))).toMatchObject({ error: 'err', loading: false });
  });

  it('should set error to null and loading false', () => {
    expect(reducer({ ...initialState, loading: true, error: 'err' }, setError(null))).toMatchObject({ error: null, loading: false });
  });

  it('should clear error', () => {
    expect(reducer({ ...initialState, error: 'err' }, clearError())).toMatchObject({ error: null });
  });

  it('should not mutate state for unknown action', () => {
    const prev = { ...initialState };
    expect(reducer(prev, { type: 'UNKNOWN' })).toEqual(prev);
  });

  it('should handle fetchProjects.pending', () => {
    const state = reducer(initialState, { type: fetchProjects.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchProjects.fulfilled', () => {
    const projects = [{ id: 1, title: 'Test', tech: '', image: '' }];
    const state = reducer({ ...initialState, loading: true }, { type: fetchProjects.fulfilled.type, payload: projects });
    expect(state.loading).toBe(false);
    expect(state.projects).toEqual(projects);
    expect(state.error).toBeNull();
  });

  it('should handle fetchProjects.rejected with string payload', () => {
    const state = reducer({ ...initialState, loading: true }, { type: fetchProjects.rejected.type, payload: 'fail' });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('fail');
  });

  it('should handle fetchProjects.rejected with undefined payload', () => {
    const state = reducer({ ...initialState, loading: true }, { type: fetchProjects.rejected.type });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch projects');
  });
});
