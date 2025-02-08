import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './Collapse';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { TRANSITION_ARG_TYPES } from '@/components/general/Transition';

const meta: Meta<typeof Collapse> = {
  component: Collapse,
  argTypes: {
    collapsedSize: {
      description: 'collapse될 때 container의 크기',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: `'0px'` }
      }
    },
    orientation: {
      description: 'transition 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'vertical'` }
      }
    },
    ...TRANSITION_ARG_TYPES
  }
};

export default meta;
type Story = StoryObj<typeof Collapse>;

const CollapseTemplate = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Disappear' : 'Appear'}
      </Button>
      <Collapse in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Collapse>
    </Stack>
  );
};

export const DefaultCollapseTransition: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <CollapseTemplate {...args} />
      <CollapseTemplate
        easing={{
          enter: 'emphasized-decelerate',
          exit: 'emphasized-accelerate'
        }}
        duration="extra-long4"
        {...args}
      />
    </Stack>
  )
};

export const Orientation: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <CollapseTemplate orientation="vertical" {...args} />
      <CollapseTemplate orientation="horizontal" {...args} />
    </Stack>
  )
};

export const CollapsedSize: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <CollapseTemplate orientation="vertical" collapsedSize={20} {...args} />
      <CollapseTemplate orientation="horizontal" collapsedSize={20} {...args} />
    </Stack>
  )
};
