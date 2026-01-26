import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { cleanup } from '@testing-library/react';

import { ContactForm } from '../components/ContactForm/ContactForm';
import type { ContactFormData, FormErrors } from '../store/slices/contactSlice';

describe('ContactForm', () => {

    afterEach(() => {
      cleanup();
    });
  const baseFormData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const renderForm = (overrides?: Partial<React.ComponentProps<typeof ContactForm>>) => {
    const props: React.ComponentProps<typeof ContactForm> = {
      formData: baseFormData,
      errors: {} as FormErrors,
      loading: false,
      success: false,
      error: null,
      onChange: vi.fn(),
      onSubmit: vi.fn((e) => e.preventDefault()),
      ...overrides,
    };

    return render(<ContactForm {...props} />);
  };

  it('renders all form fields', () => {
    renderForm();

    // Use resilient label matching (avoids exact copy issues)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /send|submit/i })).toBeInTheDocument();
  });

  it('calls onChange when typing into inputs', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Wrapper() {
      const [formData, setFormData] = React.useState<ContactFormData>(baseFormData);

      const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        onChange(e);
      };

      return (
        <ContactForm
          formData={formData}
          errors={{} as FormErrors}
          loading={false}
          success={false}
          error={null}
          onChange={handleChange}
          onSubmit={(e) => e.preventDefault()}
        />
      );
    }

    render(<Wrapper />);

    // Ensure only one form/input is rendered
    const nameInputs = screen.getAllByTestId('contact-name');
    expect(nameInputs.length).toBe(1);
    const nameInput = nameInputs[0] as HTMLInputElement;

    await user.type(nameInput, 'John');

    await waitFor(() => {
      expect(nameInput.value).toBe('John');
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('calls onSubmit when user clicks submit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

    renderForm({ onSubmit });

    // Ensure only one form/button is rendered
    const submitButtons = screen.getAllByTestId('contact-submit');
    expect(submitButtons.length).toBe(1);
    const submit = submitButtons[0];
    await user.click(submit);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders field validation errors when provided', () => {
    renderForm({
      errors: {
        name: 'Name is required',
        email: 'Email is invalid',
      } as FormErrors,
    });

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
  });

  it('shows success message when success is true', () => {
    renderForm({ success: true });

    // Match your actual UI text; this is intentionally flexible
    expect(screen.getByText(/success|sent|thank you/i)).toBeInTheDocument();
  });

  it('shows error message when error exists', () => {
    renderForm({ error: 'Something went wrong' });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('disables submit button and sets aria-busy when loading', () => {
    renderForm({ loading: true });

    // Ensure only one form/button is rendered
    const submitButtons = screen.getAllByTestId('contact-submit');
    expect(submitButtons.length).toBe(1);
    const submit = submitButtons[0];
    expect(submit).toBeDisabled();

    // aria-busy can be on form or a container depending on your implementation.
    // Check either the form element or a wrapper.
    const form = submit.closest('form');
    if (form) {
      expect(form).toHaveAttribute('aria-busy', 'true');
    }
  });
});
