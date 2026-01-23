import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import type { JSX } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// Must return JSX for React, even if unreachable
function ProblemChild(): JSX.Element {
  throw new Error('Test error!');
  // eslint-disable-next-line no-unreachable
  return <></>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('catches error and displays fallback UI', () => {
    // Silence expected error output
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error!')).toBeInTheDocument();
    (console.error as any).mockRestore();
  });

  it('resets error state when retry button is clicked', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    // Click all retry buttons
    const retryButtons = screen.getAllByRole('button', { name: /retry after error/i });
    for (const btn of retryButtons) {
      await userEvent.click(btn);
    }

    // Wait for the safe content to be visible again
    await waitFor(() => {
      expect(screen.getByText('Safe content')).toBeInTheDocument();
    });
    (console.error as any).mockRestore();
  });
});
