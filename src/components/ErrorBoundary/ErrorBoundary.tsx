// ErrorBoundary component
// Catches JavaScript errors in child components and displays a fallback UI
import React from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: React.ReactNode; // Child components to wrap
  fallback?: React.ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean; // Whether an error has occurred
  error: Error | null; // The error object
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state when an error is thrown
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // Log error details
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer} role="alert" aria-live="assertive">
          <h1>Oops! Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className={styles.errorButton}
            aria-label="Retry after error"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
