import type { Meta, StoryObj } from '@storybook/react';
import AccordionSummary from './AccordionSummary';

const meta: Meta<typeof AccordionSummary> = {
  component: AccordionSummary,
  argTypes: {
    children: {
      description: 'accordion header의 content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    expandIcon: {
      description: 'expand indicator icon',
      table: {
        type: { summary: 'React.ReactNode | false' },
        defaultValue: { summary: '<ArrowDownIcon />' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AccordionSummary>;

export const BasicAccordionSummary: Story = {};
