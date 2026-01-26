import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../components/Navbar/Navbar';
import themeReducer from '../store/slices/themeSlice';
import projectsReducer from '../store/slices/projectsSlice';
import contactReducer from '../store/slices/contactSlice';

// Create a mock store for stories
const createMockStore = (themeMode: 'light' | 'dark' = 'dark') =>
  configureStore({
    reducer: {
      theme: themeReducer,
      projects: projectsReducer,
      contact: contactReducer,
    },
    preloadedState: {
      theme: {
        mode: themeMode,
        fontSize: 'medium' as const,
        highContrast: false,
        reducedMotion: false,
      },
    },
  });

interface NavbarStoryArgs {
  themeMode?: 'light' | 'dark';
}

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const themeMode = (context.args as NavbarStoryArgs)?.themeMode || 'dark';
      return (
        <Provider store={createMockStore(themeMode)}>
          <BrowserRouter>
            <div data-theme={themeMode} style={{ minHeight: 200 }}>
              <Story />
            </div>
          </BrowserRouter>
        </Provider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof Navbar>;

// Default dark theme
export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
  render: () => <Navbar />,
};

// Light theme
export const LightTheme: Story = {
  args: {
    themeMode: 'light',
  },
  render: () => (
    <div data-theme="light" style={{ background: '#ffe5cc', minHeight: 200 }}>
      <Navbar />
    </div>
  ),
  decorators: [
    (Story) => (
      <Provider store={createMockStore('light')}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

// Mobile viewport (shows burger menu)
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <Navbar />,
};

// Tablet viewport
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => <Navbar />,
};

// With page content below
export const WithContent: Story = {
  render: () => (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', color: 'var(--text-primary)' }}>
        <h1>Page Content</h1>
        <p>This demonstrates how the navbar looks with content below it.</p>
      </main>
    </div>
  ),
};
