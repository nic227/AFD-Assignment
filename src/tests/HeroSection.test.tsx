import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from '../components/HeroSection/HeroSection';

describe('HeroSection', () => {
  const baseProps = {
    isHovered: false,
    onMouseEnter: vi.fn(),
    onMouseLeave: vi.fn(),
  };

  it('renders main hero content', () => {
    render(<HeroSection {...baseProps} />);
    // The title is split across elements, so use a custom matcher and allow multiple matches
    const matches = screen.getAllByText((_content, node) => {
      const hasText = (text: string) =>
        !!node && node.textContent !== null && node.textContent.replace(/\s+/g, ' ').includes(text);
      return hasText('My Portfolio.') || hasText('My Portfolio .');
    });
    expect(matches.length).toBeGreaterThan(0);
    expect(screen.getByText("I'm Nicole")).toBeInTheDocument();
    expect(screen.getByText('Creative Computing')).toBeInTheDocument();
    expect(screen.getByText('MCAST Student')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view my resume/i })).toBeInTheDocument();
  });

  it('calls onMouseEnter and onMouseLeave for main circle', () => {
    render(<HeroSection {...baseProps} />);
    // Find the main circle by class (circleMain)
    const mainCircle = document.querySelector('[class*="circleMain"]');
    expect(mainCircle).toBeTruthy();
    if (mainCircle) {
      fireEvent.mouseEnter(mainCircle);
      expect(baseProps.onMouseEnter).toHaveBeenCalled();
      fireEvent.mouseLeave(mainCircle);
      expect(baseProps.onMouseLeave).toHaveBeenCalled();
    }
  });

  it('applies hovered class when isHovered is true', () => {
    render(<HeroSection {...baseProps} isHovered={true} />);
    // The hovered class may be on a parent, so check all elements with class containing 'circleMain'
    const mainCircles = document.querySelectorAll('[class*="circleMain"]');
    const found = Array.from(mainCircles).some(el => el.className.split(' ').some(cls => cls.includes('hovered')));
    expect(found).toBe(true);
  });
});
