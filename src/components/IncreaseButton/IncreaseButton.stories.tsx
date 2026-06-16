import type { Meta, StoryObj } from '@storybook/react';
import IncreaseButton from './IncreaseButton';
import StoryErrorBoundary from '@/components/StoryErrorBoundary';

const meta: Meta<typeof IncreaseButton> = {
  title: 'components/NumberInput/IncreaseButton',
  component: IncreaseButton,
  argTypes: {
    children: {
      description: '버튼 내부 내용',
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `<ArrowUpIcon color='on-surface-variant' />` }
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
type Story = StoryObj<typeof IncreaseButton>;

export const Basic: Story = {};
