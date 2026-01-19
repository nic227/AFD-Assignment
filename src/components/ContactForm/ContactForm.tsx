import { memo } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { ContactFormData, FormErrors } from '../../store/slices/contactSlice';
import styles from '../../pages/Contact/Contact.module.css';

interface ContactFormProps {
  formData: ContactFormData;
  errors: FormErrors;
  loading: boolean;
  success: boolean;
  error: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export const ContactForm = memo<ContactFormProps>(
  ({ formData, errors, loading, success, error, onChange, onSubmit }) => (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <h1 className={styles.heading}>Get In Touch</h1>
        <p className={styles.subheading}>
          For enquiries or project discussions, please use the contact form below.
        </p>

        {success && <div className={styles.success}>✓ Thank you! Your message has been sent successfully.</div>}

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="John Doe"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
                required
              />
              {errors.name && (
                <span className={styles.error} id="name-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="john@example.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <span className={styles.error} id="email-error">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={onChange}
              placeholder="How can I help you?"
              className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              aria-invalid={!!errors.subject}
              required
            />
            {errors.subject && (
              <span className={styles.error} id="subject-error">
                {errors.subject}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={onChange}
              placeholder="Send me a message..."
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
              required
            />
            {errors.message && (
              <span className={styles.error} id="message-error">
                {errors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${styles.button} ${loading ? styles.buttonDisabled : ''}`}
            aria-busy={loading}
          >
            {loading ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  )
);

ContactForm.displayName = 'ContactForm';
