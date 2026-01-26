import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import type { Project } from '../store/slices/projectsSlice';

import budgetBuddyImg from '../assets/images/budget-buddy.webp';
import ascensionImg from '../assets/images/ascension-of-the-forgotten.webp';
import animatedCardImg from '../assets/images/animated-card.webp';

const meta: Meta<typeof ProjectCard> = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ProjectCard>;

const sampleProject: Project = {
  id: 1,
  title: 'Budget Buddy',
  tech: 'REACT',
  image: budgetBuddyImg,
  link: 'https://budget-buddy-project-deploy.vercel.app/',
  description: 'A budgeting application for financial management',
};

// Default state
export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <ProjectCard
        project={sampleProject}
        onLiveClick={(id) => console.log('Clicked project:', id)}
      />
    </div>
  ),
};

// React project
export const ReactProject: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <ProjectCard
        project={{
          id: 2,
          title: 'Ascension of the Forgotten',
          tech: 'REACT',
          image: ascensionImg,
          link: 'https://ascension-project-vercel-deploy.vercel.app/',
          description: 'An interactive gaming experience',
        }}
        onLiveClick={(id) => console.log('Clicked project:', id)}
      />
    </div>
  ),
};

// Next.js project
export const NextJsProject: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <ProjectCard
        project={{
          id: 3,
          title: 'Animated Card',
          tech: 'NEXT.JS',
          image: animatedCardImg,
          link: 'https://animated-card-project-deploy.vercel.app/',
          description: 'A modern portfolio website with animations',
        }}
        onLiveClick={(id) => console.log('Clicked project:', id)}
      />
    </div>
  ),
};

// Without link (no external URL)
export const WithoutLink: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <ProjectCard
        project={{
          id: 4,
          title: 'Work In Progress',
          tech: 'VUE',
          image: budgetBuddyImg,
          description: 'A project currently in development',
        }}
        onLiveClick={(id) => console.log('Clicked project:', id)}
      />
    </div>
  ),
};

// Mobile viewport simulation
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div style={{ maxWidth: 320, padding: 8 }}>
      <ProjectCard
        project={sampleProject}
        onLiveClick={(id) => console.log('Clicked project:', id)}
      />
    </div>
  ),
};

// Multiple cards in a grid
export const GridLayout: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 800 }}>
      <ProjectCard
        project={sampleProject}
        onLiveClick={(id) => console.log('Clicked:', id)}
      />
      <ProjectCard
        project={{
          id: 2,
          title: 'Ascension of the Forgotten',
          tech: 'REACT',
          image: ascensionImg,
          link: 'https://ascension-project-vercel-deploy.vercel.app/',
          description: 'An interactive gaming experience',
        }}
        onLiveClick={(id) => console.log('Clicked:', id)}
      />
      <ProjectCard
        project={{
          id: 3,
          title: 'Animated Card',
          tech: 'NEXT.JS',
          image: animatedCardImg,
          link: 'https://animated-card-project-deploy.vercel.app/',
          description: 'A modern portfolio website',
        }}
        onLiveClick={(id) => console.log('Clicked:', id)}
      />
    </div>
  ),
};
