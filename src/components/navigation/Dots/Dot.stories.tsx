import type { Meta, StoryObj } from '@storybook/react';
import Dot from './Dot';

const meta: Meta<typeof Dot> = {
  component: Dot,
  argTypes: {
    children: {
      description: 'dot 내 콘텐츠',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: 'selected dot의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    selected: {
      description: 'true이면, selected됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    size: {
      description: 'dot의 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: {
          summary: `'md'`
        }
      }
    },
    value: {
      description: 'dot의 value',
      table: {
        type: { summary: 'number | string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const BasicDot: Story = {
  render: (args) => {
    return <Dot value={0} {...args} />;
  }
};
