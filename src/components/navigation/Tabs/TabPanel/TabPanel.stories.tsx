import type { Meta, StoryObj } from '@storybook/react';
import TabPanel from './TabPanel';

const meta: Meta<typeof TabPanel> = {
  component: TabPanel,
  argTypes: {
    children: {
      description: 'tab panel content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    value: {
      description: '다른 tab과 구별되는 특정 tab value',
      table: {
        type: { summary: `string | number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TabPanel>;

export const Basic: Story = {};
