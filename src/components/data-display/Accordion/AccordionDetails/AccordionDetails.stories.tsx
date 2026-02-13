import type { Meta, StoryObj } from '@storybook/react';
import AccordionDetails from './AccordionDetails';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof AccordionDetails> = {
  component: AccordionDetails,
  argTypes: {
    children: {
      description: 'accordion body의 content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    TransitionComponent: {
      description: 'transition 컴포넌트',
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `Collapse` }
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
