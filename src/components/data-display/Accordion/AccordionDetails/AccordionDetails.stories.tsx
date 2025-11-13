import type { Meta, StoryObj } from '@storybook/react';
import AccordionDetails from './AccordionDetails';

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
  }
};

export default meta;
type Story = StoryObj<typeof AccordionDetails>;

export const BasicAccordionDetails: Story = {};
