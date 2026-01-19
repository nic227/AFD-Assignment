import React from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

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
