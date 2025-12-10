import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';

const meta: Meta<typeof Tab> = {
  component: Tab,
  argTypes: {
    children: {
      description: 'tab label',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
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
type Story = StoryObj<typeof Tab>;

export const Basic: Story = {};
