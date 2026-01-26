// ContactPage component
// Renders the contact form and handles form state, validation, and submission
import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFormField, setSuccess } from '../../store/slices/contactSlice';
import { submitContactForm } from '../../store/thunks';
import { ContactForm } from '../../components/ContactForm/ContactForm';

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { formData, errors, loading, success, error } = useAppSelector((state) => state.contact);

  // Auto-hide success message after 4 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(setSuccess(false));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  // Handle input changes in the form
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      dispatch(
        updateFormField({
          field: name as keyof typeof formData,
          value,
        })
      );
    },
    [dispatch]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(submitContactForm(formData));
    },
    [dispatch, formData]
  );

  return (
    <ContactForm
      formData={formData}
      errors={errors}
      loading={loading}
      success={success}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
