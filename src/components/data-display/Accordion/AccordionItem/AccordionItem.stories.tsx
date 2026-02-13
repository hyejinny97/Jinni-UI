import type { Meta, StoryObj } from '@storybook/react';
import AccordionItem from './AccordionItem';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof AccordionItem> = {
  component: AccordionItem,
  argTypes: {
    children: {
      description: 'accordion summary, accordion details',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    defaultExpanded: {
      description: 'true이면, 초기에 expand 됨',
      defaultValue: { summary: 'false' }
    },
    disabled: {
      description: 'true이면, 비활성화 됨'
    },
    expanded: {
      description: 'true이면, expand 됨'
    },
    onChange: {
      description: 'expand/collapse state에 변화가 있을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.SyntheticEvent, expanded: boolean) => void'
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
type Story = StoryObj<typeof AccordionItem>;

export const BasicAccordionItem: Story = {};
