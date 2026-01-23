import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';

describe('ProjectCard', () => {
      beforeEach(() => {
        cleanup();
      });
  const project = {
    id: 1,
    title: 'Budget Buddy',
    tech: 'REACT',
    image: '/src/assets/images/budget-buddy.webp',
    description: 'A budgeting application for financial management. Budget Buddy helps users make informed financial decisions and stay on top of their finances with an intuitive, user-friendly interface. ',
    link: 'https://budget-buddy-project-deploy.vercel.app/'
  };

  it('renders project info', () => {
    render(<ProjectCard project={project} onLiveClick={vi.fn()} />);
    // There may be multiple, so check at least one
    expect(screen.getAllByText('REACT').length).toBeGreaterThan(0);
    const images = screen.getAllByAltText(/budget buddy project screenshot/i);
    expect(images.length).toBeGreaterThan(0);
    const buttons = screen.getAllByRole('button', { name: /details/i });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls onLiveClick with project id', async () => {
    const onLiveClick = vi.fn();
    render(
      <ProjectCard
        project={project}
        onLiveClick={onLiveClick}
      />
    );
    // Debug: log number of ProjectCards and buttons
    const cards = document.querySelectorAll('article');
    // eslint-disable-next-line no-console
    console.log('Number of ProjectCards:', cards.length);
    const detailsButtons = screen.getAllByRole('button', { name: 'View Budget Buddy details' });
    // eslint-disable-next-line no-console
    console.log('Number of Details buttons:', detailsButtons.length);
    expect(detailsButtons.length).toBeGreaterThan(0);
    await userEvent.click(detailsButtons[0]);
    await waitFor(() => {
      expect(onLiveClick).toHaveBeenCalledWith(1);
    });
  });

  it('renders without description or link', () => {
    const minimalProject = { id: 2, title: 'No Desc', tech: 'JS', image: '/img.png' };
    render(<ProjectCard project={minimalProject} onLiveClick={vi.fn()} />);
    // Title is in button aria-label
    expect(screen.getByRole('button', { name: /no desc/i })).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('does not throw if onLiveClick is not provided', async () => {
    const project = { id: 3, title: 'Safe', tech: 'TS', image: '/img2.png' };
    render(<ProjectCard project={project} />);
    const detailsButtons = screen.getAllByRole('button', { name: /details/i });
    await userEvent.click(detailsButtons[0]);
    expect(detailsButtons[0]).toBeInTheDocument();
  });

  it('renders multiple ProjectCards', () => {
    const projects = [
      { id: 4, title: 'A', tech: 'React', image: '/a.png' },
      { id: 5, title: 'B', tech: 'Vue', image: '/b.png' },
    ];
    projects.forEach((p) => {
      render(<ProjectCard project={p} onLiveClick={vi.fn()} />);
      expect(screen.getByRole('button', { name: new RegExp(p.title, 'i') })).toBeInTheDocument();
      expect(screen.getByText(p.tech)).toBeInTheDocument();
    });
  });
});
