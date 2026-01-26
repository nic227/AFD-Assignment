import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ContactForm } from '../components/ContactForm/ContactForm';
import type { ContactFormData, FormErrors } from '../store/slices/contactSlice';

const meta: Meta<typeof ContactForm> = {
  title: 'Forms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContactForm>;

// Default empty state
export const Default: Story = {
  render: () => {
    const [formData, setFormData] = useState<ContactFormData>({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit: React.FormEventHandler = (e) => {
      e.preventDefault();
      alert('Submitted (Storybook demo)');
    };

    return (
      <div style={{ maxWidth: 720, padding: 16 }}>
        <ContactForm
          formData={formData}
          errors={{}}
          loading={false}
          success={false}
          error={null}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    );
  },
};

// With validation errors
export const WithValidationErrors: Story = {
  render: () => {
    const formData: ContactFormData = {
      name: '',
      email: 'invalid-email',
      subject: '',
      message: 'Hi',
    };

    const errors: FormErrors = {
      name: 'Name is required',
      email: 'Please enter a valid email address',
      subject: 'Subject is required',
      message: 'Message must be at least 10 characters',
    };

    return (
      <div style={{ maxWidth: 720, padding: 16 }}>
        <ContactForm
          formData={formData}
          errors={errors}
          loading={false}
          success={false}
          error={null}
          onChange={() => {}}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
    );
  },
};

// Loading/submitting state
export const Loading: Story = {
  render: () => {
    const formData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'Hello, I would like to discuss a potential project.',
    };

    return (
      <div style={{ maxWidth: 720, padding: 16 }}>
        <ContactForm
          formData={formData}
          errors={{}}
          loading={true}
          success={false}
          error={null}
          onChange={() => {}}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
    );
  },
};

// Success state after submission
export const SuccessState: Story = {
  render: () => {
    const formData: ContactFormData = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    return (
      <div style={{ maxWidth: 720, padding: 16 }}>
        <ContactForm
          formData={formData}
          errors={{}}
          loading={false}
          success={true}
          error={null}
          onChange={() => {}}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
    );
  },
};

// Submission error state
export const SubmissionError: Story = {
  render: () => {
    const formData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'Hello, I would like to discuss a potential project.',
    };

    return (
      <div style={{ maxWidth: 720, padding: 16 }}>
        <ContactForm
          formData={formData}
          errors={{}}
          loading={false}
          success={false}
          error="Failed to send message. Please try again later."
          onChange={() => {}}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
    );
  },
};

// Filled form ready to submit
export const FilledForm: Story = {
  render: () => {
    const [formData, setFormData] = useState<ContactFormData>({
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Collaboration Opportunity',
      message: 'Hi! I came across your portfolio and would love to discuss a potential collaboration on an upcoming project.',
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <div style={{ maxWidth: 720, padding: 16 }}>
        <ContactForm
          formData={formData}
          errors={{}}
          loading={false}
          success={false}
          error={null}
          onChange={handleChange}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>
    );
  },
};
