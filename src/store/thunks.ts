import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ContactFormData } from './slices/contactSlice';
import projectsData from '../data/projects.json';

/**
 * Fetch projects from API or local JSON
 * Can be modified to fetch from actual backend
 */
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, replace with:
      // const response = await fetch('/api/projects');
      // if (!response.ok) throw new Error('Failed to fetch projects');
      // return response.json();

      return projectsData;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch projects');
    }
  }
);

/**
 * Submit contact form
 * Handles form validation and submission
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

      // In a real app, replace with:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Failed to submit form');
      // return response.json();

      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to submit form');
    }
  }
);
