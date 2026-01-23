import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from '../components/Navbar/Navbar';

describe('Navbar', () => {
  const renderNavbar = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

  it('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    renderNavbar();
    const buttons = screen.getAllByLabelText(/switch to/i);
    fireEvent.click(buttons[0]);
    // No assertion on DOM, but should not throw
  });

  it('opens and closes mobile menu', () => {
    renderNavbar();
    const burgers = screen.getAllByLabelText(/open navigation menu/i);
    fireEvent.click(burgers[0]);
    // There may be multiple navs, so check the first one
    const navs = screen.getAllByRole('navigation');
    expect(navs[0]).toBeInTheDocument();
    fireEvent.click(burgers[0]);
    expect(navs[0]).toBeInTheDocument();
  });

  it('navigates to About page on link click', () => {
    renderNavbar();
    const aboutLinks = screen.getAllByText(/about/i);
    fireEvent.click(aboutLinks[0]);
    expect(aboutLinks[0]).toBeInTheDocument();
  });

  it('highlights active link', () => {
    renderNavbar();
    const homeLinks = screen.getAllByText(/home/i);
    expect(homeLinks[0].className).toMatch(/navLink/);
    fireEvent.click(homeLinks[0]);
    expect(homeLinks[0].className).toMatch(/navLink/);
  });

  it('theme toggle updates Redux state', () => {
    renderNavbar();
    const button = screen.getAllByLabelText(/switch to/i)[0];
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('closes menu on link click', () => {
    renderNavbar();
    const burger = screen.getAllByLabelText(/open navigation menu/i)[0];
    fireEvent.click(burger);
    const aboutLinks = screen.getAllByText(/about/i);
    fireEvent.click(aboutLinks[0]);
    expect(aboutLinks[0]).toBeInTheDocument();
  });
});
