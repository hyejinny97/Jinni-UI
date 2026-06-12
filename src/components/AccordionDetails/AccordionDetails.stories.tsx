import type { Meta, StoryObj } from '@storybook/react';
import AccordionDetails from './AccordionDetails';
import StoryErrorBoundary from '@/components/StoryErrorBoundary';

const meta: Meta<typeof AccordionDetails> = {
  title: 'components/Accordion/AccordionDetails',
  component: AccordionDetails,
  argTypes: {
    children: {
      description: 'accordion body의 content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    WrapperComponent: {
      description: 'wrapper 컴포넌트',
      table: {
        type: { summary: 'React.ComponentType<{ children: React.ReactNode }>' },
        defaultValue: { summary: `React.Fragment` }
      }
    },
    TransitionComponent: {
      description: 'transition 컴포넌트',
      table: {
        type: { summary: `React.ComponentType<{ children: React.ReactNode }>` },
        defaultValue: { summary: `React.Fragment` }
      }
    }
  },
  decorators: [
    (Story) => (
      <StoryErrorBoundary>
        <Story />
      </StoryErrorBoundary>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof AccordionDetails>;

export const BasicAccordionDetails: Story = {};
