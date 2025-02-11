import type { Meta, StoryObj } from '@storybook/react';
import { AccordionSummary } from '.';

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
    },
    HeadingComponent: {
      description: 'accordion header의 heading element',
      table: {
        type: { summary: 'h1 | h2 | h3 | h4 | h5 | h6 ' },
        defaultValue: { summary: 'h3' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AccordionSummary>;

export const BasicAccordionSummary: Story = {};
