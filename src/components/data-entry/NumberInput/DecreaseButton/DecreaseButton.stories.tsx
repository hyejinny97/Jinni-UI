import type { Meta, StoryObj } from '@storybook/react';
import DecreaseButton from './DecreaseButton';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof DecreaseButton> = {
  component: DecreaseButton,
  argTypes: {
    children: {
      description: '버튼 내부 내용',
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `<ArrowDownIcon color='gray-600' />` }
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
type Story = StoryObj<typeof DecreaseButton>;

export const Basic: Story = {};
