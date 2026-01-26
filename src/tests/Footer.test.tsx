import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

describe('Footer', () => {
  it('renders the logo and updated description', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Nicole Grima').length).toBeGreaterThanOrEqual(1);
    
    expect(
      screen.getByText(/MCAST Student -\s+passionate about creating beautiful and functional web experiences\./i)
    ).toBeInTheDocument();
  });

  it('renders all quick links with correct labels and hrefs', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const links = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' },
    ];
    links.forEach(({ label, href }) => {
      const found = screen.getAllByRole('link', { name: label });
      expect(found.length).toBeGreaterThanOrEqual(1);
      expect(found[0]).toHaveAttribute('href', href);
    });
  });

  it('renders all social links with correct aria-labels and hrefs', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const socials = [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nicole-grima-32a74317b/?originalSubdomain=mt',
      },
      { label: 'GitHub', href: 'https://github.com/nic227' },
    ];
    socials.forEach(({ label, href }) => {
      const found = screen.getAllByRole('link', { name: label });
      expect(found.length).toBeGreaterThanOrEqual(1);
      expect(found[0]).toHaveAttribute('href', href);
    });
  });

  it('renders contact info', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getAllByText('📧 nicole.grima.d56937@mcast.edu.mt').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('📍 Paola, Malta').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('🌐 Available for work').length).toBeGreaterThanOrEqual(1);
  });

  it('renders copyright with current year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const year = new Date().getFullYear();
    const copyrightText = `© ${year} Nicole Grima. All rights reserved.`;
    expect(screen.getAllByText(copyrightText).length).toBeGreaterThanOrEqual(1);
  });

  it('renders Privacy Policy and Terms of Service links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' });
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);
    expect(privacyLinks[0]).toHaveAttribute('href', '#privacy');
    const termsLinks = screen.getAllByRole('link', { name: 'Terms of Service' });
    expect(termsLinks.length).toBeGreaterThanOrEqual(1);
    expect(termsLinks[0]).toHaveAttribute('href', '#terms');
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Nicole Grima').length).toBeGreaterThanOrEqual(1);
  });
});
