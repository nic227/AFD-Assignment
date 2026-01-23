import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders spinner and loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(document.querySelector('div')).toBeTruthy();
  });

  it('has correct class names', () => {
    render(<LoadingSpinner />);
    // There may be multiple Loading... elements, so check all
    const texts = screen.getAllByText('Loading...');
    expect(texts.some(t => t.className.includes('loadingText'))).toBe(true);
  });
});
