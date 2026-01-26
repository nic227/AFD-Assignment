import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

// Default spinner
export const Default: Story = {
  render: () => <LoadingSpinner />,
};

// In a container (simulating page load)
export const InContainer: Story = {
  render: () => (
    <div style={{ 
      width: 400, 
      height: 300, 
      border: '1px solid #333', 
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary, #0c0e25)'
    }}>
      <LoadingSpinner />
    </div>
  ),
};

// Full page simulation
export const FullPage: Story = {
  render: () => (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary, #0c0e25)'
    }}>
      <LoadingSpinner />
    </div>
  ),
};

// Dark background
export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ 
      padding: 40, 
      background: '#0c0e25',
      borderRadius: 8
    }}>
      <LoadingSpinner />
    </div>
  ),
};

// Light background
export const OnLightBackground: Story = {
  render: () => (
    <div style={{ 
      padding: 40, 
      background: '#ffe5cc',
      borderRadius: 8
    }}>
      <LoadingSpinner />
    </div>
  ),
};
