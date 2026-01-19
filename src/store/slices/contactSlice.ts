import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { submitContactForm } from '../thunks';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactState {
  formData: ContactFormData;
  errors: FormErrors;
  loading: boolean;
  success: boolean;
  error: string | null;
  submitCount: number;
}

const initialState: ContactState = {
  formData: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
  errors: {},
  loading: false,
  success: false,
  error: null,
  submitCount: 0,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof ContactFormData; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },
    setFormData: (state, action: PayloadAction<ContactFormData>) => {
      state.formData = action.payload;
    },
    setErrors: (state, action: PayloadAction<FormErrors>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.errors = {};
      state.success = false;
      state.error = null;
    },
    incrementSubmitCount: (state) => {
      state.submitCount += 1;
    },
    resetSubmitCount: (state) => {
      state.submitCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.formData = initialState.formData;
        state.errors = {};
        state.submitCount += 1;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        if (typeof action.payload === 'object' && action.payload !== null) {
          state.errors = action.payload as FormErrors;
        } else {
          state.error = action.payload as string || 'Failed to submit form';
        }
      });
  },
});

export const {
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
} = contactSlice.actions;

export default contactSlice.reducer;
