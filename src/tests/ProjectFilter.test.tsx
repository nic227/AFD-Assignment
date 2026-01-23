import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import { beforeEach } from 'vitest';
import { describe, it, expect, vi } from 'vitest';
import { ProjectFilter } from '../components/ProjectFilter/ProjectFilter';

describe('ProjectFilter', () => {
    beforeEach(() => {
      cleanup();
    });
  const technologies = ['React', 'Node.js'];
  it('renders all technology buttons', () => {
    render(
      <ProjectFilter technologies={technologies} activeFilter="React" onFilterChange={vi.fn()} />
    );
    technologies.forEach((tech) => {
      expect(screen.getByRole('tab', { name: tech })).toBeInTheDocument();
    });
  });

  it('highlights the active filter', () => {
    render(
      <ProjectFilter technologies={technologies} activeFilter="Node.js" onFilterChange={vi.fn()} />
    );
    // Find all Node.js tabs and check the one with aria-selected true
    const nodeTabs = screen.getAllByRole('tab', { name: 'Node.js' });
    const activeNodeTab = nodeTabs.find(tab => tab.getAttribute('aria-selected') === 'true');
    expect(activeNodeTab).toBeDefined();
    expect(activeNodeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onFilterChange when a non-active button is clicked', async () => {
    const onFilterChange = vi.fn();
    render(
      <ProjectFilter technologies={['React', 'Node.js']} activeFilter="React" onFilterChange={onFilterChange} />
    );
    const nodeTabs = screen.getAllByRole('tab', { name: 'Node.js' });
    const nonActiveNodeTab = nodeTabs.find(tab => tab.getAttribute('aria-selected') === 'false');
    expect(nonActiveNodeTab).toBeDefined();
    if (nonActiveNodeTab) {
      await userEvent.click(nonActiveNodeTab);
      await waitFor(() => {
        expect(onFilterChange).toHaveBeenCalledWith('Node.js');
      });
    }
  });
});
