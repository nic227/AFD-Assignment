import { describe, it, expect } from 'vitest';
import reducer, {
  updateFormField,
  setFormData,
  setErrors,
  clearErrors,
  setLoading,
  setSuccess,
  setError,
  resetForm,
  incrementSubmitCount,
  resetSubmitCount,
} from '../store/slices/contactSlice';

describe('contactSlice', () => {
  const initialState = {
    formData: { name: '', email: '', subject: '', message: '' },
    errors: {},
    loading: false,
    success: false,
    error: null,
    submitCount: 0,
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(expect.objectContaining(initialState));
  });

  it('should update form field and clear error for that field', () => {
    const stateWithError = {
      ...initialState,
      errors: { name: 'Required' },
    };
    const next = reducer(stateWithError, updateFormField({ field: 'name', value: 'John' }));
    expect(next.formData.name).toBe('John');
    expect(next.errors.name).toBeUndefined();
  });

  it('should set form data', () => {
    const data = { name: 'A', email: 'B', subject: 'C', message: 'D' };
    expect(reducer(initialState, setFormData(data))).toMatchObject({ formData: data });
  });

  it('should set errors', () => {
    const errors = { name: 'err' };
    expect(reducer(initialState, setErrors(errors))).toMatchObject({ errors });
  });

  it('should clear errors', () => {
    const stateWithError = { ...initialState, errors: { name: 'err' } };
    expect(reducer(stateWithError, clearErrors())).toMatchObject({ errors: {} });
  });

  it('should set loading', () => {
    expect(reducer(initialState, setLoading(true))).toMatchObject({ loading: true });
  });

  it('should set success', () => {
    expect(reducer(initialState, setSuccess(true))).toMatchObject({ success: true });
  });

  it('should set error and stop loading', () => {
    expect(reducer({ ...initialState, loading: true }, setError('err'))).toMatchObject({ error: 'err', loading: false });
  });

  it('should reset form', () => {
    const dirtyState = {
      formData: { name: 'A', email: 'B', subject: 'C', message: 'D' },
      errors: { name: 'err' },
      loading: true,
      success: true,
      error: 'err',
      submitCount: 2,
    };
    const next = reducer(dirtyState, resetForm());
    expect(next.formData).toEqual(initialState.formData);
    expect(next.errors).toEqual({});
    expect(next.success).toBe(false);
    expect(next.error).toBeNull();
  });

  it('should increment and reset submit count', () => {
    let state = reducer(initialState, incrementSubmitCount());
    expect(state.submitCount).toBe(1);
    state = reducer(state, resetSubmitCount());
    expect(state.submitCount).toBe(0);
  });

  it('should update form field with no error present', () => {
    const next = reducer(initialState, updateFormField({ field: 'email', value: 'a@b.com' }));
    expect(next.formData.email).toBe('a@b.com');
  });

  it('should set error to null and stop loading', () => {
    expect(reducer({ ...initialState, loading: true, error: 'err' }, setError(null))).toMatchObject({ error: null, loading: false });
  });

  it('should reset form from clean state', () => {
    const next = reducer(initialState, resetForm());
    expect(next.formData).toEqual(initialState.formData);
    expect(next.errors).toEqual({});
    expect(next.success).toBe(false);
    expect(next.error).toBeNull();
  });

  it('should not mutate state for unknown action', () => {
    const prev = { ...initialState };
    expect(reducer(prev, { type: 'UNKNOWN' })).toEqual(prev);
  });

  it('should handle submitContactForm.rejected with errors object', () => {
    const errors = { name: 'err', email: 'err' };
    const state = reducer(
      { ...initialState, loading: true },
      { type: 'contact/submitForm/rejected', payload: errors }
    );
    expect(state.loading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.errors).toEqual(errors);
    expect(state.error).toBeNull();
  });

  it('should handle submitContactForm.rejected with string payload', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: 'contact/submitForm/rejected', payload: 'fail' }
    );
    expect(state.loading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('fail');
    expect(state.errors).toEqual({});
  });

  it('should handle submitContactForm.rejected with undefined payload', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: 'contact/submitForm/rejected' }
    );
    expect(state.loading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('Failed to submit form');
    expect(state.errors).toEqual({});
  });
});
