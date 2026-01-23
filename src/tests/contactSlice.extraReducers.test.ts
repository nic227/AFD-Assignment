import { describe, it, expect } from 'vitest';
import reducer from '../store/slices/contactSlice';
import { submitContactForm } from '../store/thunks';

const initialState = {
  formData: { name: '', email: '', subject: '', message: '' },
  errors: {},
  loading: false,
  success: false,
  error: null,
  submitCount: 0,
};

describe('contactSlice extraReducers', () => {
  it('handles submitContactForm.pending', () => {
    const next = reducer(initialState, { type: submitContactForm.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
    expect(next.success).toBe(false);
  });

  it('handles submitContactForm.fulfilled', () => {
    const dirtyState = {
      ...initialState,
      loading: true,
      errors: { name: 'err' },
      formData: { name: 'A', email: 'B', subject: 'C', message: 'D' },
      submitCount: 1,
    };
    const next = reducer(dirtyState, { type: submitContactForm.fulfilled.type });
    expect(next.loading).toBe(false);
    expect(next.success).toBe(true);
    expect(next.error).toBeNull();
    expect(next.formData).toEqual(initialState.formData);
    expect(next.errors).toEqual({});
    expect(next.submitCount).toBe(2);
  });

  it('handles submitContactForm.rejected with errors object', () => {
    const errors = { name: 'Required', email: 'Required' };
    const next = reducer(initialState, {
      type: submitContactForm.rejected.type,
      payload: errors,
    });
    expect(next.loading).toBe(false);
    expect(next.success).toBe(false);
    expect(next.errors).toEqual(errors);
  });

  it('handles submitContactForm.rejected with string error', () => {
    const next = reducer(initialState, {
      type: submitContactForm.rejected.type,
      payload: 'Some error',
    });
    expect(next.loading).toBe(false);
    expect(next.success).toBe(false);
    expect(next.error).toBe('Some error');
  });
});
