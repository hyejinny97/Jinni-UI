import type { Meta, StoryObj } from '@storybook/react';
import { AccordionDetails } from '.';

const meta: Meta<typeof AccordionDetails> = {
  component: AccordionDetails,
  argTypes: {
    children: {
      description: 'accordion body의 content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AccordionDetails>;

export const BasicAccordionDetails: Story = {};
