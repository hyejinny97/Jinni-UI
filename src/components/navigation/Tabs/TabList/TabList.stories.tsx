import type { Meta, StoryObj } from '@storybook/react';
import TabList from './TabList';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TabList> = {
  component: TabList,
  argTypes: {
    color: {
      description: 'selected tab과 indicator의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    fullWidth: {
      description: 'true이면, 허용 가능한 너비에 동일한 비율로 꽉 채워짐',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    scrollable: {
      description: 'true이면, scrolling이 가능함',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: `false` }
      }
    },
    variant: {
      description: 'tabs의 형태',
      table: {
        type: {
          summary: `{ selectedTab: 'filled' | 'subtle-filled' | 'outlined' | 'text', tab: 'filled' | 'subtle-filled' | 'outlined' | 'text' }`
        },
        defaultValue: {
          summary: `{ selectedTab: 'text', tab: 'text' }`
        }
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
type Story = StoryObj<typeof TabList>;

export const Basic: Story = {};
