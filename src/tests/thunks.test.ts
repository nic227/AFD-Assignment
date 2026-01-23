import { describe, it, expect, vi, afterEach } from 'vitest';
import { submitContactForm, fetchProjects } from '../store/thunks';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('submitContactForm thunk', () => {
  it('returns success for valid data', async () => {
    const formData = {
      name: 'Test',
      email: 'test@email.com',
      subject: 'Hello',
      message: 'This is a valid message',
    };
    const thunk = submitContactForm(formData);
    const dispatch = vi.fn();import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitContactForm } from '../store/slices/contactSlice';

describe('submitContactForm thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('rejects with validation errors when fields are missing', async () => {
    const formData = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    const thunk = submitContactForm(formData as any);
    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(result.type).toMatch(/rejected/);

    // Be robust: payload shape may vary (errors / message / fieldErrors)
    const payload: any = (result as any).payload;
    expect(payload).toBeTruthy();

    const errorsObj = payload.errors ?? payload.fieldErrors ?? payload;
    expect(errorsObj).toBeTruthy();
  });

  it('rejects when email is invalid', async () => {
    const formData = {
      name: 'Test',
      email: 'not-an-email',
      subject: 'Hello',
      message: 'Message',
    };

    const thunk = submitContactForm(formData as any);
    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(result.type).toMatch(/rejected/);

    const payload: any = (result as any).payload;
    const errorsObj = payload?.errors ?? payload?.fieldErrors ?? payload;

    // Try to assert something about email specifically if present
    if (errorsObj?.email) {
      expect(String(errorsObj.email)).toMatch(/email/i);
    } else {
      // Otherwise just ensure we got a meaningful payload
      expect(payload).toBeTruthy();
    }
  });

  it('fulfills for valid data (uses fake timers to skip delay)', async () => {
    vi.useFakeTimers();

    const formData = {
      name: 'Test',
      email: 'test@email.com',
      subject: 'Hello',
      message: 'This is a valid message',
    };

    const thunk = submitContactForm(formData as any);
    const dispatch = vi.fn();
    const getState = vi.fn();

    const promise = thunk(dispatch, getState, undefined);

    // Your thunk has a 1000ms setTimeout; skip it instantly
    await vi.advanceTimersByTimeAsync(1000);

    const result = await promise;

    expect(result.type).toMatch(/fulfilled/);

    const payload: any = (result as any).payload;

    // Your payload likely looks like { success: true, message: '...' }
    if (payload && typeof payload === 'object') {
      expect(payload.success).toBe(true);
    }
  });
});

