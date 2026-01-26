import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ProjectFilter } from '../components/ProjectFilter/ProjectFilter';

const meta: Meta<typeof ProjectFilter> = {
  title: 'Projects/ProjectFilter',
  component: ProjectFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ProjectFilter>;

// Default with ALL selected
export const Default: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const technologies = ['ALL', 'REACT', 'NEXT.JS', 'VUE'];

    return (
      <div style={{ padding: 16 }}>
        <ProjectFilter
          technologies={technologies}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <p style={{ marginTop: 16, color: '#666' }}>
          Active filter: <strong>{activeFilter}</strong>
        </p>
      </div>
    );
  },
};

// React filter selected
export const ReactSelected: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <ProjectFilter
        technologies={['ALL', 'REACT', 'NEXT.JS', 'VUE']}
        activeFilter="REACT"
        onFilterChange={(tech) => console.log('Filter changed:', tech)}
      />
    </div>
  ),
};

// Many technologies
export const ManyTechnologies: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const technologies = ['ALL', 'REACT', 'NEXT.JS', 'VUE', 'ANGULAR', 'SVELTE', 'TYPESCRIPT'];

    return (
      <div style={{ padding: 16, maxWidth: 600 }}>
        <ProjectFilter
          technologies={technologies}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    );
  },
};

// Single technology (no filter needed)
export const SingleTechnology: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <ProjectFilter
        technologies={['ALL', 'REACT']}
        activeFilter="ALL"
        onFilterChange={(tech) => console.log('Filter changed:', tech)}
      />
    </div>
  ),
};

// Mobile viewport
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const [activeFilter, setActiveFilter] = useState('ALL');

    return (
      <div style={{ padding: 8 }}>
        <ProjectFilter
          technologies={['ALL', 'REACT', 'NEXT.JS', 'VUE', 'ANGULAR']}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    );
  },
};
