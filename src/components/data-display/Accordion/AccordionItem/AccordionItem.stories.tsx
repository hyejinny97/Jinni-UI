import type { Meta, StoryObj } from '@storybook/react';
import AccordionItem from './AccordionItem';

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
      description:
        'true이면, 기본적으로 open 됨 (uncontrolled accordion인 경우)'
    },
    disabled: {
      description: 'true이면, interaction과 focus가 비활성화 됨'
    },
    expanded: {
      description: 'true이면, expand 됨 (controlled accordion인 경우)'
    },
    onChange: {
      description: 'expand/collapse state에 변화가 있을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.SyntheticEvent, expanded: boolean) => void'
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const BasicAccordionItem: Story = {};
