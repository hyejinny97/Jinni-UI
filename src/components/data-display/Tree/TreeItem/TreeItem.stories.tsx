import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TreeItem from './TreeItem';
import { Slider } from '@/components/data-entry/Slider';
import { Label } from '@/components/data-entry/Label';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof TreeItem> = {
  component: TreeItem,
  argTypes: {
    children: {
      description: 'TreeItem 내부 콘텐츠',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: 'select 됐을 때 배경색',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary-container'` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화 됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    id: {
      description: '다른 TreeItem과 구별되는 식별자',
      table: {
        type: { summary: `number | string` }
      }
    },
    layer: {
      description: 'Tree 내 item의 계층',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: '0' }
      }
    },
    selected: {
      description: 'true이면, selected style이 나타남',
      table: {
        type: { summary: `boolean` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Text>;

const LayerTemplate = () => {
  const [layer, setLayer] = useState<number>(0);

  const changeLayer = (
    _: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    setLayer(newValue as number);
  };

  return (
    <Stack spacing={10} style={{ width: '300px' }}>
      <Label
        content="Layer: "
        labelPlacement="start"
        style={{ gap: '10px', color: 'on-surface' }}
      >
        <Slider
          value={layer}
          onChange={changeLayer}
          min={0}
          max={3}
          marks
          style={{ width: '100%' }}
        />
      </Label>
      <TreeItem
        id={1}
        layer={layer}
        style={{ backgroundColor: 'surface-container-highest' }}
      >
        TreeItem Contents
      </TreeItem>
    </Stack>
  );
};

export const BasicTreeItem: Story = {
  render: (args) => (
    <TreeItem id={1} {...args}>
      TreeItem Contents
    </TreeItem>
  )
};

export const Layer: Story = {
  render: () => <LayerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LayerTemplate = () => {
  const [layer, setLayer] = useState<number>(0);

  const changeLayer = (
    _: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    setLayer(newValue as number);
  };

  return (
    <Stack spacing={10} style={{ width: '300px' }}>
      <Label
        content="Layer: "
        labelPlacement="start"
        style={{ gap: '10px', color: 'on-surface' }}
      >
        <Slider
          value={layer}
          onChange={changeLayer}
          min={0}
          max={3}
          marks
          style={{ width: '100%' }}
        />
      </Label>
      <TreeItem
        id={1}
        layer={layer}
        style={{ backgroundColor: 'surface-container-highest' }}
      >
        TreeItem Contents
      </TreeItem>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Selection: Story = {
  render: (args) => (
    <TreeItem id={1} selected {...args}>
      TreeItem Contents
    </TreeItem>
  )
};

export const Color: Story = {
  render: (args) => (
    <TreeItem id={1} selected color="primary" {...args}>
      TreeItem Contents
    </TreeItem>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <TreeItem id={1} disabled {...args}>
      TreeItem Contents
    </TreeItem>
  )
};
