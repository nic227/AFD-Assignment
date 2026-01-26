// Async thunks for Redux (side effects and async logic)
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ContactFormData } from './slices/contactSlice';

/**
 * Fetch projects from local JSON file (can be replaced with API call)
 * Used to populate the projects state in the Redux store
 */
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // Dynamically import project data
      const projectsData = (await import('../data/projects.json')).default;
      return projectsData;
    } catch (error) {
      // Return error message for rejected action
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch projects');
    }
  }
);

/**
 * Submit contact form
 * Validates and (optionally) submits contact form data
 * Returns errors if validation fails
 */
export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      // Validate form data
      const errors: Record<string, string> = {};
      if (!formData.name.trim()) errors.name = 'Name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email';
      }
      if (!formData.subject.trim()) errors.subject = 'Subject is required';
      if (!formData.message.trim()) errors.message = 'Message is required';
      else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
      }

      if (Object.keys(errors).length > 0) {
        return rejectWithValue(errors);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to submit form');
    }
  }
);
