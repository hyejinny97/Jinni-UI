import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Reorder, ReorderItem, ReorderItemTrigger } from '.';
import { DragIndicatorIcon } from '@/components/icons/DragIndicatorIcon';

const meta: Meta<typeof Reorder> = {
  component: Reorder,
  argTypes: {
    children: {
      description: '재정렬할 아이템들 (ReorderItem 컴포넌트들)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    value: {
      description: '목록 내 아이템 순서',
      table: {
        type: { summary: 'Array<string | number>' }
      }
    },
    onChange: {
      description: '목록 내 아이템 순서가 변경 됐을 때 호출되는 함수',
      table: {
        type: { summary: `(value: Array<string | number>) => void;` }
      }
    },
    direction: {
      description: 'reorder 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Reorder>;

const FRUITS = ['Apple', 'Banana', 'Melon'];

const getColor = (fruit: string) => {
  switch (fruit) {
    case 'Apple':
      return 'red';
    case 'Banana':
      return 'yellow';
    case 'Melon':
      return 'green';
    default:
      return 'gray';
  }
};

const ReorderTemplate = ({
  direction = 'vertical'
}: {
  direction?: 'horizontal' | 'vertical';
}) => {
  const [order, setOrder] = useState<string[]>(FRUITS);

  return (
    <Reorder
      direction={direction}
      value={order}
      onChange={(newValue: (string | number)[]) => {
        setOrder(newValue as string[]);
      }}
    >
      {order.map((fruit) => (
        <ReorderItem
          key={fruit}
          value={fruit}
          style={{
            width: direction === 'vertical' ? '300px' : '150px',
            padding: '10px 16px',
            backgroundColor: getColor(fruit),
            borderRadius: '4px',
            userSelect: 'none'
          }}
        >
          {fruit}
        </ReorderItem>
      ))}
    </Reorder>
  );
};

const TriggersTemplate = () => {
  const [order, setOrder] = useState<string[]>(FRUITS);

  return (
    <Reorder
      value={order}
      onChange={(newValue: (string | number)[]) => {
        setOrder(newValue as string[]);
      }}
    >
      {order.map((fruit) => (
        <ReorderItem
          key={fruit}
          value={fruit}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '300px',
            padding: '10px 16px',
            backgroundColor: getColor(fruit),
            borderRadius: '4px',
            userSelect: 'none'
          }}
        >
          {fruit}
          <ReorderItemTrigger style={{ cursor: 'pointer' }}>
            <DragIndicatorIcon size={16} color="gray-800" />
          </ReorderItemTrigger>
        </ReorderItem>
      ))}
    </Reorder>
  );
};

export const BasicReorder: Story = {
  render: () => <ReorderTemplate />
};

export const Direction: Story = {
  render: () => <ReorderTemplate direction="horizontal" />
};

export const Triggers: Story = {
  render: () => <TriggersTemplate />
};
