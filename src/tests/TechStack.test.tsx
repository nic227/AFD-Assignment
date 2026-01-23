import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechStack } from '../components/TechStack/TechStack';
import { FaReact, FaNodeJs } from 'react-icons/fa';

describe('TechStack', () => {
  const techStack = [
    { name: 'React', icon: <FaReact data-testid="react-icon" /> },
    { name: 'Node.js', icon: <FaNodeJs data-testid="node-icon" /> },
  ];

  it('renders all tech names', () => {
    render(<TechStack techStack={techStack} />);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThanOrEqual(2);
  });

  it('renders all tech icons', () => {
    render(<TechStack techStack={techStack} />);
    expect(screen.getAllByTestId('react-icon').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByTestId('node-icon').length).toBeGreaterThanOrEqual(2);
  });

  it('renders double the techStack length (looped)', () => {
    render(<TechStack techStack={techStack} />);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByTestId('react-icon').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByTestId('node-icon').length).toBeGreaterThanOrEqual(2);
  });

  it('renders correct count for duplicate tech names', () => {
    const dupStack = [
      { name: 'React', icon: <FaReact data-testid="react-icon" /> },
      { name: 'React', icon: <FaReact data-testid="react-icon" /> },
    ];
    render(<TechStack techStack={dupStack} />);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByTestId('react-icon').length).toBeGreaterThanOrEqual(4);
  });
});
